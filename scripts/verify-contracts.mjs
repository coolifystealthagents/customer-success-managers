import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const check = (condition, message) => { if (!condition) throw new Error(message); };

const content = read('lib/content.ts');
const navBlock = content.match(/export const nav = \[([\s\S]*?)\];/)?.[1] || '';
const nav = [...navBlock.matchAll(/\{ href: '([^']+)', label: '([^']+)' \}/g)].map((m) => [m[1], m[2]]);
check(JSON.stringify(nav) === JSON.stringify([['/', 'Home'], ['/services', 'Services'], ['/contact-us', 'Contact Us']]), 'Primary navigation contract changed');

const shell = read('components/SiteChrome.tsx');
check((shell.match(/<Attribution/g) || []).length === 2, 'Header and footer attribution are required');
check(shell.includes('Skip to main content'), 'Skip link missing');
check(!/TimedLeadModal|setTimeout\(/.test(shell + read('app/layout.tsx')), 'Timed modal returned');

const appFiles = [];
function collect(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(rel);
    else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) appFiles.push(rel);
  }
}
collect('app');
const schedulerFiles = appFiles.filter((file) => /<iframe[^>]+(?:oncehub|scheduleonce)|go\.oncehub\.com/i.test(read(file)));
check(JSON.stringify(schedulerFiles) === JSON.stringify(['app/thank-you/page.tsx']), `OnceHub must exist only on thank-you; found ${schedulerFiles.join(', ')}`);
const thanks = read('app/thank-you/page.tsx');
check(thanks.includes('href={bookingUrl}') && thanks.includes('src={bookingUrl}'), 'OnceHub fallback and iframe must share a destination');
check(thanks.indexOf('href={bookingUrl}') < thanks.indexOf('src={bookingUrl}'), 'Fallback link must precede scheduler iframe');

const form = read('components/LeadForm.tsx');
const fields = [...form.matchAll(/name="([^"]+)"/g)].map((m) => m[1]);
const expected = ['first_name','last_name','email','phone_country','phone','company','company_website','company_size','positions_to_fill','referral_source','message','source','website_url'];
check(JSON.stringify(fields) === JSON.stringify(expected), 'Lead field names or order changed');
check(!form.includes('trackLead(') && !form.includes('tracker.flush()'), 'Browser must not own accepted-lead analytics');
check(form.includes('type="button"') && !form.includes('onSubmit={submit}'), 'Native submit scanner avoidance changed');
check(form.includes("result.status !== 'delivered'"), 'Confirmed-delivery acknowledgement contract missing');
check(form.includes("data.set('submission_id'"), 'Stable submission identifier missing');

