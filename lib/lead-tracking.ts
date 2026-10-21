const SITE_ID = 'customer-success-managers';
export const TRACKING_API = 'https://acrtracking.stealthagents.us/api/track';
const MAX_EVENTS = 50;
const MAX_METADATA_BYTES = 12_000;

const EXACT_BROWSER_EVENTS = new Set(['pageview', 'scroll_depth', 'cwv', 'cta_click', 'cta_view']);
const EVENT_FIELDS = new Set([
  'client_event_id', 'event_type', 'timestamp', 'session_id', 'user_id', 'anonymous_id',
  'page_url', 'page_path', 'page_title', 'referrer', 'utm_source', 'utm_medium',
  'utm_campaign', 'utm_term', 'utm_content', 'screen_width', 'screen_height',
  'scroll_depth', 'time_on_page', 'event_value', 'event_metadata',
]);
const METADATA_FIELDS = new Set([
  'tracker_version', 'engagement_time_ms', 'landing_page', 'landing_referrer',
  'landing_utm_source', 'landing_utm_medium', 'landing_utm_campaign', 'landing_utm_term',
  'landing_utm_content', 'cookie_origin', 'test', 'language', 'languages', 'timezone',
  'viewport_width', 'viewport_height', 'pixel_ratio', 'color_depth', 'touch_support',
  'connection_type', 'connection_downlink', 'connection_rtt', 'pdf_viewer',
  'hardware_concurrency', 'cookie_enabled', 'do_not_track', 'online', 'metric_name',
  'metric_value', 'cta_text', 'cta_tag', 'cta_id', 'cta_classes', 'cta_href',
  'cta_position_y', 'acr_track', 'ab_variant_id', 'cta_label', 'element_tag',
  'element_id', 'element_classes', 'funnel_step', 'funnel_label', 'funnel_path',
  'source', 'client_source', 'booking_page_id', 'oncehub_event_name', 'oncehub_origin',
]);

function record(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function boundedScalar(value: unknown): boolean {
  if (value === null || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value) && Math.abs(value) <= 1_000_000_000;
  if (typeof value === 'string') return value.length <= 2_048;
  return Array.isArray(value) && value.length <= 16 && value.every((item) => typeof item === 'string' && item.length <= 64);
}

function validMetadata(raw: unknown): boolean {
  if (typeof raw !== 'string' || new TextEncoder().encode(raw).byteLength > MAX_METADATA_BYTES) return false;
  let metadata: unknown;
  try { metadata = JSON.parse(raw); } catch { return false; }
  if (!record(metadata) || Object.keys(metadata).length > METADATA_FIELDS.size) return false;
  return Object.entries(metadata).every(([key, value]) => METADATA_FIELDS.has(key) && boundedScalar(value));
}

function allowedBrowserEventName(name: string): boolean {
  return EXACT_BROWSER_EVENTS.has(name) || /^funnel_[a-z0-9_]{1,72}$/.test(name);
}

export function isValidBrowserTrackingPayload(payload: unknown): boolean {
  if (!record(payload) || payload.site_id !== SITE_ID || !Array.isArray(payload.events) || payload.events.length < 1 || payload.events.length > MAX_EVENTS) return false;
  return payload.events.every((event) => {
    if (!record(event) || Object.keys(event).some((key) => !EVENT_FIELDS.has(key))) return false;
    if (typeof event.event_type !== 'string' || !allowedBrowserEventName(event.event_type)) return false;
    if (typeof event.timestamp !== 'string' || event.timestamp.length > 64 || !Number.isFinite(Date.parse(event.timestamp))) return false;
    if (!validMetadata(event.event_metadata)) return false;
    return Object.entries(event).every(([key, value]) => {
      if (key === 'event_metadata' || key === 'event_type' || key === 'timestamp') return true;
      return boundedScalar(value);
    });
  });
}

export async function emitAcceptedLeadEvent(input: { submissionId: string; source: string; channel: string }): Promise<boolean> {
  const event = {
    client_event_id: crypto.randomUUID(),
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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_id: SITE_ID, events: [event] }),
      signal: AbortSignal.timeout(5_000),
      cache: 'no-store',
    });
    if (!response.ok) console.error('[lead-analytics] tracking API returned', response.status);
    return response.ok;
  } catch (error) {
    console.error('[lead-analytics] tracking API failed', error);
    return false;
  }
}

function trackingEndpoint(): string {
  const candidate = process.env.TEST_ACR_TRACKING_ENDPOINT;
  if (process.env.ALLOW_LOCAL_ORIGINS !== '1' || !candidate) return TRACKING_API;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'http:' && (parsed.hostname === '127.0.0.1' || parsed.hostname === 'localhost')) return parsed.href;
  } catch {}
  return TRACKING_API;
}
