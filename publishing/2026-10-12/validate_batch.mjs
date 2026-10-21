import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const manifest = JSON.parse(read('publishing/2026-10-12/manifest.json'));
const blogSource = read('lib/october-12/blogPosts.ts');
const researchSource = read('lib/october-12/researchPosts.ts');
const content = read('lib/content.ts');
const enrichment = read('lib/editorial-enrichment.ts');
const blogRoute = read('app/blog/[slug]/page.tsx');
const researchRoute = read('app/research/[slug]/page.tsx');
const article = read('components/EditorialArticle.tsx');

check(manifest.site === 'CustomerSuccessManagers.com', 'wrong manifest site');
check(manifest.counts.blog === 17 && manifest.counts.research === 25 && manifest.counts.total === 42, 'manifest count mismatch');
check(manifest.articles.length === 42, `expected 42 manifest articles, found ${manifest.articles.length}`);
check(new Set(manifest.articles.map((entry) => entry.slug)).size === 42, 'duplicate manifest slugs');
check(new Set(manifest.articles.map((entry) => entry.title)).size === 42, 'duplicate manifest titles');
check(manifest.articles.every((entry) => ['Blog', 'Research'].includes(entry.section)), 'invalid manifest section');
check(manifest.articles.every((entry) => existsSync(resolve(root, entry.sourcePath))), 'manifest source path missing');
check(manifest.articles.filter((entry) => entry.thumbnailPath).every((entry) => existsSync(resolve(root, entry.thumbnailPath))), 'manifest thumbnail missing');

check(content.includes('...october12BlogPosts') && content.includes('...october12ResearchPosts'), 'October registries are not wired');
check(content.includes('rawBlogPosts') && content.includes('rawResearchPosts') && content.includes('.map(enrichBlogPost)') && content.includes('.map(enrichResearchPost)'), 'registry/enrichment wiring missing');
check(blogRoute.includes('EditorialArticle') && blogRoute.includes('relatedArticles={related}'), 'Blog article presentation missing');
check(researchRoute.includes('EditorialArticle') && researchRoute.includes('researchPresentation(post)') && researchRoute.includes('relatedArticles={related}'), 'Research article presentation missing');
check(article.includes('ArticleToc') && article.includes('Sources and context') && article.includes('Continue reading') && article.includes('props.relatedArticles.map'), 'shared article TOC/source/related presentation missing');
check(enrichment.includes("label: 'Proposed review protocol'") && enrichment.includes('It does not report an observed agreement rate.'), 'research proposed-protocol disclaimer missing');
check(enrichment.includes('const blogBriefs: Record<string, BlogBrief>') && enrichment.includes('export function enrichBlogPost'), 'blog enrichment coverage is missing');
check(enrichment.includes('const focusLenses: Record<string') && enrichment.includes('const octoberProtocols: Record<string, ResearchLens>') && enrichment.includes('legacyProtocol(post.slug)'), 'research enrichment coverage is missing');

const images = readdirSync(resolve(root, 'public/october-12')).filter((name) => name.endsWith('.webp'));
check(images.length === 17, `expected 17 October thumbnails, found ${images.length}`);
const hashes = images.map((name) => createHash('sha256').update(readFileSync(resolve(root, 'public/october-12', name))).digest('hex'));
check(new Set(hashes).size === 17, 'October thumbnails are not unique');
check(/\(1200,630\)/.test(read('publishing/2026-10-12/generate_thumbnails.py')), 'thumbnail dimensions missing');
check(blogSource.includes('october12BlogPosts') && researchSource.includes('october12ResearchPosts'), 'October source exports missing');

if (errors.length) {
  console.error(`Validation failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('PASS: 42-article CSM manifest, registries, truthful research presentation, related/source UI, and 17 unique thumbnails validated.');