const leadApi = read('app/api/submit-lead/route.ts');
check(leadApi.includes("x-requested-with") && leadApi.includes('isAllowedBrowserOrigin'), 'Lead request guards missing');
check(leadApi.includes('fingerprint') && leadApi.includes(', 409)'), 'Conflicting idempotency-key reuse must be rejected');
check(leadApi.includes("status: 'delivered'"), 'Lead API must return delivered status');
check(leadApi.includes('deliverLead') && leadApi.includes('emitAcceptedLeadEvent'), 'Server-owned delivery and accepted analytics are required');
const delivery = read('lib/lead-delivery.ts');
check(delivery.includes('ACR_LEAD_ENDPOINT') && delivery.includes('sendLeadFallbackToMattermost'), 'Established primary and fallback delivery paths are required');
const tracking = read('lib/lead-tracking.ts');
const trackingRoutes = read('lib/tracking-routes.ts');
check((trackingRoutes.match(/^  "\//gm) || []).length === 58 && trackingRoutes.includes('customer-onboarding-support') && trackingRoutes.includes('voice-of-customer-coding-reliability-study'), 'Analytics route allowlist must cover exactly the 58 published and controlled-journey pages');
check(!tracking.includes('CONTENT_PATH') && tracking.includes('TRACKABLE_PATHS.has'), 'Analytics paths must use an exact allowlist, not a free-form slug pattern');
check(tracking.includes("event_type: 'lead_submit'") && !tracking.includes('lead.message'), 'Accepted-lead analytics must be server owned and free-text free');

const trackerConfig = read('public/acr-config.js');
check(trackerConfig.includes("siteId: 'customer-success-managers'"), 'ACR site ID changed');
check(trackerConfig.includes("endpoint: '/ingest/track'"), 'ACR endpoint changed');
check(!trackerConfig.includes('thanks-whats-next'), 'Preparation route cannot be classified as confirmed booking');
const proxy = read('app/ingest/track/route.ts');
check(proxy.includes('sanitizeBrowserTrackingPayload') && proxy.includes('trackingEndpoint()') && tracking.includes('MAX_EVENTS = 50') && tracking.includes('EXACT_BROWSER_EVENTS') && tracking.includes('sanitizeMetadata'), 'ACR proxy sanitization or guarded transport missing');

const reviews = JSON.parse(read('app/data/review-provenance.json'));
check(reviews.records.length === 10 && reviews.source && reviews.verifiedOn, 'Ten sourced reviews are required');
check((read('lib/site.ts').match(/slug\s*:\s*'/g) || []).length === 6, 'Exactly six services are required');

const redirect = read('proxy.ts');
check(redirect.includes("const apex = 'customersuccessmanagers.com'"), 'Canonical apex changed');
check(redirect.includes("request.headers.get('cf-visitor')"), 'Cloudflare scheme handling missing');
check(redirect.includes("new URL(`https://${apex}`)"), 'Redirect destination must be fixed');

const config = read('next.config.mjs');
for (const marker of ['Content-Security-Policy','Strict-Transport-Security','X-Content-Type-Options','Referrer-Policy','Permissions-Policy']) check(config.includes(marker), `${marker} missing`);
const layout = read('app/layout.tsx');
check(layout.includes('/acr-config.js') && layout.includes('acrtracking.stealthagents.us/v1/tracker.js'), 'ACR scripts missing');
check(layout.includes('sha384-xngnWvZA3ij7/lg0Hj+D3XolZQoG8dmy71mCBPy4o/cN7GsuYiWDGOUul+ocJ0/+') && layout.includes('crossOrigin="anonymous"'), 'Hosted tracker must be SRI pinned');
const trackerFixture = fs.readFileSync(path.join(root, 'scripts/fixtures/acr-tracker-v0.4.19.js'));
const fixtureSri = `sha384-${crypto.createHash('sha384').update(trackerFixture).digest('base64')}`;
check(fixtureSri === 'sha384-xngnWvZA3ij7/lg0Hj+D3XolZQoG8dmy71mCBPy4o/cN7GsuYiWDGOUul+ocJ0/+' && layout.includes(fixtureSri), 'Tracker fixture and layout SRI must remain identical');

const editorial = read('lib/editorial-enrichment.ts');
const blogBriefBlock = editorial.match(/const blogBriefs:[\s\S]*?= \{([\s\S]*?)\n\};\n\nfunction sectionsFromBrief/)?.[1] || '';
check((blogBriefBlock.match(/^  '[^']+': \{/gm) || []).length === 17, 'Every exported blog needs one curated editorial brief');
check(!editorial.includes('trace the conclusion back to ${source}'), 'Contextual citations cannot be presented as customer-case evidence');
check(!read('app/research/[slug]/page.tsx').includes('Findings and operational implications'), 'Unexecuted protocols cannot be presented as completed findings');
check(editorial.includes("label: 'Proposed review protocol'"), 'Research protocol disclosure missing');
check(!editorial.includes('cisa.gov/resources-tools/resources/incident-response-plan-basics'), 'Dead CISA source returned');
for (const slug of ['escalation-recovery-brief', 'customer-escalation-record']) {
  const block = editorial.match(new RegExp(`'${slug}': \\{([\\s\\S]*?)\\n  \\},`))?.[1] || '';
  check(block.includes("service: '/services/escalation-coordination'"), `${slug} must map to escalation coordination`);
}

console.log(JSON.stringify({ status: 'passed', services: 6, reviews: 10, retainedLeadFields: expected.length, onceHubRoute: schedulerFiles[0] }));
