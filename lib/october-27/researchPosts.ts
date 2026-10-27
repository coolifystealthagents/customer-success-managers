import type { ResearchPost } from '../types';
export const october27ResearchPosts: ResearchPost[] = [
  {
    "slug": "customersuccessmanagers-auditing-access-changes-around-renewal-risk",
    "title": "Auditing access changes around renewal risk",
    "summary": "A grounded customer success note for customer success leaders: renewal risk with explicit evidence, decision rights, and a verified close.",
    "cluster": "access",
    "publishedAt": "2026-10-27",
    "image": "/october-27/customersuccessmanagers-auditing-access-changes-around-renewal-risk.png",
    "finding": "A grounded customer success note for customer success leaders: renewal risk with explicit evidence, decision rights, and a verified close.",
    "methodology": [
      "The scope is one defined population of renewal risk cases observed from first request through verified close in the support desk. If the population is too small to sample, say so and report the complete set rather than implying a larger study. The definitions should be short enough to use at the queue and precise enough to defend in a review with account executive. Record the exclusions in advance so a difficult case cannot be removed after the result is known. Use the same note in the case file and the study extract; do not create a second version in a personal document.",
      "The protocol does not estimate an industry benchmark; it produces a local description that customer success leaders can review. State how duplicate requests are identified and whether they are merged, linked, or counted separately. Write the primary measure and one supporting measure; a measure without a denominator or observation window is not ready. The protocol should be short enough for an operator to follow and specific enough for a reviewer to repeat. When a case needs an exception, record the reason, the owner, and the date before continuing the review.",
      "A population that changes size during the day should be reported with the start, end, and net change, not only the closing total. If duplicate requests are merged, keep the duplicate count and the merge rule in the dataset. The start event should be the first recorded request, not the first time the team opened the case. If the queue was archived during the window, report the loss and exclude the affected period rather than assuming the cases were resolved. Keep the measurement note short enough to read with the case and specific enough to support the reported reopen rate.",
      "The unit is one renewal risk case, from the opening request to the verified close, and linked events stay with that case. A denominator that changes during the window should be reported separately for each period. A correction should be classified by the original case and by the correction event, with both dates retained. Separate cases opened before the window from cases opened and closed inside it, and report both counts. If two reviewers disagree, preserve both classifications until the definition or the evidence is resolved.",
      "Define how a correction after close is linked to the original case and whether it creates a new case. Test the data dictionary on a small set of cases and revise ambiguous fields before the main sample. Use the same status vocabulary in the queue, the evidence extract, and the report so a case does not change category. State how duplicate, cancelled, and reopened cases enter the numerator and denominator. Link the observation to the exact field in the renewal forecast and to the QBR packet that supports it.",
      "A case that has no destination change should be defined as cancelled or rejected, not counted as complete. Record the source system, the record identifier, the extraction time, and the reviewer for every extracted value. Use the same status vocabulary in the queue, the evidence extract, and the report so a case does not change category. If two reviewers disagree, preserve both classifications until the definition is clarified. Do not let a summary written later replace the evidence that was available at the first decision.",
      "Mark missing, unavailable, and confirmed negative values separately; collapsing them hides the difference between no evidence and evidence of absence. If a field is derived, record the formula and the source fields used to calculate it. Store sensitive evidence in the approved repository and keep only the reference in the analysis file. Keep the original request, the approval, and the destination value linked to the same key. If the case moved between owners, include both owner periods in the review note and name the handoff time.",
      "Each case needs the source, the observation time, the field supported, the owner, and the reviewer. Version the dictionary and report which version was used for each observation period. Run a five-case pilot before the full sample and revise any field that two reviewers interpret differently. Pilot the dictionary with two reviewers and compare their classifications before the main sample. Keep the review note with the case so the next sampler does not have to reconstruct the decision from memory.",
      "Each case needs the source, the observation time, the field supported, the owner, and the reviewer. Version the dictionary and report which version was used for each observation period. Use one row per case and one column per required field; do not bury evidence in a long free-text note. Pilot the dictionary with two reviewers and compare their classifications before the main sample. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract.",
      "Include adverse cases: a missing renewal risk memo, a conflicting source, an unavailable account executive, and a tight deadline. A second reviewer should re-extract a small subsample and record disagreements before the full analysis. Use a random or systematic start rule and then take consecutive cases within each stratum. Record the sampling frame as an export with a date, filter, and row count. At Customer Success Managers, the renewal risk review should end with a dated note and a named owner for the next check.",
      "Stop expanding the sample only when the review question is answered, not when the result starts to look favorable. Use the same collection form for every case and keep the original record linked to the extracted fields. Use a random or systematic start rule and then take consecutive cases within each stratum. Keep a table of planned, eligible, selected, and reviewed counts for each stratum. If the evidence is sensitive, record the approved reference and access path rather than copying the content.",
      "Use consecutive renewal risk cases where possible, then stratify by owner, channel, and risk class. If a source cannot be accessed, mark it unavailable and record the access problem rather than asking the operator to reconstruct it from memory. Record the eligible count and every exclusion before the sample is drawn. Do not let the reviewer choose the sample after seeing the results. The note should distinguish what was observed, what was inferred, and what still needs an owner decision.",
      "Compare health score freshness across owners only after checking the case mix, the channel, and the evidence standard. A small sample should be reported with the number of cases that drive the result. Record the sample date, the denominator, the numerator, and the exclusion count for every reported rate. End with the decision the evidence supports and the decision it does not support. Record this decision in the study log with the case key, the review date, and the person who approved the classification.",
      "For renewal risk, report the age distribution and the share of cases waiting on a named decision rather than a single average. Report denominators with every rate and separate missing evidence from negative evidence. Keep the case-level table available for review and summarize only the measures that answer the question. Report the number of cases that drive a small-sample result and the direction of the effect. Keep the evidence reference beside the coded value so a reviewer can test the same case without rebuilding the queue.",
      "Report what remains unknown and what evidence would be needed to answer the next question. Changes in staffing, access, or the support desk during the window can create a difference that is not a process effect. Report the limits of the support desk data, including fields that were unavailable or changed during the window. Record the access problems that prevented a case from being reviewed. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it.",
      "Small samples are sensitive to one case; report the instability instead of presenting a percentage as a stable rate. Report the unknown population and the evidence that would be needed to describe it. Do not treat a missing record as proof that the work did not happen; it is evidence about the record. Record the access problems that prevented a case from being reviewed. At Customer Success Managers, the reviewer should be able to explain this step to customer sponsor from the case record alone.",
      "Record the decision and the next check so the study does not end as an archive. Report what moved, what stayed the same, and what the study still cannot explain. Link the action to the specific renewal risk cases that motivated it. Use a short action log that names the change, the owner, the due date, and the measure that will show whether it worked. Use the same note in the case file and the study extract; do not create a second version in a personal document.",
      "Repeat the protocol after the change with the same definitions, window, and exclusions. Keep the review note with the renewal risk evidence so the next owner can see why the process changed. If the action requires a policy or access change, route it to the owner and record the decision. Record the owner, due date, and exact change that will be tested at the next review. When a case needs an exception, record the reason, the owner, and the date before continuing the review."
    ],
    "findings": [
      "A grounded customer success note for customer success leaders: renewal risk with explicit evidence, decision rights, and a verified close.",
      "Report denominators and unresolved records.",
      "Keep the customer decision with the owner."
    ],
    "sources": [
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "Federal Trade Commission \u2014 business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Small Business Administration \u2014 manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-27"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-estimating-rework-in-qbr-packet-from-correction-and-reopen-records",
    "title": "Estimating rework in QBR packet from correction and reopen records",
    "summary": "A grounded customer success note for customer success leaders: QBR packet with explicit evidence, decision rights, and a verified close.",
    "cluster": "cost",
    "publishedAt": "2026-10-27",
    "image": "/october-27/customersuccessmanagers-estimating-rework-in-qbr-packet-from-correction-and-reopen-records.png",
    "finding": "A grounded customer success note for customer success leaders: QBR packet with explicit evidence, decision rights, and a verified close.",
    "methodology": [
      "The scope is one defined population of QBR packet cases observed from first request through verified close in the onboarding tracker. If one request produces several renewal risk memo updates, define whether the unit is the request or each update before sampling. Distinguish an administrative pause from a failure: a pause waits for a named decision, while a failure leaves the next action unowned. State whether the study covers one team, one client, or all cases in the defined service. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it.",
      "The study measures the record and the handoff, not the professional judgment of account executive or the legal outcome of the work. If one request produces several usage report updates, define whether the unit is the request or each update before sampling. Define the start event, the stop event, the pause rule, and the treatment of a missing usage report before collecting data. If the study is exploratory, label it exploratory and do not present the result as a stable baseline. At Customer Success Managers, the reviewer should be able to explain this step to account executive from the case record alone.",
      "Test the unit definition on a case that crosses owners, a case that is still open, and a case that was reopened. A case that moves between owners stays one case unless the process defines a new requirement at the handoff. Write the rule for a missing usage report before the first case so the treatment is consistent. Report a case that moved between owners as one case with two owner periods unless the process creates a new requirement. Use the same note in the case file and the study extract; do not create a second version in a personal document.",
      "If a reopened case creates a new requirement, count it as a new case and retain a link to the earlier record. Record the queue at the start and end of each observation day so additions and withdrawals are visible. The definition should make it possible to classify a case without asking the person who did the work. Report a case that moved between owners as one case with two owner periods unless the process creates a new requirement. When a case needs an exception, record the reason, the owner, and the date before continuing the review.",
      "A pause should have a reason, an owner, and a review date; otherwise it is an unowned case with a different label. Record the source system, the record identifier, the extraction time, and the reviewer for every extracted value. Before collection, test the definitions on a missing onboarding plan, a reopened case, and a handoff. Keep a change log for every definition adjustment and the date it took effect. Keep the measurement note short enough to read with the case and specific enough to support the reported onboarding milestone completion.",
      "Measure elapsed time from the first recorded request to the verified destination update, and report waiting intervals separately. A blank field, a not-applicable field, and a confirmed negative field should have different codes. If a case is outside the scope rule, record the rule and the date of exclusion rather than removing it silently. Write the start and stop events as observable actions, not as opinions about whether the work felt finished. If two reviewers disagree, preserve both classifications until the definition or the evidence is resolved.",
      "Each case needs the source, the observation time, the field supported, the owner, and the reviewer. Give every case a study key that is not the client name, member number, or candidate email. Use one row per case and one column per required field; do not bury evidence in a long free-text note. Record the source location, not just the file name, so a reviewer can reopen the exact evidence. Link the observation to the exact field in the renewal forecast and to the health score note that supports it.",
      "Test the dictionary on five cases before the full sample; ambiguous fields should be fixed before collection, not after. Name the required fields for each article type and mark conditional fields in the dictionary. Record the source identifier, the field name, the observation time, and the reviewer for every extracted value. A case key should remain stable if the case moves between owners or changes status. Do not let a summary written later replace the evidence that was available at the first decision.",
      "Test the dictionary on five cases before the full sample; ambiguous fields should be fixed before collection, not after. Test the dictionary on a case with a missing escalation record and a case with a corrected value. Keep the original evidence reference next to the coded value so the reviewer can verify the classification. Do not use a zero or an empty string to represent missing evidence. If the case moved between owners, include both owner periods in the review note and name the handoff time.",
      "Use consecutive QBR packet cases where possible, then stratify by owner, channel, and risk class. Keep the collection window and the number of collectors in the report; both affect how the result should be interpreted. Stratify by risk, channel, and owner so the sample is not dominated by the easiest queue. Include at least one case from each owner in scope when the frame allows it. Keep the review note with the case so the next sampler does not have to reconstruct the decision from memory.",
      "A convenience sample of recently closed cases will overrepresent easy work and underrepresent the tail that needs attention. A second reviewer should re-extract a small subsample and record disagreements before the full analysis. A sample of recent closures can miss the oldest unresolved work, which is often the most informative. A case that is difficult to access is still part of the frame; report the access failure rather than replacing it silently. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract.",
      "Use a random or systematic start rule for the first case, then take consecutive cases within each stratum. Collect the exception reason and the action taken before the close so the analysis can separate detection from resolution. Keep the sample selection reproducible by recording the export date, filter, and random seed or start rule. Record the sampling frame as an export with a date, filter, and row count. At Customer Success Managers, the QBR packet review should end with a dated note and a named owner for the next check.",
      "Separate observation from interpretation; a high completion rate on a small easy sample is not evidence of a strong control. Compare periods only after checking the case mix, the definitions, and the queue rules. Show the unresolved cases by owner, age, and dependency instead of reporting a single completion percentage. Report the number of cases that drive a small-sample result and the direction of the effect. If the evidence is sensitive, record the approved reference and access path rather than copying the content.",
      "State which findings are descriptive and which require a follow-up test with a larger or different sample. For QBR packet, report the age distribution and the share of cases waiting on a named owner. Report the number of cases that changed status after the first extraction and how the change was handled. Report the numerator, denominator, observation window, and exclusion count for each measure. The note should distinguish what was observed, what was inferred, and what still needs an owner decision.",
      "The method also cannot observe work that never entered the queue, which may be the most important missing population. Report the unknown population and the evidence that would be needed to describe it. Keep the limitations with the result so a later reader does not turn a local observation into a general claim. Record the access problems that prevented a case from being reviewed. Record this decision in the study log with the case key, the review date, and the person who approved the classification.",
      "The record may be incomplete, delayed, or maintained outside the team, so the method cannot infer missing work from a clean summary. Selection bias remains when the team chooses cases that are easy to open or owners who are likely to cooperate. Report the limits of the support desk data, including fields that were unavailable or changed during the window. Keep the limitations with the result so a local observation is not turned into a general claim. Keep the evidence reference beside the coded value so a reviewer can test the same case without rebuilding the queue.",
      "Choose one next action: fix the source, simplify the usage report, change the queue, adjust access, or pause the work until the owner decides. If the result is inconclusive, say so and choose a narrower question rather than claiming a trend. Choose a measure that can move within one cycle and a second measure that checks for unintended effects. Link the action to the case evidence that prompted it, not only to the meeting notes. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it.",
      "Keep the review note with the QBR packet evidence so the next reviewer can see why the process changed. Name the owner, the review date, and the decision the study is expected to inform. Close the review only when the owner has accepted the result and the next check is scheduled. Use a short action log that names the change, the owner, the due date, and the measure that will show whether it worked. At Customer Success Managers, the reviewer should be able to explain this step to CSM from the case record alone."
    ],
    "findings": [
      "A grounded customer success note for customer success leaders: QBR packet with explicit evidence, decision rights, and a verified close.",
      "Report denominators and unresolved records.",
      "Keep the customer decision with the owner."
    ],
    "sources": [
      {
        "label": "U.S. Small Business Administration \u2014 manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "Federal Trade Commission \u2014 business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-27"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-measuring-cycle-time-for-onboarding-plan-from-request-to-verified-close",
    "title": "Measuring cycle time for onboarding plan from request to verified close",
    "summary": "A grounded customer success note for customer success leaders: onboarding plan with explicit evidence, decision rights, and a verified close.",
    "cluster": "measurement",
    "publishedAt": "2026-10-27",
    "image": "/october-27/customersuccessmanagers-measuring-cycle-time-for-onboarding-plan-from-request-to-verified-close.png",
    "finding": "A grounded customer success note for customer success leaders: onboarding plan with explicit evidence, decision rights, and a verified close.",
    "methodology": [
      "The protocol does not estimate an industry benchmark; it produces a local description that customer success leaders can review. The population should include cases handled by every owner and channel in scope, not only the queue with the cleanest records. Write the primary measure and one supporting measure; a measure without a denominator or observation window is not ready. If the study is exploratory, label it exploratory and do not present the result as a stable baseline. If the evidence is sensitive, record the approved reference and access path rather than copying the content.",
      "A useful scope is narrow enough to reproduce and specific enough to show whether missed renewal signal is being detected. The population should include cases handled by every owner and channel in scope, not only the queue with the cleanest records. Define age from the first recorded request, not from the first time someone remembered to open the case. Record the exclusions in advance so a difficult case cannot be removed after the result is known. The note should distinguish what was observed, what was inferred, and what still needs an owner decision.",
      "Test the unit definition on a case that crosses owners, a case that is still open, and a case that was reopened. A denominator that changes during the window should be reported separately for each period. If the definition of escalation age changes, keep the old and new values side by side for the transition period. Report a case that moved between owners as one case with two owner periods unless the process creates a new requirement. Record this decision in the study log with the case key, the review date, and the person who approved the classification.",
      "Record how duplicate requests were matched, merged, or kept separate, because that choice changes the denominator. Report the number of cases that could not be classified and the reason, rather than forcing them into a category. If the definition of renewal risk lead time changes, keep the old and new values side by side for the transition period. Separate cases opened before the window from cases opened and closed inside it, and report both counts. Keep the evidence reference beside the coded value so a reviewer can test the same case without rebuilding the queue.",
      "Define how a correction after close is linked to the original case and whether it creates a new case. Use a stable case key and a separate identity crosswalk stored in an approved system. Record the person who approved the definition and the date it became effective. Write the start and stop events as observable actions, not as opinions about whether the work felt finished. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it.",
      "Define the controlled event as the moment a onboarding plan request becomes work, not the moment someone starts typing a note. Define allowed values for status, reason, owner, and evidence state before collection. A duplicate request is a separate intake event even when it points to the same underlying need; record the link. Keep a change log for every definition adjustment and the date it took effect. At Customer Success Managers, the reviewer should be able to explain this step to CSM from the case record alone.",
      "Use a pseudonymous case key and keep the identity crosswalk in an approved system with restricted access. Test the dictionary on a case with a missing escalation record and a case with a corrected value. Keep the original evidence reference next to the coded value so the reviewer can verify the classification. A case key should remain stable if the case moves between owners or changes status. Use the same note in the case file and the study extract; do not create a second version in a personal document.",
      "Record the version or date of the renewal risk memo and the QBR template library value so a later reviewer can see what was known at the first action. If a field is derived, record the formula and the source fields used to calculate it. Store sensitive evidence in the approved repository and keep only the reference in the analysis file. Use a separate field for reviewer notes so the coded values stay comparable. When a case needs an exception, record the reason, the owner, and the date before continuing the review.",
      "Test the dictionary on five cases before the full sample; ambiguous fields should be fixed before collection, not after. Name the required fields for each article type and mark conditional fields in the dictionary. A missing value should have a reason code, not a blank cell or a zero. Keep the original request, the approval, and the destination value linked to the same key. Keep the measurement note short enough to read with the case and specific enough to support the reported escalation age.",
      "Sample across the full observation window, including the days when the queue was busiest and the days when coverage changed. Use the same collection form for every case and keep the original record linked to the extracted fields. Record the eligible count and every exclusion before the sample is drawn. Use a random start and a fixed interval when the frame is ordered, and record both. If two reviewers disagree, preserve both classifications until the definition or the evidence is resolved.",
      "Sample across the full observation window, including the days when the queue was busiest and the days when coverage changed. Record the time of each observation so a later reviewer can distinguish a late entry from a changed decision. Record the eligible count and every exclusion before the sample is drawn. Record the date of the sample and the version of the queue export. Link the observation to the exact field in the renewal forecast and to the usage report that supports it.",
      "If the population is small, report every case and the reason the sample is exhaustive rather than presenting a false precision. Keep the collection window and the number of collectors in the report; both affect how the result should be interpreted. Use a random or systematic start rule and then take consecutive cases within each stratum. Use a random start and a fixed interval when the frame is ordered, and record both. Do not let a summary written later replace the evidence that was available at the first decision.",
      "Compare QBR completion across owners only after checking the case mix, the channel, and the evidence standard. For onboarding plan, report the age distribution and the share of cases waiting on a named owner. Record the sample date, the denominator, the numerator, and the exclusion count for every reported rate. Use a case-level table to explain an outlier before treating it as a process signal. If the case moved between owners, include both owner periods in the review note and name the handoff time.",
      "Keep case-level detail available for review, because a summary chart without records cannot support a decision. Compare periods only after checking the case mix, the definitions, and the queue rules. When two groups differ, check whether the difference survives after adjusting for case mix and evidence standard. Use a case-level table to explain an outlier before treating it as a process signal. Keep the review note with the case so the next sampler does not have to reconstruct the decision from memory.",
      "The cited public sources frame recordkeeping, privacy, security, or control practice; they do not provide a local result. The cited sources describe recordkeeping, privacy, security, or control practice; they do not supply a local benchmark. Record the response or access problems that prevented a case from being reviewed. If the queue changed during the window, explain how the change affects the denominator. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract.",
      "Report what remains unknown and what evidence would be needed to answer the next question. The record may be incomplete or delayed, so the method cannot infer work that never entered the queue. Record the response or access problems that prevented a case from being reviewed. A missing record is evidence about the record, not proof that the work was never done. At Customer Success Managers, the onboarding plan review should end with a dated note and a named owner for the next check.",
      "Keep the review note with the onboarding plan evidence so the next reviewer can see why the process changed. Keep the review note with the onboarding plan evidence so the next owner can see why the process changed. Set the next sample date before closing the review, so the action does not drift. Close the review when the owner accepts the finding and the next test is on the calendar. If the evidence is sensitive, record the approved reference and access path rather than copying the content.",
      "A quality review should end with an owner, a date, and one testable change, not a list of intentions. If the action changes unlogged escalation, record the approval from account executive before implementation. Keep the old process note until the new process has been tested; do not erase the baseline. Close the review when the owner accepts the finding and the next test is on the calendar. The note should distinguish what was observed, what was inferred, and what still needs an owner decision."
    ],
    "findings": [
      "A grounded customer success note for customer success leaders: onboarding plan with explicit evidence, decision rights, and a verified close.",
      "Report denominators and unresolved records.",
      "Keep the customer decision with the owner."
    ],
    "sources": [
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "Federal Trade Commission \u2014 business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Small Business Administration \u2014 manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-27"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-testing-evidence-completeness-in-health-score-without-a-convenience-sample",
    "title": "Testing evidence completeness in health score without a convenience sample",
    "summary": "A grounded customer success note for customer success leaders: health score with explicit evidence, decision rights, and a verified close.",
    "cluster": "quality",
    "publishedAt": "2026-10-27",
    "image": "/october-27/customersuccessmanagers-testing-evidence-completeness-in-health-score-without-a-convenience-sample.png",
    "finding": "A grounded customer success note for customer success leaders: health score with explicit evidence, decision rights, and a verified close.",
    "methodology": [
      "The protocol does not estimate an industry benchmark; it produces a local description that customer success leaders can review. Exclude a reopened case only when the reopening did not create a new requirement; keep the exclusion count and reason. Distinguish an administrative pause from a failure: a pause waits for a named decision, while a failure leaves the next action unowned. If the study is exploratory, label it exploratory and do not present the result as a stable baseline. Record this decision in the study log with the case key, the review date, and the person who approved the classification.",
      "The scope is one defined population of health score cases observed from first request through verified close in the onboarding tracker. If the population is too small to sample, say so and report the complete set rather than implying a larger study. Distinguish an administrative pause from a failure: a pause waits for a named decision, while a failure leaves the next action unowned. Name the population, the observation window, and the systems included in the extraction. Keep the evidence reference beside the coded value so a reviewer can test the same case without rebuilding the queue.",
      "Test the unit definition on a case that crosses owners, a case that is still open, and a case that was reopened. A case that moves between owners stays one case unless the process defines a new requirement at the handoff. The stop event should be the verified destination update, not the last message in the thread. If the queue was archived during the window, report the loss and exclude the affected period rather than assuming the cases were resolved. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it.",
      "If a reopened case creates a new requirement, count it as a new case and retain a link to the earlier record. If duplicate requests are merged, keep the duplicate count and the merge rule in the dataset. A correction should be classified by the original case and by the correction event, with both dates retained. If a request was reopened after the window, keep it in the original population and report the later event separately. At Customer Success Managers, the reviewer should be able to explain this step to customer sponsor from the case record alone.",
      "Define how a correction after close is linked to the original case and whether it creates a new case. A blank field, a not-applicable field, and a confirmed negative field should have different codes. A duplicate request is a separate intake event even when it points to the same underlying need; record the link. Write the start and stop events as observable actions, not as opinions about whether the work felt finished. Use the same note in the case file and the study extract; do not create a second version in a personal document.",
      "Name the owner who can declare a case complete, and record that role in the data dictionary. Keep the original text and the coded value together so a reviewer can check the classification. Define whether a case that waits for a third party is open, paused, or excluded, and apply that rule to every owner. Keep a change log for every definition adjustment and the date it took effect. When a case needs an exception, record the reason, the owner, and the date before continuing the review.",
      "Record the version or date of the usage report and the QBR template library value so a later reviewer can see what was known at the first action. Use a controlled list for exception reasons; do not let free text become the analysis category. Keep the source reference and the coded value in the same row, and do not overwrite the original with a later correction. A case key should remain stable if the case moves between owners or changes status. Keep the measurement note short enough to read with the case and specific enough to support the reported health score freshness.",
      "Test the dictionary on five cases before the full sample; ambiguous fields should be fixed before collection, not after. Keep the identity crosswalk in the approved system and restrict it to the review owner. Use one row per case and one column per required field; do not bury evidence in a long free-text note. Archive the dictionary with the study so a later reviewer can reproduce the categories. If two reviewers disagree, preserve both classifications until the definition or the evidence is resolved.",
      "Use a pseudonymous case key and keep the identity crosswalk in an approved system with restricted access. Version the dictionary and report which version was used for each observation period. Store sensitive evidence in the approved repository and keep only the reference in the analysis file. Pilot the dictionary with two reviewers and compare their classifications before the main sample. Link the observation to the exact field in the CRM and to the health score note that supports it.",
      "Sample across the full observation window, including the days when the queue was busiest and the days when coverage changed. Collect the exception reason and the action taken before the close so the analysis can separate detection from resolution. Include reopened, unresolved, and exception cases in the sample frame. Record the date of the sample and the version of the queue export. Do not let a summary written later replace the evidence that was available at the first decision.",
      "Use a random or systematic start rule for the first case, then take consecutive cases within each stratum. Use the same collection form for every case and keep the original record linked to the extracted fields. Use a random or systematic start rule and then take consecutive cases within each stratum. Use a random start and a fixed interval when the frame is ordered, and record both. If the case moved between owners, include both owner periods in the review note and name the handoff time.",
      "Record the eligible count, the sample size, and every exclusion so another reviewer can reproduce the sample. A second reviewer should re-extract a small subsample and record disagreements before the full analysis. Stratify by risk, channel, and owner so the sample is not dominated by the easiest queue. Record the sampling frame as an export with a date, filter, and row count. Keep the review note with the case so the next sampler does not have to reconstruct the decision from memory.",
      "Keep case-level detail available for review, because a summary chart without records cannot support a decision. Use case-level review to explain an outlier before treating it as a process signal. Use a simple before-and-after comparison only when the definitions and observation window are the same. When a rate changes, check whether the case mix or the evidence standard changed at the same time. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract.",
      "Separate observation from interpretation; a high completion rate on a small easy sample is not evidence of a strong control. Keep descriptive findings separate from causal claims. Write the finding in plain language and separate what was observed from what the team believes caused it. Keep descriptive findings separate from causal claims and label exploratory results. At Customer Success Managers, the health score review should end with a dated note and a named owner for the next check.",
      "Changes in definitions, staffing, or the health dashboard during the window can create a trend that is not a process effect. The cited sources describe recordkeeping, privacy, security, or control practice; they do not supply a local benchmark. If the reviewer also performed the work, note the independence limitation and use a second reviewer for a subsample. A missing record is evidence about the record, not proof that the work was never done. If the evidence is sensitive, record the approved reference and access path rather than copying the content.",
      "The method also cannot observe work that never entered the queue, which may be the most important missing population. A clean summary can hide missing evidence, especially when the operator who did the work is also the reviewer. If the queue changed during the window, explain how the change affects the denominator and the interpretation. Record the access problems that prevented a case from being reviewed. The note should distinguish what was observed, what was inferred, and what still needs an owner decision.",
      "Choose one next action: fix the source, simplify the escalation record, change the queue, adjust access, or pause the work until the owner decides. Keep the review note with the health score evidence so the next owner can see why the process changed. If the action requires a policy or access change, route it to the owner and record the decision. Keep the prior procedure available so the next reviewer can compare the old and new states. Record this decision in the study log with the case key, the review date, and the person who approved the classification.",
      "If the action affects unclear owner, route it to customer sponsor and record the approval before implementation. If the result is inconclusive, say so and choose a narrower question rather than claiming a trend. Report the action result even if the change did not work; a failed test is still evidence. Link the action to the case evidence that prompted it, not only to the meeting notes. Keep the evidence reference beside the coded value so a reviewer can test the same case without rebuilding the queue."
    ],
    "findings": [
      "A grounded customer success note for customer success leaders: health score with explicit evidence, decision rights, and a verified close.",
      "Report denominators and unresolved records.",
      "Keep the customer decision with the owner."
    ],
    "sources": [
      {
        "label": "Federal Trade Commission \u2014 business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Small Business Administration \u2014 manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-27"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-testing-whether-escalation-log-monitoring-catches-silent-failures",
    "title": "Testing whether escalation log monitoring catches silent failures",
    "summary": "A grounded customer success note for customer success leaders: escalation log with explicit evidence, decision rights, and a verified close.",
    "cluster": "monitoring",
    "publishedAt": "2026-10-27",
    "image": "/october-27/customersuccessmanagers-testing-whether-escalation-log-monitoring-catches-silent-failures.png",
    "finding": "A grounded customer success note for customer success leaders: escalation log with explicit evidence, decision rights, and a verified close.",
    "methodology": [
      "The protocol does not estimate an industry benchmark; it produces a local description that customer success leaders can review. Exclude a reopened case only when the reopening did not create a new requirement; keep the exclusion count and reason. If a definition changes during the review, keep the earlier classification and apply the new rule only to later cases. If the study is exploratory, label it exploratory and do not present the result as a stable baseline. Keep the measurement note short enough to read with the case and specific enough to support the reported QBR completion.",
      "The protocol does not estimate an industry benchmark; it produces a local description that customer success leaders can review. If one request produces several escalation record updates, define whether the unit is the request or each update before sampling. Distinguish an administrative pause from a failure: a pause waits for a named decision, while a failure leaves the next action unowned. Separate the operational question from the compliance question; this method does not certify either outcome. If two reviewers disagree, preserve both classifications until the definition or the evidence is resolved.",
      "When several escalation record updates belong to one request, state whether the request or each update is the unit and apply that rule consistently. Report the number of cases that could not be classified and the reason, rather than forcing them into a category. Use plain language in the definition and add one example and one non-example for the reviewer. If a request was reopened after the window, keep it in the original population and report the later event separately. Link the observation to the exact field in the renewal forecast and to the escalation record that supports it.",
      "The unit is one escalation log case, from the opening request to the verified close, and linked events stay with that case. Exclude cases opened outside the window only when the exclusion rule was written before collection. The start event should be the first recorded request, not the first time the team opened the case. Use the same case key across the queue export and the evidence extract to avoid double counting. Do not let a summary written later replace the evidence that was available at the first decision.",
      "A case that has no destination change should be defined as cancelled or rejected, not counted as complete. Record the version of the renewal risk memo and the CRM snapshot used for each case. Define whether a case that waits for a third party is open, paused, or excluded, and apply that rule to every owner. If two reviewers disagree, preserve both classifications until the definition is clarified. If the case moved between owners, include both owner periods in the review note and name the handoff time.",
      "Measure elapsed time from the first recorded request to the verified destination update, and report waiting intervals separately. Do not store sensitive content in the analysis file when a reference to the approved repository is enough. A correction is a change to a closed record; a clarification that does not change the record is a note, not a correction. If two reviewers disagree, preserve both classifications until the definition is clarified. Keep the review note with the case so the next sampler does not have to reconstruct the decision from memory.",
      "Keep free-text notes separate from coded fields so the analysis does not depend on inconsistent wording. Record the extraction time separately from the event time so a late entry is visible. Record the source identifier, the field name, the observation time, and the reviewer for every extracted value. Use a separate field for reviewer notes so the coded values stay comparable. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract.",
      "Record the version or date of the onboarding plan and the onboarding tracker value so a later reviewer can see what was known at the first action. Version the dictionary and report which version was used for each observation period. A missing value should have a reason code, not a blank cell or a zero. Pilot the dictionary with two reviewers and compare their classifications before the main sample. At Customer Success Managers, the escalation log review should end with a dated note and a named owner for the next check.",
      "Mark missing, unavailable, and confirmed negative values separately; collapsing them hides the difference between no evidence and evidence of absence. Use a controlled list for exception reasons; do not let free text become the analysis category. A missing value should have a reason code, not a blank cell or a zero. Define who may change a coded value and how the change is logged. If the evidence is sensitive, record the approved reference and access path rather than copying the content.",
      "Record the eligible count, the sample size, and every exclusion so another reviewer can reproduce the sample. Do not clean the data by filling missing values; preserve the missing state and report it as a result. A sample of recent closures can miss the oldest unresolved work, which is often the most informative. A case that is difficult to access is still part of the frame; report the access failure rather than replacing it silently. The note should distinguish what was observed, what was inferred, and what still needs an owner decision.",
      "If the population is small, report every case and the reason the sample is exhaustive rather than presenting a false precision. Keep the collection window and the number of collectors in the report; both affect how the result should be interpreted. If a stratum has fewer cases than planned, report the smaller count instead of replacing it with a convenience case. Record the sampling frame as an export with a date, filter, and row count. Record this decision in the study log with the case key, the review date, and the person who approved the classification.",
      "Stop expanding the sample only when the review question is answered, not when the result starts to look favorable. Do not clean the data by filling missing values; preserve the missing state and report it as a result. If a stratum has fewer cases than planned, report the smaller count instead of replacing it with a convenience case. A case that is difficult to access is still part of the frame; report the access failure rather than replacing it silently. Keep the evidence reference beside the coded value so a reviewer can test the same case without rebuilding the queue.",
      "State which findings are descriptive and which require a follow-up test with a larger or different sample. Report denominators with every rate and separate missing evidence from negative evidence. If the result is unstable, say which cases create the variation and what a larger sample would test. Keep descriptive findings separate from causal claims and label exploratory results. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it.",
      "If the sample is small, report the instability and the cases that drive the result instead of a precise-looking percentage. A small sample should be reported with the number of cases that drive the result. Show the unresolved cases by owner, age, and dependency instead of reporting a single completion percentage. Keep descriptive findings separate from causal claims and label exploratory results. At Customer Success Managers, the reviewer should be able to explain this step to account executive from the case record alone.",
      "Selection bias remains if the team samples only records that are easy to open or cases handled by cooperative owners. Small samples are unstable; report the range and the cases that create the variation. Do not treat a missing record as proof that the work did not happen; it is evidence about the record. A missing record is evidence about the record, not proof that the work was never done. Use the same note in the case file and the study extract; do not create a second version in a personal document.",
      "The record may be incomplete, delayed, or maintained outside the team, so the method cannot infer missing work from a clean summary. The study cannot determine whether a professional judgment was correct, only whether the record supports it. If the queue changed during the window, explain how the change affects the denominator and the interpretation. If the reviewer performed the work, use a second reviewer for a subsample and report the disagreement. When a case needs an exception, record the reason, the owner, and the date before continuing the review.",
      "If the action affects missed renewal signal, route it to support lead and record the approval before implementation. If the result is inconclusive, say so and choose a narrower question rather than claiming a trend. Choose a measure that can move within one cycle and a second measure that checks for unintended effects. Keep the prior procedure available so the next reviewer can compare the old and new states. Keep the measurement note short enough to read with the case and specific enough to support the reported onboarding milestone completion.",
      "Name the owner who will read the result and set a review date before the sample is collected. Choose one change and one measure to test it; a long action list is hard to evaluate. Choose a measure that can move within one cycle and a second measure that checks for unintended effects. Link the action to the case evidence that prompted it, not only to the meeting notes. If two reviewers disagree, preserve both classifications until the definition or the evidence is resolved."
    ],
    "findings": [
      "A grounded customer success note for customer success leaders: escalation log with explicit evidence, decision rights, and a verified close.",
      "Report denominators and unresolved records.",
      "Keep the customer decision with the owner."
    ],
    "sources": [
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "Federal Trade Commission \u2014 business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Small Business Administration \u2014 manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-27"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-27"
      }
    ]
  }
];
