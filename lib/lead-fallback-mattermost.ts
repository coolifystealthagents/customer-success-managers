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

export async function sendLeadFallbackToMattermost(lead: FallbackLeadPayload): Promise<FallbackDeliveryResult> {
  // ACR alone owns lead notifications. Never send directly to Mattermost.
  return 'rejected';
}
