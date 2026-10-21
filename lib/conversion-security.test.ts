import test from 'node:test';
import assert from 'node:assert/strict';
import { deliverLead } from './lead-delivery.ts';
import { emitAcceptedLeadEvent, isValidBrowserTrackingPayload, sanitizeBrowserTrackingPayload, trackingEndpoint, TRACKING_API } from './lead-tracking.ts';
import { isAllowedBrowserOrigin } from './request-origin.ts';
import { claimSubmission, markSubmission, releaseFailedSubmission } from './lead-idempotency.ts';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const mutableEnv = process.env as Record<string, string | undefined>;

const lead = {
  submissionId: '123e4567-e89b-42d3-a456-426614174000',
  name: 'Test Release', email: 'release@example.org', phone: '+1 555 010 0200',
  business: 'Release Verification', website: 'https://example.org', message: 'A bounded workflow description.',
  companySize: '11 to 50', positions: '2 to 3', referral: 'Search engine',
  source: 'contact-page-consultation', pageUrl: 'https://customersuccessmanagers.com/contact-us', userAgent: 'test',
};

function event(eventType = 'pageview', metadata: Record<string, unknown> = { tracker_version: '0.4.19', language: 'en-US' }) {
  const funnel = eventType === 'funnel_form_page'
    ? { funnel_step: 1, funnel_label: 'Form Page', funnel_path: '/contact-us' }
    : eventType === 'funnel_form_submitted'
      ? { funnel_step: 2, funnel_label: 'Form Submitted', funnel_path: '/thank-you' }
      : {};
  const path = eventType === 'funnel_form_submitted' ? '/thank-you' : '/contact-us';
  return {
    client_event_id: crypto.randomUUID(), event_type: eventType, timestamp: new Date().toISOString(),
    page_path: path, page_url: `https://customersuccessmanagers.com${path}?private=discard`,
    page_title: 'Mutable page title', referrer: 'https://private.example/path', utm_campaign: 'discard-me',
    screen_width: 1440, screen_height: 800, scroll_depth: eventType === 'scroll_depth' ? 50 : 0,
    event_value: eventType === 'scroll_depth' ? '50%' : eventType === 'cwv' ? '123.4' : funnel.funnel_step ? `step_${funnel.funnel_step}` : '',
    event_metadata: JSON.stringify({ ...metadata, ...funnel }),
  };
}

test('origin policy is fixed and local access is explicitly gated outside production', () => {
  const previous = process.env.ALLOW_LOCAL_ORIGINS;
  const previousNodeEnv = mutableEnv.NODE_ENV;
  delete process.env.ALLOW_LOCAL_ORIGINS;
  const request = (origin: string, forwarded = 'customersuccessmanagers.com') => new Request('https://internal/ingest', { headers: { origin, 'x-forwarded-host': forwarded } });
  assert.equal(isAllowedBrowserOrigin(request('https://customersuccessmanagers.com', 'attacker.example')), true);
  assert.equal(isAllowedBrowserOrigin(request('https://attacker.example', 'customersuccessmanagers.com')), false);
  assert.equal(isAllowedBrowserOrigin(request('http://localhost:3000')), false);
  process.env.ALLOW_LOCAL_ORIGINS = '1';
  mutableEnv.NODE_ENV = 'development';
  assert.equal(isAllowedBrowserOrigin(request('http://localhost:3000')), true);
  assert.equal(isAllowedBrowserOrigin(request('https://localhost:3000')), false);
  mutableEnv.NODE_ENV = 'production';
  assert.equal(isAllowedBrowserOrigin(request('http://localhost:3000')), false);
  if (previous === undefined) delete process.env.ALLOW_LOCAL_ORIGINS; else process.env.ALLOW_LOCAL_ORIGINS = previous;
  if (previousNodeEnv === undefined) delete mutableEnv.NODE_ENV; else mutableEnv.NODE_ENV = previousNodeEnv;
});

