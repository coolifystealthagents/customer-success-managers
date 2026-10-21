import test from 'node:test';
import assert from 'node:assert/strict';
import { deliverLead } from './lead-delivery.ts';
import { emitAcceptedLeadEvent, isValidBrowserTrackingPayload, TRACKING_API } from './lead-tracking.ts';
import { isAllowedBrowserOrigin } from './request-origin.ts';

const lead = {
  submissionId: '123e4567-e89b-42d3-a456-426614174000',
  name: 'Test Release', email: 'release@example.org', phone: '+1 555 010 0200',
  business: 'Release Verification', website: 'https://example.org', message: 'A bounded workflow description.',
  companySize: '11 to 50', positions: '2 to 3', referral: 'Search engine',
  source: 'contact-page-consultation', pageUrl: 'https://customersuccessmanagers.com/contact-us', userAgent: 'test',
};

function event(eventType = 'pageview', metadata: Record<string, unknown> = { tracker_version: '0.4.19', language: 'en-US' }) {
  return { event_type: eventType, timestamp: new Date().toISOString(), event_metadata: JSON.stringify(metadata) };
}

test('origin policy is fixed and local access is explicitly gated', () => {
  const previous = process.env.ALLOW_LOCAL_ORIGINS;
  delete process.env.ALLOW_LOCAL_ORIGINS;
  const request = (origin: string, forwarded = 'customersuccessmanagers.com') => new Request('https://internal/ingest', { headers: { origin, 'x-forwarded-host': forwarded } });
  assert.equal(isAllowedBrowserOrigin(request('https://customersuccessmanagers.com', 'attacker.example')), true);
  assert.equal(isAllowedBrowserOrigin(request('https://attacker.example', 'customersuccessmanagers.com')), false);
  assert.equal(isAllowedBrowserOrigin(request('http://localhost:3000')), false);
  process.env.ALLOW_LOCAL_ORIGINS = '1';
  assert.equal(isAllowedBrowserOrigin(request('http://localhost:3000')), true);
  assert.equal(isAllowedBrowserOrigin(request('https://localhost:3000')), false);
  if (previous === undefined) delete process.env.ALLOW_LOCAL_ORIGINS; else process.env.ALLOW_LOCAL_ORIGINS = previous;
});

test('browser tracking policy accepts normal tracker events and blocks leads, PII, and arbitrary shapes', () => {
  for (const name of ['pageview', 'scroll_depth', 'cwv', 'cta_click', 'cta_view', 'funnel_form_page', 'funnel_booking_confirmed']) {
    assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event(name)] }), true, name);
  }
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event('lead_submit')] }), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event('pageview', { lead_email: 'private@example.org' })] }), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [event('pageview', { message: 'free text' })] }), false);
  assert.equal(isValidBrowserTrackingPayload({ site_id: 'customer-success-managers', events: [{ ...event(), surprise: 'field' }] }), false);
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
    assert.deepEqual(await deliverLead(lead), { delivered: true, channel: 'acr' });
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
    assert.deepEqual(await deliverLead(lead), { delivered: true, channel: 'mattermost' });
    assert.deepEqual(calls, ['https://lead.example.test/submit', 'https://mattermost.example.test/hook']);
    globalThis.fetch = async () => new Response('', { status: 500 });
    assert.deepEqual(await deliverLead(lead), { delivered: false });
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
