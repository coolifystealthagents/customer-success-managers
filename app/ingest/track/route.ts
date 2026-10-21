import { type NextRequest } from 'next/server';
import { isAllowedBrowserOrigin } from '@/lib/request-origin';
import { isValidBrowserTrackingPayload, TRACKING_API } from '@/lib/lead-tracking';

const MAX_BODY_BYTES = 128_000;
export const runtime = 'nodejs';

function error(detail: string, status: number) {
  return Response.json({ status: 'error', detail }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest) {
  if (!isAllowedBrowserOrigin(request)) return error('Origin rejected', 403);
  if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return error('JSON required', 415);
  const rawLength = request.headers.get('content-length');
  if (rawLength) {
    const declared = Number(rawLength);
    if (!Number.isFinite(declared) || declared < 0 || declared > MAX_BODY_BYTES) return error('Payload too large', 413);
  }
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return error('Payload too large', 413);
    let payload: unknown;
    try { payload = JSON.parse(body); } catch { return error('Invalid JSON', 400); }
    if (!isValidBrowserTrackingPayload(payload)) return error('Invalid or disallowed event payload', 400);
    const ip = request.headers.get('cf-connecting-ip') || '0.0.0.0';
    const upstream = await fetch(TRACKING_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': (request.headers.get('user-agent') || '').slice(0, 512),
        'Accept-Language': (request.headers.get('accept-language') || '').slice(0, 256),
        'X-Forwarded-For': ip,
        'X-ACR-Client-IP': ip,
      },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return error('Tracking service unavailable', 502);
  }
}
