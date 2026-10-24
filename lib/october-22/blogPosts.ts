import type { BlogPost } from '../types';
export const october22BlogPosts: BlogPost[] = [
  {
    "slug": "onboarding-kickoff-evidence-gate",
    "title": "Running an Onboarding Kickoff as an Evidence Gate",
    "description": "A practical method for turning the onboarding kickoff into a recorded evidence gate with named owners, dated commitments, and an inspectable acceptance state.",
    "category": "Customer onboarding",
    "publishedAt": "2026-10-22",
    "readTime": "10 min read",
    "image": "/october-22/onboarding-kickoff-evidence-gate.webp",
    "sections": [
      {
        "heading": "Why the kickoff should produce evidence",
        "paragraphs": [
          "An onboarding kickoff usually ends with a shared screen, a friendly agreement, and a promise to follow up. That is a meeting, not a handoff. An evidence gate treats the kickoff as the moment when the customer, the implementation owner, and the CSM agree on what will be true at acceptance, who confirms it, and which record proves it.",
          "The gate matters most when a launch date is already fixed. Delivery pressure rewards optimism, and optimism quietly converts unverified assumptions into scope. A short checklist resists that drift by forcing the team to write the contracted outcome, the open prerequisites, the named approver, and the exact acceptance wording before anyone builds a timeline."
        ]
      },
      {
        "heading": "Name acceptance criteria before the call",
        "paragraphs": [
          "Acceptance criteria should be observable from the customer side. Admin console configured is weak because nobody can test it. Two named administrators can create a workspace, invite a user, and export a report in the production tenant can be observed, reproduced, and disputed. Each criterion needs a source, a verifier, and a stated tolerance for partial completion.",
          "Write the criteria into the kickoff agenda rather than an appendix. The implementation owner checks technical feasibility, the CSM checks that the wording matches the sold outcome, and the customer approver confirms the standard is fair. A criterion nobody can agree becomes an open item with an owner and a date, not a silent assumption carried into week six."
        ]
      },
      {
        "heading": "Assign the five kickoff records",
        "paragraphs": [
          "Five artifacts carry the gate: contracted outcome, prerequisite list, stakeholder and authority map, acceptance criteria, and exception log. Each has one owner in the customer success platform, a version, and a last updated field. The CSM owns the packet, the implementation owner owns technical prerequisites, and the customer approver owns the acceptance wording.",
          "Keep the packet in one place. If the contract lives in a document store, the prerequisites in a project tool, and the acceptance wording in an email thread, the first disagreement sends three people to three systems. A single record with linked sources turns a two day reconstruction into a five minute status check."
        ]
      },
      {
        "heading": "Ask each owner for a dated commitment",
        "paragraphs": [
          "Every kickoff action needs a verb, a name, and a date with a timezone. Data team to provide SSO metadata becomes Priya Raman, customer identity lead, uploads IdP metadata to the shared folder by 14:00 Eastern on the fourth business day. The date is not a forecast. It is the point when the CSM checks and escalates if the item is absent.",
          "Read commitments back before the call ends. The CSM states the action, owner, and date, and the owner confirms or corrects it on the record. That thirty second loop prevents the most common kickoff failure, which is a task list full of names attached to work those people never agreed to do."
        ]
      },
      {
        "heading": "Handle the missing attendee exception",
        "paragraphs": [
          "A kickoff without the customer security lead or data owner is a briefing, not a kickoff. If a required authority is absent, record the absence and the reason, and do not mark the gate passed. The packet moves to conditional, the CSM names a deputy who can speak to the missing area, and the milestone date holds only if that deputy accepts in writing within two business days.",
          "The same rule applies to internal owners. A vacation is not a reason to let a prerequisite float. Name a backup with equivalent authority, record the delegation in the packet, and set a date for the original owner to reconfirm. Undeclared coverage is how acceptance criteria get weakened by people who were never accountable for them."
        ]
      },
      {
        "heading": "Separate verbal agreement from recorded acceptance",
        "paragraphs": [
          "Customers agree in meetings for reasons unrelated to readiness. They want to be helpful, the room is friendly, and the launch date is already on a slide. Recorded acceptance is different: the named approver states which criteria are met, which are conditionally met, and which are not met, with every condition written out.",
          "The CSM should never paraphrase acceptance into a status field. Quote the approver, link the message, and note the channel and timestamp. When the customer says we are good to go but reporting needs a workaround, that is conditional acceptance of the milestone with an open reporting exception, not a green status."
        ]
      },
      {
        "heading": "Test the gate on a stalled prerequisite",
        "paragraphs": [
          "Before the gate goes live, run it against a prerequisite that is already late. The test asks who notices, who escalates, what the customer is told, and what happens to the launch date. If the answer is that the CSM chases it, the process is a person rather than a control.",
          "Add thresholds. A prerequisite more than two business days late moves to the weekly risk review. More than five business days late triggers a written note to the customer sponsor with impact, options, and the decision required. Thresholds make escalation predictable, and predictability is what customers want most during a launch."
        ]
      },
      {
        "heading": "Set the review cadence and escalation path",
        "paragraphs": [
          "The packet is reviewed at kickoff, mid-implementation, and acceptance. Each review has a fixed agenda of five fields, so the conversation stays on evidence rather than narrative. The CSM updates the packet beforehand and the implementation owner confirms technical status inside the meeting rather than afterwards.",
          "Escalation runs on a named path, not a group chat. First stop is the implementation owner, second the customer success lead, third the customer sponsor. Each step has a one business day response expectation and a written summary of what changed. The path is published in the packet so nobody has to guess who to call at quarter end."
        ]
      },
      {
        "heading": "Close with a reproducible evidence packet",
        "paragraphs": [
          "A kickoff closes when the packet holds the agreed criteria, dated commitments, authority map, exception log, and acceptance state. The CSM sends a one page summary to the customer approver and asks for confirmation of the criteria only, not the entire plan. Confirmation is stored beside the packet with its timestamp.",
          "The final check is reproduction. A colleague who was not on the call should be able to open the packet and answer four questions: what was promised, what is still open, who decides, and when the next review happens. If any answer needs a private conversation, the gate has not closed and the onboarding record is still a draft."
        ]
      }
    ],
    "faq": [
      {
        "q": "What belongs in the kickoff evidence packet?",
        "a": "Contracted outcome, prerequisites with owners and dates, stakeholder authority map, testable acceptance criteria, exception log, and the recorded acceptance state."
      },
      {
        "q": "Who may change acceptance criteria after kickoff?",
        "a": "The customer approver and implementation owner jointly, with the change recorded as a versioned amendment and the affected milestone date recalculated."
      },
      {
        "q": "When is the kickoff gate complete?",
        "a": "When criteria are agreed, commitments are dated, required authorities are present or formally delegated, and a non-attendee can reproduce the state from the record."
      },
      {
        "q": "What happens when a prerequisite misses its date?",
        "a": "At two business days late it enters the weekly risk review. At five business days the customer sponsor receives a written note with impact, options, and the decision required."
      }
    ],
    "internalService": "/services/customer-onboarding-support",
    "internalSibling": "/blog/success-plan-assumption-review",
    "source": {
      "label": "NARA records management guidance (context for retaining an attributable acceptance record)",
      "url": "https://www.archives.gov/records-mgmt/policy"
    }
  },
  {
    "slug": "health-signal-freshness-review",
    "title": "Reviewing Health Signals for Freshness Before Weighting",
    "description": "How customer success teams date every health signal, set source-specific freshness rules, and keep stale evidence visible instead of silently averaging it into a score.",
    "category": "Health systems",
    "publishedAt": "2026-10-22",
    "readTime": "11 min read",
    "image": "/october-22/health-signal-freshness-review.webp",
    "sections": [
      {
        "heading": "Freshness is a property of each signal",
        "paragraphs": [
          "A health score is an average of evidence collected at different times. Product telemetry may be minutes old, a support ticket may be three weeks old, and a sponsor comment may date from the last business review. Averaging those inputs without dates produces a number that looks current and describes no particular week.",
          "Freshness review treats each signal as a dated claim. Before weighting anything, the CSM records the event time, the retrieval time, the timezone, and the source system for every input. The purpose is not to perfect the score. It is to prevent a stale input from dominating a decision that will be defended in a customer conversation."
        ]
      },
      {
        "heading": "Set source-specific age thresholds",
        "paragraphs": [
          "Different sources decay at different rates. Usage data older than seven days should not be described as current adoption. Support history older than thirty days should not be presented as an active risk. Stakeholder sentiment older than one review cycle should be treated as reported history, not present attitude.",
          "Write the thresholds into the health definition, not into individual judgment. When a signal exceeds its threshold, the platform marks it stale and the CSM must either refresh it or state the limitation in the account note. A threshold everyone can inspect is fairer than a rule applied only when someone remembers."
        ]
      },
      {
        "heading": "Separate event time from load time",
        "paragraphs": [
          "Most confusion comes from conflating when something happened with when the warehouse received it. A nightly job that fails on Friday and backfills on Monday makes a Saturday event look new. The review should record both timestamps and display the event time in the customer timezone and the analysis timezone.",
          "When the two diverge by more than the source threshold, treat the input as late rather than fresh. Label the gap. A late signal can still inform the review, but it cannot be used to claim that a condition is current, and it should not trigger an automated playbook on its own."
        ]
      },
      {
        "heading": "Keep disagreement visible in the review",
        "paragraphs": [
          "A single account often carries contradictory evidence. Usage grows while the executive sponsor raises a concern about value. Two business units report opposite experiences. The review should present both states side by side with their dates rather than collapsing them into one color.",
          "The CSM writes a short conflict note: signal A, signal B, what each measures, and which decision depends on the difference. The account owner resolves the conflict in the review and records the rationale. That note is more useful to the next reviewer than any score, because it shows where the judgment actually happened."
        ]
      },
      {
        "heading": "Record the scoring version and exclusions",
        "paragraphs": [
          "Health calculations change. A denominator gets redefined, a segment is excluded, a weight is adjusted after a bad quarter. Without a version, a chart that moves in March cannot be compared with a chart from January. The review records the calculation version beside every classification.",
          "Exclusions deserve the same treatment. If inactive seats were removed from an adoption rate, the note says so and states the size of the excluded group. Exclusions are legitimate when declared. They become misleading when the resulting trend is presented as comparable to a prior period that used a different base."
        ]
      },
      {
        "heading": "Route stale signals before the meeting",
        "paragraphs": [
          "The CSM should not discover a stale source during the review. Two business days before the session, the platform lists every account where a required signal exceeds its threshold. The CSM refreshes what can be refreshed and flags what cannot, with a reason.",
          "Unrefreshable signals get an owner and a date. Telemetry blocked by a customer firewall goes to the technical account manager. A sponsor conversation that has not happened goes to the account owner with a proposed date. The review then starts with known gaps rather than discovering them in front of the customer."
        ]
      },
      {
        "heading": "Translate freshness into customer language",
        "paragraphs": [
          "Internal freshness rules should not leak into customer conversations as jargon. Instead of saying the adoption figure is stale, say the last complete usage export covers the four weeks ending on the fifteenth and the current month is still reconciling. That is specific, checkable, and honest.",
          "The same discipline applies to success plans. When a health classification changes, the customer should hear which evidence changed, on what date, and what the team plans to check next. A classification without its evidence invites the customer to treat the score as an opinion."
        ]
      },
      {
        "heading": "When a source goes dark",
        "paragraphs": [
          "A source can stop updating without raising an error. The dashboard keeps showing the last successful load while the freshness marker quietly ages. Add a heartbeat check that compares the latest event time with the expected cadence, and treat a missed window as missing data rather than as a stable value.",
          "When a source is dark, the CSM records the outage, the affected accounts, the fallback source, and the date the gap began. Customer communication states what is known and what is not. A health conversation built on a silent outage is worse than one that admits the number is unavailable this week."
        ]
      },
      {
        "heading": "Review the review itself each quarter",
        "paragraphs": [
          "Once a quarter, sample ten accounts and check whether the freshness rules were applied. Count how many classifications rested on a signal beyond its threshold, how many conflicts were recorded, and how many stale inputs were refreshed before the meeting rather than after.",
          "Use the sample to adjust thresholds and data contracts, not to grade individuals. If the same source is chronically late, the problem is the pipeline. If the same step is skipped under pressure, the problem is the checklist. Both are fixable, and both stay invisible when only the final score is reviewed."
        ]
      }
    ],
    "faq": [
      {
        "q": "What timestamps must a health signal carry?",
        "a": "Event time, retrieval time, source system, and timezone. Event time drives the freshness rule; retrieval time explains late or backfilled data."
      },
      {
        "q": "Who sets the freshness thresholds?",
        "a": "The customer success operations lead with the account leadership team, documented in the health definition and reviewed each quarter against sampled accounts."
      },
      {
        "q": "How should a stale signal be handled in a review?",
        "a": "Refresh it before the meeting when possible. Otherwise label it stale, name the gap owner and date, and do not describe it as current evidence."
      },
      {
        "q": "Does a stale signal invalidate the health classification?",
        "a": "Not automatically, but the classification must state which inputs were stale and how the owner's judgment accounted for the gap."
      }
    ],
    "internalService": "/services/customer-health-operations",
    "internalSibling": "/blog/customer-call-note-standard",
    "source": {
      "label": "IANA time zone database (context for recording event time and timezone offsets)",
      "url": "https://www.iana.org/time-zones"
    }
  },
  {
    "slug": "qbr-action-log-closure",
    "title": "Closing the Loop on QBR Action Logs",
    "description": "A working method for keeping quarterly business review actions traceable from the customer request to verified closure, with owners, dates, and evidence standards.",
    "category": "Business reviews",
    "publishedAt": "2026-10-22",
    "readTime": "10 min read",
    "image": "/october-22/qbr-action-log-closure.webp",
    "sections": [
      {
        "heading": "The action log is the deliverable",
        "paragraphs": [
          "A quarterly business review produces slides, a discussion, and a list of things people agreed to do. The slides are forgotten within a week. The action log is what the customer experiences between reviews, so it deserves the preparation time that usually goes into the deck.",
          "Treat the log as a small contract. Each line states what will change, who owns it on each side, when it is due, and how both parties will know it happened. Without those four fields, an action is a sentiment with a deadline attached."
        ]
      },
      {
        "heading": "Write actions as observable outcomes",
        "paragraphs": [
          "Improve reporting adoption is not an action. It is an aspiration. A testable version names the report, the audience, the current count, the target state, and the date: finance analysts open the weekly margin report at least twice in the four weeks after enablement, confirmed by the product analytics export.",
          "Not every QBR action can be measured that cleanly, and that is fine. When the outcome is qualitative, name the artifact that will demonstrate it. A documented workflow, an approved configuration, or a recorded training session is evidence. A promise to keep an eye on it is not."
        ]
      },
      {
        "heading": "Split ownership across the two sides",
        "paragraphs": [
          "Every action needs a customer owner and an internal owner, even when only one side does the work. The customer owner confirms the outcome matters and accepts the result. The internal owner delivers or coordinates. One name per side prevents the quiet assumption that the CSM will chase the customer into compliance.",
          "Where authority sits elsewhere, record the authority rather than the proxy. If the customer's security review must approve a configuration, the owner is the security lead, not the well meaning administrator who attends the QBR. Naming the real owner early saves a month of reminders."
        ]
      },
      {
        "heading": "Carry prior actions into the next review",
        "paragraphs": [
          "The first agenda item of every QBR should be the previous action log, not the new value story. For each open action, the review states the current state, the evidence, the reason for any delay, and the revised date. Actions that quietly disappear between quarters teach the customer that the log is decorative.",
          "Close actions with evidence, not status changes. Completed means the artifact exists and the customer owner has seen it. If an action was completed internally but never delivered, it is still open. If it was delivered and the customer chose not to adopt it, the action is closed as declined, with that decision recorded."
        ]
      },
      {
        "heading": "Handle the blocked and the obsolete",
        "paragraphs": [
          "Some actions stop because a dependency failed, a priority changed, or the original problem no longer exists. Each case needs its own disposition: blocked with a named dependency, deferred with a decision date, or retired with a reason. Retiring an action is legitimate when both owners agree and the rationale is written down.",
          "Obsolete actions are the most common source of QBR cynicism. A line that has rolled forward for three quarters without movement tells the customer that nobody is paying attention. The review should force a decision on any action older than two cycles: recommit, renegotiate, or retire."
        ]
      },
      {
        "heading": "Set a closure standard per action type",
        "paragraphs": [
          "Different action types need different proof. A configuration change closes with a settings export and a customer confirmation. A training action closes with attendance and an assessment or a recorded walkthrough. A process action closes with the updated document and the date it took effect.",
          "Publish the closure standard in the log template. When the standard is visible at creation, nobody argues about it at closure. The CSM checks the evidence, the customer owner confirms, and the line moves to closed with the artifact linked rather than described. The log also records actions the customer declined, because a decision not to act deserves the same visibility as a completed task."
        ]
      },
      {
        "heading": "Run a two week mid cycle check",
        "paragraphs": [
          "Quarterly cadence is too slow for action management. Two weeks after the review, the CSM reviews every open line and contacts owners only where the date is at risk. The check takes twenty minutes per account and prevents the end of quarter scramble where half the log is marked complete without evidence.",
          "Use the check to update the customer in one short message: what moved, what is at risk, and what decision is needed. A brief, regular update is more credible than a polished summary written the night before the next QBR."
        ]
      },
      {
        "heading": "Design the log for the customer",
        "paragraphs": [
          "The customer should receive the action log as a standalone document, not a screenshot inside a deck. Use the same columns every quarter, sort by due date, and include a status line a sponsor can read without translation. Internal shorthand and ticket identifiers belong in a separate column.",
          "Where an action depends on a technical detail, add a one sentence explanation in customer language. The sponsor who approves the next phase does not need the ticket number, but they do need to know whether the change alters their team's daily work. The log is a communication artifact as much as a tracking tool."
        ]
      },
      {
        "heading": "Report closure honestly in the review",
        "paragraphs": [
          "The QBR should show four numbers: actions created, actions closed with evidence, actions open within date, and actions overdue. Resist the temptation to report a single completion percentage, because it hides the difference between an action delivered and an action merely marked done.",
          "When closure is low, say why. A quarter with three overdue actions caused by a customer reorganisation is a different story from a quarter with three overdue actions caused by unclear ownership. The first needs patience, the second needs a process change, and the log should make the difference visible."
        ]
      }
    ],
    "faq": [
      {
        "q": "What fields does a QBR action need?",
        "a": "Observable outcome, customer owner, internal owner, due date with timezone, evidence standard, current state, dependency, and disposition history."
      },
      {
        "q": "Who closes an action?",
        "a": "The internal owner supplies evidence and the customer owner confirms the outcome. The CSM records closure but does not self certify delivery."
      },
      {
        "q": "What happens to actions that keep rolling forward?",
        "a": "Any action older than two review cycles requires an explicit decision to recommit, renegotiate the date, or retire it with a written reason."
      },
      {
        "q": "How should completion be reported?",
        "a": "Report created, closed with evidence, open within date, and overdue separately. A single percentage obscures the difference between delivery and status updates."
      }
    ],
    "internalService": "/services/business-review-preparation",
    "internalSibling": "/blog/expansion-signal-verification",
    "source": {
      "label": "NARA records management guidance (context for keeping a versioned action log)",
      "url": "https://www.archives.gov/records-mgmt/policy"
    }
  },
  {
    "slug": "renewal-risk-routing-sla",
    "title": "Routing Renewal Risk on a Dated Service Level",
    "description": "How to move renewal risk from scattered account notes into a named commercial owner with response times, evidence requirements, and a recorded acceptance.",
    "category": "Renewals",
    "publishedAt": "2026-10-22",
    "readTime": "11 min read",
    "image": "/october-22/renewal-risk-routing-sla.webp",
    "sections": [
      {
        "heading": "Risk routing is a handoff, not an alert",
        "paragraphs": [
          "Most renewal risk is discovered by a CSM in a conversation and then expressed as a message in a channel. The message is seen, acknowledged, and gradually buried. Routing turns that moment into a handoff with a receiving owner, a response expectation, and a record that survives the week.",
          "The distinction matters because a risk alert has no consequence when ignored. A routed risk does. Someone has accepted responsibility for the next action, and the record shows whether that acceptance happened within the agreed time."
        ]
      },
      {
        "heading": "Define what qualifies as routable risk",
        "paragraphs": [
          "Not every concern is a renewal risk. Write three or four qualifying conditions: an explicit statement about value, budget, or alternatives; a material change in sponsor authority; a repeated unresolved support failure affecting a critical workflow; or a procurement event inside the renewal window.",
          "Qualification protects the commercial team from noise and protects the CSM from being ignored. When a risk meets a condition, the CSM routes it. When it does not, the concern stays in the account plan with a review date. The rule should be written down so the decision does not depend on how alarming the message sounds."
        ]
      },
      {
        "heading": "Capture the evidence before the route",
        "paragraphs": [
          "A routed risk needs the customer statement in their own words, the date, the speaker and their role, and the context in which it was said. Add the current contract dates, the products in scope, the open commitments, and any support history that bears on the concern.",
          "Separate observation from inference in the record. The customer said they are evaluating an alternative is an observation. The account is likely to churn is an inference, and it belongs in a labelled field. When the two are mixed, the commercial owner cannot tell what is known from what is feared."
        ]
      },
      {
        "heading": "Name the receiving owner and the SLA",
        "paragraphs": [
          "Each risk type has a default receiving owner: commercial risk to the account executive, technical blockage to the solutions lead, support confidence to the support manager. The CSM may route to a named individual, but the role mapping is published so nobody hunts for a name at the end of the quarter.",
          "The service level is short and specific. The receiving owner acknowledges within one business day, records an initial assessment within three, and states the next customer contact within five. Acknowledging means accepting the handoff in the system, not replying with a thumbs up in a chat."
        ]
      },
      {
        "heading": "Reject and reassign without losing the record",
        "paragraphs": [
          "Sometimes the receiving owner believes the risk is miscategorised or belongs elsewhere. That is a legitimate response, provided it is recorded with a reason and a new destination. A silent rejection is not. The record should show who held the risk at every point.",
          "Reassignment keeps the original evidence intact and adds the new owner, the reason, and the time. The CSM is notified so the customer does not hear two different stories from two functions. Nothing erodes confidence faster than a customer repeating a concern to a CSM who believes it was already with the commercial team."
        ]
      },
      {
        "heading": "Keep customer communication on one track",
        "paragraphs": [
          "Routing does not transfer the relationship. The CSM usually remains the customer's main contact, while the commercial owner handles negotiation and commercial options. Both need the same view of what has been said, promised, and declined.",
          "Before any commercial conversation, the CSM and the receiving owner agree on who says what. That includes who acknowledges the concern, who discusses pricing, and who follows up in writing. Customers notice inconsistency, and inconsistency during a renewal reads as disorganisation."
        ]
      },
      {
        "heading": "Set escalation for missed response times",
        "paragraphs": [
          "A missed acknowledgement escalates to the commercial leader after one business day. A missed assessment escalates after three. The escalation is automatic in the workflow, not dependent on the CSM remembering to complain, because the CSM is usually the person with the least organisational power in the exchange.",
          "Escalation should also trigger a customer-facing interim message. If the commercial assessment is late, the CSM still tells the customer what is happening and when they will hear next. Silence during a renewal is interpreted as avoidance, whether or not that is fair."
        ]
      },
      {
        "heading": "Reconcile renewal dates across systems",
        "paragraphs": [
          "Renewal dates rarely agree across the CRM, the billing system, and the signed contract. Before routing risk, confirm the notice period, the effective end date, and any auto renewal clause against the contract. Routing against the wrong date produces either a rushed negotiation or a missed window.",
          "Record the authoritative source and the date it was checked. When billing and contract disagree, the contract governs and the discrepancy becomes a data fix with an owner. The CSM should not have to arbitrate between systems during a customer conversation. A wrong date also changes who is responsible for the notice, which is often the difference between a managed renewal and a surprise."
        ]
      },
      {
        "heading": "Review routed risks weekly",
        "paragraphs": [
          "The weekly renewal review looks at four things: new routes, unacknowledged routes, risks without a customer contact in seven days, and risks that changed category. The meeting is short because the record already holds the detail.",
          "Close a routed risk when the commercial owner records the outcome and the customer communication is complete. Until then, the risk stays open regardless of how the negotiation is progressing. Optimism is not a closure state, and a risk closed too early tends to reappear without its history. The weekly list shows age, owner, and last customer contact so a quiet risk cannot hide inside a long queue."
        ]
      }
    ],
    "faq": [
      {
        "q": "What qualifies a concern for renewal risk routing?",
        "a": "An explicit statement about value, budget, or alternatives; a material sponsor authority change; a repeated critical support failure; or a procurement event inside the renewal window."
      },
      {
        "q": "What response times apply?",
        "a": "Acknowledge within one business day, record an initial assessment within three, and state the next customer contact within five."
      },
      {
        "q": "Who owns the customer relationship after routing?",
        "a": "The CSM normally remains the primary contact. The receiving commercial owner leads negotiation and commercial options, with one agreed communication plan."
      },
      {
        "q": "When can a routed risk be closed?",
        "a": "Only when the commercial owner records the outcome and the customer communication is complete, not when the negotiation appears to be improving."
      }
    ],
    "internalService": "/services/customer-health-operations",
    "internalSibling": "/blog/account-hierarchy-crm-hygiene",
    "source": {
      "label": "NIST Cybersecurity Framework 2.0 (context for risk identification, not a measure of renewal outcome)",
      "url": "https://www.nist.gov/cyberframework"
    }
  },
  {
    "slug": "adoption-followup-segmentation",
    "title": "Segmenting Adoption Follow-Up by Blocker Type",
    "description": "A segmentation model that routes adoption follow-up by the actual blocker, so reminders stop repeating and the right owner receives the dependency.",
    "category": "Adoption operations",
    "publishedAt": "2026-10-22",
    "readTime": "10 min read",
    "image": "/october-22/adoption-followup-segmentation.webp",
    "sections": [
      {
        "heading": "Why one reminder queue fails",
        "paragraphs": [
          "A single adoption queue treats every inactive user as someone who needs a nudge. In practice, people are inactive for reasons that have nothing to do with motivation. They lack a permission, the workflow does not fit their job, they never learned the feature, or the work is simply not a priority this quarter.",
          "Sending the same reminder to all four groups produces predictable results. The blocked user cannot act, the misfit user becomes irritated, the untrained user stays confused, and the low priority user learns to ignore the product team. Segmentation is not personalisation theatre. It is the minimum condition for follow-up that respects the customer's time."
        ]
      },
      {
        "heading": "Classify the blocker before the message",
        "paragraphs": [
          "Classification uses three inputs: observed product state, a short customer statement, and the account's administrative context. The CSM records the blocker category, the evidence, the date, and the confidence. When evidence is thin, the category is unverified and the first action is a question, not a campaign.",
          "The four categories are access, workflow fit, awareness, and priority. Each has a default owner, a default first action, and an exit condition. A category can change after contact, and the change is recorded so the queue reflects what was learned rather than what was assumed at import."
        ]
      },
      {
        "heading": "Access and permission blockers",
        "paragraphs": [
          "Access blockers show up as repeated failed logins, missing role assignments, or a user who can see the product but not the workflow. The owner is usually the customer administrator, not the end user. The CSM confirms the required role, the approval path, and the person who can grant it.",
          "The follow-up message asks the administrator for a specific change by a specific date and copies the end user so they know why nothing has happened. If the customer's security policy prevents the change, the item becomes a documented constraint with a product or process workaround rather than a reminder loop."
        ]
      },
      {
        "heading": "Workflow fit blockers",
        "paragraphs": [
          "Workflow fit means the feature exists but does not match how the team actually works. Perhaps the approval step sits in a different system, or the report needs a field the team does not maintain. These are product and process conversations, and they belong with the account owner and solutions lead.",
          "The CSM documents the current workflow, the point of friction, the workaround in use, and the impact in hours or errors. That record goes to the product feedback channel with a customer reference, while the customer receives an honest statement about what can change now and what cannot. No reminder campaign fixes a workflow mismatch."
        ]
      },
      {
        "heading": "Awareness and training blockers",
        "paragraphs": [
          "Awareness blockers are genuine gaps: the user has access, the workflow fits, but nobody showed them the sequence or the feature changed since their last training. The evidence is a completed login with no action, or a support question that the documentation already answers.",
          "The first action is a targeted resource, not a meeting. Send the specific two minute walkthrough for the exact task, with a date for a short check-in. Track whether the resource was opened and whether the task was attempted. If two contacts produce no movement, reclassify rather than sending a third reminder."
        ]
      },
      {
        "heading": "Priority and value blockers",
        "paragraphs": [
          "Priority blockers are the most common and the least comfortable. The customer knows how to use the product and has chosen to do something else. More education will not help. The useful question is whether the original business objective still matters and who owns it now.",
          "Route these to the account owner with the objective, the last sponsor conversation, and the evidence of deprioritisation. The outcome may be a revised success plan, a smaller scope, or an honest pause. Treating a priority blocker as a training problem wastes the customer's attention and damages the CSM's credibility."
        ]
      },
      {
        "heading": "Give each segment its own playbook",
        "paragraphs": [
          "A playbook names the trigger, the first action, the owner, the wait time, the escalation, and the exit condition. Access waits two business days for the administrator before escalating to the account owner. Awareness waits five business days after the resource before a check-in. Priority waits until the next scheduled business review unless the renewal window is close.",
          "Playbooks should be short enough to read in a queue view. If a CSM has to open a document to know what to do next, the segmentation has added work rather than removed it. Put the first action and the owner in the queue columns."
        ]
      },
      {
        "heading": "Measure segment health, not message volume",
        "paragraphs": [
          "Counting messages sent tells you about activity. Counting resolved blockers tells you about outcomes. For each segment, report items opened, items resolved, items reclassified, median days to resolution, and items paused with a reason.",
          "Reclassification is a useful signal, not a failure. A high rate from awareness to priority suggests the initial diagnosis was too generous. A high rate from access to workflow fit suggests the permission model is masking a deeper problem. Review the transitions monthly and adjust the classification rules."
        ]
      },
      {
        "heading": "Review exclusions and opt-outs",
        "paragraphs": [
          "Every queue needs a suppression rule. Users who asked not to be contacted, accounts in a legal dispute, and contacts on leave should not receive automated follow-up. The suppression list is reviewed weekly and cleared when the reason expires.",
          "Record the reason and the review date for each suppression. A permanent opt-out is a customer decision and should be respected. A temporary exclusion tied to an event should end when the event ends, otherwise the account silently drops out of adoption coverage and nobody notices until the renewal."
        ]
      }
    ],
    "faq": [
      {
        "q": "What are the four blocker categories?",
        "a": "Access and permission, workflow fit, awareness and training, and priority and value. Each has a default owner, first action, wait time, and exit condition."
      },
      {
        "q": "Who owns an access blocker?",
        "a": "The customer administrator grants the permission. The CSM coordinates the request and confirms the change, but cannot self authorise access."
      },
      {
        "q": "When should an item be reclassified?",
        "a": "When new evidence shows the original cause was wrong, or when two contacts produce no movement. Record the reason and the new category."
      },
      {
        "q": "How is segment performance reviewed?",
        "a": "Monthly, using items opened, resolved, reclassified, median days to resolution, and paused items with reasons."
      }
    ],
    "internalService": "/services/adoption-follow-up",
    "internalSibling": "/blog/customer-education-content-lifecycle",
    "source": {
      "label": "CISA Secure Our World (context for audience-specific awareness content)",
      "url": "https://www.cisa.gov/secure-our-world"
    }
  },
  {
    "slug": "escalation-timeline-reconstruction",
    "title": "Reconstructing an Escalation Timeline That Holds Up",
    "description": "A chronology method for escalations that keeps customer wording, system events, and corrections in order so accountable leaders can act on verified facts.",
    "category": "Escalation",
    "publishedAt": "2026-10-22",
    "readTime": "11 min read",
    "image": "/october-22/escalation-timeline-reconstruction.webp",
    "sections": [
      {
        "heading": "Start from the customer's first signal",
        "paragraphs": [
          "Escalation timelines often begin at the moment the internal team noticed. That is rarely when the customer's problem began. The first signal might be a support ticket, a chat message, a comment in a business review, or a failed login that nobody reported.",
          "Begin with the earliest customer-side evidence available and mark its source. If the earliest signal is a rumour from an account meeting, say so. The timeline should distinguish the first customer experience from the first internal record, because the gap between them is often the most important fact in the escalation."
        ]
      },
      {
        "heading": "Build a two clock chronology",
        "paragraphs": [
          "Record every entry in the customer's local time and in the team's operating timezone. A support ticket raised at 23:40 in Singapore and answered at 09:15 in London is a same day response in one frame and an overnight wait in the other. Both matter when you discuss responsiveness.",
          "The two clock view also exposes daylight saving transitions and weekend coverage gaps. When an entry lands near a clock change, note the offset explicitly. Ambiguous timestamps are the most common reason two teams disagree about whether a promised update was late."
        ]
      },
      {
        "heading": "Label every entry by evidence class",
        "paragraphs": [
          "Three labels keep the record honest: observed, reported, and inferred. Observed means a system log or a message that can be opened. Reported means a person stated it and the statement is retained. Inferred means the team believes it and has not verified it.",
          "Every inferred entry needs a verification owner and a date. When an inference is confirmed, the entry is updated with the evidence rather than replaced, so the record shows how understanding changed. When it is contradicted, the correction is visible and the original claim remains for review."
        ]
      },
      {
        "heading": "Reconcile conflicting timestamps",
        "paragraphs": [
          "It is normal for the CRM, the support platform, and the customer's email to disagree by minutes or hours. Do not silently pick one. List the conflicting sources, their values, and the likely cause: clock skew, manual entry, a timezone import error, or a delayed sync.",
          "Choose a canonical time only after the conflict is documented, and state the rule used. For customer-facing communication, prefer the customer's own record when it exists. For internal response measurement, prefer the system of record for the channel in question."
        ]
      },
      {
        "heading": "Separate technical impact from confidence damage",
        "paragraphs": [
          "An outage that lasted forty minutes can produce weeks of relationship damage if the customer learned about it from their own users. The timeline should carry two parallel tracks: what happened to the service, and what happened to the customer's confidence in the team.",
          "Track the second through communication events: when the customer was told, by whom, with what accuracy, and whether the promised next update arrived. These entries are often missing from incident records, and they are the ones account leaders need when deciding what recovery requires."
        ]
      },
      {
        "heading": "Record attempted actions and outcomes",
        "paragraphs": [
          "A useful timeline shows what was tried, not only what succeeded. Include the workaround that failed, the escalation that went to the wrong team, and the message that was prepared but never sent. Attempts explain delay and prevent the next responder from repeating them.",
          "Each attempt needs a time, an owner, and an outcome: resolved, partially resolved, no effect, or abandoned with a reason. This is also where you catch a common failure, which is a fix applied in a test environment and assumed to be live."
        ]
      },
      {
        "heading": "Mark corrections without erasing history",
        "paragraphs": [
          "When a material fact changes, add a correction entry with the old value, the new value, the source, the time, and the person who authorised the change. Do not edit the original entry into something it never said. The customer may have been told the earlier version, and that conversation is part of the record.",
          "Corrections should trigger a communication check. If the customer heard the earlier fact, someone must decide whether a clarification is needed. That decision, including a decision not to correct, is recorded with an owner."
        ]
      },
      {
        "heading": "Hand the timeline to decision owners",
        "paragraphs": [
          "The CSM prepares the chronology. The incident lead, account owner, legal or security representative, and commercial owner decide remedy, disclosure, and commitment. The handoff names the open decisions, the evidence supporting each option, and the deadline for choosing.",
          "Keep the decision log separate from the timeline. A decision is not an event in the incident; it is an organisational choice made with the evidence available at a point in time. Mixing the two makes it hard to tell later whether the team acted reasonably given what it knew."
        ]
      },
      {
        "heading": "Keep a predictable customer update cadence",
        "paragraphs": [
          "During an active escalation the customer needs an update even when there is nothing new. Set the cadence at the start, usually every four hours for a critical issue and daily for a degraded one, and keep it until the customer agrees to a different rhythm.",
          "Each update states what is known, what is being tested, what changed since the last update, and when the next one will arrive. A missed update is itself an escalation event and belongs in the timeline. Silence is read as chaos or concealment, and both cost more than an honest no change yet."
        ]
      },
      {
        "heading": "Close, then review chronology quality",
        "paragraphs": [
          "Closure requires the recovery action, the customer communication, the acknowledgement, the corrections, and the preventive follow-up to be linked. A closed escalation with an open communication promise is not closed.",
          "After closure, review the timeline for quality: were event and report times separated, were inferences verified, were corrections visible, and could a new reviewer reconstruct the sequence without asking questions. Sample a few escalations each quarter and fix the template rather than the individual record."
        ]
      }
    ],
    "faq": [
      {
        "q": "What starts an escalation timeline?",
        "a": "The earliest available customer-side signal, labelled with its source, not the moment the internal team noticed the problem."
      },
      {
        "q": "Why keep two timezones?",
        "a": "Customer local time supports fair communication review; the operating timezone supports internal response measurement. Both must be recorded at clock changes."
      },
      {
        "q": "How are inferences handled?",
        "a": "They are labelled inferred, given a verification owner and date, and updated with evidence when confirmed or contradicted."
      },
      {
        "q": "What proves an escalation is closed?",
        "a": "Recovery, customer communication, acknowledgement, corrections, and preventive follow-up are all linked to named owners."
      }
    ],
    "internalService": "/services/escalation-coordination",
    "internalSibling": "/blog/renewal-risk-routing-sla",
    "source": {
      "label": "NIST SP 800-53 Rev. 5 (context for chronology, audit records, and response roles)",
      "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
    }
  },
  {
    "slug": "success-plan-assumption-review",
    "title": "Keeping a Success Plan Assumption Register",
    "description": "How to record, test, and retire the assumptions behind a customer success plan so forecasts and commitments rest on verified ground.",
    "category": "Success planning",
    "publishedAt": "2026-10-22",
    "readTime": "10 min read",
    "image": "/october-22/success-plan-assumption-review.webp",
    "sections": [
      {
        "heading": "Why plans need visible assumptions",
        "paragraphs": [
          "Every success plan contains statements nobody has verified. The team will adopt the new workflow within a quarter. The sponsor controls the budget. The integration will be ready before the renewal. These are assumptions, and they behave like load bearing walls until someone tests them.",
          "An assumption register makes them visible without turning the plan into a risk workshop. It is a short list attached to the plan, reviewed on the same cadence, with an owner for each entry. The purpose is to know which parts of the plan are commitments and which are still hypotheses."
        ]
      },
      {
        "heading": "Write the assumption as a testable statement",
        "paragraphs": [
          "Vague assumptions cannot be tested. The team cares about adoption becomes a testable claim when it names a group, a behaviour, a threshold, and a time: at least six of the nine operations analysts will use the approval queue for two consecutive weeks after enablement.",
          "Not every assumption needs a number. A qualitative version names the event that would confirm or contradict it, such as the sponsor approving the revised workflow in the next steering meeting. The test is whether two people reading the statement would agree on what evidence settles it."
        ]
      },
      {
        "heading": "Attach a validation method and owner",
        "paragraphs": [
          "Each assumption gets a method: a data pull, a customer conversation, a document review, or a system check. The method names the source and the person who will look. An assumption without a method is a worry with a label.",
          "The owner is the person who can actually find out. For product usage that is usually the CSM or the operations analyst. For budget authority it is the account owner or the commercial lead. Assigning validation to someone without access guarantees the register will age quietly."
        ]
      },
      {
        "heading": "Rate confidence without false precision",
        "paragraphs": [
          "A three level scale is enough: supported, uncertain, and contradicted. Supported means current evidence exists and is cited. Uncertain means no current evidence either way. Contradicted means the evidence points the other way and the plan has not yet been revised.",
          "Avoid percentage confidence unless the team has a genuine calibration practice. A number like seventy percent suggests a precision nobody can defend and invites arguments about the decimal rather than the evidence. The three levels drive the right action: keep, test, or replan. They are internal working labels, not a message to put in front of the customer."
        ]
      },
      {
        "heading": "Link each entry to a plan element",
        "paragraphs": [
          "An assumption that affects nothing is trivia. Each entry names the objective, milestone, or commitment that depends on it. That link is what makes the register useful in a review: when an assumption fails, the team can see exactly which part of the plan must change.",
          "The link also prevents duplication. Two entries that support the same milestone can often be merged. A plan with forty assumptions is usually a plan with eight assumptions written five different ways."
        ]
      },
      {
        "heading": "Replan when an assumption fails",
        "paragraphs": [
          "A contradicted assumption is information, not embarrassment. The account owner decides whether to change the objective, change the approach, or accept the risk with a documented rationale. The decision is recorded with the date and the evidence.",
          "Replanning should be visible to the customer when it affects a shared commitment. A quiet internal replan that leaves the customer expecting the original outcome is worse than the original uncertainty. Explain what was learned, what changes, and what stays the same."
        ]
      },
      {
        "heading": "Retire entries without deleting them",
        "paragraphs": [
          "Assumptions are retired when they are verified, contradicted, or made irrelevant by a scope change. Retirement keeps the entry, the resolution, the evidence, and the date. Deleting it destroys the reasoning that shaped the plan and makes the next reviewer repeat the work.",
          "Keep the register readable by moving retired entries to an archive view after each review. The active list should stay short enough to scan in a meeting, while the history remains available for anyone reconstructing why the plan looks the way it does."
        ]
      },
      {
        "heading": "Review at every business review",
        "paragraphs": [
          "The register is reviewed at the same time as the action log. For each active assumption, the review confirms the confidence level, the last check date, and the next check date. Entries that have not been touched in two cycles are flagged as stale.",
          "The customer does not need to see the internal confidence labels, but they should hear the substance. A short statement about what the team has confirmed, what it is still testing, and what would change the plan builds more trust than a polished forecast presented as certainty."
        ]
      },
      {
        "heading": "Make the register visible to the account team",
        "paragraphs": [
          "A register only the CSM can see does not change decisions. Share the active list in the account channel and reference it in the internal preparation for each customer call. The account owner should know which assumptions are load bearing before speaking with the sponsor.",
          "Keep the customer facing version simpler. Rather than exposing internal confidence labels, state the open questions and the checks planned. Customers often hold the answer to an assumption, and asking directly is faster than inferring from usage data."
        ]
      },
      {
        "heading": "Keep the register short enough to use",
        "paragraphs": [
          "A register that takes an hour to maintain will be abandoned in a busy quarter. Limit the active list to the assumptions that could change a decision. If an entry would not alter the plan whether true or false, it does not belong.",
          "Review the register design each quarter. Count active entries, how many were tested, and how many changed a plan element. A register with no changing entries is either perfectly informed or, more likely, not being used."
        ]
      }
    ],
    "faq": [
      {
        "q": "What is an assumption register?",
        "a": "A short list of unverified statements in a success plan, each with a test, an owner, a confidence level, and the plan element that depends on it."
      },
      {
        "q": "How is confidence recorded?",
        "a": "Supported, uncertain, or contradicted, with cited evidence. Percentage confidence is avoided unless the team has a real calibration practice."
      },
      {
        "q": "Who decides when an assumption fails?",
        "a": "The account owner, with the customer sponsor when a shared commitment changes. The decision and evidence are recorded."
      },
      {
        "q": "Are retired assumptions deleted?",
        "a": "No. They are archived with the resolution, evidence, and date so later reviewers can reconstruct the plan's reasoning."
      }
    ],
    "internalService": "/services/business-review-preparation",
    "internalSibling": "/blog/qbr-action-log-closure",
    "source": {
      "label": "SBA market research guidance (context for testing assumptions before committing)",
      "url": "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis"
    }
  },
  {
    "slug": "account-hierarchy-crm-hygiene",
    "title": "Account Hierarchy Hygiene Before Health Reporting",
    "description": "The hierarchy checks that keep parent, child, and contract records consistent so health reporting and coverage decisions describe the real customer.",
    "category": "Data quality",
    "publishedAt": "2026-10-22",
    "readTime": "10 min read",
    "image": "/october-22/account-hierarchy-crm-hygiene.webp",
    "sections": [
      {
        "heading": "Hierarchy errors change the numbers",
        "paragraphs": [
          "A health score is only as good as the account it describes. When a subsidiary sits under the wrong parent, usage from one business unit inflates another, support tickets disappear into a sibling record, and the renewal date belongs to a contract nobody mapped.",
          "These errors rarely announce themselves. They surface as a surprising classification, an executive question that cannot be answered, or a renewal review where two teams bring different contract values. Hierarchy hygiene is the unglamorous work that keeps those conversations short."
        ]
      },
      {
        "heading": "Define parent, child, and contract boundaries",
        "paragraphs": [
          "Write down what each level means. A parent is the legal entity that signs, a child is an operating unit that uses the product, and a contract is the commercial instrument that carries the terms. A single customer can have several contracts across several children, and the model must allow that without duplicating the parent.",
          "Ambiguity appears when the commercial parent and the support parent differ. Name the primary reporting relationship and record the secondary one as a reference. Every report then states which hierarchy it uses, so a dashboard and a renewal forecast are not silently comparing different structures."
        ]
      },
      {
        "heading": "Resolve duplicates and merges",
        "paragraphs": [
          "Duplicates accumulate through imports, acquisitions, and sales teams creating a record before checking. The cleanup rule is to merge on a verified identifier such as a domain, a contract number, or a finance account code, never on a similar name.",
          "Before merging, capture both records, the evidence for the match, the surviving identifier, and the owner who approved the merge. Merges that lose history create reporting gaps that are hard to explain later. Where a merge is uncertain, link the records and flag the question instead of forcing a decision."
        ]
      },
      {
        "heading": "Map contacts to the right node",
        "paragraphs": [
          "Contacts inherit meaning from their account. A sponsor attached to the parent when they actually manage one child will distort stakeholder coverage for both. Use the contact's stated scope, not their seniority, to decide where they belong.",
          "Record the contact role, the node they influence, and the date the role was confirmed. When a contact changes teams, the old relationship stays visible as history while the active mapping updates. Coverage reports should count active, confirmed contacts rather than every address in the database."
        ]
      },
      {
        "heading": "Check rollup math before the review",
        "paragraphs": [
          "Two business days before a health review, run a rollup check comparing child sums to parent totals for seats, usage, tickets, and recurring revenue. Differences are expected only where the model intentionally excludes a segment, and those exclusions must be documented.",
          "The check is also a chance to catch double counting. A child attached to two parents will appear twice in a portfolio view. The report should show the parent once and the child once, with a note explaining the relationship rather than an unexplained inflated total. Where a difference cannot be explained, the review treats the affected accounts as unverified until the model is corrected."
        ]
      },
      {
        "heading": "Record hierarchy changes with dates",
        "paragraphs": [
          "Hierarchy changes are events: an acquisition closes, a business unit is renamed, a contract is novated. Each change carries an effective date, a reason, the source document, and the person who approved it. Retroactive changes need extra care because they alter historical reporting.",
          "Where a restatement is unavoidable, keep the prior structure available for comparison. A chart that jumps because the hierarchy changed is not a customer trend, and presenting it as one damages trust in every number that follows."
        ]
      },
      {
        "heading": "Handle the acquisition exception",
        "paragraphs": [
          "Acquisitions create temporary ambiguity. The acquired company may keep its own contract, systems, and support process for a transition period. The register should model both structures and mark the transition end date rather than forcing an immediate merge.",
          "During the transition, reports label the affected accounts and state which structure applies. The CSM and the commercial owner agree who communicates with the acquired team. Without that agreement, the customer receives duplicate outreach from two parts of the same company."
        ]
      },
      {
        "heading": "Assign ownership for hierarchy maintenance",
        "paragraphs": [
          "Hierarchy work needs a named owner in revenue operations and a partner in customer success. The owner maintains the model, reviews change requests, and runs the quarterly audit. The CS partner confirms that the structure matches how accounts are actually managed.",
          "Change requests follow a simple path: request, evidence, impact on reporting, approval, effective date. Small teams can run this in a shared queue. The point is not ceremony; it is that a change to a parent record can alter every downstream report."
        ]
      },
      {
        "heading": "Reconcile the model with finance",
        "paragraphs": [
          "Finance holds the legal entity list, contract values, and billing relationships. Customer success holds usage, contacts, and support history. A quarterly reconciliation prevents the common split where the CRM hierarchy follows sales territory and the billing hierarchy follows legal structure.",
          "Record the differences rather than forcing one model to win. A territory view is useful for coverage, a legal view is necessary for renewals and revenue reporting. The reconciliation confirms that each report names the structure it uses and that account identifiers map between them."
        ]
      },
      {
        "heading": "Publish a quarterly hierarchy audit",
        "paragraphs": [
          "Once a quarter, sample twenty accounts and verify parent, children, contracts, contacts, and ownership. Record the error rate, the types of error found, and the fixes applied. Share the summary with sales, finance, and customer success so the cost of bad data is visible.",
          "Use the audit to improve the intake rules rather than only cleaning the current records. If most errors enter through a particular import, fix the import. If they enter through manual creation, simplify the form or add a duplicate check at the point of entry."
        ]
      }
    ],
    "faq": [
      {
        "q": "What defines a parent account?",
        "a": "The legal entity that signs the contract. Children are operating units that use the product, and contracts are recorded separately so multiple agreements can sit under one parent."
      },
      {
        "q": "How should duplicates be merged?",
        "a": "Only on a verified identifier such as a domain, contract number, or finance code, with the evidence and approving owner recorded. Uncertain matches are linked and flagged, not forced."
      },
      {
        "q": "Why do rollups disagree with child totals?",
        "a": "Usually because a segment is excluded or a child is attached to more than one parent. The exclusion or relationship must be documented before the report is used."
      },
      {
        "q": "Who owns hierarchy maintenance?",
        "a": "Revenue operations maintains the model, with a customer success partner confirming that it matches how accounts are managed."
      }
    ],
    "internalService": "/services/customer-health-operations",
    "internalSibling": "/blog/health-signal-freshness-review",
    "source": {
      "label": "NIST security and privacy controls (context for data quality and change control)",
      "url": "https://www.nist.gov/publications/security-and-privacy-controls-information-systems-and-organizations"
    }
  },
  {
    "slug": "customer-call-note-standard",
    "title": "A Call-Note Standard That Survives Handoffs",
    "description": "A note standard for customer calls that separates statement from interpretation, links commitments, and lets a covering CSM act without a private briefing.",
    "category": "Knowledge operations",
    "publishedAt": "2026-10-22",
    "readTime": "10 min read",
    "image": "/october-22/customer-call-note-standard.webp",
    "sections": [
      {
        "heading": "Why notes fail the next reader",
        "paragraphs": [
          "Most call notes are written for the person who was on the call. They assume context that will not exist in three weeks, use shorthand that means something only to the author, and bury the one decision that matters under a summary of the agenda.",
          "A note standard is judged by a different test: can a covering CSM, who has never spoken to this customer, act correctly after reading it. That test forces discipline about what to record, what to leave out, and how to separate a customer's words from the CSM's interpretation."
        ]
      },
      {
        "heading": "Separate statement from interpretation",
        "paragraphs": [
          "The note should quote or closely paraphrase what the customer said, with the speaker and role attached. Interpretation goes in its own field, labelled as such. The customer is frustrated is an interpretation. The customer said we have raised this three times and nothing changed is a statement.",
          "The distinction protects everyone. If the interpretation later proves wrong, the record still holds what was actually said. If the customer disputes the summary, the team can point to the wording rather than defend a paraphrase. It also stops a single strong meeting from becoming a permanent characterisation of the account."
        ]
      },
      {
        "heading": "Use a fixed five field structure",
        "paragraphs": [
          "Five fields cover most calls: participants and roles, customer statements, decisions and agreements, open questions, and next actions with owners and dates. Anything else is optional. A fixed structure makes notes skimmable and makes omissions visible.",
          "The structure also improves search. When every note has a decisions field, a covering CSM can find what was agreed without reading twenty summaries. When actions are always in the same place, the follow-up queue can be generated rather than reconstructed."
        ]
      },
      {
        "heading": "Write within the hour, not the week",
        "paragraphs": [
          "Notes written a week later lose detail and gain certainty. Write the first draft within an hour of the call, even if it is rough. Spend no more than ten minutes. The goal is a complete record of what mattered, not a polished narrative.",
          "If the call ran long or covered several topics, write the decisions and actions first. Those two fields carry the operational weight. The narrative can be shorter. A note that is honest about being partial is more useful than a confident summary written from memory five days later."
        ]
      },
      {
        "heading": "Mark sensitive and restricted content",
        "paragraphs": [
          "Not everything said in a call belongs in a broadly readable record. Personal circumstances, legal disputes, security details, and commercial terms may need restricted visibility. The note should mark the restricted portion and store it where the access rule applies.",
          "Restriction is not deletion. The account owner and the covering CSM may still need the fact that a restriction exists, even if they cannot read the detail. Record a marker with the category and the owner who holds the detail, so the next person knows to ask rather than assume there is nothing to know."
        ]
      },
      {
        "heading": "Link notes to commitments and actions",
        "paragraphs": [
          "A commitment mentioned in a call should create or update a commitment record, not just sit in the note. The note links to it. The same applies to actions: the note carries a reference, and the action lives in the queue with an owner and a date.",
          "This prevents the most common handoff failure, where a promise exists in a note that nobody reads and an action exists in a queue with no context. Linking both directions means the covering CSM can start from the action and see the conversation that created it."
        ]
      },
      {
        "heading": "Review a sample for retrieval quality",
        "paragraphs": [
          "Each month, sample ten notes and ask whether a colleague could answer four questions from the note alone: who spoke, what was agreed, what is unresolved, and what happens next. Score each question yes or no and record the misses.",
          "Review the misses as a template problem first. If actions are missing, the field is probably buried. If interpretation is mixed with statement, the labels are unclear. Only after fixing the template should the conversation turn to individual writing habits."
        ]
      },
      {
        "heading": "Handle corrections and disputed accounts",
        "paragraphs": [
          "When a participant corrects a note, add a correction with the date and the source. Do not rewrite the original silently. When a customer disputes a summary, record their version beside the team's version and route the disagreement to the account owner.",
          "Disputed notes are a signal about the relationship, not just about record quality. If the customer regularly disagrees with how meetings are summarised, the team may be listening for decisions the customer has not made. That pattern belongs in the account review."
        ]
      },
      {
        "heading": "Make notes findable by decision",
        "paragraphs": [
          "Most note systems are searchable by account and date, which is not how people look for context. A covering CSM usually searches for a decision, a commitment, or a topic. Add a short decision line and three to five topic tags so retrieval works without knowing when the call happened.",
          "Tags should come from a controlled list. Free tagging produces variants that fragment the record. Review the list twice a year and merge synonyms. The measure is simple: can a colleague find the relevant note in under a minute."
        ]
      },
      {
        "heading": "Keep the standard short enough to follow",
        "paragraphs": [
          "A standard that requires a training course will not survive a busy quarter. One page is enough: the five fields, two examples, the ten minute limit, and the restriction rule. Publish it where notes are written, not in a knowledge base nobody opens during a call.",
          "Revisit it twice a year with the CSMs who write the most notes. Ask which field they skip and why. A standard that adapts to real constraints gets used, and a used standard is the only kind that improves a handoff."
        ]
      }
    ],
    "faq": [
      {
        "q": "What are the five note fields?",
        "a": "Participants and roles, customer statements, decisions and agreements, open questions, and next actions with owners and dates."
      },
      {
        "q": "How quickly should a note be written?",
        "a": "A first draft within an hour of the call, in about ten minutes, starting with decisions and actions."
      },
      {
        "q": "How is sensitive content handled?",
        "a": "Mark the restricted portion, store it under the applicable access rule, and leave a visible marker naming the category and the owner who holds the detail."
      },
      {
        "q": "What makes a note review useful?",
        "a": "Testing whether a colleague can identify speakers, agreements, open questions, and next steps from the note alone, then fixing the template before coaching individuals."
      }
    ],
    "internalService": "/services/knowledge-operations",
    "internalSibling": "/blog/csm-coverage-handoff-plan",
    "source": {
      "label": "NIST Privacy Framework (context for limiting note content to what the work requires)",
      "url": "https://www.nist.gov/privacy-framework"
    }
  },
  {
    "slug": "expansion-signal-verification",
    "title": "Verifying Expansion Signals Before a Sales Conversation",
    "description": "A verification routine that separates observed product use from buying intent and gives the commercial team evidence it can defend in a customer meeting.",
    "category": "Expansion",
    "publishedAt": "2026-10-22",
    "readTime": "11 min read",
    "image": "/october-22/expansion-signal-verification.webp",
    "sections": [
      {
        "heading": "Separate usage from buying intent",
        "paragraphs": [
          "High usage is evidence of adoption, not evidence of a purchase decision. A team can use a product heavily and still have no budget, no authority, and no reason to buy more. Treating activity as intent produces optimistic handoffs that waste the customer's time and the sales team's credibility.",
          "Verification asks a narrower question: what would have to be true for this customer to expand, and which of those conditions can we actually observe today. The answer usually includes a business problem, an authorised sponsor, a budget path, and a timing window. Usage is one input among several."
        ]
      },
      {
        "heading": "Collect five signal types",
        "paragraphs": [
          "The five types are product behaviour, stated customer priorities, stakeholder authority, commercial timing, and service health. Each is recorded with its date and source. A signal set missing any of the five is incomplete, and the handoff should say so rather than filling the gap with confidence.",
          "Product behaviour covers seat growth, workflow completion, and feature breadth within the right account node. Stated priorities come from the customer in their own words. Authority identifies who can approve. Timing covers budget cycles and procurement rules. Service health checks for open critical issues that would make expansion inappropriate."
        ]
      },
      {
        "heading": "Check authority before enthusiasm",
        "paragraphs": [
          "An enthusiastic power user is valuable and rarely decisive. Verification maps the decision: who sponsors the budget, who evaluates the product, who can block, and who signs. Each role is attached to a named person and a date when the role was confirmed.",
          "Where authority is unclear, the next step is a conversation with the account owner, not a proposal. A common failure is a strong champion who leaves during procurement, leaving the commercial team without a sponsor. The signal set should flag single threaded relationships before the expansion motion starts."
        ]
      },
      {
        "heading": "Look for counterevidence first",
        "paragraphs": [
          "Before presenting an opportunity, spend twenty minutes looking for reasons not to. Open critical support issues, unresolved commitments, an expiring sponsor relationship, a hiring freeze, or a recent leadership change all argue for patience.",
          "Recording counterevidence is not pessimism. It is the difference between a commercial conversation that opens with the customer's real situation and one that opens with a slide the customer has to correct. When counterevidence is material, the handoff recommends a delay with a review date."
        ]
      },
      {
        "heading": "Test timing against the budget cycle",
        "paragraphs": [
          "Timing questions have factual answers more often than teams expect. When does the fiscal year start. When is the budget locked. Is there a procurement threshold that changes the approval path. Has the customer already allocated spend for this problem.",
          "Record the source and date for each answer. A budget statement from eight months ago is history, not current timing. Where the customer has not stated a window, the handoff says unknown and proposes the question, rather than inferring urgency from a renewal date."
        ]
      },
      {
        "heading": "Confirm the customer's own words",
        "paragraphs": [
          "Expansion narratives drift as they move from CSM to manager to sales. Before the handoff, confirm the customer's stated problem and desired outcome with the person who said it, and quote them. A short written confirmation is enough.",
          "This step also protects against the CSM's inference becoming a customer requirement. If the customer said they need better reporting for auditors, the handoff quotes that. It does not say the customer wants the premium reporting tier, which is a product conclusion the customer has not made."
        ]
      },
      {
        "heading": "Hand off evidence, not a score",
        "paragraphs": [
          "The handoff packet contains the five signal types, the counterevidence, the authority map, the customer quotes, the open questions, and a recommended next step with a rationale. It does not contain a readiness percentage, because a number invites action without reading the evidence.",
          "The receiving owner records acceptance within one business day and states whether they accept the recommendation or choose a different path. A rejected handoff with a reason is a good outcome. It means the evidence was read and the commercial judgment was made by the person accountable for it."
        ]
      },
      {
        "heading": "Protect the renewal when expansion stalls",
        "paragraphs": [
          "Not every verified opportunity closes. Budget slips, priorities change, and a new leader pauses spending. The CSM should keep the evidence and the relationship active rather than treating the pause as a loss.",
          "Set a review date and a trigger. When the budget cycle reopens or the sponsor signals movement, the packet is refreshed rather than rebuilt. Between those points, the account continues on its success plan, and the expansion conversation does not crowd out the work that keeps the renewal secure."
        ]
      },
      {
        "heading": "Keep each signal current",
        "paragraphs": [
          "Expansion evidence ages quickly. A sponsor who approved a pilot in March may have moved on by June, and a budget window that opened in the first quarter closes in the second. Give each signal an expiry date and refresh before the handoff.",
          "The packet shows when each element was last confirmed and by whom. A handoff built on six month old statements is not evidence, it is archaeology. Where a refresh is not possible, say so and reduce the recommendation to a discovery conversation."
        ]
      },
      {
        "heading": "Review signal quality each quarter",
        "paragraphs": [
          "Sample the expansion handoffs from the quarter and check what happened. How many were accepted, how many reached a customer conversation, and how many produced a commercial outcome. More importantly, check which signals proved misleading and why.",
          "Feed the findings into the qualification rules. If opportunities sourced mainly from usage data consistently stall, the rule needs an authority check earlier. The aim is not a better score but a shorter path from a real customer problem to the right conversation."
        ]
      }
    ],
    "faq": [
      {
        "q": "What are the five expansion signal types?",
        "a": "Product behaviour, stated customer priorities, stakeholder authority, commercial timing, and service health, each dated and sourced."
      },
      {
        "q": "Why record counterevidence?",
        "a": "It prevents a proposal built on incomplete context and supports a deliberate delay when an open issue or authority gap makes expansion inappropriate."
      },
      {
        "q": "Who decides whether to pursue expansion?",
        "a": "The account executive and commercial owner, after accepting the evidence packet. The CSM prepares and verifies the evidence."
      },
      {
        "q": "What happens when expansion stalls?",
        "a": "Keep the evidence, set a review date and trigger, and continue the success plan so the renewal is not put at risk by the paused motion."
      }
    ],
    "internalService": "/services/business-review-preparation",
    "internalSibling": "/blog/qbr-action-log-closure",
    "source": {
      "label": "SBA market research guidance (context for testing assumptions before committing)",
      "url": "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis"
    }
  },
  {
    "slug": "customer-education-content-lifecycle",
    "title": "A Lifecycle for Customer Education Content",
    "description": "How to version, review, and retire customer education content so enablement material stays accurate as the product, policy, and customer roles change.",
    "category": "Education",
    "publishedAt": "2026-10-22",
    "readTime": "10 min read",
    "image": "/october-22/customer-education-content-lifecycle.webp",
    "sections": [
      {
        "heading": "Content decays silently",
        "paragraphs": [
          "Customer education content rarely fails loudly. A guide keeps loading, a video keeps playing, and a checklist keeps downloading long after the interface, the policy, or the recommended workflow has changed. The customer discovers the gap at the worst moment, usually mid task.",
          "A lifecycle treats every asset as having an owner, a version, a review date, and a retirement path. The aim is not a large content operation. It is a small library that a busy CSM can trust when sending a link to a customer under time pressure."
        ]
      },
      {
        "heading": "Inventory before creating anything new",
        "paragraphs": [
          "List what exists, where it lives, who uses it, and when it was last reviewed. Include the informal assets: the shared slide, the recorded call, the spreadsheet of setup steps. Informal assets are often the most used and the least maintained.",
          "The inventory should also record the source of truth for each asset. A setup guide derives from product documentation, a policy explainer derives from the policy owner, and a workflow guide derives from the product team's current recommendation. When the source changes, the derived asset is a candidate for review."
        ]
      },
      {
        "heading": "Set a review cadence by asset type",
        "paragraphs": [
          "Not all content needs the same rhythm. Setup and configuration guides should be reviewed each release cycle. Policy explainers should be reviewed when the policy owner publishes a change and at least twice a year. Role based workflow guides should be reviewed when the customer facing process changes.",
          "Record the cadence on the asset itself and surface overdue items in a monthly report. A review date that lives only in someone's calendar disappears when that person changes role. The asset should carry its own obligation."
        ]
      },
      {
        "heading": "Version with a visible change note",
        "paragraphs": [
          "Each update gets a version, a date, and a short change note describing what changed and why. The note matters more than the number. A CSM who sent version three last week needs to know whether version four changes the steps or only fixes a typo.",
          "Keep prior versions available for a defined period. Customers on slower release cycles may still be running the workflow described in an earlier version. Retiring a version without checking the installed base creates confusion that looks like a product problem."
        ]
      },
      {
        "heading": "Assign an owner and a reviewer",
        "paragraphs": [
          "Every asset has an owner who keeps it current and a reviewer who confirms accuracy before publication. For product guides the reviewer is usually product or support engineering. For policy explainers it is the policy owner. For commercial explainers it is the account leadership team.",
          "Ownership is a name, not a team. When the owner leaves, the asset is reassigned in the same week, and the inventory shows the gap. Unowned content should be marked as at risk rather than left to look maintained."
        ]
      },
      {
        "heading": "Test comprehension with real customers",
        "paragraphs": [
          "Accuracy is necessary but not sufficient. A guide can be correct and still fail because it assumes vocabulary the customer does not use. Test new or substantially revised assets with three to five customers from the intended role.",
          "Ask them to complete the task using only the asset, and watch where they stop. Record the points of confusion and the language they use. That feedback is more valuable than an internal review, because the customer is the person the asset has to work for."
        ]
      },
      {
        "heading": "Retire without leaving dead ends",
        "paragraphs": [
          "When an asset is superseded, redirect the old link to the replacement and mark the old version as retired with a date. Dead links in a customer journey are worse than outdated content, because they signal neglect without offering an alternative.",
          "Send a short note to the CSMs who used the asset in the past quarter. They are the people most likely to have the old link saved in a template. A five line message prevents a customer from receiving a broken resource during onboarding."
        ]
      },
      {
        "heading": "Measure use and usefulness",
        "paragraphs": [
          "Track opens, completion, and the support questions that follow. A guide with high opens and high related tickets is not working. A guide with low opens may be poorly placed rather than unnecessary. Segment the numbers by customer role and journey stage, because a guide used during onboarding and a guide used at renewal answer different questions.",
          "Pair usage data with a short feedback prompt at the end of the asset. One question is enough: did this help you complete the task. Add an optional comment field, which is usually more informative than the rating alone. Combine both with the ticket pattern and the CSM's judgment before deciding to rewrite or retire, and review the pattern each quarter."
        ]
      },
      {
        "heading": "Localise without duplicating",
        "paragraphs": [
          "Teams serving several regions often rebuild the same guide for each language. That multiplies maintenance and produces versions that drift. Keep one source asset with a translation layer, and record which languages are current.",
          "When a regional policy differs, attach a short regional note to the source asset rather than creating a separate guide. The customer sees the same structure and the CSM knows that only the note needs review when the policy changes."
        ]
      },
      {
        "heading": "Keep the lifecycle small",
        "paragraphs": [
          "A lifecycle with five stages, three committees, and a governance board will collapse under its own weight. The minimum viable version is an inventory, an owner, a review date, a version note, and a retirement rule.",
          "Review the process once a year. If assets are consistently overdue, reduce the library rather than adding reminders. Fewer, current, well owned assets serve customers better than a comprehensive archive nobody trusts."
        ]
      }
    ],
    "faq": [
      {
        "q": "What does every education asset need?",
        "a": "An owner, a source of truth, a review cadence, a version with a change note, a reviewer, and a retirement path."
      },
      {
        "q": "How often should product guides be reviewed?",
        "a": "Each release cycle for setup and configuration content, and whenever the source documentation or recommended workflow changes."
      },
      {
        "q": "Who reviews policy explainers?",
        "a": "The policy owner confirms accuracy before publication. The CSM team owns distribution and feedback, not the policy interpretation."
      },
      {
        "q": "What happens to superseded content?",
        "a": "It is marked retired with a date, its links redirect to the replacement, and past users receive a short note with the new location."
      }
    ],
    "internalService": "/services/adoption-follow-up",
    "internalSibling": "/blog/adoption-followup-segmentation",
    "source": {
      "label": "NARA records management guidance (context for version control and retirement of published material)",
      "url": "https://www.archives.gov/records-mgmt/policy"
    }
  },
  {
    "slug": "csm-coverage-handoff-plan",
    "title": "Planning CSM Coverage Handoffs Before They Are Urgent",
    "description": "A coverage plan that names the minimum account context, the decision rights of a covering CSM, and the reconciliation required when the owner returns.",
    "category": "Role design",
    "publishedAt": "2026-10-22",
    "readTime": "11 min read",
    "image": "/october-22/csm-coverage-handoff-plan.webp",
    "sections": [
      {
        "heading": "Coverage is a plan, not a favor",
        "paragraphs": [
          "When a CSM takes leave or changes territory, coverage is usually arranged in a hurry between colleagues. The covering person receives a list of account names and a warning about two difficult relationships. That is not coverage. It is presence without context.",
          "A coverage plan defines what must transfer, who can decide what, how the customer is told, and how the account returns to its owner. Built in advance, it takes an hour per CSM. Built during a crisis, it consumes the first week of a quarter and still leaves gaps."
        ]
      },
      {
        "heading": "Name the minimum viable account context",
        "paragraphs": [
          "The covering CSM needs six things per account: the business objective, the current success plan state, open commitments with dates, active risks, the stakeholder map with authority, and the next scheduled touchpoint. Anything else is helpful but not minimum.",
          "Store this as a standing view rather than a document written at handoff. The view is refreshed weekly by the owner, so coverage starts from current information. A handoff document written the night before leave reflects what the owner remembers, not what the record shows."
        ]
      },
      {
        "heading": "Set triggers for planned and unplanned absence",
        "paragraphs": [
          "Planned absence has a calendar trigger: coverage is confirmed at least ten business days before the first day away, and the customer is notified five business days before. Unplanned absence has an event trigger: the manager assigns coverage within four business hours and the customer is told within one business day where contact is appropriate.",
          "The triggers also cover role changes, territory moves, and parental leave. Each has a different notice period but the same requirements: named coverage, decision limits, customer communication, and a return plan. Writing them down removes the negotiation that otherwise happens in the moment."
        ]
      },
      {
        "heading": "Assign coverage by relationship, not seniority",
        "paragraphs": [
          "The most senior available CSM is not automatically the right covering owner. Coverage works better when the covering person already knows the customer's industry, the product area, or the sponsor relationship. Where no such person exists, assign by account tier and accept a longer ramp.",
          "Avoid splitting one account across two covering CSMs. Shared coverage sounds resilient and usually produces duplicated outreach and a customer who has to explain the same issue twice. One named covering owner per account, with a backup for that person."
        ]
      },
      {
        "heading": "Run a shadow week before the handoff",
        "paragraphs": [
          "For planned absences longer than two weeks, the covering CSM joins the regular calls for a week before the owner leaves. They observe, ask questions, and take the notes. The owner reviews the notes to confirm the context transferred.",
          "The shadow week also tests access. A covering CSM who cannot open the health dashboard or the contract repository discovers it on day one of the absence, which is the worst possible time. Access checks belong in the coverage checklist, not in a favor asked of IT."
        ]
      },
      {
        "heading": "Define what the covering CSM may decide",
        "paragraphs": [
          "Coverage without decision limits creates either paralysis or overreach. Write three levels: routine decisions the covering CSM may make alone, decisions requiring the manager, and decisions deferred until the owner returns unless the customer impact is urgent.",
          "Routine usually includes scheduling, status communication, and coordinating an existing action. Commercial concessions, scope changes, and commitments about roadmap belong with the manager or the returning owner. The covering CSM should know which is which before the first customer call."
        ]
      },
      {
        "heading": "Tell the customer in plain terms",
        "paragraphs": [
          "Customers tolerate absence when they understand the arrangement. A short message names the covering CSM, the reason for the change in general terms, the expected duration, and how to reach the team. It does not need personal detail.",
          "Where the owner has a close sponsor relationship, a joint handoff call is worth the time. The owner introduces the covering CSM, confirms the open priorities, and states when they will return. That fifteen minutes prevents the sponsor from testing the covering CSM for a month."
        ]
      },
      {
        "heading": "Return the account with a reconciliation",
        "paragraphs": [
          "The handoff back is as important as the handoff out. The covering CSM provides a reconciliation: what happened, what was promised, what changed in the plan, and what needs the owner's decision in the first week. The owner confirms they have read it before resuming customer contact.",
          "Any promise made during coverage is honoured or explicitly renegotiated with the customer. A returning owner who contradicts a commitment made two weeks earlier damages trust more than the original absence did."
        ]
      },
      {
        "heading": "Fund the plan in the operating rhythm",
        "paragraphs": [
          "Coverage planning fails when it is treated as unpaid extra work. Give each CSM a small monthly allowance for context maintenance and make the quarterly readiness check part of the operating review. The work is small when regular and large when deferred.",
          "Managers should also track how many accounts lack a named covering owner. A rising count predicts customer confusion during the next absence. The fix is usually a simpler standing view rather than more documentation."
        ]
      },
      {
        "heading": "Audit coverage readiness each quarter",
        "paragraphs": [
          "Once a quarter, check the plan against reality. Pick three accounts and ask whether the standing context view is current, whether the covering owner is named, and whether access works. Record the gaps and fix them before the next absence.",
          "Track two measures: the number of accounts without a named covering owner, and the time from an unplanned absence to a customer notification. Both are simple, both are visible, and both predict how the next disruption will feel to the customer. The plan also names a backup for the covering owner, so a second absence does not reopen the same gap."
        ]
      }
    ],
    "faq": [
      {
        "q": "What must transfer in a coverage handoff?",
        "a": "Objective, plan state, open commitments, active risks, stakeholder authority map, and the next touchpoint, all drawn from a standing view refreshed weekly."
      },
      {
        "q": "How much notice does planned coverage need?",
        "a": "Coverage confirmed at least ten business days before the absence and the customer notified five business days before, with a shadow week for absences longer than two weeks."
      },
      {
        "q": "What may a covering CSM decide?",
        "a": "Routine scheduling, status communication, and coordination of existing actions. Commercial, scope, and roadmap commitments stay with the manager or returning owner."
      },
      {
        "q": "What happens when the owner returns?",
        "a": "The covering CSM provides a reconciliation of events, promises, plan changes, and pending decisions, and the owner confirms it before resuming contact."
      }
    ],
    "internalService": "/services/customer-onboarding-support",
    "internalSibling": "/blog/customer-call-note-standard",
    "source": {
      "label": "OPM telework guidance (context for coverage and continuity arrangements)",
      "url": "https://www.opm.gov/telework/"
    }
  }
];
