#!/usr/bin/env python3
import argparse
import http.client
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

DOMAIN = 'customersuccessmanagers.com'
SECURITY_HEADERS = {
    'content-security-policy', 'referrer-policy', 'x-content-type-options',
    'x-frame-options', 'permissions-policy', 'strict-transport-security',
}

class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = []
        self.in_title = False
        self.h1 = 0
        self.ids = []
        self.refs = []
        self.canonical = None
        self.description = None
        self.robots = ''

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if values.get('id'): self.ids.append(values['id'])
        if tag in ('a', 'link') and values.get('href'): self.refs.append(values['href'])
        if tag in ('img', 'script', 'iframe') and values.get('src'): self.refs.append(values['src'])
        if tag == 'link' and values.get('rel') == 'canonical': self.canonical = values.get('href')
        if tag == 'meta' and values.get('name') == 'description': self.description = values.get('content')
        if tag == 'meta' and values.get('name') == 'robots': self.robots = values.get('content', '').lower()

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False

    def handle_data(self, data):
        if self.in_title: self.title.append(data)


def request(url, method='GET', headers=None, data=None):
    req = urllib.request.Request(url, method=method, headers=headers or {}, data=data)
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            return response.status, {k.lower(): v for k, v in response.headers.items()}, response.read()
    except urllib.error.HTTPError as error:
        return error.code, {k.lower(): v for k, v in error.headers.items()}, error.read()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', default='http://127.0.0.1:3417')
    parser.add_argument('--manifest', default='.next/prerender-manifest.json')
    args = parser.parse_args()
    base = args.base.rstrip('/')
    manifest = json.loads(Path(args.manifest).read_text())
    routes = sorted(route for route in manifest['routes'] if route not in {'/_global-error', '/_not-found', '/icon.svg'})
    failures = []
    pages = {}
    assets = set()
    internal_links = set()

    for route in routes:
        status, headers, body = request(base + route)
        if status != 200: failures.append(f'{route}: HTTP {status}')
        if route == '/robots.txt' or route == '/sitemap.xml': continue
        content_type = headers.get('content-type', '')
        if 'text/html' not in content_type: failures.append(f'{route}: expected HTML, got {content_type}')
        doc = Document(); doc.feed(body.decode('utf-8', 'replace')); pages[route] = doc
        if not ''.join(doc.title).strip(): failures.append(f'{route}: missing title')
        if not doc.description: failures.append(f'{route}: missing description')
        if doc.h1 != 1: failures.append(f'{route}: expected one h1, found {doc.h1}')
        if len(doc.ids) != len(set(doc.ids)): failures.append(f'{route}: duplicate IDs')
        noindex = 'noindex' in doc.robots
        expected_canonical = f'https://{DOMAIN}{"" if route == "/" else route}'
        if not noindex and doc.canonical != expected_canonical:
            failures.append(f'{route}: canonical {doc.canonical!r}, expected {expected_canonical!r}')
        for ref in doc.refs:
            parsed = urllib.parse.urlsplit(ref)
            if parsed.scheme or parsed.netloc:
                if parsed.hostname == DOMAIN:
                    internal_links.add(parsed.path or '/')
                continue
            if not ref.startswith('/'): continue
            target = parsed.path or '/'
            if target.startswith('/_next/') or re.search(r'\.(?:css|js|png|jpe?g|webp|avif|svg|ico|woff2?)$', target, re.I):
                assets.add(target)
            else:
                internal_links.add(target)
            if parsed.fragment and target == route and parsed.fragment not in set(doc.ids):
                failures.append(f'{route}: missing anchor #{parsed.fragment}')

    for target in sorted(internal_links):
        status, _, _ = request(base + target)
        if status != 200: failures.append(f'internal link {target}: HTTP {status}')
    for asset in sorted(assets):
        status, _, body = request(base + asset)
        if status != 200 or not body: failures.append(f'asset {asset}: HTTP {status}, bytes {len(body)}')

    _, _, sitemap_body = request(base + '/sitemap.xml')
    sitemap_routes = {urllib.parse.urlsplit(node.text or '').path or '/' for node in ET.fromstring(sitemap_body).findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
    expected_sitemap = {route for route, doc in pages.items() if 'noindex' not in doc.robots and route not in {'/thank-you', '/thanks-whats-next'}}
    if sitemap_routes != expected_sitemap:
        failures.append(f'sitemap mismatch missing={sorted(expected_sitemap-sitemap_routes)} extra={sorted(sitemap_routes-expected_sitemap)}')

    status, headers, _ = request(base + '/')
    missing_headers = sorted(SECURITY_HEADERS - set(headers))
    if missing_headers: failures.append(f'missing security headers: {missing_headers}')
    status, _, _ = request(base + '/definitely-not-a-real-customer-success-route')
    if status != 404: failures.append(f'unknown route expected 404, got {status}')

    parsed_base = urllib.parse.urlsplit(base)
    connection = http.client.HTTPConnection(parsed_base.hostname, parsed_base.port, timeout=20)
    connection.request('GET', '/contact-us?source=redirect-check', headers={'Host': f'www.{DOMAIN}', 'X-Forwarded-Host': f'www.{DOMAIN}', 'X-Forwarded-Proto': 'https'})
    redirect = connection.getresponse(); redirect.read(); connection.close()
    if redirect.status != 308 or redirect.getheader('Location') != f'https://{DOMAIN}/contact-us?source=redirect-check':
        failures.append(f'www redirect failed: {redirect.status} {redirect.getheader("Location")}')

    connection = http.client.HTTPConnection(parsed_base.hostname, parsed_base.port, timeout=20)
    connection.request('GET', '/about', headers={'Host': DOMAIN, 'X-Forwarded-Host': DOMAIN, 'X-Forwarded-Proto': 'http'})
    redirect = connection.getresponse(); redirect.read(); connection.close()
    if redirect.status != 308 or redirect.getheader('Location') != f'https://{DOMAIN}/about':
        failures.append(f'http redirect failed: {redirect.status} {redirect.getheader("Location")}')

    connection = http.client.HTTPConnection(parsed_base.hostname, parsed_base.port, timeout=20)
    connection.request('GET', '/about?source=cloudflare', headers={'Host': DOMAIN, 'X-Forwarded-Host': DOMAIN, 'X-Forwarded-Proto': 'https', 'CF-Visitor': '{"scheme":"http"}'})
    redirect = connection.getresponse(); redirect.read(); connection.close()
    if redirect.status != 308 or redirect.getheader('Location') != f'https://{DOMAIN}/about?source=cloudflare':
        failures.append(f'Cloudflare HTTP redirect failed: {redirect.status} {redirect.getheader("Location")}')

    status, _, _ = request(base + '/api/submit-lead', method='POST', headers={'Origin': 'https://invalid.example', 'X-Requested-With': 'customer-success-contact-form', 'Content-Type': 'multipart/form-data; boundary=x'}, data=b'--x--\r\n')
    if status != 403: failures.append(f'lead cross-origin guard expected 403, got {status}')
    wrong_payload = json.dumps({'site_id': 'wrong-site', 'events': [{'event_type': 'pageview', 'timestamp': '2026-01-01T00:00:00Z'}]}).encode()
    status, _, _ = request(base + '/ingest/track', method='POST', headers={'Origin': base, 'Content-Type': 'application/json'}, data=wrong_payload)
    if status != 400: failures.append(f'tracker wrong-site guard expected 400, got {status}')

    result = {'routes': len(routes), 'htmlPages': len(pages), 'internalLinks': len(internal_links), 'assets': len(assets), 'sitemapRoutes': len(sitemap_routes), 'failures': failures}
    print(json.dumps(result, indent=2))
    return 1 if failures else 0

if __name__ == '__main__':
    sys.exit(main())
