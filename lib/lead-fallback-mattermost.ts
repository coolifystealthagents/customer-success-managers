'use server';

const SITE_ID = 'customer-success-managers';

export interface FallbackLeadPayload {
  submissionId: string;
  name: string;
  email: string;
  phone: string;
  business?: string;
  website?: string;
  message?: string;
  companySize?: string;
  positions?: string;
  referral?: string;
  source: string;
  pageUrl: string;
  userAgent?: string;
}

export type FallbackDeliveryResult = 'acknowledged' | 'rejected' | 'uncertain';

/** Deliver directly to the existing emergency channel. A lead is delivered
 * only when Mattermost acknowledges the request with a 2xx response. */
export async function sendLeadFallbackToMattermost(lead: FallbackLeadPayload): Promise<FallbackDeliveryResult> {
  const fallbackWebhook = process.env.SITE_MATTERMOST_FALLBACK_WEBHOOK_URL;
  if (!fallbackWebhook) {
    console.warn('[lead-fallback] SITE_MATTERMOST_FALLBACK_WEBHOOK_URL is missing');
    return 'rejected';
  }
  if (looksLikeGarbagePiiLead(lead)) {
    console.warn('[lead-fallback] garbage_pii_lead_submit; delivery rejected');
    return 'rejected';
  }
  const lines = [
    `**[SITE-DIRECT:${SITE_ID}] New lead — ${escapeMd(lead.name || lead.email || lead.phone || 'unknown')}**`,
    `_Submitted by the site's server-owned lead delivery fallback_`,
    '', '| Field | Value |', '|---|---|',
    `| Submission | ${escapeMd(lead.submissionId)} |`,
    `| Site | ${escapeMd(SITE_ID)} |`,
    `| Name | ${escapeMd(lead.name) || '_(empty)_'} |`,
    `| Email | ${escapeMd(lead.email) || '_(empty)_'} |`,
    `| Phone | ${escapeMd(lead.phone) || '_(empty)_'} |`,
    `| Business | ${escapeMd(lead.business) || '-'} |`,
    `| Website | ${escapeMd(lead.website) || '-'} |`,
    `| Company size | ${escapeMd(lead.companySize) || '-'} |`,
    `| Positions | ${escapeMd(lead.positions) || '-'} |`,
    `| Referral | ${escapeMd(lead.referral) || '-'} |`,
    `| Source | ${escapeMd(lead.source) || '-'} |`,
    `| Page | ${escapeMd(lead.pageUrl) || '-'} |`,
    `| Time | ${new Date().toISOString()} |`,
    '',
    lead.message ? `**Message:**\n> ${escapeMd(lead.message).replace(/\n/g, '\n> ')}` : '',
  ].filter(Boolean);
  try {
    const response = await fetch(fallbackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': lead.submissionId },
      body: JSON.stringify({ text: lines.join('\n'), username: `${SITE_ID} Direct (fallback)`, icon_emoji: ':warning:' }),
      signal: AbortSignal.timeout(5_000),
      cache: 'no-store',
    });
    if (!response.ok) console.error('[lead-fallback] Mattermost returned', response.status);
    return response.ok ? 'acknowledged' : 'rejected';
  } catch (error) {
    console.error('[lead-fallback] fallback failed', error);
    return 'uncertain';
  }
}

function escapeMd(value: string | undefined): string {
  if (!value) return '';
  return String(value).replace(/[|`*_\\]/g, (character) => `\\${character}`).slice(0, 1_000);
}

function looksRandomAlphanumeric(value: string): boolean {
  if (!value || /\s/.test(value) || !/^[A-Za-z0-9]+$/.test(value)) return false;
  const letters = value.match(/[A-Za-z]/g) ?? [];
  let caseTransitions = 0;
  for (let index = 1; index < value.length; index += 1) {
    const previous = value[index - 1];
    const current = value[index];
    if (/[A-Za-z]/.test(previous) && /[A-Za-z]/.test(current) && (previous === previous.toUpperCase()) !== (current === current.toUpperCase())) caseTransitions += 1;
  }
  const chaoticCase = value.length >= 8 && caseTransitions >= 4;
  let extremeVowelRatio = false;
  if (value.length >= 12 && letters.length >= 8) {
    const vowels = letters.filter((letter) => 'aeiouAEIOU'.includes(letter)).length;
    const vowelRatio = vowels / letters.length;
    extremeVowelRatio = vowelRatio < 0.25 || vowelRatio > 0.55;
  }
  return extremeVowelRatio || chaoticCase;
}

function looksLikeGarbagePiiLead(lead: FallbackLeadPayload): boolean {
  return looksRandomAlphanumeric((lead.name || '').trim()) && looksRandomAlphanumeric((lead.message || '').trim());
}
