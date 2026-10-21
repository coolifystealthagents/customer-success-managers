import { sendLeadFallbackToMattermost, type FallbackLeadPayload } from './lead-fallback-mattermost.ts';

export type LeadDeliveryChannel = 'acr' | 'mattermost';
export interface LeadDeliveryResult { delivered: boolean; channel?: LeadDeliveryChannel }

/** ACR is the primary operational destination when configured. Mattermost is
 * always the fallback when ACR is absent, times out, throws, or returns non-2xx. */
export async function deliverLead(lead: FallbackLeadPayload): Promise<LeadDeliveryResult> {
  const endpoint = process.env.ACR_LEAD_ENDPOINT?.trim();
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      if (response.ok) return { delivered: true, channel: 'acr' };
      console.error('[lead-delivery] ACR returned', response.status);
    } catch (error) {
      console.error('[lead-delivery] ACR failed', error);
    }
  }
  const delivered = await sendLeadFallbackToMattermost(lead);
  return delivered ? { delivered: true, channel: 'mattermost' } : { delivered: false };
}
