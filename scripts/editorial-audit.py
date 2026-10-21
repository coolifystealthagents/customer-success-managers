#!/usr/bin/env python3
import argparse
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from difflib import SequenceMatcher
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = []
        self.in_title = False
        self.description = ''
        self.canonicals = []
        self.h1 = []
        self.in_h1 = False
        self.article_depth = 0
        self.section_ids = []
        self.in_p = False
        self.p_text = []
        self.paragraphs = []
        self.headings = []
        self.in_heading = False
        self.heading_text = []
        self.source_depth = 0
        self.source_links = []
        self.current_href = ''
        self.link_text = []
        self.article_text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title':
            self.in_title = True
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description = attrs.get('content', '').strip()
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href', ''))
        if tag == 'h1':
            self.in_h1 = True
        if tag == 'article' and 'article-prose' in attrs.get('class', '').split():
            self.article_depth += 1
        elif self.article_depth and tag == 'article':
            self.article_depth += 1
        if self.article_depth and tag == 'section':
            self.section_ids.append(attrs.get('id', ''))
            if attrs.get('id') == 'sources':
                self.source_depth = 1
            elif self.source_depth:
                self.source_depth += 1
        if self.article_depth and tag in {'h2', 'h3'}:
            self.in_heading = True
            self.heading_text = []
        if self.source_depth and tag == 'a':
            self.current_href = attrs.get('href', '')
            self.link_text = []
        if self.article_depth and tag == 'p':
            self.in_p = True
            self.p_text = []

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'h1':
            self.in_h1 = False
        if self.article_depth and tag == 'p' and self.in_p:
            text = ' '.join(''.join(self.p_text).split())
            section = self.section_ids[-1] if self.section_ids else ''
            if section and section not in {'common-questions', 'sources'} and len(text) >= 50:
                self.paragraphs.append(text)
            self.in_p = False
        if self.in_heading and tag in {'h2', 'h3'}:
            text = ' '.join(''.join(self.heading_text).split())
            if text:
                self.headings.append(text)
            self.in_heading = False
        if self.source_depth and tag == 'a' and self.current_href:
            self.source_links.append((self.current_href, ' '.join(''.join(self.link_text).split())))
            self.current_href = ''
        if self.article_depth and tag == 'section' and self.section_ids:
            self.section_ids.pop()
            if self.source_depth:
                self.source_depth -= 1
        if self.article_depth and tag == 'article':
            self.article_depth -= 1

    def handle_data(self, data):
        if self.in_title:
            self.title.append(data)
        if self.in_h1:
            self.h1.append(data)
        if self.in_p:
            self.p_text.append(data)
        if self.in_heading:
            self.heading_text.append(data)
        if self.current_href:
            self.link_text.append(data)
        if self.article_depth:
            self.article_text.append(data)


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'CSM editorial release audit'})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode('utf-8', errors='replace')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', required=True)
    parser.add_argument('--workspace', default='.')
    args = parser.parse_args()
    base = args.base.rstrip('/')
    sitemap = ET.fromstring(fetch(base + '/sitemap.xml'))
    sitemap_routes = set()
    for element in sitemap.iter():
        if element.tag.endswith('loc') and element.text:
            path = urlparse(element.text.strip()).path
            if path.startswith('/blog/') or path.startswith('/research/'):
                sitemap_routes.add(path)

    manifest_path = Path(args.workspace) / 'publishing/2026-10-12/manifest.json'
    manifest = json.loads(manifest_path.read_text())
    manifest_routes = {f"/{article['section'].lower()}/{article['slug']}" for article in manifest['articles']}
    routes = sorted(manifest_routes)
    failures = []
    missing_from_sitemap = manifest_routes - sitemap_routes
    if missing_from_sitemap:
        failures.append(f'manifest routes missing from sitemap: {sorted(missing_from_sitemap)}')
    values = {'title': defaultdict(list), 'description': defaultdict(list)}
    paragraph_routes = defaultdict(set)
    all_paragraphs = []
    blog_architectures = defaultdict(list)
    for route in sorted(routes):
        parsed = PageParser()
        parsed.feed(fetch(base + route))
        title = ' '.join(''.join(parsed.title).split())
        h1 = ' '.join(''.join(parsed.h1).split())
        if not title or not parsed.description or len(parsed.canonicals) != 1 or not h1:
            failures.append(f'{route}: incomplete title, description, canonical, or H1')
        if len(parsed.paragraphs) < 5:
            failures.append(f'{route}: only {len(parsed.paragraphs)} substantive article paragraphs')
        article_text = ' '.join(''.join(parsed.article_text).lower().split())
        if 'chat support' in article_text:
            failures.append(f'{route}: stale chat-support terminology')
        source_urls = [url for url, _ in parsed.source_links]
        if not source_urls:
            failures.append(f'{route}: no contextual source')
        if len(source_urls) != len(set(source_urls)):
            failures.append(f'{route}: duplicate source URL')
        if route.startswith('/research/'):
            if 'proposed review protocol' not in article_text:
                failures.append(f'{route}: research is not labeled as a proposed review protocol')
            for _, label in parsed.source_links:
                if not any(marker in label.lower() for marker in ('informs', 'contextual example')):
                    failures.append(f'{route}: source lacks a method/control context: {label}')
        if route.startswith('/blog/'):
            excluded = {'Common questions', 'Sources and context'}
            architecture = tuple(heading for heading in parsed.headings if heading not in excluded)
            blog_architectures[architecture].append(route)
        values['title'][title].append(route)
        values['description'][parsed.description].append(route)
        for paragraph in parsed.paragraphs:
            normalized = re.sub(r'\s+', ' ', paragraph.lower()).strip()
            paragraph_routes[normalized].add(route)
            all_paragraphs.append((route, normalized))

    for architecture, grouped_routes in blog_architectures.items():
        if len(grouped_routes) > 1:
            failures.append(f'duplicate blog heading architecture: {grouped_routes}: {architecture}')
    for field, grouped in values.items():
        for value, grouped_routes in grouped.items():
            if value and len(grouped_routes) > 1:
                failures.append(f'duplicate {field}: {grouped_routes}')
    for paragraph, grouped_routes in paragraph_routes.items():
        if len(grouped_routes) > 1:
            failures.append(f'exact repeated substantive paragraph on {sorted(grouped_routes)}: {paragraph[:120]}')

    near = []
    for index, (route_a, text_a) in enumerate(all_paragraphs):
        for route_b, text_b in all_paragraphs[index + 1:]:
            if route_a == route_b or abs(len(text_a) - len(text_b)) > max(len(text_a), len(text_b)) * .25:
                continue
            score = SequenceMatcher(None, text_a, text_b, autojunk=False).ratio()
            if score >= .96:
                near.append((round(score, 3), route_a, route_b, text_a[:90], text_b[:90]))
    if near:
        failures.extend(f'near-duplicate {item}' for item in near[:20])

    actual_counts = {
        'blog': sum(route.startswith('/blog/') for route in manifest_routes),
        'research': sum(route.startswith('/research/') for route in manifest_routes),
        'total': len(manifest_routes),
    }
    for key, value in actual_counts.items():
        if manifest['counts'].get(key) != value:
            failures.append(f'manifest count {key}={manifest["counts"].get(key)}; expected {value}')

    print({'routes': len(routes), 'blog': sum('/blog/' in route for route in routes), 'research': sum('/research/' in route for route in routes), 'unique_blog_architectures': len(blog_architectures), 'manifest_articles': len(manifest_routes), 'substantive_paragraphs': len(all_paragraphs), 'exact_duplicate_groups': sum(len(v) > 1 for v in paragraph_routes.values()), 'near_duplicates': len(near), 'failures': failures})
    return 1 if failures else 0


if __name__ == '__main__':
    sys.exit(main())
