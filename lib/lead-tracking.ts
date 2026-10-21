import { TRACKABLE_PATHS } from './tracking-routes.ts';

const SITE_ID = 'customer-success-managers';
const CANONICAL_ORIGIN = 'https://customersuccessmanagers.com';
export const TRACKING_API = 'https://acrtracking.stealthagents.us/api/track';
const MAX_EVENTS = 50;
const MAX_METADATA_BYTES = 12_000;

const EXACT_BROWSER_EVENTS = new Set([
  'pageview', 'scroll_depth', 'cwv', 'cta_click', 'cta_view',
  'funnel_form_page', 'funnel_form_submitted',
]);
const EVENT_FIELDS = new Set([
  'client_event_id', 'event_type', 'timestamp', 'session_id', 'user_id', 'anonymous_id',
  'page_url', 'page_path', 'page_title', 'referrer', 'utm_source', 'utm_medium',
  'utm_campaign', 'utm_term', 'utm_content', 'screen_width', 'screen_height',
  'scroll_depth', 'time_on_page', 'event_value', 'event_metadata',
]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const METRICS = new Set(['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']);
const FUNNELS: Record<string, { step: number; label: string; path: string }> = {
  funnel_form_page: { step: 1, label: 'Form Page', path: '/contact-us' },
  funnel_form_submitted: { step: 2, label: 'Form Submitted', path: '/thank-you' },
};

type JsonRecord = Record<string, unknown>;
export type SanitizedTrackingPayload = { site_id: typeof SITE_ID; events: JsonRecord[] };

function record(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function finiteNumber(value: unknown, min: number, max: number): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max ? value : undefined;
}

function uuidOrEmpty(value: unknown): string {
  return typeof value === 'string' && UUID.test(value) ? value : '';
}

function safePath(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length < 1 || value.length > 256 || !value.startsWith('/') || /[?#\u0000-\u001f]/.test(value)) return undefined;
  try {
    const parsed = new URL(value, CANONICAL_ORIGIN);
    if (parsed.origin !== CANONICAL_ORIGIN || parsed.pathname !== value) return undefined;
    return TRACKABLE_PATHS.has(parsed.pathname) ? parsed.pathname : undefined;
  } catch { return undefined; }
}

function parseMetadata(raw: unknown): JsonRecord | undefined {
  if (typeof raw !== 'string' || new TextEncoder().encode(raw).byteLength > MAX_METADATA_BYTES) return undefined;
  try {
    const value: unknown = JSON.parse(raw);
    return record(value) ? value : undefined;
  } catch { return undefined; }
}

function sanitizeMetadata(eventType: string, raw: unknown): string | undefined {
  const metadata = parseMetadata(raw);
  if (!metadata) return undefined;
  const clean: JsonRecord = {};
  if (metadata.tracker_version === '0.4.19') clean.tracker_version = metadata.tracker_version;
  if (typeof metadata.language === 'string' && /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})?$/.test(metadata.language)) clean.language = metadata.language;
  if (eventType === 'cwv') {
    if (typeof metadata.metric_name !== 'string' || !METRICS.has(metadata.metric_name)) return undefined;
    const metric = finiteNumber(metadata.metric_value, -10_000, 10_000_000);
    if (metric === undefined) return undefined;
    clean.metric_name = metadata.metric_name;
    clean.metric_value = metric;
  }
  const funnel = FUNNELS[eventType];
  if (funnel) {
    if (metadata.funnel_step !== funnel.step || metadata.funnel_label !== funnel.label || metadata.funnel_path !== funnel.path) return undefined;
    Object.assign(clean, { funnel_step: funnel.step, funnel_label: funnel.label, funnel_path: funnel.path });
  }
  return JSON.stringify(clean);
}

function controlledEventValue(eventType: string, event: JsonRecord): string | undefined {
  if (eventType === 'scroll_depth') {
    const depth = finiteNumber(event.scroll_depth, 0, 100);
    const expected = depth === undefined ? undefined : `${depth}%`;
    return [25, 50, 75, 100].includes(depth ?? -1) && event.event_value === expected ? expected : undefined;
  }
  if (eventType === 'cwv') return typeof event.event_value === 'string' && /^-?\d+(?:\.\d+)?$/.test(event.event_value) && event.event_value.length <= 24 ? event.event_value : undefined;
  const funnel = FUNNELS[eventType];
  if (funnel) return event.event_value === `step_${funnel.step}` ? `step_${funnel.step}` : undefined;
  // CTA text and page titles are intentionally discarded. They are mutable DOM
  // strings and are not needed for route-level conversion analytics.
  return '';
}

