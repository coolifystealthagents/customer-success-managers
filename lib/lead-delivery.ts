import type { FallbackLeadPayload } from './lead-fallback-mattermost.ts';

export type LeadDeliveryChannel = 'acr';
export type LeadDeliveryResult =
  | { outcome: 'delivered'; channel: LeadDeliveryChannel }
  | { outcome: 'rejected' | 'uncertain' };

/** One operational delivery to ACR. No site-direct notification or retry fan-out. */
export async function deliverLead(lead: FallbackLeadPayload): Promise<LeadDeliveryResult> {
  const configured = process.env.ACR_LEAD_ENDPOINT?.trim();
  const endpoint = configured || 'https://acrtracking.stealthagents.us/api/track';
  const fields = {
    submission_id: lead.submissionId, site_id: 'customer-success-managers',
    name: lead.name, email: lead.email, phone: lead.phone,
    business: lead.business || '', company_website: lead.website || '',
    message: lead.message || '', company_size: lead.companySize || '',
    positions_to_fill: lead.positions || '', referral_source: lead.referral || '',
    source: lead.source, page_url: lead.pageUrl, user_agent: lead.userAgent || '',
  };
  const payload = configured ? fields : {
    site_id: fields.site_id,
    events: [{
      client_event_id: lead.submissionId, event_type: 'lead_submit',
      timestamp: new Date().toISOString(), page_url: lead.pageUrl,
      page_path: '/contact-us', event_value: lead.source,
      event_metadata: JSON.stringify({...fields, lead_name: lead.name,
        lead_email: lead.email, lead_phone: lead.phone, lead_message: lead.message || '',
        lead_source: lead.source, lead_form_id: 'contact-booking-form'}),
    }],
  };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Idempotency-Key': lead.submissionId},
      body: JSON.stringify(payload), signal: AbortSignal.timeout(8_000), cache: 'no-store',
    });
    if (!response.ok) return {outcome: response.status < 500 ? 'rejected' : 'uncertain'};
    if (!configured) {
      const receipt = await response.json().catch(() => null) as {status?: string; accepted?: number} | null;
      if (receipt?.status !== 'ok' || ![0, 1].includes(receipt.accepted ?? -1)) return {outcome: 'uncertain'};
    }
    return {outcome: 'delivered', channel: 'acr'};
  } catch {
    // Keep the existing idempotency claim if acknowledgement was lost.
    return {outcome: 'uncertain'};
  }
}