test('browser tracking is a fixed CSM schema that strips mutable text and blocks lead or arbitrary events', () => {
  for (const name of ['pageview', 'scroll_depth', 'cta_click', 'cta_view', 'funnel_form_page', 'funnel_form_submitted']) {
    const payload = { site_id: 'customer-success-managers', events: [event(name)] };
    assert.equal(isValidBrowserTrackingPayload(payload), true, name);
    const serialized = JSON.stringify(sanitizeBrowserTrackingPayload(payload));
    for (const forbidden of ['private=discard', 'Mutable page title', 'private.example', 'discard-me']) assert.equal(serialized.includes(forbidden), false, `${name}: ${forbidden}`);
  }
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event('cwv', { tracker_version: '0.4.19', metric_name: 'LCP', metric_value: 123.4 })] }), true);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event('funnel_booking_confirmed')] }), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event('lead_submit')] }), false);
  const sanitized = sanitizeBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event('pageview', { message: 'free text', tracker_version: '0.4.19' })] });
  assert.ok(sanitized);
  assert.equal(JSON.stringify(sanitized).includes('free text'), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [{ ...event(), surprise: 'field' }] }), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [{ ...event(), page_path: '/alice@example.com' }] }), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [{ ...event(), page_path: '/blog/alice-smith-private-medical-condition' }] }), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [{ ...event(), timestamp: 'Wed, 09 Feb 1994 22:23:32 GMT (Alice Doe)' }] }), false);
});

test('filesystem claim is atomic across workers and preserves delivered replay/conflict state', async () => {
  const previousRoot = process.env.TEST_LEAD_IDEMPOTENCY_DIR;
  const previousLocal = process.env.ALLOW_LOCAL_ORIGINS;
  const root = await mkdtemp(join(tmpdir(), 'csm-idempotency-'));
  process.env.ALLOW_LOCAL_ORIGINS = '1'; process.env.TEST_LEAD_IDEMPOTENCY_DIR = root;
  const id = crypto.randomUUID(), fingerprint = 'a'.repeat(64);
  try {
    const claims = await Promise.all([claimSubmission(id, fingerprint), claimSubmission(id, fingerprint)]);
    assert.equal(claims.filter((claim) => claim.kind === 'claimed').length, 1);
    assert.equal(claims.filter((claim) => claim.kind === 'in_flight').length, 1);
    await markSubmission(id, fingerprint, 'delivered');
    assert.equal((await claimSubmission(id, fingerprint)).kind, 'delivered');
    assert.equal((await claimSubmission(id, 'b'.repeat(64))).kind, 'conflict');
    const retryId = crypto.randomUUID();
    assert.equal((await claimSubmission(retryId, fingerprint)).kind, 'claimed');
    await releaseFailedSubmission(retryId, fingerprint);
    assert.equal((await claimSubmission(retryId, fingerprint)).kind, 'claimed');
  } finally {
    await rm(root, { recursive: true, force: true });
    if (previousRoot === undefined) delete process.env.TEST_LEAD_IDEMPOTENCY_DIR; else process.env.TEST_LEAD_IDEMPOTENCY_DIR = previousRoot;
    if (previousLocal === undefined) delete process.env.ALLOW_LOCAL_ORIGINS; else process.env.ALLOW_LOCAL_ORIGINS = previousLocal;
  }
});

test('lead delivery uses ACR first and does not invoke fallback after a 2xx', async () => {
  const previousAcr = process.env.ACR_LEAD_ENDPOINT;
  const previousMattermost = process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL;
  process.env.ACR_LEAD_ENDPOINT = 'https://lead.example.test/submit';
  process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL = 'https://mattermost.example.test/hook';
  const calls: string[] = [];
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async (input) => { calls.push(String(input)); return new Response(null, { status: 204 }); };
  try {
    assert.deepEqual(await deliverLead(lead), { outcome: 'delivered', channel: 'acr' });
    assert.deepEqual(calls, ['https://lead.example.test/submit']);
  } finally {
    globalThis.fetch = oldFetch;
    if (previousAcr === undefined) delete process.env.ACR_LEAD_ENDPOINT; else process.env.ACR_LEAD_ENDPOINT = previousAcr;
    if (previousMattermost === undefined) delete process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL; else process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL = previousMattermost;
  }
});

test('uncertain ACR acknowledgement does not fan out to fallback', async () => {
  const previousAcr = process.env.ACR_LEAD_ENDPOINT;
  const previousMattermost = process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL;
  process.env.ACR_LEAD_ENDPOINT = 'https://lead.example.test/submit';
  process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL = 'https://mattermost.example.test/hook';
  const calls: string[] = [];
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async (input) => { calls.push(String(input)); throw new Error('acknowledgement lost'); };
  try {
    assert.deepEqual(await deliverLead(lead), { outcome: 'uncertain' });
    assert.deepEqual(calls, ['https://lead.example.test/submit']);
  } finally {
    globalThis.fetch = oldFetch;
    if (previousAcr === undefined) delete process.env.ACR_LEAD_ENDPOINT; else process.env.ACR_LEAD_ENDPOINT = previousAcr;
    if (previousMattermost === undefined) delete process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL; else process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL = previousMattermost;
  }
});

