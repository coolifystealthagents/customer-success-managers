#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright

TRACKER_SHA256 = 'b07a9a687d1a5f2e30a1da47676f759009259871f90e36f8ed474bde3c212677'
TRACKER_URL = 'https://acrtracking.stealthagents.us/v1/tracker.js'
TRACKER_FIXTURE = Path(__file__).parent / 'fixtures' / 'acr-tracker-v0.4.19.js'
VALID = {
    'first_name': 'Test', 'last_name': 'Release', 'email': 'release@example.org',
    'phone': '555 010 0200', 'company': 'Release Verification',
    'company_website': 'https://example.org',
    'message': 'Customer success workflow description used only inside the intercepted local test.',
}


def multipart_value(body, name):
    match = re.search(rf'name="{re.escape(name)}"\r?\n\r?\n([^\r\n]+)', body)
    return match.group(1) if match else None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', required=True)
    parser.add_argument('--executable', required=True)
    args = parser.parse_args()
    failures, api_requests, tracking_payloads, blocked_external = [], [], [], []
    tracker_bytes = TRACKER_FIXTURE.read_bytes()
    fixture_hash = hashlib.sha256(tracker_bytes).hexdigest()
    if fixture_hash != TRACKER_SHA256:
        failures.append(f'hosted tracker fixture hash mismatch: {fixture_hash}')

    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            headless=True, executable_path=args.executable,
            args=['--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled'],
        )
        context = browser.new_context(viewport={'width': 1024, 'height': 900})
        api_attempt = 0

        def intercept(route):
            nonlocal api_attempt
            request = route.request
            url = request.url
            host = urlsplit(url).hostname
            if url == TRACKER_URL:
                route.fulfill(status=200, content_type='application/javascript', body=tracker_bytes)
            elif url.endswith('/api/submit-lead'):
                api_attempt += 1
                api_requests.append(request.post_data or '')
                if api_attempt == 1:
                    route.fulfill(status=503, content_type='application/json', body=json.dumps({
                        'ok': False,
                        'message': 'We could not deliver your request right now. Your information was not accepted. Please try again later.',
                    }))
                else:
                    route.fulfill(status=200, content_type='application/json', body='{"ok":true,"status":"delivered"}')
            elif url.endswith('/ingest/track'):
                try:
                    tracking_payloads.append(json.loads(request.post_data or '{}'))
                except json.JSONDecodeError:
                    failures.append('browser tracker sent invalid JSON')
                route.fulfill(status=200, content_type='application/json', body='{"status":"accepted"}')
            elif host == 'go.oncehub.com' or (host and host.endswith('.oncehub.com')):
                route.fulfill(status=200, content_type='text/html', body='<html><body>Intercepted scheduler fixture.</body></html>')
            elif host in {'127.0.0.1', 'localhost'}:
                route.continue_()
            else:
                blocked_external.append(url)
                route.abort('blockedbyclient')

        context.route('**/*', intercept)
        context.add_init_script("""
          window.__nativeSubmits = 0;
          document.addEventListener('submit', () => window.__nativeSubmits++, true);
        """)
        page = context.new_page()
        page.goto(args.base + '/contact-us', wait_until='load')
        page.wait_for_function("() => window.acrTracker?.version === '0.4.19'", timeout=5000)
        submit = page.locator('button:has-text("Request a free consultation")')

        submit.click()
        page.wait_for_timeout(100)
        if api_requests:
            failures.append('invalid form generated an API request')
        if page.evaluate('() => window.__nativeSubmits') != 0:
            failures.append('invalid form generated a native submit event')

        for name, value in VALID.items():
            page.locator(f'[name="{name}"]').fill(value)
        page.locator('[name="company_size"]').select_option(label='11 to 50')
        page.locator('[name="positions_to_fill"]').select_option(label='2 to 3')
        page.locator('[name="referral_source"]').select_option(label='Search engine')

        submit.click()
        delivery_error = page.locator('.form-error[role="alert"]')
        delivery_error.filter(has_text=re.compile(r'^We could not deliver')).wait_for(state='visible', timeout=5000)
        if not page.url.endswith('/contact-us'):
            failures.append('failed operational delivery navigated away from the form')

        submit.click()
        page.wait_for_url('**/thank-you', timeout=10000)
        page.wait_for_function("() => window.acrTracker?.version === '0.4.19'", timeout=5000)
        page.evaluate('() => window.acrTracker.flush()')
        page.wait_for_timeout(250)

        native_submits = page.evaluate('() => window.__nativeSubmits')
        if len(api_requests) != 2:
            failures.append(f'expected two intercepted delivery attempts, got {len(api_requests)}')
        if native_submits != 0:
            failures.append(f'expected zero native submit events, got {native_submits}')
        submission_ids = [multipart_value(body, 'submission_id') for body in api_requests]
        if len(submission_ids) != 2 or not submission_ids[0] or submission_ids[0] != submission_ids[1]:
            failures.append(f'submission_id was not stable across retry: {submission_ids}')

        events = [event for payload in tracking_payloads for event in payload.get('events', [])]
        lead_events = [event for event in events if event.get('event_type') == 'lead_submit']
        if lead_events:
            failures.append(f'browser emitted {len(lead_events)} lead_submit event(s)')
        serialized_tracking = json.dumps(tracking_payloads)
        for forbidden in [VALID['first_name'], VALID['last_name'], VALID['email'], VALID['phone'], VALID['message']]:
            if forbidden in serialized_tracking:
                failures.append(f'browser analytics contained form value: {forbidden}')

        link = page.locator('a:has-text("Open the scheduler in a new page")')
        frame = page.locator('.booking-frame')
        if link.count() != 1 or frame.count() != 1:
            failures.append('booking fallback or iframe missing')
        elif link.get_attribute('href') != frame.get_attribute('src'):
            failures.append('booking fallback URL differs from iframe URL')
        browser.close()

    summary = {
        'trackerFixtureSha256': fixture_hash,
        'trackerVersion': '0.4.19',
        'interceptedApiRequests': len(api_requests),
        'stableSubmissionId': len(api_requests) == 2 and bool(submission_ids[0]) and len(set(submission_ids)) == 1,
        'failedDeliveryStayedOnForm': 'failed operational delivery navigated away from the form' not in failures,
        'nativeSubmitEvents': native_submits,
        'browserLeadEvents': len(lead_events),
        'browserPayloadsInspected': len(tracking_payloads),
        'freeTextExcluded': VALID['message'] not in serialized_tracking,
        'externalRequestsSent': 0,
        'blockedExternalRequests': len(blocked_external),
        'failures': failures,
    }
    print(json.dumps(summary, indent=2))
    return 1 if failures else 0


if __name__ == '__main__':
    sys.exit(main())
