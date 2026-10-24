import type { ResearchPost } from '../types';
export const october22ResearchPosts: ResearchPost[] = [
  {
    "slug": "health-signal-freshness-observation-protocol",
    "title": "Observing Health Signal Freshness in Account Reviews",
    "summary": "A proposed observation protocol for recording whether each health signal used in an account review was current at the moment of decision, with source-specific age rules, a frozen evidence set, and a reproducible currency code. It defines a method and reports no completed study, no agreement rate, and no claim about any customer portfolio.",
    "cluster": "Account health",
    "publishedAt": "2026-10-22",
    "image": "/october-22/health-signal-freshness-observation-protocol.webp",
    "finding": "Freshness is a property of each signal at the decision timestamp, so the protocol scores signal-level currency and refuses to produce a single account-level freshness rate that would hide which input was old.",
    "methodology": [
      "Fix the observation unit as one account review decision with a recorded decision timestamp. The unit carries the account identifier, review date, decision owner, classification or action chosen, and the exact evidence packet that was open at the time. Reviews without a recorded decision time are excluded rather than reconstructed from memory, because a reconstructed timestamp silently relocates the moment at which evidence was supposed to be current. The unit definition is published before sampling so reviewers cannot choose a flattering boundary after seeing difficult cases. The publication also fixes the review population, so an excluded review cannot be quietly swapped for a more convenient one later.",
      "Freeze the evidence set at the decision point: export every signal available to the reviewer, with export time and source system. Corrections that arrive later are held in a separate layer, so the analysis can distinguish what was knowable from what became known afterwards. This separation matters when a review is later judged harshly or generously. Without it, a team that corrects records promptly looks identical to a team that reviewed stale data, and the protocol loses its ability to say which failure occurred.",
      "Enumerate signal families and their producers: usage telemetry, support events, stakeholder statements, commercial terms, and open commitments. Each signal is traced to a system identifier or a named human report. A signal that cannot be traced is coded as unattributed and cannot be treated as material to a decision. The enumeration step is deliberately boring and slow, because most disputes about a health classification turn out to be disputes about which source was actually consulted rather than about the judgement applied to it.",
      "Set source-specific age rules before any coding begins. Usage might be current to seven days, support history to thirty, and stakeholder sentiment to one review cycle. Each band is justified by the source's update cadence rather than by what makes the cohort look tidy. A subscription billing export that refreshes monthly cannot be held to a weekly standard, and a real time product feed cannot be excused at thirty days. The justification is written beside the rule, so a reader can see why a monthly source is held to a monthly standard and a daily source is not. Every exception is recorded with a reason and an expiry date so the rule set does not quietly erode.",
      "Capture event time, load time, and timezone for each signal. A late load is not a fresh event. When the gap between event and load exceeds the age rule, the signal is coded as late even if the dashboard displayed it during the review. Timezone handling belongs in this step rather than in a footnote, because a review conducted near a daylight saving transition can shift a boundary case by an hour and change whether a signal counts as within grace.",
      "Code currency per signal into four states: current, within grace, stale, and missing. Coders work independently from the frozen export and submit before discussing cases, so the first pass reflects the record rather than a negotiated reading of it. The four states are intentionally coarse. Two coders who cannot agree on current versus grace are describing different update expectations, not different accounts. A finer scale invites false precision and arguments about whether a signal is eleven or fourteen days old, which is rarely the distinction that changes a decision.",
      "Record decision materiality. For every stale or missing signal, note whether the reviewer cited it, ignored it, or refreshed it before deciding. Materiality is judged from the written rationale and the linked evidence, not from an interview conducted weeks later. A reviewer who refreshed an input before deciding should receive credit for that action in the record, because the protocol is intended to improve evidence handling rather than to produce a list of mistakes.",
      "Build adverse cases into the sample: at least one source outage, one backfill, one merged or renamed account, one daylight saving boundary, and one review where the classification changed after a correction. These cases test whether the protocol can represent awkward conditions instead of only clean ones. Each adverse case is described in the report, because a protocol that only works on ordinary accounts has not been tested. If the instrument cannot describe a backfill without coding it as fresh, the instrument is wrong regardless of how consistent the coders are on ordinary accounts.",
      "Adjudicate disagreements with a named third reviewer who sees both codings and the frozen evidence. The adjudicator records the resolution and flags any rule that could not be applied consistently. Rule defects are logged separately from coder errors so the next version can fix the instrument rather than coach individuals. A pattern of adjudications pointing at the same ambiguous phrase is the strongest available signal that the definition, not the coder, needs revision. The adjudicator does not see the reviewer's name, which reduces the chance that seniority settles a coding question.",
      "Report with denominators and limits: signal counts by family, excluded reviews, missing data, agreement by signal type, and the number of decisions where stale evidence was material. The report states the protocol version and refuses to publish an account-level freshness score. It also names the sources that were unavailable for the cohort, because a study of freshness that silently excludes the freshest system is not describing the review process it claims to examine. Exclusions are listed by reason and not only by count, because a large exclusion with a benign label can still change the conclusion."
    ],
    "findings": [
      "Freshness belongs to the signal, not the account. Averaging currency across usage, support, and stakeholder evidence produces a figure no reviewer can act on, because a current usage export cannot compensate for a six week old sponsor statement. A portfolio view built on such an average also obscures which accounts need a refresh question before the next review.",
      "The oldest load bearing signal sets the practical currency of a classification. A review resting on one stale input should be described by that input's date, not by the newest timestamp anywhere in the packet. The convention also protects the reviewer, who can point to a date instead of defending an impression.",
      "Backfills manufacture false recency. When a failed job reloads three days of events, the retrieval time looks current while the customer experience is old. The protocol keeps both times visible and codes the signal late. The correct response is to ask when the customer experienced the change, not when the warehouse noticed it.",
      "Reweighting stale inputs conceals the problem instead of solving it. A model that drops a stale source and renormalises the remaining weights changes what the number means without telling the reader. Where the classification flips under the reduced model, the review should treat the case as unresolved rather than pick the more convenient result.",
      "Coder disagreement usually signals a definition gap. When two reviewers classify the same signal differently, the useful output is a sharper age rule or a clearer source boundary, not a note about individual care. The adjudication log should quote the disputed phrase verbatim so the next revision has something concrete to rewrite.",
      "The protocol needs a refresh trigger tied to data contracts. A change to update cadence, schema, account hierarchy, or timezone handling invalidates prior age rules, and each cohort report must state the version in force. The version record should also name who approved the change and which prior cohorts are affected."
    ],
    "sources": [
      {
        "label": "Time Zone Database",
        "publisher": "Internet Assigned Numbers Authority",
        "url": "https://www.iana.org/time-zones",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "SP 800-53 Rev. 5 Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/publications/security-and-privacy-controls-information-systems-and-organizations",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Cybersecurity Framework 2.0",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Records management policy",
        "publisher": "National Archives and Records Administration",
        "url": "https://www.archives.gov/records-mgmt/policy",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Work Trend Index",
        "publisher": "Microsoft WorkLab",
        "url": "https://www.microsoft.com/en-us/worklab/work-trend-index",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Privacy Framework",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework",
        "checkedAt": "2026-10-22"
      }
    ]
  },
  {
    "slug": "qbr-action-closure-evidence-study",
    "title": "Evidence for QBR Action Closure",
    "summary": "A proposed review protocol for quarterly business review actions that treats closure as a linked artifact plus customer acknowledgement rather than a status field. It specifies the observation unit, evidence classes, adverse cases, and reporting limits. No closure rate is measured here and no customer sample is claimed. The instrument is written for internal review of record quality, not for evaluating customer outcomes.",
    "cluster": "Business reviews",
    "publishedAt": "2026-10-22",
    "image": "/october-22/qbr-action-closure-evidence-study.webp",
    "finding": "Closure is a property of an artifact and a customer acknowledgement, not of a completed checkbox, so the protocol codes unlinked completed actions as unverified rather than closed.",
    "methodology": [
      "Define the observation unit as one action line from creation to its disposition on a fixed observation date. The unit records the originating review, the action text, both owners, the due date, the closure standard, and every later amendment. Actions that appear in two reviews are treated as one unit with a lineage field, because duplicated lines are a common way for an old commitment to look newly created and therefore less overdue than it is. The lineage field also records whether the action was split from a larger item, since a split can make one commitment look like two.",
      "Stratify the sample by action type and age rather than taking only the most recent review. Configuration, training, process, and commercial actions close with different evidence, and actions older than two cycles are the ones most likely to expose weak closure practice. A sample drawn entirely from a well run quarter will describe the best case while saying nothing about the lines that have quietly rolled forward. The strata are reported separately, because a good recent quarter should not be used to excuse older unresolved lines.",
      "Declare the closure evidence classes in advance: an artifact produced by the work, a customer acknowledgement, or both, depending on the action type. A status change alone is coded as asserted, never as closed. The class assignment is published with the template so that owners know at creation what they will need to supply, which is fairer than revealing the standard when someone asks for closure. Templates should show the evidence class beside each action type so the expectation is visible when the action is written.",
      "Reconstruct the action history from the system of record, including edits to the due date and owner. Silent date moves are coded as renegotiations and counted separately, because a moving due date changes what on time means. The protocol keeps every prior date rather than only the current one, since a single date field cannot show whether a commitment has been reset once or five times. A date change without a recorded reason is coded as unexplained, which is a different finding from a deliberate renegotiation.",
      "Capture customer confirmation with its channel, date, and speaker role. A forwarded email without a reply is delivery evidence, not acknowledgement. The protocol keeps delivery and acknowledgement as separate fields and does not infer one from the other. This is the step most often skipped in practice, and skipping it converts a communication event into a claim about customer satisfaction that the record cannot support. Where acknowledgement is verbal, the note records the speaker and the date, and the protocol treats that as weaker evidence than a written reply.",
      "Code the disposition into five states: closed with evidence, delivered without acknowledgement, open within date, overdue, and retired. Retired actions require a reason and both owners' agreement to qualify. An action retired by one side without the other's knowledge is coded as open, because the customer may still be expecting the original outcome and no internal decision has changed that expectation. Retired actions are counted beside closed actions so the two cannot be merged in a summary.",
      "Include adverse cases: an action reassigned after an owner departure, an action closed during a system migration with lost links, an action the customer declined, an action duplicated across two reviews, and an action whose evidence lives only in a private message. These cases test whether the protocol can distinguish a documentation failure from a delivery failure, which are different problems with different remedies. Every adverse case is written up, because an instrument that handles only clean records has not been tested.",
      "Run two independent coders on the same frozen export and compare per field, not per action. Agreement on disposition can hide disagreement on evidence class, and the field-level view shows which part of the definition is unstable. Coders submit before discussion, and the first pass is retained so the analysis can show where the instrument, rather than the record, produced the variation. Coder training is documented but never treated as a substitute for a definition two people can apply the same way.",
      "Adjudicate with the review owner and record rule changes. When coders disagree because the closure standard was never written, the protocol flags a template defect rather than a performance issue and pauses the cohort until the standard is published. Pausing is important, because continuing to code against an ambiguous rule produces a dataset that looks complete and cannot be compared with the next quarter. A paused cohort is reported as paused, because a missing quarter is more honest than one coded against a defective rule.",
      "Report counts by disposition, evidence class, and action age, with the sample frame, exclusion rules, and the observation date. The report states that closure evidence demonstrates documentation discipline, not that the customer received value. It also reports the number of actions retired, because a falling backlog achieved through retirement is a different result from a backlog resolved through delivery. The observation date is fixed in advance so results cannot be timed to a favourable week."
    ],
    "findings": [
      "A completed checkbox without a linked artifact is an assertion. Treating assertions as closure inflates apparent delivery and removes the only signal that would show a weak handoff. The same rule applies to actions marked complete by an automated workflow, which may involve no human review at all. Automated completion is especially prone to this failure, because the workflow has no reason to look for the customer's response.",
      "Delivery and acknowledgement are different events and should never share a field. A team can send a finished configuration guide and still leave the customer unable to use it, which is an open action in practice. Recording the two events separately also makes the next agenda obvious, because unacknowledged deliveries are the first items to chase.",
      "Due date edits are substantively important. A line that moves three times is not on time; it is renegotiated three times, and the review should show that history rather than the latest date. Where a date moved, the review should record who asked for the change and what they learned, not only the new date. The pattern of changes across a portfolio also shows whether dates are set by delivery capacity or by customer pressure.",
      "Actions older than two review cycles concentrate the interesting cases. They reveal whether retirement is a real decision or a quiet form of disappearance, and they test whether owners still understand the original intent. Sampling by age rather than recency is the only way to see that pattern before a customer raises it.",
      "Field-level agreement is more informative than action-level agreement. Two coders may agree that an action is closed while disagreeing about whether the evidence was an artifact or an acknowledgement. Field-level reporting also prevents a false sense of quality when two coders share the same shortcut. Reporting disputed cases verbatim gives the template owner material to work with instead of a score to interpret.",
      "Closure evidence supports a documentation claim only. The protocol cannot establish that an action improved retention or adoption, and reports must say so rather than letting a tidy log imply an outcome. Any claim beyond documentation needs a different instrument, a different sample, and a separate analysis with its own stated limits."
    ],
    "sources": [
      {
        "label": "Records management policy",
        "publisher": "National Archives and Records Administration",
        "url": "https://www.archives.gov/records-mgmt/policy",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "SP 800-53 Rev. 5 Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Cybersecurity Framework 2.0",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Recordkeeping requirements",
        "publisher": "U.S. Equal Employment Opportunity Commission",
        "url": "https://www.eeoc.gov/employers/recordkeeping-requirements",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "FLSA recordkeeping",
        "publisher": "U.S. Department of Labor",
        "url": "https://www.dol.gov/agencies/whd/fact-sheets/21-flsa-recordkeeping",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/publications/security-and-privacy-controls-information-systems-and-organizations",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Manage your business",
        "publisher": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-22"
      }
    ]
  },
  {
    "slug": "onboarding-acceptance-agreement-study",
    "title": "Reviewer Agreement on Onboarding Acceptance",
    "summary": "A proposed agreement study for onboarding acceptance decisions. Two reviewers receive the same frozen milestone packet and independently rate each acceptance criterion before assigning accepted, conditionally accepted, or returned. The protocol reports no agreement statistic here, makes no claim about implementation quality, and does not assert that any customer accepted a milestone.",
    "cluster": "Onboarding",
    "publishedAt": "2026-10-22",
    "image": "/october-22/onboarding-acceptance-agreement-study.webp",
    "finding": "Agreement should be measured per criterion and per disposition, because reviewers can agree that the facts are present while disagreeing about whether the agreed standard has been met.",
    "methodology": [
      "Fix the observation unit as one milestone acceptance decision at the recorded disposition time. The unit carries the milestone, the agreed criteria, the evidence packet, the customer approver, the exact acceptance wording, every exception, and any residual work. A milestone without a recorded disposition time is excluded, because the protocol studies decisions rather than the later story told about them. The exclusion list is published with the cohort so the frame cannot be widened or narrowed after results are known.",
      "Draw the sample from a declared frame and stratify before review. Strata include customer tier, launch type, whether a defect was open at the decision, and whether acceptance was conditional. Conditional cases are deliberately oversampled, because they carry the most definitional ambiguity and they are the cases most likely to be summarised incorrectly in a status report. Each stratum is reported with its own denominator rather than pooled into a single headline figure that hides the conditional cases.",
      "Freeze the packet for both reviewers: configuration evidence, training completion, open defects, approver statements, and the signed scope. Later corrections are held in a second layer. Reviewers may not consult the account owner during the first pass, because a clarification from the person who made the decision converts the exercise from independent review into confirmation. The freeze records the packet export time, because evidence added after the freeze belongs to a different record than the one both reviewers saw.",
      "Define four criterion states in advance: met, partially met, not met, and unverifiable. Each state requires a cited source. Unverifiable is a real state and not a polite version of not met, because a criterion that cannot be inspected is a documentation gap rather than evidence that the work failed. Coders cite the field they used, which makes an unverifiable rating traceable to a missing export rather than to an opinion about the customer.",
      "Publish the disposition rule. Accepted means every criterion is met or formally waived. Conditionally accepted means named criteria are unmet with an owner, a dated remediation, and customer agreement. Returned means the milestone requires remediation before acceptance. A conditional acceptance with no owner or date is coded as returned, because the condition has no operational meaning. The rule is published with the milestone template so the customer and the delivery team see the same threshold before anyone asks for a signature.",
      "Code authority separately from disposition. Record who accepted, whether that person held the stated authority, whether the acceptance was written, and whether the customer approver had been confirmed since the contract signature. An acceptance by someone without authority is a record defect, even when the underlying work was sound. Authority is checked against the current stakeholder map rather than the signature on the original contract, since sponsors move during long implementations.",
      "Include adverse cases by design: a missing approver, a defect reopened after acceptance, a late scope change, an acknowledgement that did not accept the milestone, and an acceptance inherited from a predecessor who has left. Each case tests whether the protocol can distinguish a communication gap from an evidence gap from an authority gap. The report describes each adverse case in plain language so readers can see which distinctions the protocol actually made and which it merely assumed.",
      "Run two independent reviewers on the same frozen packet with no discussion before submission. Retain the first pass. The point of independence is not to produce a dispute but to estimate how much of the classification depends on the packet and how much depends on the reviewer's prior experience with similar accounts. Prior experience is recorded as a covariate rather than treated as noise, because it explains part of the variation the protocol is trying to isolate.",
      "Adjudicate disagreements with a named reviewer who did not participate in the first pass. The adjudicator records the resolution and, more importantly, whether the disagreement came from missing evidence, an ambiguous criterion, or a different reading of authority. Rule defects are logged separately so the next protocol version can tighten the criterion wording. The adjudicator does not see reviewer names, so seniority cannot settle a definitional question that should be settled by the standard.",
      "Report criterion-level and disposition-level results with denominators, exclusions, and the packet version. State plainly that agreement about a record does not establish that the milestone was technically adequate or that the customer obtained value. The study describes how consistently a standard is applied, not whether the standard is good. A separate technical review is required before anyone claims that a milestone was implemented well, and that review needs its own evidence and its own limits."
    ],
    "findings": [
      "Fact agreement is not standard agreement. Two reviewers can both see that training was delivered and both see that one integration remains temporary, then disagree about whether that combination counts as acceptance. The protocol separates the factual fields from the disposition field so the source of disagreement is visible. The protocol reports factual agreement and disposition agreement separately, because a single blended figure would conceal exactly the gap it is meant to expose.",
      "Conditional acceptance is the hardest category and the most informative. It sits between delivery and completion, and teams routinely record it as either fully accepted or fully returned depending on who is reporting. Requiring an owner, a date, and customer agreement for every condition gives the category a testable boundary. Conditional acceptance with a named owner, a dated remediation, and written customer agreement is a legitimate state, not a failure to finish paperwork.",
      "Acceptance without authority is a record defect rather than a customer decision. When a well meaning administrator confirms readiness that only a sponsor can accept, the milestone may still be technically complete, but the record cannot support the claim. The protocol codes this case separately so the organisation can fix the approval path instead of arguing about the work. Coding the case separately lets the organisation fix the approval path without relitigating a technical outcome that may already be sound.",
      "Reopened defects should preserve the earlier acceptance as history. A milestone that was accepted and later reopened is not the same as one that was never accepted, and collapsing the two loses the information needed to understand what changed. The revision records the reopening event and the evidence that triggered it, so a later reviewer can see whether the original acceptance was premature or the situation changed. The record should show the original disposition, the reopening event, and the revised state with dates.",
      "Acknowledgement of receipt is routinely mistaken for acceptance. A customer reply saying thanks for the summary confirms communication, not agreement that the criteria are met. Keeping delivery and acceptance in separate fields is the single cheapest improvement most onboarding records can make. The rule is simple enough to apply in a status meeting, which is where the confusion usually starts. It also gives the customer a clear statement of what acceptance means before the milestone is reviewed.",
      "An agreement study cannot establish whether a milestone was technically sound. It can show that reviewers apply the same rule to the same evidence, which is a property of the record and the standard. Any claim about implementation quality needs a separate technical review with its own sampling and its own limitations. Keeping the two questions apart protects both, because a record review should not be asked to certify engineering quality and an engineering review should not be asked to certify the paperwork."
    ],
    "sources": [
      {
        "label": "Records management policy",
        "publisher": "National Archives and Records Administration",
        "url": "https://www.archives.gov/records-mgmt/policy",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Privacy Framework",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "SP 800-53 Rev. 5 Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Secure by Design",
        "publisher": "Cybersecurity and Infrastructure Security Agency",
        "url": "https://www.cisa.gov/securebydesign",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Recordkeeping requirements",
        "publisher": "U.S. Equal Employment Opportunity Commission",
        "url": "https://www.eeoc.gov/employers/recordkeeping-requirements",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/publications/security-and-privacy-controls-information-systems-and-organizations",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Manage your business",
        "publisher": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-22"
      }
    ]
  },
  {
    "slug": "renewal-signal-lead-time-method",
    "title": "A Method for Dating Renewal Signals",
    "summary": "A proposed method for dating renewal signals and measuring lead time from the first verified signal to a fixed renewal decision point. It defines signal classes, verification states, and the observation window, and reports no measured lead time for any portfolio. The method is a measurement design, not a forecast of renewal outcomes.",
    "cluster": "Renewals",
    "publishedAt": "2026-10-22",
    "image": "/october-22/renewal-signal-lead-time-method.webp",
    "finding": "Lead time must be measured from the first verified signal rather than the first mention, and every measurement must state the observation window that made the signal visible in the first place.",
    "methodology": [
      "Fix the observation unit as one renewal decision at a declared decision date, with the contract end date, notice period, and every signal observed before that date. The contract date is checked against the signed document rather than the CRM field, because a wrong end date moves the entire measurement window without anyone noticing. A contract reconciliation step belongs at the start of the method, not at the end, because every later measurement inherits the error in the date.",
      "Define the clock before looking at signals. Measure backwards from the decision date in business days for internal response and in calendar days for contractual notice. Both are reported, since a signal arriving fourteen calendar days before the notice deadline may be only nine business days before the last practical action. Both figures are reported for each signal so a reader can see how much of the apparent lead time is a calendar artefact.",
      "Classify signals into six types: value statement, sponsor change, support pattern, usage shift, procurement event, and competitor mention. Each class has a different planning implication, and merging them into a single risk indicator hides whether the team needed a relationship intervention, a technical fix, or a commercial conversation. The class is assigned from the primary evidence and not from the risk rating in the CRM, which is often applied after the fact.",
      "Introduce verification states rather than treating every mention as evidence. A mention is unverified, corroborated when a second source agrees, verified when a document or system event supports it, and contradicted when later evidence points the other way. Only verified signals start the lead time clock. Unverified mentions are retained in the record as context, but they do not count toward lead time and they are reported separately.",
      "Locate the first verified signal and record its source, channel, speaker role, and date. The first mention in the CRM is a poor substitute, because it often reflects when a CSM found time to write rather than when the customer first raised the issue. The difference between the two dates is itself a useful finding about recording practice. The gap between first mention and first verification is reported as a data quality measure rather than treated as customer behaviour.",
      "State the observation window explicitly. If call notes only begin eighteen months before renewal, the absence of earlier signals is not evidence that the customer was content. Every report names the systems searched, the earliest available date in each, and the records that were inaccessible. Where a system was not searchable, the report says so instead of implying that no signal existed.",
      "Censor at the decision date. Signals that arrive after the decision are excluded from the lead time calculation but retained for outcome review. Mixing post decision signals into the measurement makes the team look prescient in hindsight and destroys the only comparison the method can support. Post decision signals are useful for a different question, which is whether the team recognised what it had already seen, and that question belongs in a separate analysis.",
      "Build adverse cases into the sample: a signal discovered in private notes, a signal arriving after the notice deadline, a duplicate opportunity with two renewal dates, a contract novation, and a sponsor change announced through a public channel before the account team knew. These cases test whether the dating rules survive messy records. The report describes how each case was resolved, because a method that silently drops awkward accounts will produce a tidier and less honest result. A method that requires clean inputs will systematically exclude the accounts most in need of attention.",
      "Date the signals twice, independently, by two analysts working from the frozen record. Disagreements are adjudicated against the source document rather than by seniority. Where the source itself is ambiguous, the case is recorded as unresolved instead of being assigned a convenient date that would flatter the median. Unresolved cases are counted and described, and they are never assigned the midpoint of two plausible dates simply to keep the dataset complete.",
      "Report the distribution of lead times by signal class, with counts, medians, ranges, exclusions, and the observation window for each account. State that lead time is descriptive rather than causal. A long lead time does not prove that early action prevented churn, and a short one does not prove that the account was surprised. The report also avoids comparing lead times across account tiers without stating the difference in observation windows and contract lengths."
    ],
    "findings": [
      "First mention is a poor anchor because it measures the author, not the customer. A signal discussed in a call and written up a week later appears late in the record while it was timely in the relationship. Dating from the primary source corrects a bias that otherwise penalises teams with busy note taking habits. The correction is not a criticism of note taking; it is a recognition that the record and the relationship run on different clocks. That gap is worth reporting on its own, because it tells a team where the record lags the relationship.",
      "The observation window determines apparent lead time. An account with three years of call notes will almost always show an earlier signal than one with six months of history, regardless of how the customer actually behaved. Without stating the window, comparisons across accounts are comparisons of record keeping. A reporting standard should therefore include the window length beside every lead time figure, or the figure should not be published. The same caution applies to internal dashboards, where a lead time tile without a window is read as a stable fact.",
      "Late arriving signals usually reveal a monitoring gap rather than customer suddenness. When a sponsor change appears first in an inbound email, the question is why the account team did not see it through its normal contacts. That question is more useful than the lead time number itself. The team can act on a monitoring gap by adding a contact or a data source, while it cannot act on a number except by feeling worse about the past.",
      "Signal class changes the planning need. A procurement event has a fixed calendar and demands a commercial response, while a gradual usage shift may need a product and enablement response over months. Reporting one blended lead time hides both the urgency and the correct owner. The method reports class-level results so the conversation moves to the right function instead of staying inside customer success by default. It also prevents a procurement signal from being handled as a relationship concern, which is a common and expensive mismatch.",
      "Contract date errors distort lead time more than signal dating errors. A renewal recorded three months late in the CRM compresses every measurement for that account. Reconciling dates against the signed contract should precede any lead time analysis, not follow it. Date reconciliation is unglamorous, and it removes a large share of the variance that would otherwise be attributed to customer behaviour.",
      "Lead time is descriptive without outcome data. Knowing that verified signals typically arrive a certain number of days before a decision says nothing about whether earlier action changes the result. That question requires a different design with a comparison group and a defined outcome window. The current method stops at description and says so, which keeps the finding honest and leaves the causal question for a study that can actually address it. Publishing that limit is part of the method, not a disclaimer added at the end."
    ],
    "sources": [
      {
        "label": "Cybersecurity Framework 2.0",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Market research and competitive analysis",
        "publisher": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Work Trend Index",
        "publisher": "Microsoft WorkLab",
        "url": "https://www.microsoft.com/en-us/worklab/work-trend-index",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Records management policy",
        "publisher": "National Archives and Records Administration",
        "url": "https://www.archives.gov/records-mgmt/policy",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Time Zone Database",
        "publisher": "Internet Assigned Numbers Authority",
        "url": "https://www.iana.org/time-zones",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Anatomy of Work",
        "publisher": "Asana",
        "url": "https://asana.com/resources/anatomy-of-work-hub",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "SP 800-53 Rev. 5 Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        "checkedAt": "2026-10-22"
      }
    ]
  },
  {
    "slug": "customer-note-coding-reliability-study",
    "title": "Coding Reliability in Customer Call Notes",
    "summary": "A proposed reliability study for coding customer call notes. Notes are segmented into codeable units before any theme is assigned, then coded independently against a frozen codebook with field-level agreement reporting. No reliability coefficient is reported here and no coding exercise has been completed.",
    "cluster": "Knowledge operations",
    "publishedAt": "2026-10-22",
    "image": "/october-22/customer-note-coding-reliability-study.webp",
    "finding": "Coding reliability depends more on how the unit is segmented than on coder training, because a note containing several ideas cannot be coded consistently until those ideas have been separated.",
    "methodology": [
      "Define the codeable unit as one segment within a note, bounded by speaker, topic, and moment in the conversation. Notes are segmented before coding begins, and segmentation is treated as a coded step with its own agreement check. Without this step, two coders can appear to disagree about a theme when they were actually reading different sentences. Segmentation agreement is reported before theme agreement so the reader can see how much of the total disagreement came from that earlier step.",
      "Stratify the sample by call type, note author tenure, customer tier, and note length. Very short notes and very long notes both behave differently, and a sample dominated by one pattern will describe that pattern rather than the corpus. The sampling frame and the inclusion rate are published with the results, because a corpus assembled from convenient calls describes those calls. Notes containing restricted content are excluded unless the study has documented access and a permitted basis for use.",
      "Freeze the evidence: the note text, its metadata, the codebook version, and the permitted context. Coders see the same excerpt and the same surrounding fields. Opening the full account timeline for one coder and not the other turns the exercise into a comparison of access rather than a test of the codebook. The frozen export records who prepared it, when, and which fields were redacted, so a later reviewer can reproduce the same conditions.",
      "Publish the codebook with definitions, positive examples, and counterexamples. Codes cover customer statements, requests, commitments, objections, decisions, and open questions. Each definition names what does not belong, because the boundary cases are where coders diverge and where a short definition quietly fails. Counterexamples are mandatory for codes that are easy to apply loosely, particularly the difference between a request and a complaint.",
      "Apply the segmentation rule before assigning any code. One idea per segment, with mixed segments split and linked back to the original note. A commitment inside a complaint is two segments. Coding it as one forces the coder to choose which aspect matters, which is an analytic decision rather than a description. Segmentation decisions are recorded with a short rationale, and a segment that could reasonably be split two ways is flagged for the adjudication step.",
      "Limit context deliberately. Coders receive the note and the permitted metadata, not private messages or prior account gossip. Where context is necessary to understand a pronoun or an acronym, it is supplied in a standardised context field so every coder receives the same help. Context that cannot be standardised is omitted, and the omission is noted, because uneven context produces agreement that would not survive a real review.",
      "Include adverse cases: sarcasm, translated feedback, quoted speech, second hand reports, a note edited after the call, and a note with no participant list. These cases test whether the codebook distinguishes what the customer said from what someone else reported and from what the note author concluded. Cases that cannot be coded under the current codebook are logged as codebook gaps rather than forced into the nearest available category.",
      "Run two independent coders with no discussion before submission and retain the first pass. Training is documented, but training is not treated as a substitute for a definition that two people can apply the same way. Where training appears to solve a disagreement, the study records the specific clarification so the codebook can absorb it. The first pass is retained even after adjudication, because a cleaned dataset would overstate how well the codebook performed in use.",
      "Adjudicate with a third coder who sees both assignments and the frozen excerpt. Record whether the disagreement came from segmentation, definition, or missing context. Codebook changes are versioned with a date, and segments coded under the earlier version are not silently reclassified. Segments coded under an earlier version are reported separately, so a change in the codebook does not look like a change in the customers.",
      "Report field-level agreement, segmentation disagreement, exclusions, and the codebook version. State that agreement about codes does not establish that the coded themes are representative of the customer base. Representativeness is a sampling question, and reliability is a consistency question; the report keeps them separate. The report also states who was not represented, because a reliable codebook applied to a narrow sample still says nothing about the wider base."
    ],
    "findings": [
      "Segmentation disagreement sits upstream of code disagreement. When two coders split a note differently, every later comparison is distorted. Measuring segmentation separately shows whether the problem is the unit definition, which is fixable, or the theme definitions, which require a different correction. A codebook that performs well on segmentation but poorly on theme assignment needs sharper definitions, not more coder training.",
      "Note quality bounds coding quality. A note without speaker attribution cannot support a statement code, because the coder cannot tell who said it. The study treats missing attribution as a documentation limitation rather than inferring the speaker from context, which would manufacture agreement that the record does not support. Missing attribution is reported as a field-level gap, and notes without it are excluded from statement analysis rather than repaired by inference. The number of notes missing attribution is reported with the corpus description so the limitation is visible at the top of the results.",
      "Codebooks that mix request and interpretation produce unreliable codes. A customer asking for fewer clicks and a coder concluding that the interface is confusing are different observations. Keeping requests and interpretations in separate fields preserves the customer's contribution and makes the analysis easier to defend. The separation also protects the customer's own words from being overwritten by the analyst's summary in later reporting. Where a note mixes quotation and summary in the same sentence, the segment is split and both parts are coded separately.",
      "Quotation and paraphrase must be distinguishable. A note that says the customer is unhappy without quoting them leaves the coder to infer the strength and the subject of the concern. The protocol codes quoted speech separately from the author's summary and reports how much of the corpus depends on paraphrase. Where paraphrase dominates, the report says so, because the strength and subject of a concern are less certain when no quotation exists. The proportion of quoted material is reported with the codebook version, since a codebook that works on paraphrase may not work on quotation.",
      "Editing a note after the call changes the record. When a note is revised, the version and the change should be visible, and the study should code the version that was available at the time of the decision under review. Coding a later, tidier version produces a flattering picture of what the team knew. Version history is treated as part of the evidence rather than as administrative noise, and the coding protocol names the version it used. A study that codes only the final version is studying the archive rather than the decision.",
      "Reliability does not establish representativeness. Consistent coding of a convenience sample says something about the codebook, not about the customer population. Any claim about theme prevalence needs a sampling frame, a response or inclusion rate, and an explicit statement of who was not represented. A second study with a probability-based frame would be needed before any claim about prevalence, and that study would need its own access and consent arrangements. The protocol therefore reports reliability as a property of this codebook on this corpus, with no implication beyond it."
    ],
    "sources": [
      {
        "label": "Privacy Framework",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Records management policy",
        "publisher": "National Archives and Records Administration",
        "url": "https://www.archives.gov/records-mgmt/policy",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Recordkeeping requirements",
        "publisher": "U.S. Equal Employment Opportunity Commission",
        "url": "https://www.eeoc.gov/employers/recordkeeping-requirements",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "FLSA recordkeeping",
        "publisher": "U.S. Department of Labor",
        "url": "https://www.dol.gov/agencies/whd/fact-sheets/21-flsa-recordkeeping",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Security and Privacy Controls",
        "publisher": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/publications/security-and-privacy-controls-information-systems-and-organizations",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Work Trend Index",
        "publisher": "Microsoft WorkLab",
        "url": "https://www.microsoft.com/en-us/worklab/work-trend-index",
        "checkedAt": "2026-10-22"
      },
      {
        "label": "Secure Our World",
        "publisher": "Cybersecurity and Infrastructure Security Agency",
        "url": "https://www.cisa.gov/secure-our-world",
        "checkedAt": "2026-10-22"
      }
    ]
  }
];
