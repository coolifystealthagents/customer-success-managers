export type ServiceDetail = {
  image: string;
  imageAlt: string;
  audience: string;
  problem: string;
  inputs: string[];
  qualityChecks: string[];
  scenarios: string[];
  faqs: { question: string; answer: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'customer-onboarding-support': {
    image: '/images/optimization/service-customer-onboarding.jpg',
    imageAlt: 'Customer success specialist and account owner reviewing an onboarding checklist and timeline',
    audience: 'Customer success teams with a defined onboarding plan but inconsistent task updates, reminders, handoffs, or blocker visibility.',
    problem: 'The account owner should lead the relationship, yet routine record keeping can consume the time needed for customer conversations. When dates, dependencies, and owners drift, the team loses a reliable view of progress.',
    inputs: ['Approved onboarding plan and stage definitions', 'Named source systems and required record fields', 'Current owner, dependency, and escalation map', 'Approved reminder templates and communication rules'],
    qualityChecks: ['Required fields are complete before a record advances', 'Dates and status changes trace to the named source', 'Blocked steps have an owner and documented transfer', 'A sample of completed journeys is reviewed for record completeness'],
    scenarios: ['A growing implementation queue needs daily record maintenance', 'Kickoff notes are not consistently transferred into the onboarding plan', 'Account owners need blockers separated from routine follow up'],
    faqs: [
      { question: 'Does the specialist own the customer relationship?', answer: 'No. The account owner retains relationship judgment, commitments, and customer-facing decisions. The specialist maintains the approved operating record and routes exceptions.' },
      { question: 'Can support change the onboarding plan?', answer: 'Only approved updates are recorded. Scope, delivery, security, and product decisions return to the authorized owner.' },
    ],
  },
  'customer-health-operations': {
    image: '/images/optimization/service-customer-health.jpg',
    imageAlt: 'Customer success operations colleagues reviewing account health source evidence and one flagged exception',
    audience: 'Customer success leaders who already have approved health indicators but need a repeatable way to reconcile, prepare, and review them.',
    problem: 'A health view becomes unreliable when source dates, missing inputs, and exceptions disappear behind a single score. The operating work is to make the evidence reviewable without inventing strategy.',
    inputs: ['Approved indicators and definitions', 'Named systems, source dates, and refresh cadence', 'Portfolio review template and threshold rules', 'Review owner and exception route'],
    qualityChecks: ['Every signal shows its source date', 'Missing data is separated from account risk', 'Definitions remain unchanged during preparation', 'Threshold exceptions are sampled against source records'],
    scenarios: ['Weekly portfolio reviews begin with manual source reconciliation', 'Missing usage or support data is being mistaken for risk', 'Leadership needs a consistent packet without delegating account strategy'],
    faqs: [
      { question: 'Will support design our health score?', answer: 'No. The team supplies approved definitions and thresholds. Support prepares the view and surfaces missing or conflicting evidence.' },
      { question: 'Does this predict churn?', answer: 'No. The scope organizes approved evidence for accountable review and makes no prediction or guaranteed outcome claim.' },
    ],
  },
  'business-review-preparation': {
    image: '/images/optimization/service-business-review.jpg',
    imageAlt: 'Customer success colleagues assembling an executive business review source pack from approved records',
    audience: 'Account teams that spend too much meeting time gathering context, checking action logs, and chasing approved inputs.',
    problem: 'A useful business review depends on current sources and clear decisions. When preparation starts late, account owners either rebuild the record or enter the meeting with gaps.',
    inputs: ['Meeting purpose, participants, date, and approved template', 'Current outcomes, adoption context, and open actions', 'Decision log and customer-safe language', 'Named reviewers and packet cutoff'],
    qualityChecks: ['Every material statement traces to an approved source', 'Open actions show an owner and date', 'Missing inputs are visible before the review cutoff', 'Follow up records match approved meeting decisions'],
    scenarios: ['Quarterly reviews rely on last-minute document assembly', 'Action items are separated across notes and systems', 'Account owners need a consistent brief while retaining the conversation'],
    faqs: [
      { question: 'Can the specialist present the review?', answer: 'The scope prepares materials and logistics. The accountable account owner leads customer decisions, commitments, and the relationship.' },
      { question: 'Can unverified results be included?', answer: 'No. Gaps are flagged for review rather than filled with assumptions or unapproved claims.' },
    ],
  },
  'adoption-follow-up': {
    image: '/images/optimization/service-adoption-follow-up.jpg',
    imageAlt: 'Customer success specialists reviewing an approved adoption follow-up queue and resource sequence',
    audience: 'Teams with an approved adoption plan whose education, reminders, response capture, and next-step routing are inconsistent.',
    problem: 'Routine follow up can stall when audience rules, current resources, and escalation paths are unclear. Support should move approved actions without drifting into product advice or pressure tactics.',
    inputs: ['Approved audience and follow-up rules', 'Current education resources and message templates', 'Consent, status, and contact records', 'Risk signals and accountable owner route'],
    qualityChecks: ['Only current approved resources are used', 'Audience and consent rules are checked before outreach', 'Responses retain the customer meaning', 'Questions and risk signals transfer within the agreed window'],
    scenarios: ['Education follow up is delayed after training or launch', 'Multiple resource versions are being sent', 'Customer responses need consistent capture for the account owner'],
    faqs: [
      { question: 'Can support give custom product advice?', answer: 'No. Support uses approved materials and transfers questions that require product, security, commercial, or strategic judgment.' },
      { question: 'Who defines the follow-up audience?', answer: 'The accountable team defines the audience and approved rules. The specialist prepares and maintains the resulting queue.' },
    ],
  },
  'knowledge-operations': {
    image: '/images/optimization/service-knowledge-operations.jpg',
    imageAlt: 'Knowledge operations colleagues comparing approved guidance versions and a publication checklist',
    audience: 'Customer success organizations with growing customer-facing guidance, unclear ownership, or inconsistent review and publication records.',
    problem: 'Guidance becomes risky when teams cannot identify the current approved version, its owner, or its review date. The operational need is controlled maintenance, not independent policy writing.',
    inputs: ['Knowledge inventory and current source records', 'Named subject-matter owners and reviewers', 'Version, review, retention, and publication rules', 'Approved update request with source evidence'],
    qualityChecks: ['Every published item has a current owner and review date', 'Approved source and final version remain traceable', 'Superseded material is handled under retention rules', 'Publication checklist completion is sampled'],
    scenarios: ['Customer guidance exists across several repositories', 'Update requests lack a visible review owner', 'Teams need stale or conflicting resources routed for decision'],
    faqs: [
      { question: 'Will support write policy or interpret the product?', answer: 'No. Subject-matter owners approve every substantive change. Support manages the inventory, workflow, approved edits, and publication checks.' },
      { question: 'Can old guidance simply be deleted?', answer: 'Only under the approved retention process. Version and evidence records are preserved where required.' },
    ],
  },
  'escalation-coordination': {
    image: '/images/optimization/service-escalation-coordination.jpg',
    imageAlt: 'Customer success team reconstructing an escalation timeline and assigning the next accountable owner',
    audience: 'Customer teams that need a complete, current escalation record while authorized leaders decide severity, response, remedy, and commitments.',
    problem: 'Escalations lose momentum when the original issue, timeline, owner, and next action are scattered. Coordination makes the record dependable without transferring decision authority.',
    inputs: ['Original customer request and source record', 'Approved account context and timeline sources', 'Escalation matrix, status fields, and update cadence', 'Authorized owners for response, remedy, and closure'],
    qualityChecks: ['The original customer meaning is preserved', 'Required context and source links are present', 'Owner acknowledgement and next action are timestamped', 'Closure requires documented authorized confirmation'],
    scenarios: ['Status updates are spread across chat, tickets, and notes', 'Issues move between teams without a visible owner', 'Leaders need a reliable timeline before deciding the response'],
    faqs: [
      { question: 'Does the coordinator decide severity or remedy?', answer: 'No. Authorized leaders keep those decisions. The coordinator prepares the record, routes it through the approved matrix, and tracks acknowledged actions.' },
      { question: 'Can the coordinator promise a resolution date?', answer: 'Only an explicitly approved commitment may be recorded or communicated. Unapproved promises are outside scope.' },
    ],
  },
};
