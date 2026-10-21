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
    interaction_results = {}
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
          if (sessionStorage.getItem('__nativeSubmits') === null) sessionStorage.setItem('__nativeSubmits', '0');
          document.addEventListener('submit', () => {
            sessionStorage.setItem('__nativeSubmits', String(Number(sessionStorage.getItem('__nativeSubmits') || '0') + 1));
          }, true);
        """)
        page = context.new_page()
        page.goto(args.base + '/contact-us', wait_until='load')
        page.evaluate("() => sessionStorage.setItem('__nativeSubmits', '0')")
        page.wait_for_function("() => window.acrTracker?.version === '0.4.19'", timeout=5000)
        submit = page.locator('button:has-text("Request a free consultation")')

        submit.click()
        page.wait_for_timeout(100)
        if api_requests:
            failures.append('invalid form generated an API request')
        if int(page.evaluate("() => sessionStorage.getItem('__nativeSubmits') || '0'")) != 0:
            failures.append('invalid form generated a native submit event')
        interaction_results['mouseRequiredValidation'] = len(api_requests) == 0

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
        interaction_results['mouseFailureRetention'] = page.url.endswith('/contact-us')

        submit.click()
        page.wait_for_url('**/thank-you', timeout=10000)
        page.wait_for_function("() => window.acrTracker?.version === '0.4.19'", timeout=5000)
        page.evaluate('() => window.acrTracker.flush()')
        page.wait_for_timeout(250)

        native_submits = int(page.evaluate("() => sessionStorage.getItem('__nativeSubmits') || '0'"))
        if len(api_requests) != 2:
            failures.append(f'expected two intercepted delivery attempts, got {len(api_requests)}')
        if native_submits != 0:
            failures.append(f'expected zero native submit events, got {native_submits}')
        submission_ids = [multipart_value(body, 'submission_id') for body in api_requests]
        if len(submission_ids) != 2 or not submission_ids[0] or submission_ids[0] != submission_ids[1]:
            failures.append(f'submission_id was not stable across retry: {submission_ids}')

        link = page.locator('a:has-text("Open the scheduler in a new page")')
        frame = page.locator('.booking-frame')
        if link.count() != 1 or frame.count() != 1:
            failures.append('booking fallback or iframe missing')
        elif link.get_attribute('href') != frame.get_attribute('src'):
            failures.append('booking fallback URL differs from iframe URL')

        keyboard_page = context.new_page()
        keyboard_page.goto(args.base + '/contact-us', wait_until='load')
        keyboard_page.evaluate("() => sessionStorage.setItem('__nativeSubmits', '0')")
        keyboard_page.wait_for_function("() => window.acrTracker?.version === '0.4.19'", timeout=5000)
        keyboard_page.locator('[name="first_name"]').focus()
        keyboard_page.keyboard.press('Enter')
        keyboard_page.wait_for_timeout(100)
        interaction_results['enterRequiredValidation'] = len(api_requests) == 2
        if not interaction_results['enterRequiredValidation']:
            failures.append('Enter on an invalid form generated an API request')
        keyboard_page.locator('[name="company_size"]').focus()
        keyboard_page.keyboard.press('Enter')
        keyboard_page.wait_for_timeout(100)
        interaction_results['selectEnterDidNotSubmit'] = len(api_requests) == 2
        if not interaction_results['selectEnterDidNotSubmit']:
            failures.append('Enter on a select control generated an API request')
        for name, value in VALID.items():
            keyboard_page.locator(f'[name="{name}"]').fill(value)
        keyboard_page.locator('[name="company_size"]').select_option(label='11 to 50')
        keyboard_page.locator('[name="positions_to_fill"]').select_option(label='2 to 3')
        keyboard_page.locator('[name="referral_source"]').select_option(label='Search engine')
        keyboard_page.locator('[name="first_name"]').focus()
        keyboard_page.keyboard.press('Enter')
        keyboard_page.wait_for_url('**/thank-you', timeout=10000)
        keyboard_page.wait_for_function("() => window.acrTracker?.version === '0.4.19'", timeout=5000)
        keyboard_page.evaluate('() => window.acrTracker.flush()')
        keyboard_page.wait_for_timeout(250)
        interaction_results['enterAcknowledgedSuccess'] = keyboard_page.url.endswith('/thank-you')
        keyboard_native_submits = int(keyboard_page.evaluate("() => sessionStorage.getItem('__nativeSubmits') || '0'"))
        if keyboard_native_submits != 0:
            failures.append(f'Enter path generated {keyboard_native_submits} native submit event(s)')
        if len(api_requests) != 3:
            failures.append(f'expected three intercepted delivery attempts across mouse and Enter paths, got {len(api_requests)}')

        events = [event for payload in tracking_payloads for event in payload.get('events', [])]
        lead_events = [event for event in events if event.get('event_type') == 'lead_submit']
        if lead_events:
            failures.append(f'browser emitted {len(lead_events)} lead_submit event(s)')
        serialized_tracking = json.dumps(tracking_payloads)
        for forbidden in [VALID['first_name'], VALID['last_name'], VALID['email'], VALID['phone'], VALID['message']]:
            if forbidden in serialized_tracking:
                failures.append(f'browser analytics contained form value: {forbidden}')

        menu_page = context.new_page()
        menu_page.set_viewport_size({'width': 390, 'height': 844})
        menu_page.goto(args.base + '/', wait_until='load')
        toggle = menu_page.locator('.menu-toggle')
        toggle.focus()
        menu_page.keyboard.press('Enter')
        menu_page.wait_for_timeout(100)
        first_link = menu_page.locator('#primary-menu a').first
        last_link = menu_page.locator('#primary-menu a').last
        interaction_results['menuOpensToFirstLink'] = first_link.evaluate('(node) => node === document.activeElement')
        first_link.focus()
        menu_page.keyboard.press('Shift+Tab')
        interaction_results['menuCloseReachableBackward'] = toggle.evaluate('(node) => node === document.activeElement')
        menu_page.keyboard.press('Shift+Tab')
        interaction_results['menuBackwardWrap'] = last_link.evaluate('(node) => node === document.activeElement')
        menu_page.keyboard.press('Tab')
        interaction_results['menuCloseReachableForward'] = toggle.evaluate('(node) => node === document.activeElement')
        menu_page.keyboard.press('Tab')
        interaction_results['menuForwardWrap'] = first_link.evaluate('(node) => node === document.activeElement')
        menu_page.keyboard.press('Escape')
        interaction_results['menuEscapeReturnsFocus'] = toggle.evaluate('(node) => node === document.activeElement') and toggle.get_attribute('aria-expanded') == 'false'
        for key, passed in interaction_results.items():
            if key.startswith('menu') and not passed:
                failures.append(f'mobile keyboard contract failed: {key}')
        browser.close()

    summary = {
        'trackerFixtureSha256': fixture_hash,
        'trackerVersion': '0.4.19',
        'interceptedApiRequests': len(api_requests),
        'mouseStableSubmissionId': len(submission_ids) >= 2 and bool(submission_ids[0]) and submission_ids[0] == submission_ids[1],
        'interactionResults': interaction_results,
        'failedDeliveryStayedOnForm': 'failed operational delivery navigated away from the form' not in failures,
        'nativeSubmitEvents': native_submits,
        'keyboardNativeSubmitEvents': keyboard_native_submits,
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
