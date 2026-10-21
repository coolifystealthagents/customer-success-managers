const PRODUCTION_ORIGINS = new Set([
  'https://customersuccessmanagers.com',
  'https://www.customersuccessmanagers.com',
]);

/** Browser-facing write routes accept fixed origins only. Proxy-supplied host
 * headers are intentionally irrelevant. Local development is opt-in. */
export function isAllowedBrowserOrigin(request: Request): boolean {
  const rawOrigin = request.headers.get('origin');
  if (!rawOrigin) return false;
  let origin: URL;
  try {
    origin = new URL(rawOrigin);
  } catch {
    return false;
  }
  if (PRODUCTION_ORIGINS.has(origin.origin)) return true;
  if (process.env.NODE_ENV === 'production' || process.env.ALLOW_LOCAL_ORIGINS !== '1') return false;
  return origin.protocol === 'http:' && (origin.hostname === 'localhost' || origin.hostname === '127.0.0.1');
}
