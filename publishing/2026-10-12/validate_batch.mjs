import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const manifest = JSON.parse(read('publishing/2026-10-12/manifest.json'));
const content = read('lib/content.ts');
const enrichment = read('lib/editorial-enrichment.ts');
const blogRoute = read('app/blog/[slug]/page.tsx');
const researchRoute = read('app/research/[slug]/page.tsx');
const article = read('components/EditorialArticle.tsx');

const blogs = manifest.articles.filter((entry) => entry.section === 'Blog');
const research = manifest.articles.filter((entry) => entry.section === 'Research');
const thumbnails = manifest.articles.filter((entry) => typeof entry.thumbnailPath === 'string');

check(manifest.site === 'CustomerSuccessManagers.com', 'wrong manifest site');
check(manifest.repository === 'coolifystealthagents/customer-success-managers' && manifest.branch === 'main', 'wrong repository or branch');
check(blogs.length === 17 && research.length === 25 && manifest.articles.length === 42, `derived manifest counts are ${blogs.length} Blog/${research.length} Research/${manifest.articles.length} total`);
check(manifest.counts.blog === blogs.length && manifest.counts.research === research.length && manifest.counts.total === manifest.articles.length && manifest.counts.thumbnails === thumbnails.length, 'declared manifest counts do not equal derived counts');
check(new Set(manifest.articles.map((entry) => entry.slug)).size === manifest.articles.length, 'duplicate manifest slugs');
check(new Set(manifest.articles.map((entry) => entry.title)).size === manifest.articles.length, 'duplicate manifest titles');
check(manifest.articles.every((entry) => ['Blog', 'Research'].includes(entry.section)), 'invalid manifest section');
check(manifest.registryPaths.every((path) => existsSync(resolve(root, path))), 'declared registry path missing');
check(manifest.routePaths.every((path) => existsSync(resolve(root, path))), 'declared route path missing');
check(manifest.indexPaths.every((path) => existsSync(resolve(root, path))), 'declared index path missing');

for (const entry of manifest.articles) {
  check(typeof entry.slug === 'string' && typeof entry.title === 'string', 'manifest article lacks slug/title');
  check(existsSync(resolve(root, entry.sourcePath)), `${entry.slug}: source path missing`);
  check(existsSync(resolve(root, entry.registryPath)), `${entry.slug}: registry path missing`);
  if (!existsSync(resolve(root, entry.sourcePath))) continue;
  const source = read(entry.sourcePath);
  check(source.includes(`"slug": ${JSON.stringify(entry.slug)}`), `${entry.slug}: slug missing from declared source`);
  check(source.includes(`"title": ${JSON.stringify(entry.title)}`), `${entry.slug}: title missing from declared source`);
  check(entry.registryPath === 'lib/content.ts', `${entry.slug}: unexpected registry path`);
}

check(content.includes('...october12BlogPosts') && content.includes('...october12ResearchPosts'), 'October registries are not wired');
check(content.includes('rawBlogPosts') && content.includes('rawResearchPosts') && content.includes('.map(enrichBlogPost)') && content.includes('.map(enrichResearchPost)'), 'registry/enrichment wiring missing');
check(blogRoute.includes('EditorialArticle') && blogRoute.includes('relatedArticles={related}'), 'Blog article presentation missing');
check(researchRoute.includes('EditorialArticle') && researchRoute.includes('researchPresentation(post)') && researchRoute.includes('relatedArticles={related}'), 'Research article presentation missing');
check(article.includes('ArticleToc') && article.includes('Sources and context') && article.includes('Continue reading') && article.includes('props.relatedArticles.map'), 'shared article TOC/source/related presentation missing');

const legacyPattern = /^(.*?)-(workflow-boundary-review|source-quality-audit|exception-pattern-study|handoff-reliability-brief|review-consistency-report)-\d+$/;
for (const entry of research) {
  const match = entry.slug.match(legacyPattern);
  if (entry.sourcePath === 'lib/october-12/researchPosts.ts') {
    check(enrichment.includes(`'${entry.slug}': {`), `${entry.slug}: October proposed protocol is not explicitly mapped`);
  } else {
    check(Boolean(match), `${entry.slug}: legacy proposed protocol slug cannot resolve`);
    if (match) {
      const domain = match[1].replaceAll('-', ' ');
      check(enrichment.includes(`'${domain}':`), `${entry.slug}: legacy protocol domain is not mapped`);
      check(enrichment.includes(`'${match[2]}':`), `${entry.slug}: legacy protocol focus is not mapped`);
    }
  }
}
check(enrichment.includes("label: 'Proposed review protocol'") && enrichment.includes('reports no completed study or customer outcome'), 'proposed-protocol fallback or disclaimer missing');
check(enrichment.includes('const lens = octoberProtocols[post.slug] ?? legacy?.lens') && enrichment.includes('summary: presentation.takeaway') && enrichment.includes('finding: presentation.takeaway'), 'research presentation is not applied to every registry record');
check(enrichment.includes('It does not report an observed agreement rate.') && enrichment.includes('It does not claim that milestone completeness has been measured.') && enrichment.includes('It does not report a freshness rate or renewal outcome.') && enrichment.includes('It reports no closure rate.') && enrichment.includes('It does not report coding reliability.'), 'one or more October protocols lacks an explicit no-results statement');

const declaredThumbnailNames = thumbnails.map((entry) => entry.thumbnailPath.replace('public/october-12/', '')).sort();
const actualThumbnailNames = readdirSync(resolve(root, 'public/october-12')).filter((name) => name.endsWith('.webp')).sort();
check(thumbnails.length === 17, `expected 17 declared thumbnails, found ${thumbnails.length}`);
check(JSON.stringify(declaredThumbnailNames) === JSON.stringify(actualThumbnailNames), 'declared thumbnail set does not exactly match public/october-12');
check(thumbnails.every((entry) => existsSync(resolve(root, entry.thumbnailPath))), 'declared thumbnail is absent on disk');
check(thumbnails.every((entry) => entry.thumbnailPath === `public/october-12/${entry.slug}.webp`), 'thumbnail slug/path mapping mismatch');
const hashes = actualThumbnailNames.map((name) => createHash('sha256').update(readFileSync(resolve(root, 'public/october-12', name))).digest('hex'));
check(new Set(hashes).size === actualThumbnailNames.length, 'October thumbnails are not unique');
const generator = read('publishing/2026-10-12/generate_thumbnails.py');
check(generator.includes("if 'thumbnailPath' in article") && generator.includes('(1200,630)'), 'thumbnail generator is not restricted to declared thumbnails at 1200x630');

if (errors.length) {
  console.error(`Validation failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('PASS: derived 17 Blog/25 Research manifest records match declared sources and registries; all 25 research routes resolve to proposed protocols; the exact 17-file thumbnail set is present and unique.');
