import type { ArticleSection, BlogPost, FAQ, ResearchPost } from './types';

type BlogBrief = {
  headings: [string, string, string, string];
  decision: string;
  evidence: string;
  scenario: string;
  boundary: string;
  test: string;
  closure: string;
  faq: FAQ[];
  service: string;
  source: { label: string; url: string };
};

const faq = (subject: string, record: string, authority: string, close: string): FAQ[] => [
  { q: `What belongs in ${subject}?`, a: record },
  { q: `Who makes the decision for ${subject}?`, a: authority },
  { q: `When is ${subject} complete?`, a: close },
];

const blogBriefs: Record<string, BlogBrief> = {
  'customer-onboarding-acceptance-gate': {
    headings: ['Define the milestone before testing it', 'Assemble an acceptance packet', 'Challenge conditional acceptance', 'Record the authorized disposition'],
    decision: 'Decide whether the agreed onboarding milestone is genuinely ready for customer acceptance or still carries unresolved prerequisites.',
    evidence: 'Keep the contracted outcome, configuration state, training completion, open defects, customer approver, acceptance wording, and unresolved work in one milestone record.',
    scenario: 'A launch date arrives after training, but one integration remains in a temporary configuration. Distinguish what works now, what is temporary, who accepted the limitation, and what must happen before final acceptance.',
    boundary: 'Support can assemble the acceptance packet and chase missing evidence. The implementation owner and customer sponsor decide whether the milestone is accepted, conditionally accepted, or returned for remediation.',
    test: 'Test a missing approver, contradictory configuration screenshots, a reopened defect, a late scope change, and a customer who acknowledges receipt without accepting the milestone.',
    closure: 'Close only when the authorized acceptance state, customer acknowledgement, residual owner, and due date are visible together.',
    faq: faq('an onboarding acceptance gate', 'The agreed milestone, prerequisites, delivery evidence, approver, exact acceptance wording, exceptions, and residual work.', 'The implementation owner and authorized customer approver; support prepares evidence but does not infer acceptance.', 'When the authorized disposition and acknowledgement are recorded and every exception has an owner and date.'),
    service: '/services/customer-onboarding-support',
    source: { label: 'NARA records-management guidance (context for retaining an attributable acceptance record)', url: 'https://www.archives.gov/records-mgmt/policy' },
  },
  'success-plan-assumption-register': {
    headings: ['Separate commitments from hypotheses', 'Give every assumption a validation path', 'Replan when an assumption fails', 'Retire entries without erasing history'],
    decision: 'Decide which success-plan statements are verified commitments and which remain assumptions that could change the plan.',
    evidence: 'Record each assumption beside its origin, owner, validation method, review date, affected outcome, and the decision that depends on it.',
    scenario: 'A plan assumes a regional team will adopt a workflow after one training session. Mark that expectation unverified and assign a validation conversation instead of converting it into a forecast.',
    boundary: 'Support can maintain the register and flag overdue validation. The customer success leader and customer sponsor confirm objectives, change commitments, and accept tradeoffs.',
    test: 'Test an assumption copied from sales notes, an owner who leaves, conflicting stakeholder expectations, an expired validation date, and an assumption disproved by product usage.',
    closure: 'Retire an assumption only when it is verified, rejected, or replaced and the dependent plan element has been updated by an authorized owner.',
    faq: faq('a success-plan assumption register', 'Each unverified statement, its source, affected objective, owner, validation method, review date, and dependent decision.', 'The account owner and customer sponsor confirm objectives and tradeoffs; the register owner only tracks validation.', 'When an assumption is verified, rejected, or replaced and the dependent plan is updated.'),
    service: '/services/business-review-preparation',
    source: { label: 'GAO evidence resources (context for distinguishing evidence from unsupported assumptions)', url: 'https://www.gao.gov/evidence-based-policymaking' },
  },
  'customer-health-score-evidence-boundary': {
    headings: ['Name what the score cannot establish', 'Keep disagreeing signals visible', 'Inspect freshness before weighting', 'Publish the judgment beside the score'],
    decision: 'Decide what a health classification can responsibly say when product use, support history, stakeholder sentiment, and commercial status disagree.',
    evidence: 'Retain each contributing signal with its source, timestamp, freshness rule, account scope, and known blind spots rather than preserving only the final color or score.',
    scenario: 'Usage is strong while an executive sponsor has raised an unresolved concern. Show both states and route the conflict for judgment instead of averaging away the risk.',
    boundary: 'Support can retrieve approved signals and apply documented calculations. The account leader owns the classification, interpretation, and customer-facing response.',
    test: 'Test stale telemetry, missing stakeholder evidence, a merged account, a corrected support event, and a score that changes solely because one source failed to refresh.',
    closure: 'A health review is complete when the classification, evidence date, dissenting signal, owner decision, and next review trigger are all inspectable.',
    faq: faq('a health-score evidence boundary', 'Every input, its account scope and timestamp, the calculation version, missing data, dissenting signals, and owner rationale.', 'The accountable account leader interprets the evidence; a calculation or support role does not make the customer judgment.', 'When the classification and rationale are recorded with contrary evidence and a refresh trigger.'),
    service: '/services/customer-health-operations',
    source: { label: 'NIST AI RMF (context for documenting limitations and human oversight in scoring systems)', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  },
  'renewal-risk-handoff': {
    headings: ['Anchor the risk to customer evidence', 'Build a commercial chronology', 'Transfer ownership without forecasting', 'Confirm receipt and the next action'],
    decision: 'Decide whether a renewal risk has enough current evidence and ownership to move from account observation into an accountable commercial workflow.',
    evidence: 'Link the customer statement, product and support context, renewal date, financial exposure category, promised follow-up, account owner, and commercial owner.',
    scenario: 'A customer questions value during a success call, but no cancellation request exists. Preserve the wording and context without turning concern into a forecasted loss.',
    boundary: 'Support can prepare the chronology and route the risk. The renewal owner and account executive judge commercial probability, concessions, pricing, and negotiation strategy.',
    test: 'Test a risk discovered in private notes, an approaching renewal with no current sponsor, contradictory CRM and billing dates, and a handoff rejected by the receiving owner.',
    closure: 'The handoff closes only after the commercial owner accepts it and the next action, customer communication, evidence gap, and due time are recorded.',
    faq: faq('a renewal-risk handoff', 'The customer statement, dated signals, renewal timing, open commitments, evidence gaps, and named sending and receiving owners.', 'The renewal owner and account executive assess probability and commercial action; support does not turn concern into a forecast.', 'When the receiving owner accepts the handoff and records the next action, due date, and communication owner.'),
    service: '/services/customer-health-operations',
    source: { label: 'NARA records-management guidance (context for preserving a dated handoff chronology)', url: 'https://www.archives.gov/records-mgmt/policy' },
  },
  'executive-business-review-source-pack': {
    headings: ['Start with claims, not slides', 'Trace every metric to its denominator', 'Withhold material that lacks approval', 'Freeze the executive review edition'],
    decision: 'Decide whether every claim proposed for an executive review can be traced to current, correctly scoped evidence.',
    evidence: 'Maintain a claim register linking each slide statement to its metric definition, date range, account segment, source export, owner, and caveat.',
    scenario: 'An adoption chart improves after inactive seats are excluded. Disclose the changed denominator and preserve the prior definition so leaders do not compare unlike periods.',
    boundary: 'Support can gather and organize approved material. Account, product, finance, and executive owners approve interpretations, forecasts, commitments, and recommendations.',
    test: 'Test a missing source export, inconsistent metric definitions, an outdated customer quote, a late executive request, and confidential material intended for a different audience.',
    closure: 'The pack is ready when every material claim has an owner, source, scope, caveat, and approval state, with unresolved items visibly withheld.',
    faq: faq('an executive review source pack', 'Each proposed claim, metric definition, period, denominator, source export, caveat, audience, and approving owner.', 'The accountable business owners approve interpretations and commitments; support assembles and flags the pack.', 'When all material claims are traceable and approved and unresolved items are withheld or plainly marked.'),
    service: '/services/business-review-preparation',
    source: { label: 'GAO evidence resources (context for traceable claims and stated limitations)', url: 'https://www.gao.gov/evidence-based-policymaking' },
  },
  'product-adoption-barrier-register': {
    headings: ['Describe the blocked workflow', 'Distinguish observation from diagnosis', 'Route the barrier by owner', 'Resolve the entry without losing residue'],
    decision: 'Decide whether a reported adoption barrier is an observed product condition, a customer constraint, a training gap, or an unverified interpretation.',
    evidence: 'Capture the affected workflow, user segment, verbatim report, observed behavior, environment, frequency, workaround, impact, and responsible product or account owner.',
    scenario: 'Users avoid a feature after one failed import. Record the failed event and subsequent behavior separately; do not label the feature unusable without current reproduction evidence.',
    boundary: 'Support can maintain the register and coordinate approved follow-up. Product diagnosis, roadmap commitments, customer policy, and priority decisions stay with authorized owners.',
    test: 'Test duplicate reports, a barrier affecting only one permission role, an outdated workaround, a customer policy restriction, and a product issue that cannot be reproduced.',
    closure: 'Resolve an entry only when the barrier state, communicated response, owner decision, customer acknowledgement, and any remaining adoption work are documented.',
    faq: faq('an adoption-barrier register', 'The affected workflow and cohort, verbatim report, observed behavior, environment, workaround, impact, uncertainty, and owner.', 'Product and account owners decide diagnosis and priority; support can classify only under an approved rule.', 'When the owner decision and customer response are recorded and remaining adoption work is assigned.'),
    service: '/services/adoption-follow-up',
    source: { label: 'Federal Plain Language Guidelines (context for clear, testable barrier descriptions)', url: 'https://www.plainlanguage.gov/guidelines/' },
  },
  'customer-commitment-ledger': {
    headings: ['Capture the promise in its original words', 'Verify who could make the commitment', 'Track amendments across channels', 'Require acknowledgement before closure'],
    decision: 'Decide whether a customer-facing promise has a clear meaning, authorized owner, delivery evidence, and acknowledged outcome across team boundaries.',
    evidence: 'Retain the original wording, speaker, audience, channel, date, condition, due time, accountable owner, amendments, delivery record, and acknowledgement.',
    scenario: 'A meeting note says a capability will be available soon. Do not create a dated commitment until an authorized product owner confirms scope and timing.',
    boundary: 'Support can log, reconcile, and remind. Only authorized commercial, product, support, or account leaders may create or change the underlying commitment.',
    test: 'Test conflicting dates in email and CRM, an owner transfer, a conditional promise quoted without its condition, a delivery failure, and a customer who disputes closure.',
    closure: 'Close the commitment when the authorized outcome and any amendment are delivered, acknowledged, and linked to residual work rather than when a reminder task is checked off.',
    faq: faq('a customer commitment ledger', 'Original wording, conditions, speaker authority, audience, channel, due date, amendments, delivery evidence, and acknowledgement.', 'Only the authorized owner for the commercial, product, support, or account decision can create or amend the promise.', 'When the authorized outcome or amendment is delivered and acknowledged and residual work remains linked.'),
    service: '/services/knowledge-operations',
    source: { label: 'NARA records-management guidance (context for retaining versions and amendments)', url: 'https://www.archives.gov/records-mgmt/policy' },
  },
  'champion-transition-continuity': {
    headings: ['Inventory context before the departure', 'Separate relationship notes from facts', 'Invite the new champion to reconfirm', 'Reset objectives and open promises'],
    decision: 'Decide what account context can be safely transferred when a customer champion changes without treating one person’s perspective as the whole relationship.',
    evidence: 'Map objectives, active stakeholders, decision rights, open commitments, adoption patterns, communication preferences, risks, and the provenance of every relationship note.',
    scenario: 'A new champion questions priorities established by a predecessor. Preserve the prior agreement and invite fresh confirmation instead of presenting inherited assumptions as current consent.',
    boundary: 'Support can prepare continuity records and schedule approved introductions. The account owner manages relationship strategy, sensitive interpretation, and any reset of mutual commitments.',
    test: 'Test an abrupt departure, inaccessible private notes, disputed objectives, a changed executive sponsor, and personal information that is not needed for continuity.',
    closure: 'The transition is ready when the new contact, accountable internal owner, current objectives, unresolved commitments, and next confirmation point are documented.',
    faq: faq('a champion transition record', 'Current objectives, stakeholder roles, open commitments, approved preferences, risks, source provenance, and items needing reconfirmation.', 'The account owner determines relationship strategy; the new customer contact confirms current objectives and authority.', 'When contacts and decision rights are current and inherited assumptions and open commitments have explicit next steps.'),
    service: '/services/customer-onboarding-support',
    source: { label: 'NIST Privacy Framework (context for limiting relationship records to necessary information)', url: 'https://www.nist.gov/privacy-framework' },
  },
  'escalation-recovery-brief': {
    headings: ['Reconstruct the escalation trigger', 'Split technical and relationship recovery', 'Present decisions to the accountable leader', 'Document communication and correction'],
    decision: 'Decide whether an escalation brief gives the accountable leader enough verified chronology and customer impact to choose a recovery action.',
    evidence: 'Assemble the triggering event, customer wording, affected scope, known timeline, attempted actions, current system state, communication history, owners, and open decisions.',
    scenario: 'A workaround restored service but did not address the customer’s confidence concern. Treat technical recovery and relationship recovery as separate states with separate owners.',
    boundary: 'Support can reconstruct events and maintain the brief. Incident, legal, security, product, and account leaders retain diagnosis, disclosure, remedy, and commitment authority.',
    test: 'Test an incorrect account link, conflicting timestamps, a late material correction, an inaccessible incident source, and a promised update that was prepared but not delivered.',
    closure: 'Close only after the authorized recovery action, customer communication, acknowledgement, correction history, and preventive follow-up are linked.',
    faq: faq('an escalation recovery brief', 'The trigger, verified chronology, affected scope, customer wording, attempted actions, current state, owners, and open decisions.', 'Incident and account leaders decide diagnosis, disclosure, remedy, and commitments; the brief author does not.', 'When approved recovery and communication are acknowledged and corrections and preventive work have owners.'),
    service: '/services/escalation-coordination',
    source: { label: 'NIST SP 800-61r3 (context for response roles, chronology, and recovery planning, not evidence about customer outcomes)', url: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final' },
  },
  'voice-of-customer-coding': {
    headings: ['Choose the feedback observation unit', 'Preserve words before assigning codes', 'Adjudicate ambiguous and mixed comments', 'Report themes with counterexamples'],
    decision: 'Decide how to code customer feedback without losing wording, context, uncertainty, minority views, or the distinction between request and interpretation.',
    evidence: 'Keep the verbatim excerpt, permitted context, segment, product area, channel, date, coder, code version, uncertainty, counterexample, and later correction.',
    scenario: 'Several users ask for fewer steps, but their underlying workflows differ. Preserve each context before grouping the comments under one usability theme.',
    boundary: 'Support can apply an approved codebook and surface disagreement. Research and product owners define codes, resolve ambiguity, and decide what evidence supports a product conclusion.',
    test: 'Test sarcasm, translated feedback, one comment spanning several themes, a changed codebook, missing consent for reuse, and disagreement between two coders.',
    closure: 'A coded item is reviewable when another person can trace the code to the source context, uncertainty, version, and adjudication record.',
    faq: faq('voice-of-customer coding', 'The permitted verbatim excerpt, context, segment, channel, codebook version, coder, uncertainty, counterexample, and correction.', 'Research or product owners define and adjudicate codes; a coordinator applies only the approved codebook.', 'When another reviewer can trace each code to its context, version, uncertainty, and adjudication.'),
    service: '/services/knowledge-operations',
    source: { label: 'CFPB Consumer Complaint Database (contextual example of published complaint fields and caveats, not evidence about these customers)', url: 'https://www.consumerfinance.gov/data-research/consumer-complaints/' },
  },
  'customer-data-access-review': {
    headings: ['Inventory effective access, not role names', 'Match permissions to current duties', 'Time-box every exception', 'Verify removal and retain approval'],
    decision: 'Decide whether a customer success role has only the access needed for current duties and whether sensitive actions remain attributable to named people.',
    evidence: 'Inventory system, role, permission level, business purpose, approver, account scope, authentication method, last review, exceptional access, and removal trigger.',
    scenario: 'A coordinator needs to update onboarding tasks but not export billing contacts. Grant the narrower role and record the unresolved task if the platform cannot separate those capabilities.',
    boundary: 'Support can assemble access evidence and route changes. System owners, security, privacy, and customer authorities approve access and any exceptional disclosure.',
    test: 'Test a role transfer, shared credentials, dormant accounts, vendor access, emergency elevation, and an application whose displayed role does not match effective permissions.',
    closure: 'The review closes when every retained permission has a current purpose and approver, excessive access is removed or time bounded, and exceptions have owners.',
    faq: faq('a customer-data access review', 'System, effective permission, account scope, current purpose, approver, authentication method, last review, exception, and removal trigger.', 'System, security, privacy, and customer authorities approve access; support may inventory but cannot self-authorize.', 'When retained access has a current purpose and approval and excessive or exceptional access is removed or time-boxed.'),
    service: '/services/knowledge-operations',
    source: { label: 'NIST Digital Identity Guidelines (context for identity, authentication, and access controls)', url: 'https://pages.nist.gov/800-63-4/' },
  },
  'expansion-readiness-evidence': {
    headings: ['Frame readiness as a question', 'Separate use signals from buying intent', 'Surface commercial counterevidence', 'Authorize the next commercial step'],
    decision: 'Decide whether expansion readiness is supported by customer evidence or is merely an internal sales hypothesis.',
    evidence: 'Separate observed adoption, stated customer priorities, stakeholder authority, unresolved service issues, commercial timing, capacity constraints, and the origin of each inference.',
    scenario: 'Usage grows in one team while the executive sponsor freezes new spending. Preserve both signals and avoid converting product activity into a buying commitment.',
    boundary: 'Support can gather current evidence and prepare a review. The account executive and customer decision makers own qualification, pricing, proposal, and purchase decisions.',
    test: 'Test an enthusiastic nonbuyer, strong usage with open critical issues, an expired budget statement, a duplicate opportunity, and a signal based on an incomplete account segment.',
    closure: 'Readiness is reviewable when verified signals, contrary evidence, authority, timing, open risks, and the authorized commercial next step appear together.',
    faq: faq('an expansion-readiness evidence review', 'Observed use, stated priorities, stakeholder authority, budget timing, service risks, counterevidence, and the source of every inference.', 'The account executive and customer decision makers qualify and authorize commercial action; activity data alone does not.', 'When supporting and contrary evidence, authority, timing, risks, and the authorized next step are visible.'),
    service: '/services/business-review-preparation',
    source: { label: 'GAO evidence resources (context for stating evidence limits before a decision)', url: 'https://www.gao.gov/evidence-based-policymaking' },
  },
  'customer-success-director-vs-csm-va': {
    headings: ['List decisions before delegating tasks', 'Draw the director and support boundary', 'Pilot one bounded queue', 'Review exceptions before expanding'],
    decision: 'Decide which work needs a customer success director’s authority and which preparation can be assigned to a focused support role.',
    evidence: 'List recurring tasks beside required judgment, customer sensitivity, systems used, expected output, escalation path, reviewer, and acceptance criteria.',
    scenario: 'A support role can prepare a renewal chronology, but the director still owns risk interpretation, commercial alignment, and the message delivered to the customer.',
    boundary: 'Delegate retrieval, organization, approved updates, and queue maintenance. Retain strategy, policy, commitments, sensitive exceptions, coaching, and accountable decisions with qualified leaders.',
    test: 'Test ambiguous ownership, an exception outside the playbook, unavailable reviewers, conflicting source records, and a request that would expand access beyond the role brief.',
    closure: 'The role design is ready when one bounded workflow can be inspected from intake through owner acceptance without relying on private explanations.',
    faq: faq('a director-versus-support role design', 'Tasks, required judgment, customer sensitivity, systems, expected output, reviewer, escalation triggers, and acceptance criteria.', 'The customer success director retains strategy, policy, commitments, sensitive exceptions, and accountable customer decisions.', 'When one bounded workflow passes review from intake through owner acceptance and exceptions have a safe route.'),
    service: '/services/customer-onboarding-support',
    source: { label: 'NIST Privacy Framework (context for purpose-limited access in role design)', url: 'https://www.nist.gov/privacy-framework' },
  },
  'customer-onboarding-handoff': {
    headings: ['Reconcile sold scope with delivery', 'Package configuration and open work', 'Ask the receiving owner to accept', 'Set the first success milestone'],
    decision: 'Decide what must cross from sales and implementation into customer success before an account can be responsibly managed.',
    evidence: 'Collect contracted outcomes, stakeholders, scope, dependencies, configuration state, training, open issues, commitments, acceptance status, and first success milestones.',
    scenario: 'Sales notes promise a reporting outcome that is absent from the signed scope. Preserve the note as context and route the discrepancy instead of adding it to the success plan as a commitment.',
    boundary: 'Support can assemble the handoff packet and track missing inputs. Commercial, implementation, and account owners resolve scope, feasibility, and customer commitments.',
    test: 'Test a missing sponsor, conflicting launch dates, an unaccepted milestone, inaccessible configuration evidence, and an open issue incorrectly marked as post-launch work.',
    closure: 'The handoff closes when the receiving owner accepts the record, unresolved items have owners, and the customer’s next milestone is explicit.',
    faq: faq('a customer-onboarding handoff', 'Contracted outcomes, stakeholders, scope, dependencies, configuration, training, issues, commitments, acceptance, and first milestone.', 'Commercial and implementation owners resolve scope; the receiving account owner must accept the handoff.', 'When the receiving owner accepts the packet and all unresolved items and the next customer milestone have owners.'),
    service: '/services/customer-onboarding-support',
    source: { label: 'NARA records-management guidance (context for a durable, attributable handoff record)', url: 'https://www.archives.gov/records-mgmt/policy' },
  },
  'customer-health-review': {
    headings: ['Freeze the account snapshot', 'Read each signal at its own scope', 'Resolve conflicts through owner judgment', 'Schedule the next evidence refresh'],
    decision: 'Decide how an account owner should review health when signals have different scopes, dates, and reliability.',
    evidence: 'Bring together product behavior, stakeholder statements, support events, commitments, commercial timing, source freshness, and gaps without collapsing them prematurely.',
    scenario: 'A weekly login metric declines after a seasonal workflow ends. Retain the context and seek the customer’s current objective before declaring deterioration.',
    boundary: 'Support can prepare the evidence view and apply approved definitions. The account owner interprets risk, chooses interventions, and owns customer communication.',
    test: 'Test missing telemetry, changed account hierarchy, contradictory stakeholder views, an old support incident, and a score whose denominator changed.',
    closure: 'A review is complete when classification, rationale, dissenting evidence, next action, owner, and refresh date can be inspected.',
    faq: faq('a customer-health review', 'A dated account snapshot with scoped product, stakeholder, support, commitment, and commercial signals plus known gaps.', 'The account owner interprets risk and chooses action; support can prepare but not substitute a score for judgment.', 'When the owner records classification, rationale, contrary evidence, next action, and refresh date.'),
    service: '/services/customer-health-operations',
    source: { label: 'NIST AI RMF (context for monitoring limitations and retaining human judgment)', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  },
  'adoption-follow-up-queue': {
    headings: ['Define an eligible follow-up item', 'Respect prerequisites and contact preferences', 'Route blockers instead of repeating reminders', 'Close on response or a conscious stop'],
    decision: 'Decide which adoption follow-up belongs in a routine queue and which item needs product, account, or customer-owner judgment.',
    evidence: 'For each item record the target workflow, user group, observed state, approved guidance, prior contact, response, blocker, next action, owner, and due time.',
    scenario: 'A user has not completed setup because their administrator controls permissions. Route the dependency to the account owner rather than sending repeated end-user reminders.',
    boundary: 'Support can send approved education and maintain statuses. Product diagnosis, account prioritization, customer policy, and promises remain with authorized owners.',
    test: 'Test duplicate contacts, opt-out or channel preferences, inaccessible users, a stale playbook, a blocked prerequisite, and a customer reply that changes the issue.',
    closure: 'Close an item when the intended action is completed or consciously stopped, with delivery, response, blocker, owner decision, and residual work visible.',
    faq: faq('an adoption follow-up queue', 'Target workflow and cohort, observed state, approved guidance, contact history, preferences, response, blocker, owner, and due time.', 'Account, product, and customer administrators decide priorities, diagnoses, and permission changes; support follows the approved lane.', 'When follow-up is completed or deliberately stopped and delivery, response, blockers, and residual work are recorded.'),
    service: '/services/adoption-follow-up',
    source: { label: 'DOJ effective-communication guidance (context for accessible communication choices)', url: 'https://www.ada.gov/resources/effective-communication/' },
  },
  'customer-escalation-record': {
    headings: ['Open the record with customer impact', 'Build a fact-and-dispute timeline', 'Gate diagnosis and remedy by authority', 'Reopen cleanly when impact returns'],
    decision: 'Decide what an escalation record must contain so leaders can act without reconstructing the incident from scattered messages.',
    evidence: 'Retain customer wording, affected scope, chronology, known facts, disputed points, attempted actions, current impact, promised updates, authority owners, and correction history.',
    scenario: 'An internal note attributes a cause before engineering confirms it. Label that statement as an interpretation and keep it out of customer communication until an authorized owner approves it.',
    boundary: 'Support can organize evidence and monitor due actions. Diagnosis, remedy, disclosure, credits, legal positions, and relationship commitments remain with qualified owners.',
    test: 'Test an incorrect identity, contradictory timelines, sensitive attachments, an owner change, a failed update delivery, and a case reopened after apparent recovery.',
    closure: 'The record closes only when recovery, communication, acknowledgement, corrections, and preventive actions are linked to accountable owners.',
    faq: faq('a customer escalation record', 'Customer wording, affected scope, fact-and-dispute chronology, attempted actions, current impact, promised updates, owners, and corrections.', 'Qualified incident and account owners decide diagnosis, remedy, disclosure, credits, legal positions, and commitments.', 'When recovery and communication are acknowledged and corrections and preventive actions are linked to owners.'),
    service: '/services/escalation-coordination',
    source: { label: 'NIST SP 800-61r3 (context for response roles and a recoverable chronology, not evidence about customer outcomes)', url: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final' },
  },
};

function sectionsFromBrief(brief: BlogBrief): ArticleSection[] {
  return [
    { heading: brief.headings[0], paragraphs: [brief.decision, brief.scenario] },
    { heading: brief.headings[1], paragraphs: [brief.evidence, brief.boundary] },
    { heading: brief.headings[2], paragraphs: [brief.test] },
    { heading: brief.headings[3], paragraphs: [brief.closure] },
  ];
}

export function enrichBlogPost(post: BlogPost): BlogPost {
  const brief = blogBriefs[post.slug];
  return brief ? { ...post, sections: sectionsFromBrief(brief), faq: brief.faq, internalService: brief.service, source: brief.source } : post;
}

type ResearchLens = { purpose: string; questions: string[]; limits: string; subject: string };
type Source = ResearchPost['sources'][number];

const domainEvidence: Record<string, string> = {
  'customer onboarding support': 'milestone scope, prerequisite state, configuration evidence, training completion, customer approver, acceptance wording, and unresolved work',
  'customer health operations': 'usage scope, stakeholder evidence, support events, commitments, commercial timing, source freshness, and missing signals',
  'business review preparation': 'each proposed claim, metric definition, date range, denominator, source export, caveat, audience, and approving owner',
  'adoption follow up': 'target workflow, user cohort, observed state, approved guidance, contact history, response, blocker, owner, and next action',
  'knowledge operations': 'original question, approved answer, policy or product version, source owner, audience, expiry trigger, correction, and retrieval path',
  'escalation coordination': 'trigger, customer wording, affected scope, chronology, attempted actions, current impact, communication history, authority owner, and correction',
};

const focusLenses: Record<string, (domain: string, evidence: string) => ResearchLens> = {
  'workflow-boundary-review': (domain, evidence) => ({ subject: `${domain} authority boundary`, purpose: `This proposed review protocol examines where routine preparation in ${domain} must stop and an accountable owner must decide. It is a design for review, not evidence that a review has been completed.`, questions: [`Within ${domain}, which actions can follow a written rule and which change a customer commitment or interpretation?`, `Does the ${domain} record preserve ${evidence}?`, `Can a reviewer locate the precise ${domain} event where authority changed hands?`, `What safe ${domain} action applies while the authorized owner is unavailable?`], limits: `This ${domain} design can expose unclear authority and missing records. It cannot establish that this workflow is safe or effective until a declared sample is reviewed and its exclusions, disagreements, and limitations are reported.` }),
  'source-quality-audit': (domain, evidence) => ({ subject: `${domain} source quality`, purpose: `This proposed review protocol tests whether ${domain} decisions can be reconstructed from current, correctly scoped sources. It defines an audit method and does not report completed audit results.`, questions: [`Can every material ${domain} status be traced to its origin and retrieval time?`, `Are ${evidence} available without relying on copied summaries alone?`, `Do conflicting or stale ${domain} sources remain visible rather than being overwritten?`, `Can another reviewer reproduce the ${domain} evidence set from documented paths?`], limits: `The ${domain} audit measures records available to reviewers, not the truth of every customer event. A future report must freeze the ${domain} cohort, verify retrieval paths, and disclose access gaps and reproduction failures.` }),
  'exception-pattern-study': (domain, evidence) => ({ subject: `${domain} exceptions`, purpose: `This proposed review protocol is designed to classify exceptions in ${domain} without turning anecdotes into frequency claims. No exception rate or pattern is asserted until a bounded cohort is analyzed.`, questions: [`What ${domain} condition departed from the approved path, and when was it first observable?`, `Which of ${evidence} were missing, contradictory, late, or inaccessible?`, `Did the ${domain} exception require different authority, disclosure, or customer communication?`, `Which ${domain} recovery step worked, failed, or produced a new unresolved state?`], limits: `The ${domain} design can organize exception evidence, but it cannot support prevalence, trend, or causal claims without a denominator, sampling dates, exclusions, coding agreement, and reported results.` }),
  'handoff-reliability-brief': (domain, evidence) => ({ subject: `${domain} handoff reliability`, purpose: `This proposed review protocol evaluates whether ${domain} work reaches the next owner with enough context to act. It proposes reliability checks rather than claiming measured handoff performance.`, questions: [`Was the receiving ${domain} owner named, and did that person accept the transfer?`, `Did the ${domain} handoff include ${evidence}?`, `Could the next ${domain} owner identify the decision, deadline, and safe interim action?`, `Were rejected, reopened, or corrected ${domain} handoffs retained in the chronology?`], limits: `For ${domain}, message delivery is not handoff acceptance. A completed evaluation must distinguish preparation, transfer attempt, receipt, owner acceptance, action, correction, and final closure.` }),
  'review-consistency-report': (domain, evidence) => ({ subject: `${domain} review consistency`, purpose: `This proposed review protocol tests whether independent reviewers apply the same rules to ${domain} records. It is not a report of measured agreement.`, questions: [`Do ${domain} reviewers use the same observation unit and decision definitions?`, `Do both ${domain} reviewers receive ${evidence} in the same frozen evidence set?`, `Where do ${domain} classifications differ because of evidence, rule interpretation, or authority?`, `Can a named adjudicator resolve the ${domain} disagreement without private context?`], limits: `Consistent review of ${domain} does not prove correctness. A future report must publish the cohort, coding rules, agreement measure, disagreements, adjudication, exclusions, and limits on generalization.` }),
};

const octoberProtocols: Record<string, ResearchLens> = {
  'customer-health-classification-agreement-study': { subject: 'health-classification agreement', purpose: 'This proposed review protocol asks whether two reviewers classify the same account consistently when usage, relationship, support, and commercial evidence conflict. It does not report an observed agreement rate.', questions: ['Which account snapshot and review date define the observation unit?', 'How are stale, missing, or contradictory health signals coded?', 'Which classifications require account-leader judgment rather than a calculation?', 'How will reviewer disagreement and adjudication be reported?'], limits: 'A future study needs a declared account cohort, frozen evidence, classification rules, reviewer assignments, agreement measures, exclusions, and limitations before any performance claim is made.' },
  'onboarding-acceptance-evidence-study': { subject: 'onboarding-acceptance evidence', purpose: 'This proposed review protocol asks whether an onboarding milestone retains enough evidence to distinguish delivery, conditional acceptance, and unresolved work. It does not claim that milestone completeness has been measured.', questions: ['What event opens and closes one milestone record?', 'Are scope, prerequisites, configuration, training, approver, and acceptance wording linked?', 'How are conditional acceptance and reopened defects represented?', 'Can a second reviewer reproduce the acceptance state without private explanation?'], limits: 'The protocol does not establish customer acceptance, implementation quality, or completion rates until a bounded sample and reviewer results are published.' },
  'renewal-risk-signal-freshness-study': { subject: 'renewal-signal freshness', purpose: 'This proposed review protocol asks whether evidence used in renewal review was current when the decision was made. It does not report a freshness rate or renewal outcome.', questions: ['Which decision date anchors the freshness test?', 'What freshness rule applies to usage, stakeholder, support, commitment, and commercial sources?', 'How are late corrections and inaccessible sources retained?', 'Which stale signals materially changed an owner decision?'], limits: 'A future evaluation must declare its renewal cohort, source-specific age thresholds, unavailable records, outcome window, and whether freshness was associated with any decision change.' },
  'customer-commitment-closure-study': { subject: 'commitment-closure traceability', purpose: 'This proposed review protocol asks whether two reviewers can trace a customer commitment from original wording through authority, amendment, delivery, acknowledgement, and residual work. It reports no closure rate.', questions: ['What wording and condition created the commitment?', 'Who had authority to create or amend it?', 'What distinguishes attempted delivery from acknowledgement?', 'How are disputed closure and reopened work represented?'], limits: 'Traceability can be evaluated only on a declared cohort with access rules, coding guidance, independent review, and explicit treatment of missing or privacy-restricted records.' },
  'voice-of-customer-coding-reliability-study': { subject: 'voice-of-customer coding reliability', purpose: 'This proposed review protocol asks whether independent coders preserve customer wording, context, uncertainty, and counterexamples when assigning feedback themes. It does not report coding reliability.', questions: ['What is the unit when one comment contains several ideas?', 'How are paraphrase, translation, sarcasm, and missing context handled?', 'Which codebook version and allowed source context does each coder receive?', 'How are disagreement, adjudication, and codebook changes recorded?'], limits: 'A completed study would need a consent-aware sample, frozen codebook, coder training record, agreement measure, disagreement analysis, and limits on representativeness.' },
};

const contextualSources: Record<string, Source> = {
  records: { label: 'NARA records guidance — informs retention, version history, and attributable chronology controls; it does not evaluate customer-success outcomes', publisher: 'National Archives and Records Administration', url: 'https://www.archives.gov/records-mgmt/policy' },
  evidence: { label: 'Evidence-Based Policymaking — informs explicit questions, evidence limits, and reporting discipline; it does not validate this protocol', publisher: 'U.S. Government Accountability Office', url: 'https://www.gao.gov/evidence-based-policymaking' },
  plain: { label: 'Federal Plain Language Guidelines — informs understandable instructions and review questions; inclusion is not an endorsement', publisher: 'PlainLanguage.gov', url: 'https://www.plainlanguage.gov/guidelines/' },
  privacy: { label: 'Privacy Framework — informs purpose limitation and data-minimization checks; it does not establish protocol effectiveness', publisher: 'National Institute of Standards and Technology', url: 'https://www.nist.gov/privacy-framework' },
  ai: { label: 'AI Risk Management Framework — informs validity, limitation, monitoring, and human-oversight questions for classifications; it reports no result here', publisher: 'National Institute of Standards and Technology', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  incident: { label: 'NIST SP 800-61r3 — informs response roles, chronology, escalation, and recovery controls; it is contextual guidance, not evidence about customer outcomes', publisher: 'National Institute of Standards and Technology', url: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final' },
  access: { label: 'Digital Identity Guidelines — informs identity, authentication, and access-control questions; it does not certify this workflow', publisher: 'National Institute of Standards and Technology', url: 'https://pages.nist.gov/800-63-4/' },
  communication: { label: 'Effective Communication — informs accessible communication and channel checks; it does not assess this service', publisher: 'U.S. Department of Justice', url: 'https://www.ada.gov/resources/effective-communication/' },
  complaints: { label: 'Consumer Complaint Database — provides a contextual example of structured complaint fields and published caveats; it is not evidence about these customers', publisher: 'Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/data-research/consumer-complaints/' },
};

const domainSourceKeys: Record<string, string[]> = {
  'customer onboarding support': ['records', 'plain'],
  'customer health operations': ['ai', 'evidence'],
  'business review preparation': ['evidence', 'records'],
  'adoption follow up': ['communication', 'plain'],
  'knowledge operations': ['records', 'plain'],
  'escalation coordination': ['incident', 'records'],
};
const lensSourceKey: Record<string, string> = { 'workflow-boundary-review': 'privacy', 'source-quality-audit': 'records', 'exception-pattern-study': 'incident', 'handoff-reliability-brief': 'plain', 'review-consistency-report': 'evidence' };
const octoberSourceKeys: Record<string, string[]> = {
  'customer-health-classification-agreement-study': ['ai', 'evidence', 'privacy'],
  'onboarding-acceptance-evidence-study': ['records', 'plain', 'privacy'],
  'renewal-risk-signal-freshness-study': ['records', 'evidence'],
  'customer-commitment-closure-study': ['records', 'plain'],
  'voice-of-customer-coding-reliability-study': ['complaints', 'evidence', 'privacy'],
};

function legacyProtocol(slug: string): { lens: ResearchLens; domain: string; focus: string } | undefined {
  const match = slug.match(/^(.*?)-(workflow-boundary-review|source-quality-audit|exception-pattern-study|handoff-reliability-brief|review-consistency-report)-\d+$/);
  if (!match) return undefined;
  const domain = match[1].replaceAll('-', ' ');
  const evidence = domainEvidence[domain];
  const factory = focusLenses[match[2]];
  return evidence && factory ? { lens: factory(domain, evidence), domain, focus: match[2] } : undefined;
}

function uniqueSources(keys: string[]): Source[] {
  return [...new Set(keys)].map((key) => contextualSources[key]).filter(Boolean);
}

export type ResearchPresentation = { label: string; takeaway: string; sections: ArticleSection[]; methodology: string[] };
export function researchPresentation(post: ResearchPost): ResearchPresentation {
  const legacy = legacyProtocol(post.slug);
  const lens = octoberProtocols[post.slug] ?? legacy?.lens;
  if (!lens) return { label: 'Proposed review protocol', takeaway: `This proposed review protocol requires editorial review before use. It reports no completed study or customer outcome.`, sections: [{ heading: 'Scope awaiting review', paragraphs: [post.summary] }], methodology: [] };
  return {
    label: 'Proposed review protocol',
    takeaway: lens.purpose,
    sections: [
      { heading: `Purpose of the ${lens.subject} protocol`, paragraphs: [lens.purpose, lens.limits] },
      { heading: `Review questions for ${lens.subject}`, paragraphs: lens.questions },
    ],
    methodology: [],
  };
}

export function enrichResearchPost(post: ResearchPost): ResearchPost {
  const presentation = researchPresentation(post);
  const legacy = legacyProtocol(post.slug);
  const sourceKeys = octoberSourceKeys[post.slug] ?? (legacy ? [...domainSourceKeys[legacy.domain], lensSourceKey[legacy.focus]] : []);
  return { ...post, summary: presentation.takeaway, finding: presentation.takeaway, findings: undefined, methodology: undefined, sources: uniqueSources(sourceKeys) };
}
