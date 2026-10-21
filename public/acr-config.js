window.ACR_TRACKER_CONFIG = {
  siteId: 'customer-success-managers',
  endpoint: '/ingest/track',
  debug: false,
  funnelSteps: [
    { path: '/contact-us', step: 1, label: 'Form Page', event: 'funnel_form_page' },
    { path: '/thank-you', step: 2, label: 'Form Submitted', event: 'funnel_form_submitted' },
  ],
};
