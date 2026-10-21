import { sendLeadFallbackToMattermost, type FallbackLeadPayload } from './lead-fallback-mattermost.ts';

export type LeadDeliveryChannel = 'acr' | 'mattermost';
export type LeadDeliveryResult =
  | { outcome: 'delivered'; channel: LeadDeliveryChannel }
  | { outcome: 'rejected' | 'uncertain' };

/** ACR is the primary operational destination when configured. Mattermost is
 * used when ACR is absent or definitely rejects the request. Uncertain ACR
 * transport outcomes never fan out to a second sink. */
export async function deliverLead(lead: FallbackLeadPayload): Promise<LeadDeliveryResult> {
  const endpoint = process.env.ACR_LEAD_ENDPOINT?.trim();
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': lead.submissionId },
        body: JSON.stringify({
          submission_id: lead.submissionId,
          site_id: 'customer-success-managers',
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          business: lead.business || '',
          company_website: lead.website || '',
          message: lead.message || '',
          company_size: lead.companySize || '',
          positions_to_fill: lead.positions || '',
          referral_source: lead.referral || '',
          source: lead.source,
          page_url: lead.pageUrl,
          user_agent: lead.userAgent || '',
        }),
        signal: AbortSignal.timeout(8_000),
        cache: 'no-store',
      });
      if (response.ok) return { outcome: 'delivered', channel: 'acr' };
      console.error('[lead-delivery] ACR returned', response.status);
    } catch (error) {
      console.error('[lead-delivery] ACR failed', error);
      // The receiver may have accepted the body before the timeout/network
      // failure. Keep the claim and do not fan out to avoid a duplicate lead.
      return { outcome: 'uncertain' };
    }
  }
  const fallback = await sendLeadFallbackToMattermost(lead);
  if (fallback === 'acknowledged') return { outcome: 'delivered', channel: 'mattermost' };
  return { outcome: fallback === 'uncertain' ? 'uncertain' : 'rejected' };
}