export function sanitizeBrowserTrackingPayload(payload: unknown): SanitizedTrackingPayload | null {
  if (!record(payload) || Object.keys(payload).some((key) => !['site_id', 'events'].includes(key)) || payload.site_id !== SITE_ID || !Array.isArray(payload.events) || payload.events.length < 1 || payload.events.length > MAX_EVENTS) return null;
  const cleanEvents: JsonRecord[] = [];
  for (const event of payload.events) {
    if (!record(event) || Object.keys(event).some((key) => !EVENT_FIELDS.has(key))) return null;
    const eventType = typeof event.event_type === 'string' && EXACT_BROWSER_EVENTS.has(event.event_type) ? event.event_type : undefined;
    const path = safePath(event.page_path);
    const parsedTimestamp = typeof event.timestamp === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(event.timestamp)
      ? Date.parse(event.timestamp) : Number.NaN;
    const timestamp = Number.isFinite(parsedTimestamp) ? new Date(parsedTimestamp).toISOString() : undefined;
    const metadata = sanitizeMetadata(eventType ?? '', event.event_metadata);
    const eventValue = eventType ? controlledEventValue(eventType, event) : undefined;
    if (!eventType || !path || !timestamp || metadata === undefined || eventValue === undefined) return null;
    const screenWidth = finiteNumber(event.screen_width, 0, 20_000) ?? 0;
    const screenHeight = finiteNumber(event.screen_height, 0, 20_000) ?? 0;
    const scrollDepth = finiteNumber(event.scroll_depth, 0, 100) ?? 0;
    const timeOnPage = finiteNumber(event.time_on_page, 0, 86_400_000) ?? 0;
    cleanEvents.push({
      client_event_id: uuidOrEmpty(event.client_event_id),
      event_type: eventType,
      timestamp,
      session_id: uuidOrEmpty(event.session_id),
      user_id: uuidOrEmpty(event.user_id),
      anonymous_id: uuidOrEmpty(event.anonymous_id),
      page_url: `${CANONICAL_ORIGIN}${path}`,
      page_path: path,
      page_title: '',
      referrer: '',
      utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
      screen_width: screenWidth, screen_height: screenHeight,
      scroll_depth: scrollDepth, time_on_page: timeOnPage,
      event_value: eventValue,
      event_metadata: metadata,
    });
  }
  return { site_id: SITE_ID, events: cleanEvents };
}

export function isValidBrowserTrackingPayload(payload: unknown): boolean {
  return sanitizeBrowserTrackingPayload(payload) !== null;
}

export async function emitAcceptedLeadEvent(input: { submissionId: string; source: string; channel: 'acr' | 'mattermost' }): Promise<boolean> {
  const event = {
    // The stable submission UUID gives the established ACR API a deterministic
    // deduplication identity if a transport acknowledgement is lost.
    client_event_id: input.submissionId,
    event_type: 'lead_submit',
    timestamp: new Date().toISOString(),
    event_value: input.source,
    event_metadata: JSON.stringify({
      submission_id: input.submissionId,
      source: input.source,
      delivery_channel: input.channel,
    }),
  };
  try {
    const response = await fetch(trackingEndpoint(), {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': input.submissionId },
      body: JSON.stringify({ site_id: SITE_ID, events: [event] }), signal: AbortSignal.timeout(5_000), cache: 'no-store',
    });
    if (!response.ok) console.error('[lead-analytics] tracking API returned', response.status);
    return response.ok;
  } catch (error) {
    console.error('[lead-analytics] tracking API failed', error);
    return false;
  }
}

export function trackingEndpoint(): string {
  const candidate = process.env.TEST_ACR_TRACKING_ENDPOINT;
  if (process.env.NODE_ENV === 'production' || process.env.ALLOW_LOCAL_ORIGINS !== '1' || !candidate) return TRACKING_API;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'http:' && (parsed.hostname === '127.0.0.1' || parsed.hostname === 'localhost')) return parsed.href;
  } catch {}
  return TRACKING_API;
}
