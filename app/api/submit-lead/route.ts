import { NextResponse } from 'next/server';
import { deliverLead } from '@/lib/lead-delivery';
import type { FallbackLeadPayload } from '@/lib/lead-fallback-mattermost';
import { isAllowedBrowserOrigin } from '@/lib/request-origin';
import { emitAcceptedLeadEvent } from '@/lib/lead-tracking';
import { claimSubmission, markSubmission, releaseFailedSubmission } from '@/lib/lead-idempotency';
import { createHash } from 'node:crypto';

const MAX_BODY_BYTES = 24_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 6;

const personalDomains = new Set(['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','aol.com','proton.me','protonmail.com']);
const companySizes = new Set(['1 to 10','11 to 50','51 to 200','201 to 500','501+']);
const positionCounts = new Set(['1','2 to 3','4 to 10','11+','Not sure yet']);
const referralSources = new Set(['Search engine','Referral','Customer success community','Social media','Stealth Agents','Other']);
const phoneCountries = new Set(['+1','+44','+61','+63','other']);
const allowedFields = new Set(['first_name','last_name','email','phone_country','phone','company','company_website','company_size','positions_to_fill','referral_source','message','source','website_url','submission_id']);
const rateBuckets = new Map<string, number[]>();


function json(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status, headers: { 'Cache-Control': 'no-store' } });
}
function clientKey(request: Request) { return request.headers.get('cf-connecting-ip') || 'unknown'; }
function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (rateBuckets.get(key) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now); rateBuckets.set(key, recent);
  if (rateBuckets.size > 2_000) for (const [bucketKey, values] of rateBuckets) if (!values.some((time) => now - time < RATE_WINDOW_MS)) rateBuckets.delete(bucketKey);
  return false;
}
function value(form: FormData, name: string, max: number) {
  const entry = form.get(name);
  return typeof entry === 'string' ? entry.trim().slice(0, max + 1) : '';
}
function leadFingerprint(lead: FallbackLeadPayload): string {
  return createHash('sha256').update(JSON.stringify(lead)).digest('hex');
}

export async function POST(request: Request) {
  if (!isAllowedBrowserOrigin(request) || request.headers.get('x-requested-with') !== 'customer-success-contact-form') return json('Request origin was not accepted.', 403);
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('multipart/form-data;')) return json('Unsupported request format.', 415);
  const rawLength = request.headers.get('content-length');
  if (rawLength) {
    const declared = Number(rawLength);
    if (!Number.isFinite(declared) || declared < 0 || declared > MAX_BODY_BYTES) return json('Request is too large.', 413);
  }
  let form: FormData;
  try {
    const body = await request.arrayBuffer();
    if (body.byteLength > MAX_BODY_BYTES) return json('Request is too large.', 413);
    form = await new Request(request.url, { method: 'POST', headers: request.headers, body }).formData();
  } catch { return json('The form could not be read.', 400); }
  const entries = [...form.entries()];
  if (entries.length > allowedFields.size || entries.some(([key]) => !allowedFields.has(key))) return json('The form contained an unexpected field.', 400);
  const keys = entries.map(([key]) => key);
  if (new Set(keys).size !== keys.length) return json('The form contained a repeated field.', 400);
  if (value(form, 'website_url', 120)) return json('The request was not accepted.', 400);

  const first = value(form,'first_name',80), last = value(form,'last_name',80), email = value(form,'email',160).toLowerCase();
  const phoneCountry = value(form,'phone_country',8) || '+1', phone = value(form,'phone',32), company = value(form,'company',120);
  const website = value(form,'company_website',240), size = value(form,'company_size',24), positions = value(form,'positions_to_fill',24);
  const referral = value(form,'referral_source',40), message = value(form,'message',800), source = value(form,'source',80);
  const submissionId = value(form, 'submission_id', 36);
  if (!first || !last || !company || !source || !/^\S+@\S+\.\S+$/.test(email)) return json('Please complete every required field.', 400);
  if (first.length > 80 || last.length > 80 || company.length > 120 || email.length > 160 || message.length > 800) return json('One or more fields are too long.', 400);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) return json('The submission identifier was invalid.', 400);
  if (source !== 'contact-page-consultation') return json('The form source was invalid.', 400);
  if (personalDomains.has(email.split('@')[1])) return json('Please use your business email address.', 400);
  if (!companySizes.has(size) || !positionCounts.has(positions) || !referralSources.has(referral) || !phoneCountries.has(phoneCountry)) return json('Please choose a valid option for every required field.', 400);
  if (website) { try { const parsed = new URL(website); if (!['http:','https:'].includes(parsed.protocol)) throw new Error(); } catch { return json('Please enter a valid company website URL.',400); } }
  if (phone && !/^[0-9 ()+.-]{5,32}$/.test(phone)) return json('Please enter a valid phone number.',400);

  const origin = new URL(request.headers.get('origin')!).origin;
  const lead: FallbackLeadPayload = {
    submissionId, name: `${first} ${last}`, email, phone: `${phoneCountry} ${phone}`.trim(), business: company,
    website, message, companySize: size, positions, referral, source, pageUrl: `${origin}/contact-us`,
    userAgent: (request.headers.get('user-agent') || '').slice(0, 512),
  };
  const fingerprint = leadFingerprint(lead);
  let claim;
  try { claim = await claimSubmission(submissionId, fingerprint); }
  catch { return json('We could not safely begin delivery. Your information was not accepted. Please try again later.', 503); }
  if (claim.kind === 'conflict') return json('The submission identifier was already used for different information.', 409);
  if (claim.kind === 'delivered') return NextResponse.json({ ok: true, status: 'delivered' }, { headers: { 'Cache-Control': 'no-store' } });
  if (claim.kind === 'in_flight') return json('This delivery is already being processed or has an uncertain prior acknowledgement. It was not sent again.', 503);
  if (isRateLimited(clientKey(request))) {
    await releaseFailedSubmission(submissionId, fingerprint).catch(() => undefined);
    return json('Too many requests. Please wait and try again.',429);
  }

  const result = await deliverLead(lead);
  if (result.outcome !== 'delivered') {
    if (result.outcome === 'uncertain') {
      return json('Delivery acknowledgement is uncertain. It was not sent again. Please do not resubmit this request.', 503);
    }
    await releaseFailedSubmission(submissionId, fingerprint).catch(() => undefined);
    return json('We could not deliver your request right now. Your information was not accepted. Please try again later.', 503);
  }
  try {
    await markSubmission(submissionId, fingerprint, 'lead_delivered');
    // Analytics is attempted once after operational acknowledgement, but it is
    // never allowed to reverse a confirmed lead delivery.
    await emitAcceptedLeadEvent({ submissionId, source: lead.source, channel: result.channel });
    await markSubmission(submissionId, fingerprint, 'delivered');
  } catch {
    return json('Your request reached our operations channel, but final confirmation is incomplete. It was not sent again. Please do not resubmit this request.', 503);
  }
  return NextResponse.json({ ok: true, status: 'delivered' }, { headers: { 'Cache-Control': 'no-store' } });
}