test('non-2xx ACR delivery falls back to Mattermost and only its 2xx is success', async () => {
  const previousAcr = process.env.ACR_LEAD_ENDPOINT;
  const previousMattermost = process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL;
  process.env.ACR_LEAD_ENDPOINT = 'https://lead.example.test/submit';
  process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL = 'https://mattermost.example.test/hook';
  const calls: string[] = [];
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    calls.push(String(input));
    return new Response('', { status: calls.length === 1 ? 500 : 200 });
  };
  try {
    assert.deepEqual(await deliverLead(lead), { outcome: 'delivered', channel: 'mattermost' });
    assert.deepEqual(calls, ['https://lead.example.test/submit', 'https://mattermost.example.test/hook']);
    globalThis.fetch = async () => new Response('', { status: 500 });
    assert.deepEqual(await deliverLead(lead), { outcome: 'rejected' });
  } finally {
    globalThis.fetch = oldFetch;
    if (previousAcr === undefined) delete process.env.ACR_LEAD_ENDPOINT; else process.env.ACR_LEAD_ENDPOINT = previousAcr;
    if (previousMattermost === undefined) delete process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL; else process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL = previousMattermost;
  }
});

test('server accepted-lead analytics uses one PII-free event at the established endpoint', async () => {
  const oldFetch = globalThis.fetch;
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (input, init) => {
    calls.push({ url: String(input), body: JSON.parse(String(init?.body)) });
    return new Response('{"status":"accepted"}', { status: 200 });
  };
  try {
    assert.equal(await emitAcceptedLeadEvent({ submissionId: lead.submissionId, source: lead.source, channel: 'acr' }), true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, TRACKING_API);
    const serialized = JSON.stringify(calls[0].body);
    assert.match(serialized, /lead_submit/);
    for (const forbidden of [lead.name, lead.email, lead.phone, lead.message]) assert.equal(serialized.includes(forbidden), false);
  } finally { globalThis.fetch = oldFetch; }
});

test('tracking endpoint override is ignored outside explicit local testing', async () => {
  const oldFetch = globalThis.fetch;
  const previousEndpoint = process.env.TEST_ACR_TRACKING_ENDPOINT;
  const previousLocal = process.env.ALLOW_LOCAL_ORIGINS;
  process.env.TEST_ACR_TRACKING_ENDPOINT = 'http://127.0.0.1:4420/track';
  delete process.env.ALLOW_LOCAL_ORIGINS;
  let seen = '';
  globalThis.fetch = async (input) => { seen = String(input); return new Response('{}', { status: 200 }); };
  try {
    await emitAcceptedLeadEvent({ submissionId: lead.submissionId, source: lead.source, channel: 'acr' });
    assert.equal(seen, TRACKING_API);
  } finally {
    globalThis.fetch = oldFetch;
    if (previousEndpoint === undefined) delete process.env.TEST_ACR_TRACKING_ENDPOINT; else process.env.TEST_ACR_TRACKING_ENDPOINT = previousEndpoint;
    if (previousLocal === undefined) delete process.env.ALLOW_LOCAL_ORIGINS; else process.env.ALLOW_LOCAL_ORIGINS = previousLocal;
  }
});

test('tracking endpoint override resolves only to loopback in non-production local testing', () => {
  const previousEndpoint = process.env.TEST_ACR_TRACKING_ENDPOINT;
  const previousLocal = process.env.ALLOW_LOCAL_ORIGINS;
  const previousNodeEnv = mutableEnv.NODE_ENV;
  try {
    mutableEnv.NODE_ENV = 'development';
    process.env.ALLOW_LOCAL_ORIGINS = '1';
    process.env.TEST_ACR_TRACKING_ENDPOINT = 'http://127.0.0.1:4420/track';
    assert.equal(trackingEndpoint(), 'http://127.0.0.1:4420/track');
    process.env.TEST_ACR_TRACKING_ENDPOINT = 'https://evil.example/track';
    assert.equal(trackingEndpoint(), TRACKING_API);
    process.env.TEST_ACR_TRACKING_ENDPOINT = 'http://127.0.0.1:4420/track';
    mutableEnv.NODE_ENV = 'production';
    assert.equal(trackingEndpoint(), TRACKING_API);
  } finally {
    if (previousEndpoint === undefined) delete process.env.TEST_ACR_TRACKING_ENDPOINT; else process.env.TEST_ACR_TRACKING_ENDPOINT = previousEndpoint;
    if (previousLocal === undefined) delete process.env.ALLOW_LOCAL_ORIGINS; else process.env.ALLOW_LOCAL_ORIGINS = previousLocal;
    if (previousNodeEnv === undefined) delete mutableEnv.NODE_ENV; else mutableEnv.NODE_ENV = previousNodeEnv;
  }
});
