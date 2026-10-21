import { NextRequest, NextResponse } from 'next/server';

const apex = 'customersuccessmanagers.com';
const productionHosts = new Set([apex, `www.${apex}`]);

function visitorScheme(request: NextRequest) {
  const cloudflareVisitor = request.headers.get('cf-visitor');
  if (cloudflareVisitor) {
    try {
      const scheme = JSON.parse(cloudflareVisitor)?.scheme;
      if (scheme === 'http' || scheme === 'https') return scheme;
    } catch {
      // Use the trusted proxy or framework scheme below.
    }
  }
  const forwarded = request.headers.get('x-forwarded-proto')?.split(',')[0].trim().toLowerCase();
  if (forwarded === 'http' || forwarded === 'https') return forwarded;
  return request.nextUrl.protocol === 'http:' ? 'http' : 'https';
}

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const host = forwardedHost.split(',')[0].trim().toLowerCase().split(':')[0];
  if (!productionHosts.has(host)) return NextResponse.next();
  if (host === apex && visitorScheme(request) === 'https') return NextResponse.next();
  const canonical = new URL(`https://${apex}`);
  canonical.pathname = request.nextUrl.pathname;
  canonical.search = request.nextUrl.search;
  return NextResponse.redirect(canonical, 308);
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
