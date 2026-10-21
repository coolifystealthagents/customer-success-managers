#!/usr/bin/env python3
import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright

VIEWPORTS = [360, 768, 1024, 1440]
REPRESENTATIVE = {
    '/', '/services/customer-onboarding-support', '/blog/customer-onboarding-acceptance-gate',
    '/research/customer-health-classification-agreement-study', '/contact-us', '/thank-you',
}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', default='http://127.0.0.1:3417')
    parser.add_argument('--manifest', default='.next/prerender-manifest.json')
    parser.add_argument('--output', default='artifacts/browser')
    parser.add_argument('--executable')
    parser.add_argument('--widths', nargs='+', type=int, default=VIEWPORTS)
    parser.add_argument('--route-offset', type=int, default=0)
    parser.add_argument('--route-limit', type=int)
    args = parser.parse_args()
    widths = args.widths
    base = args.base.rstrip('/')
    all_routes = sorted(route for route in json.loads(Path(args.manifest).read_text())['routes'] if route not in {'/_global-error', '/_not-found', '/robots.txt', '/sitemap.xml', '/icon.svg'})
    route_end = None if args.route_limit is None else args.route_offset + args.route_limit
    routes = all_routes[args.route_offset:route_end]
    output = Path(args.output); output.mkdir(parents=True, exist_ok=True)
    tracker = (Path(__file__).parent / 'fixtures' / 'acr-tracker-v0.4.19.js').read_bytes()
    failures = []
    widget_limitations = []
    blocked_external = []
    results = []

    with sync_playwright() as pw:
        launch_options = {'headless': True, 'args': ['--no-sandbox', '--disable-dev-shm-usage']}
        if args.executable: launch_options['executable_path'] = args.executable
        browser = pw.chromium.launch(**launch_options)
        for width in widths:
            context = browser.new_context(viewport={'width': width, 'height': 900}, device_scale_factor=1, reduced_motion='reduce')
            def block_external(route):
                host = urlsplit(route.request.url).hostname
                if host in {'127.0.0.1', 'localhost'}:
                    route.continue_()
                else:
                    blocked_external.append(route.request.url)
                    route.abort('blockedbyclient')
            context.route('**/*', block_external)
            context.route('https://acrtracking.stealthagents.us/v1/tracker.js', lambda route: route.fulfill(status=200, content_type='application/javascript', body=tracker))
            context.route(re.compile(rf'^{re.escape(base)}/ingest/track'), lambda route: route.fulfill(status=200, content_type='application/json', body='{"status":"accepted","test":true}'))
            context.route(re.compile(r'^https://(?:[^/]+\.)?oncehub\.com/'), lambda route: route.fulfill(status=200, content_type='text/html', body='<html><body><h1>Blocked scheduler test fixture</h1><p>No booking transport left this browser. This local fixture verifies the iframe and exact destination fallback without contacting OnceHub.</p></body></html>'))
            for route_path in routes:
                page = context.new_page()
                console_errors = []
                page_errors = []
                failed_requests = []
                bad_responses = []
                page.on('console', lambda message, bucket=console_errors: bucket.append(message.text) if message.type == 'error' else None)
                page.on('pageerror', lambda error, bucket=page_errors: bucket.append(str(error)))
                page.on('requestfailed', lambda request, bucket=failed_requests: bucket.append(f'{request.method} {request.url}: {request.failure}'))
                page.on('response', lambda response, bucket=bad_responses: bucket.append(f'{response.status} {response.url}') if response.status >= 400 else None)
                response = page.goto(base + route_path, wait_until='load', timeout=30000)
                page.wait_for_timeout(350)
                page.evaluate('''async () => {
                  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
                  const step = Math.max(500, Math.floor(innerHeight * .8));
                  const initialHeight = document.documentElement.scrollHeight;
                  for (let y = 0; y < initialHeight; y += step) {
                    scrollTo(0, y);
                    await pause(35);
                  }
                  await Promise.all([...document.images].map(img => {
                    if (!img.currentSrc || (img.complete && img.naturalWidth > 0)) return true;
                    return Promise.race([
                      img.decode().then(() => true).catch(() => false),
                      pause(3000).then(() => false),
                    ]);
                  }));
                }''')
                scheduler_text_length = 0
                if route_path == '/thank-you':
                    frame_element = page.locator('.booking-frame')
                    fallback = page.locator('a:has-text("Open the scheduler in a new page")')
                    frame_element.scroll_into_view_if_needed(timeout=5000)
                    try:
                        scheduler = page.frame_locator('.booking-frame')
                        scheduler.locator('body').wait_for(state='visible', timeout=8000)
                        scheduler_text_length = len(scheduler.locator('body').inner_text(timeout=8000).strip())
                        if scheduler_text_length < 80:
                            if fallback.count() == 1 and fallback.get_attribute('href') == frame_element.get_attribute('src'):
                                widget_limitations.append(f'{width}px {route_path}: OnceHub exposed {scheduler_text_length} visible characters in headless Chromium; exact-destination fallback present')
                            else:
                                failures.append(f'{width}px {route_path}: scheduler rendered too little visible text and no exact-destination fallback was present')
                    except Exception as error:
                        if fallback.count() == 1 and fallback.get_attribute('href') == frame_element.get_attribute('src'):
                            widget_limitations.append(f'{width}px {route_path}: OnceHub did not visibly render in headless Chromium ({type(error).__name__}); exact-destination fallback present')
                        else:
                            failures.append(f'{width}px {route_path}: scheduler did not visibly render and no exact-destination fallback was present: {type(error).__name__}')
                page.evaluate('scrollTo(0, 0)')
                page.wait_for_timeout(100)
                metrics = page.evaluate('''() => {
                  const visible = el => {
                    const s = getComputedStyle(el), r = el.getBoundingClientRect();
                    return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity || '1') > 0 && r.width > 0 && r.height > 0;
                  };
                  const offenders = [...document.querySelectorAll('body *')].filter(el => {
                    if (!visible(el) || ['SVG','PATH','IFRAME'].includes(el.tagName) || el.closest('.honeypot,[aria-hidden="true"]')) return false;
                    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
                    if (['auto','scroll','hidden','clip'].includes(s.overflowX)) return false;
                    let parent = el.parentElement;
                    while (parent && parent !== document.body) {
                      const overflow = getComputedStyle(parent).overflowX;
                      if (['auto','scroll','hidden','clip'].includes(overflow)) return false;
                      parent = parent.parentElement;
                    }
                    return r.left < -2 || r.right > innerWidth + 2;
                  }).slice(0, 12).map(el => ({tag: el.tagName, cls: String(el.className).slice(0,80), left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right)}));
                  const brokenImages = [...document.images].filter(img => visible(img) && (!img.complete || img.naturalWidth === 0)).map(img => img.currentSrc || img.src);
                  const main = document.querySelector('main');
                  const h1 = document.querySelectorAll('h1').length;
                  const header = document.querySelector('.site-header')?.getBoundingClientRect();
                  const firstMain = main?.getBoundingClientRect();
                  return {
                    scrollWidth: document.documentElement.scrollWidth,
                    innerWidth,
                    offenders,
                    brokenImages,
                    h1,
                    hasMain: Boolean(main),
                    headerOverlap: Boolean(header && firstMain && firstMain.top < header.bottom - 2 && firstMain.bottom > header.top),
                    title: document.title,
                  };
                }''')
                local_bad = [item for item in bad_responses if urlsplit(item.split(' ',1)[1]).hostname in {'127.0.0.1','localhost'}]
                if not response or response.status != 200: failures.append(f'{width}px {route_path}: navigation status {response.status if response else "none"}')
                if metrics['scrollWidth'] > metrics['innerWidth'] + 2: failures.append(f'{width}px {route_path}: horizontal overflow {metrics["scrollWidth"]}>{metrics["innerWidth"]}')
                if metrics['offenders']: failures.append(f'{width}px {route_path}: off-viewport elements {metrics["offenders"]}')
                if metrics['brokenImages']: failures.append(f'{width}px {route_path}: broken images {metrics["brokenImages"]}')
                if metrics['h1'] != 1 or not metrics['hasMain']: failures.append(f'{width}px {route_path}: landmark/h1 failure')
                if metrics['headerOverlap']: failures.append(f'{width}px {route_path}: sticky header overlaps main')
                if page_errors: failures.append(f'{width}px {route_path}: page errors {page_errors}')
                if local_bad: failures.append(f'{width}px {route_path}: local HTTP errors {local_bad}')
                if failed_requests:
                    external = [item for item in failed_requests if 'oncehub.com' in item or 'scheduleonce.com' in item]
                    internal = [item for item in failed_requests if item not in external]
                    if internal: failures.append(f'{width}px {route_path}: failed requests {internal}')
                if width == 360:
                    toggle = page.locator('.menu-toggle')
                    if toggle.count():
                        toggle.focus(); page.keyboard.press('Enter'); page.wait_for_timeout(50)
                        if toggle.get_attribute('aria-expanded') != 'true' or not page.locator('#primary-menu').is_visible():
                            failures.append(f'{width}px {route_path}: mobile menu did not open')
                        page.keyboard.press('Escape'); page.wait_for_timeout(50)
                        if toggle.get_attribute('aria-expanded') != 'false' or page.evaluate('document.activeElement !== document.querySelector(".menu-toggle")'):
                            failures.append(f'{width}px {route_path}: Escape did not close menu and restore focus')
                if not page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"):
                    failures.append(f'{width}px {route_path}: reduced-motion preference not active')
                if route_path in {'/blog/customer-onboarding-acceptance-gate', '/research/customer-health-classification-agreement-study'}:
                    toc = page.locator('nav[aria-label="On this page"] a') if width > 900 else page.locator('nav[aria-label="Article contents"] a')
                    if toc.count() < 2 or toc.nth(0).get_attribute('aria-current') != 'location':
                        failures.append(f'{width}px {route_path}: initial active TOC state missing')
                    else:
                        target = toc.nth(1).get_attribute('href')
                        toc.nth(1).focus(); page.keyboard.press('Enter'); page.wait_for_timeout(150)
                        if page.evaluate('location.hash') != target or toc.nth(1).get_attribute('aria-current') != 'location':
                            failures.append(f'{width}px {route_path}: keyboard TOC activation failed')
                if route_path == '/contact-us':
                    form = page.locator('.lead-form').bounding_box()
                    if not form or form['x'] < -2 or form['x'] + form['width'] > width + 2 or form['y'] >= 900:
                        failures.append(f'{width}px {route_path}: form does not start within first fold or is clipped')
                if route_path in REPRESENTATIVE:
                    page.evaluate("""() => {
                      if (location.hash) history.replaceState(null, '', location.pathname + location.search);
                      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
                      scrollTo(0, 0);
                    }""")
                    page.wait_for_timeout(100)
                    slug = 'home' if route_path == '/' else route_path.strip('/').replace('/', '__')
                    page.screenshot(path=str(output / f'{width}-{slug}.png'), full_page=True)
                results.append({'width': width, 'route': route_path, 'consoleErrors': console_errors, 'externalRequestFailures': [x for x in failed_requests if 'oncehub.com' in x or 'scheduleonce.com' in x], 'schedulerTextLength': scheduler_text_length})
                page.close()
            context.close()
        browser.close()

    summary = {
        'viewports': widths,
        'routesPerViewport': len(routes),
        'renderedChecks': len(results),
        'screenshots': len(list(output.glob('*.png'))),
        'consoleErrorRecords': sum(bool(row['consoleErrors']) for row in results),
        'externalRequestFailureRecords': sum(bool(row['externalRequestFailures']) for row in results),
        'blockedExternalRequests': len(blocked_external),
        'externalWidgetLimitations': widget_limitations,
        'failures': failures,
    }
    (output / 'results.json').write_text(json.dumps({'summary': summary, 'records': results}, indent=2))
    print(json.dumps(summary, indent=2))
    return 1 if failures else 0

if __name__ == '__main__':
    sys.exit(main())
