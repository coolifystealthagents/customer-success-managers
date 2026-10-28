import type { ResearchPost } from '../types';
export const october28ResearchPosts: ResearchPost[] = [
  {
    "slug": "customersuccessmanagers-measuring-decision-latency-in-onboarding-plan",
    "title": "Measuring decision latency in onboarding plan",
    "summary": "A grounded customer success note for customer success leaders: onboarding plan with explicit evidence, decision rights, and a verified close.",
    "cluster": "measurement",
    "publishedAt": "2026-10-28",
    "image": "/october-28/customersuccessmanagers-measuring-decision-latency-in-onboarding-plan.png",
    "finding": "A grounded customer success note for customer success leaders: onboarding plan with explicit evidence, decision rights, and a verified close.",
    "sections": [
      {
        "heading": "Question and scope",
        "paragraphs": [
          "The question should name the unit, the start event, the stop event, and the decision the result is meant to inform. Record the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. Distinguish an administrative pause from a failure: a pause waits for a named decision, while a failure leaves the next action unowned. The protocol should be short enough for an operator to follow and specific enough for a reviewer to repeat. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 onboarding plan exception log should show the reason code, owner, and release decision.",
          "The question should name the unit, the start event, the stop event, and the decision the result is meant to inform. The unit definition should be stable enough that two reviewers can classify the same case the same way. The definitions should be short enough to use at the queue and precise enough to defend in a review with CSM. Separate the operational question from the compliance question; this method does not certify either outcome. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 onboarding plan recovery test should record the restore point and the health score freshness result."
        ]
      },
      {
        "heading": "Population and unit",
        "paragraphs": [
          "A population that changes size during the day should be reported with the start, end, and net change, not only the closing total. Exclude cases opened outside the window only when the exclusion rule was written before collection. The definition should make it possible to classify a case without asking the person who did the work. Keep a list of requests closed as duplicates and show which case survived. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the onboarding plan source, the owner, and the next review time.",
          "Include cases opened before the window but closed inside it only when the protocol says they belong to the population. Record the queue at the start and end of each observation day so additions and withdrawals are visible. If the definition of renewal risk lead time changes, keep the old and new values side by side for the transition period. A case that never received an owner still belongs in the population; do not drop it because it is difficult to classify. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for onboarding plan should show the source version and the account executive decision."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "Test each definition on a routine case, a missing-evidence case, and a case that crossed owners. A blank field, a not-applicable field, and a confirmed negative field should have different codes. Record the person who approved the definition and the date it became effective. Record the pause rule and the person authorized to release a paused case. Use the same note in the case file and the study extract; do not create a second version in a personal document. The onboarding plan review at Customer Success Managers should state whether the QBR packet was current on October 28.",
          "Name the owner who can declare a case complete, and record that role in the data dictionary. Use a stable case key and a separate identity crosswalk stored in an approved system. A duplicate request is a separate intake event even when it points to the same underlying need; record the link. Keep a change log for every definition adjustment and the date it took effect. Keep the measurement note short enough to read with the case and specific enough to support the reported reopen rate. The October 28 onboarding plan note should distinguish a missing escalation record from a confirmed negative."
        ]
      },
      {
        "heading": "Data dictionary and evidence",
        "paragraphs": [
          "Keep free-text notes separate from coded fields so the analysis does not depend on inconsistent wording. Version the dictionary and report which version was used for each observation period. Record the data extraction date and the version of the support desk used for the population count. Do not use a zero or an empty string to represent missing evidence. Link the observation to the exact field in the support desk and to the escalation record that supports it. The support lead decision on onboarding plan should be dated October 28 and linked to the escalation record.",
          "If the source is a document, record the page or field; if the source is a system, record the record identifier and extraction time. Give every case a study key that is not the client name, member number, or candidate email. Record the source identifier, the field name, the observation time, and the reviewer for every extracted value. Archive the dictionary with the study so a later reviewer can reproduce the categories. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 onboarding plan close should name the destination field, the approver, and the health score freshness check.",
          "Use a pseudonymous case key and keep the identity crosswalk in an approved system with restricted access. Record the extraction time separately from the event time so a late entry is visible. Run a five-case pilot before the full sample and revise any field that two reviewers interpret differently. Pilot the dictionary with two reviewers and compare their classifications before the main sample. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 onboarding plan exception log should show the reason code, owner, and release decision."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "Record the eligible count, the sample size, and every exclusion so another reviewer can reproduce the sample. Do not clean the data by filling missing values; preserve the missing state and report it as a result. If a stratum has fewer cases than planned, report the smaller count instead of replacing it with a convenience case. Keep a table of planned, eligible, selected, and reviewed counts for each stratum. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 onboarding plan recovery test should record the restore point and the escalation age result.",
          "Stop expanding the sample only when the review question is answered, not when the result starts to look favorable. Collect the case from the renewal forecast, the usage report, and the approval record, and stop at the verified close. Record the eligible count and every exclusion before the sample is drawn. Keep a table of planned, eligible, selected, and reviewed counts for each stratum. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the onboarding plan source, the owner, and the next review time.",
          "A convenience sample of recently closed cases will overrepresent easy work and underrepresent the tail that needs attention. Record the time of each observation so a later reviewer can distinguish a late entry from a changed decision. Use a random or systematic start rule and then take consecutive cases within each stratum. A case that is difficult to access is still part of the frame; report the access failure rather than replacing it silently. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for onboarding plan should show the source version and the support lead decision."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "Compare QBR completion across owners only after checking the case mix, the channel, and the evidence standard. Keep descriptive findings separate from causal claims. When two groups differ, check whether the difference survives after adjusting for case mix and evidence standard. Use a case-level table to explain an outlier before treating it as a process signal. Use the same note in the case file and the study extract; do not create a second version in a personal document. The onboarding plan review at Customer Success Managers should state whether the usage report was current on October 28.",
          "State which findings are descriptive and which require a follow-up test with a larger or different sample. A small sample should be reported with the number of cases that drive the result. Show the unresolved cases by owner, age, and dependency instead of reporting a single completion percentage. When a rate changes, check whether the case mix or the evidence standard changed at the same time. Keep the measurement note short enough to read with the case and specific enough to support the reported reopen rate. The October 28 onboarding plan note should distinguish a missing onboarding plan from a confirmed negative."
        ]
      },
      {
        "heading": "Limitations",
        "paragraphs": [
          "Selection bias remains if the team samples only records that are easy to open or cases handled by cooperative owners. Selection bias remains when the team chooses cases that are easy to open or owners who are likely to cooperate. Name the follow-up evidence that would reduce the largest uncertainty. State that the result describes the observed sample, not the whole industry or every team in the service. Link the observation to the exact field in the CRM and to the onboarding plan that supports it. The customer sponsor decision on onboarding plan should be dated October 28 and linked to the onboarding plan.",
          "Report what remains unknown and what evidence would be needed to answer the next question. The study cannot determine whether a professional judgment was correct, only whether the record supports it. Report the limits of the health dashboard data, including fields that were unavailable or changed during the window. State that the result describes the observed sample, not the whole industry or every team in the service. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 onboarding plan close should name the destination field, the approver, and the health score freshness check."
        ]
      },
      {
        "heading": "Review and next action",
        "paragraphs": [
          "Keep the review note with the onboarding plan evidence so the next reviewer can see why the process changed. Choose one change and one measure to test it; a long action list is hard to evaluate. If the action requires a policy or access change, route it to the owner and record the decision. Link the action to the case evidence that prompted it, not only to the meeting notes. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 onboarding plan exception log should show the reason code, owner, and release decision.",
          "Report what moved, what did not, and which result is still unexplained. Report what moved, what stayed the same, and what the study still cannot explain. Close the review only when the owner has accepted the result and the next check is scheduled. Schedule the next review before the action begins, not after the result arrives. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 onboarding plan recovery test should record the restore point and the renewal risk lead time result."
        ]
      }
    ],
    "sources": [
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "Federal Trade Commission — business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Small Business Administration — manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-28"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-testing-evidence-retention-across-health-score-corrections",
    "title": "Testing evidence retention across health score corrections",
    "summary": "A grounded customer success note for customer success leaders: health score with explicit evidence, decision rights, and a verified close.",
    "cluster": "quality",
    "publishedAt": "2026-10-28",
    "image": "/october-28/customersuccessmanagers-testing-evidence-retention-across-health-score-corrections.png",
    "finding": "A grounded customer success note for customer success leaders: health score with explicit evidence, decision rights, and a verified close.",
    "sections": [
      {
        "heading": "Question and scope",
        "paragraphs": [
          "The question should name the unit, the start event, the stop event, and the decision the result is meant to inform. If one request produces several QBR packet updates, define whether the unit is the request or each update before sampling. A case is complete only when the health dashboard shows the approved destination value and the QBR packet supports it. Name the population, the observation window, and the systems included in the extraction. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the health score source, the owner, and the next review time.",
          "The question should name the unit, the start event, the stop event, and the decision the result is meant to inform. Record the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. Record how corrections, reopens, and duplicate requests are treated so escalation age cannot be inflated by reclassification. Write the decision the study is meant to inform before choosing the measure. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for health score should show the source version and the support lead decision."
        ]
      },
      {
        "heading": "Population and unit",
        "paragraphs": [
          "Include cases opened before the window but closed inside it only when the protocol says they belong to the population. The population should include unresolved cases, not only closures, or the study will overstate completion. A correction should be classified by the original case and by the correction event, with both dates retained. Keep a list of requests closed as duplicates and show which case survived. Use the same note in the case file and the study extract; do not create a second version in a personal document. The health score review at Customer Success Managers should state whether the escalation record was current on October 28.",
          "A population that changes size during the day should be reported with the start, end, and net change, not only the closing total. Record the queue at the start and end of each observation day so additions and withdrawals are visible. The stop event should be the verified destination update, not the last message in the thread. Record the extraction date and the queue filter so another reviewer can reproduce the population count. Keep the measurement note short enough to read with the case and specific enough to support the reported QBR completion. The October 28 health score note should distinguish a missing renewal risk memo from a confirmed negative."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "Name the owner who can declare a case complete, and record that role in the data dictionary. Record the source system, the record identifier, the extraction time, and the reviewer for every extracted value. Record the person who approved the definition and the date it became effective. Define whether the measure counts requests, cases, or destination updates, and use that unit consistently. Link the observation to the exact field in the support desk and to the renewal risk memo that supports it. The CSM decision on health score should be dated October 28 and linked to the renewal risk memo.",
          "Name the owner who can declare a case complete, and record that role in the data dictionary. Record the source system, the record identifier, the extraction time, and the reviewer for every extracted value. Define whether a case that waits for a third party is open, paused, or excluded, and apply that rule to every owner. A definition that depends on the reviewer’s memory is not reproducible enough for this study. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 health score close should name the destination field, the approver, and the onboarding milestone completion check."
        ]
      },
      {
        "heading": "Data dictionary and evidence",
        "paragraphs": [
          "Record the version or date of the usage report and the QBR template library value so a later reviewer can see what was known at the first action. Version the dictionary and report which version was used for each observation period. Keep the original evidence reference next to the coded value so the reviewer can verify the classification. Archive the dictionary with the study so a later reviewer can reproduce the categories. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 health score exception log should show the reason code, owner, and release decision.",
          "If the source is a document, record the page or field; if the source is a system, record the record identifier and extraction time. If a field is derived, record the formula and the source fields used to calculate it. A missing value should have a reason code, not a blank cell or a zero. Record the source location, not just the file name, so a reviewer can reopen the exact evidence. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 health score recovery test should record the restore point and the escalation age result.",
          "If the source is a document, record the page or field; if the source is a system, record the record identifier and extraction time. If a field is derived, record the formula and the source fields used to calculate it. Record the source identifier, the field name, the observation time, and the reviewer for every extracted value. A case key should remain stable if the case moves between owners or changes status. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the health score source, the owner, and the next review time."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "Use consecutive health score cases where possible, then stratify by owner, channel, and risk class. A second reviewer should re-extract a small subsample and record disagreements before the full analysis. Include reopened, unresolved, and exception cases in the sample frame. Do not let the reviewer choose the sample after seeing the results. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for health score should show the source version and the CSM decision.",
          "A convenience sample of recently closed cases will overrepresent easy work and underrepresent the tail that needs attention. Record the time of each observation so a later reviewer can distinguish a late entry from a changed decision. Use a random or systematic start rule and then take consecutive cases within each stratum. Use a random start and a fixed interval when the frame is ordered, and record both. Use the same note in the case file and the study extract; do not create a second version in a personal document. The health score review at Customer Success Managers should state whether the health score note was current on October 28.",
          "Include adverse cases: a missing QBR packet, a conflicting source, an unavailable account executive, and a tight deadline. If a source cannot be accessed, mark it unavailable and record the access problem rather than asking the operator to reconstruct it from memory. Keep the sample selection reproducible by recording the export date, filter, and random seed or start rule. If a selected case is out of scope, replace it only with the next case in the same stratum and record the substitution. Keep the measurement note short enough to read with the case and specific enough to support the reported reopen rate. The October 28 health score note should distinguish a missing QBR packet from a confirmed negative."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "State which findings are descriptive and which require a follow-up test with a larger or different sample. Compare periods only after checking the case mix, the definitions, and the queue rules. Write the finding in plain language and separate what was observed from what the team believes caused it. When a rate changes, check whether the case mix or the evidence standard changed at the same time. Link the observation to the exact field in the CRM and to the health score note that supports it. The account executive decision on health score should be dated October 28 and linked to the health score note.",
          "Separate observation from interpretation; a high completion rate on a small easy sample is not evidence of a strong control. The analysis should end with the decision the evidence can support and the decision it cannot support. If the result is unstable, say which cases create the variation and what a larger sample would test. Show the age distribution and the open-case count by owner, not only the mean. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 health score close should name the destination field, the approver, and the onboarding milestone completion check."
        ]
      },
      {
        "heading": "Limitations",
        "paragraphs": [
          "The cited public sources frame recordkeeping, privacy, security, or control practice; they do not provide a local result. Report the unknown population and the evidence that would be needed to describe it. Do not treat a missing record as proof that the work did not happen; it is evidence about the record. If the queue changed during the window, explain how the change affects the denominator. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 health score exception log should show the reason code, owner, and release decision.",
          "Report what remains unknown and what evidence would be needed to answer the next question. Changes in staffing, access, or the onboarding tracker during the window can create a difference that is not a process effect. Report the limits of the onboarding tracker data, including fields that were unavailable or changed during the window. State what a follow-up study would measure and which population it would include. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 health score recovery test should record the restore point and the escalation age result."
        ]
      },
      {
        "heading": "Review and next action",
        "paragraphs": [
          "A quality review should end with an owner, a date, and one testable change, not a list of intentions. If the result is inconclusive, say so and choose a narrower question rather than claiming a trend. Report the action result even if the change did not work; a failed test is still evidence. Close the review when the owner accepts the finding and the next test is on the calendar. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the health score source, the owner, and the next review time.",
          "A quality review should end with an owner, a date, and one testable change, not a list of intentions. Keep the review note with the health score evidence so the next owner can see why the process changed. If the action requires a policy or access change, route it to the owner and record the decision. Keep the prior procedure available so the next reviewer can compare the old and new states. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for health score should show the source version and the customer sponsor decision."
        ]
      }
    ],
    "sources": [
      {
        "label": "Federal Trade Commission — business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Small Business Administration — manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-28"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-estimating-exception-spillover-in-qbr-packet",
    "title": "Estimating exception spillover in QBR packet",
    "summary": "A grounded customer success note for customer success leaders: QBR packet with explicit evidence, decision rights, and a verified close.",
    "cluster": "cost",
    "publishedAt": "2026-10-28",
    "image": "/october-28/customersuccessmanagers-estimating-exception-spillover-in-qbr-packet.png",
    "finding": "A grounded customer success note for customer success leaders: QBR packet with explicit evidence, decision rights, and a verified close.",
    "sections": [
      {
        "heading": "Question and scope",
        "paragraphs": [
          "Write the primary question and one supporting question, then stop; a long list of questions usually hides an undefined unit. State how duplicate requests are identified and whether they are merged, linked, or counted separately. Distinguish an administrative pause from a failure: a pause waits for a named decision, while a failure leaves the next action unowned. The protocol should be short enough for an operator to follow and specific enough for a reviewer to repeat. Use the same note in the case file and the study extract; do not create a second version in a personal document. The QBR packet review at Customer Success Managers should state whether the renewal risk memo was current on October 28.",
          "This protocol asks how QBR packet can be described from the operational record in customer success without turning a completion count into a quality claim. Exclude a reopened case only when the reopening did not create a new requirement; keep the exclusion count and reason. Write the primary measure and one supporting measure; a measure without a denominator or observation window is not ready. Separate the operational question from the compliance question; this method does not certify either outcome. Keep the measurement note short enough to read with the case and specific enough to support the reported renewal risk lead time. The October 28 QBR packet note should distinguish a missing usage report from a confirmed negative."
        ]
      },
      {
        "heading": "Population and unit",
        "paragraphs": [
          "When several usage report updates belong to one request, state whether the request or each update is the unit and apply that rule consistently. A denominator that changes during the window should be reported separately for each period. Use plain language in the definition and add one example and one non-example for the reviewer. If a request was reopened after the window, keep it in the original population and report the later event separately. Link the observation to the exact field in the support desk and to the usage report that supports it. The customer sponsor decision on QBR packet should be dated October 28 and linked to the usage report.",
          "If a reopened case creates a new requirement, count it as a new case and retain a link to the earlier record. Report the number of cases that could not be classified and the reason, rather than forcing them into a category. The stop event should be the verified destination update, not the last message in the thread. If a request was reopened after the window, keep it in the original population and report the later event separately. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 QBR packet close should name the destination field, the approver, and the reopen rate check."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "A pause should have a reason, an owner, and a review date; otherwise it is an unowned case with a different label. A blank field, a not-applicable field, and a confirmed negative field should have different codes. Use the same status vocabulary in the queue, the evidence extract, and the report so a case does not change category. A definition that depends on the reviewer’s memory is not reproducible enough for this study. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 QBR packet exception log should show the reason code, owner, and release decision.",
          "A pause should have a reason, an owner, and a review date; otherwise it is an unowned case with a different label. Use a stable case key and a separate identity crosswalk stored in an approved system. A duplicate request is a separate intake event even when it points to the same underlying need; record the link. A definition that depends on the reviewer’s memory is not reproducible enough for this study. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 QBR packet recovery test should record the restore point and the health score freshness result."
        ]
      },
      {
        "heading": "Data dictionary and evidence",
        "paragraphs": [
          "The data dictionary should name the allowed values for status, exception reason, owner, and close evidence. Version the dictionary and report which version was used for each observation period. Record the data extraction date and the version of the renewal forecast used for the population count. Use a separate field for reviewer notes so the coded values stay comparable. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the QBR packet source, the owner, and the next review time.",
          "Use a pseudonymous case key and keep the identity crosswalk in an approved system with restricted access. Keep the identity crosswalk in the approved system and restrict it to the review owner. Record the source identifier, the field name, the observation time, and the reviewer for every extracted value. Keep the original request, the approval, and the destination value linked to the same key. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for QBR packet should show the source version and the CSM decision.",
          "Record the version or date of the escalation record and the health dashboard value so a later reviewer can see what was known at the first action. Name the required fields for each article type and mark conditional fields in the dictionary. A missing value should have a reason code, not a blank cell or a zero. Define who may change a coded value and how the change is logged. Use the same note in the case file and the study extract; do not create a second version in a personal document. The QBR packet review at Customer Success Managers should state whether the escalation record was current on October 28."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "Record the eligible count, the sample size, and every exclusion so another reviewer can reproduce the sample. Collect the exception reason and the action taken before the close so the analysis can separate detection from resolution. Include reopened, unresolved, and exception cases in the sample frame. Record the date of the sample and the version of the queue export. Keep the measurement note short enough to read with the case and specific enough to support the reported QBR completion. The October 28 QBR packet note should distinguish a missing QBR packet from a confirmed negative.",
          "Include adverse cases: a missing escalation record, a conflicting source, an unavailable account executive, and a tight deadline. Record the time of each observation so a later reviewer can distinguish a late entry from a changed decision. Stratify by risk, channel, and owner so the sample is not dominated by the easiest queue. Do not let the reviewer choose the sample after seeing the results. Link the observation to the exact field in the health dashboard and to the escalation record that supports it. The account executive decision on QBR packet should be dated October 28 and linked to the escalation record.",
          "Use a random or systematic start rule for the first case, then take consecutive cases within each stratum. A second reviewer should re-extract a small subsample and record disagreements before the full analysis. Use a random or systematic start rule and then take consecutive cases within each stratum. If a selected case is out of scope, replace it only with the next case in the same stratum and record the substitution. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 QBR packet close should name the destination field, the approver, and the onboarding milestone completion check."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "If the sample is small, report the instability and the cases that drive the result instead of a precise-looking percentage. Compare periods only after checking the case mix, the definitions, and the queue rules. Record the sample date, the denominator, the numerator, and the exclusion count for every reported rate. Report the numerator, denominator, observation window, and exclusion count for each measure. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 QBR packet exception log should show the reason code, owner, and release decision.",
          "Compare health score freshness across owners only after checking the case mix, the channel, and the evidence standard. Compare periods only after checking the case mix, the definitions, and the queue rules. Write the finding in plain language and separate what was observed from what the team believes caused it. When a rate changes, check whether the case mix or the evidence standard changed at the same time. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 QBR packet recovery test should record the restore point and the health score freshness result."
        ]
      },
      {
        "heading": "Limitations",
        "paragraphs": [
          "Selection bias remains if the team samples only records that are easy to open or cases handled by cooperative owners. The record may be incomplete or delayed, so the method cannot infer work that never entered the queue. Keep the limitations with the result so a later reader does not turn a local observation into a general claim. Keep the limitations with the result so a local observation is not turned into a general claim. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the QBR packet source, the owner, and the next review time.",
          "Selection bias remains if the team samples only records that are easy to open or cases handled by cooperative owners. Changes in staffing, access, or the support desk during the window can create a difference that is not a process effect. Name the follow-up evidence that would reduce the largest uncertainty. Keep the limitations with the result so a local observation is not turned into a general claim. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for QBR packet should show the source version and the account executive decision."
        ]
      },
      {
        "heading": "Review and next action",
        "paragraphs": [
          "Choose one next action: fix the source, simplify the usage report, change the queue, adjust access, or pause the work until the owner decides. Choose one change and one measure to test it; a long action list is hard to evaluate. Close the review only when the owner has accepted the result and the next check is scheduled. Keep the prior procedure available so the next reviewer can compare the old and new states. Use the same note in the case file and the study extract; do not create a second version in a personal document. The QBR packet review at Customer Success Managers should state whether the usage report was current on October 28.",
          "Name the owner who will read the result and set a review date before the sample is collected. Name the owner, the review date, and the decision the study is expected to inform. If the action requires a policy or access change, route it to the owner and record the decision. Close the review when the owner accepts the finding and the next test is on the calendar. Keep the measurement note short enough to read with the case and specific enough to support the reported reopen rate. The October 28 QBR packet note should distinguish a missing onboarding plan from a confirmed negative."
        ]
      }
    ],
    "sources": [
      {
        "label": "U.S. Small Business Administration — manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "Federal Trade Commission — business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-28"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-auditing-backup-owner-coverage-for-renewal-risk",
    "title": "Auditing backup-owner coverage for renewal risk",
    "summary": "A grounded customer success note for customer success leaders: renewal risk with explicit evidence, decision rights, and a verified close.",
    "cluster": "coverage",
    "publishedAt": "2026-10-28",
    "image": "/october-28/customersuccessmanagers-auditing-backup-owner-coverage-for-renewal-risk.png",
    "finding": "A grounded customer success note for customer success leaders: renewal risk with explicit evidence, decision rights, and a verified close.",
    "sections": [
      {
        "heading": "Question and scope",
        "paragraphs": [
          "The protocol does not estimate an industry benchmark; it produces a local description that customer success leaders can review. If one request produces several onboarding plan updates, define whether the unit is the request or each update before sampling. Record how corrections, reopens, and duplicate requests are treated so renewal risk lead time cannot be inflated by reclassification. Write the decision the study is meant to inform before choosing the measure. Link the observation to the exact field in the support desk and to the onboarding plan that supports it. The account executive decision on renewal risk should be dated October 28 and linked to the onboarding plan.",
          "A useful scope is narrow enough to reproduce and specific enough to show whether overpromised feature is being detected. Record the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. Write the primary measure and one supporting measure; a measure without a denominator or observation window is not ready. State whether the study covers one team, one client, or all cases in the defined service. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 renewal risk close should name the destination field, the approver, and the QBR completion check."
        ]
      },
      {
        "heading": "Population and unit",
        "paragraphs": [
          "Include cases opened before the window but closed inside it only when the protocol says they belong to the population. The population should include unresolved cases, not only closures, or the study will overstate completion. A correction should be classified by the original case and by the correction event, with both dates retained. A case that never received an owner still belongs in the population; do not drop it because it is difficult to classify. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 renewal risk exception log should show the reason code, owner, and release decision.",
          "When several QBR packet updates belong to one request, state whether the request or each update is the unit and apply that rule consistently. Report the number of cases that could not be classified and the reason, rather than forcing them into a category. Use plain language in the definition and add one example and one non-example for the reviewer. Separate cases opened before the window from cases opened and closed inside it, and report both counts. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 renewal risk recovery test should record the restore point and the onboarding milestone completion result."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "Test each definition on a routine case, a missing-evidence case, and a case that crossed owners. Keep the original text and the coded value together so a reviewer can check the classification. A duplicate request is a separate intake event even when it points to the same underlying need; record the link. Define whether the measure counts requests, cases, or destination updates, and use that unit consistently. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the renewal risk source, the owner, and the next review time.",
          "Measure elapsed time from the first recorded request to the verified destination update, and report waiting intervals separately. Keep the original text and the coded value together so a reviewer can check the classification. If a case is outside the scope rule, record the rule and the date of exclusion rather than removing it silently. Give one concrete example and one boundary case to each reviewer before collection begins. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for renewal risk should show the source version and the customer sponsor decision."
        ]
      },
      {
        "heading": "Data dictionary and evidence",
        "paragraphs": [
          "Record the version or date of the escalation record and the CRM value so a later reviewer can see what was known at the first action. Use a controlled list for exception reasons; do not let free text become the analysis category. Keep the source reference and the coded value in the same row, and do not overwrite the original with a later correction. Keep the original request, the approval, and the destination value linked to the same key. Use the same note in the case file and the study extract; do not create a second version in a personal document. The renewal risk review at Customer Success Managers should state whether the escalation record was current on October 28.",
          "Record the version or date of the renewal risk memo and the health dashboard value so a later reviewer can see what was known at the first action. If a field is derived, record the formula and the source fields used to calculate it. Use one row per case and one column per required field; do not bury evidence in a long free-text note. Pilot the dictionary with two reviewers and compare their classifications before the main sample. Keep the measurement note short enough to read with the case and specific enough to support the reported QBR completion. The October 28 renewal risk note should distinguish a missing renewal risk memo from a confirmed negative.",
          "Use a pseudonymous case key and keep the identity crosswalk in an approved system with restricted access. Name the required fields for each article type and mark conditional fields in the dictionary. Run a five-case pilot before the full sample and revise any field that two reviewers interpret differently. Archive the dictionary with the study so a later reviewer can reproduce the categories. Link the observation to the exact field in the onboarding tracker and to the usage report that supports it. The account executive decision on renewal risk should be dated October 28 and linked to the usage report."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "Use a random or systematic start rule for the first case, then take consecutive cases within each stratum. Collect the exception reason and the action taken before the close so the analysis can separate detection from resolution. If a stratum has fewer cases than planned, report the smaller count instead of replacing it with a convenience case. Do not let the reviewer choose the sample after seeing the results. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 renewal risk close should name the destination field, the approver, and the reopen rate check.",
          "If the population is small, report every case and the reason the sample is exhaustive rather than presenting a false precision. Do not clean the data by filling missing values; preserve the missing state and report it as a result. Keep the sample selection reproducible by recording the export date, filter, and random seed or start rule. Include at least one case from each owner in scope when the frame allows it. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 renewal risk exception log should show the reason code, owner, and release decision.",
          "If the population is small, report every case and the reason the sample is exhaustive rather than presenting a false precision. If a source cannot be accessed, mark it unavailable and record the access problem rather than asking the operator to reconstruct it from memory. Record the eligible count and every exclusion before the sample is drawn. Use a random start and a fixed interval when the frame is ordered, and record both. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 renewal risk recovery test should record the restore point and the health score freshness result."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "Separate observation from interpretation; a high completion rate on a small easy sample is not evidence of a strong control. Report denominators with every rate and separate missing evidence from negative evidence. If the result is unstable, say which cases create the variation and what a larger sample would test. Report the numerator, denominator, observation window, and exclusion count for each measure. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the renewal risk source, the owner, and the next review time.",
          "Compare escalation age across owners only after checking the case mix, the channel, and the evidence standard. Use case-level review to explain an outlier before treating it as a process signal. When two groups differ, check whether the difference survives after adjusting for case mix and evidence standard. Use a case-level table to explain an outlier before treating it as a process signal. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for renewal risk should show the source version and the support lead decision."
        ]
      },
      {
        "heading": "Limitations",
        "paragraphs": [
          "Selection bias remains if the team samples only records that are easy to open or cases handled by cooperative owners. Report the unknown population and the evidence that would be needed to describe it. Report the limits of the support desk data, including fields that were unavailable or changed during the window. If the reviewer performed the work, use a second reviewer for a subsample and report the disagreement. Use the same note in the case file and the study extract; do not create a second version in a personal document. The renewal risk review at Customer Success Managers should state whether the onboarding plan was current on October 28.",
          "The study cannot determine whether the professional decision was correct, only whether the record and handoff are reconstructable. Changes in staffing, access, or the QBR template library during the window can create a difference that is not a process effect. Record the response or access problems that prevented a case from being reviewed. If the queue changed during the window, explain how the change affects the denominator. Keep the measurement note short enough to read with the case and specific enough to support the reported QBR completion. The October 28 renewal risk note should distinguish a missing health score note from a confirmed negative."
        ]
      },
      {
        "heading": "Review and next action",
        "paragraphs": [
          "Keep the review note with the renewal risk evidence so the next reviewer can see why the process changed. Keep the review note with the renewal risk evidence so the next owner can see why the process changed. Link the action to the specific renewal risk cases that motivated it. Record the owner, due date, and exact change that will be tested at the next review. Link the observation to the exact field in the QBR template library and to the health score note that supports it. The CSM decision on renewal risk should be dated October 28 and linked to the health score note.",
          "If the action affects unclear owner, route it to support lead and record the approval before implementation. Keep the review note with the renewal risk evidence so the next owner can see why the process changed. Report the action result even if the change did not work; a failed test is still evidence. If the action needs approval, record the approver and the date before the change is applied. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 renewal risk close should name the destination field, the approver, and the onboarding milestone completion check."
        ]
      }
    ],
    "sources": [
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "Federal Trade Commission — business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Small Business Administration — manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-28"
      }
    ]
  },
  {
    "slug": "customersuccessmanagers-testing-whether-escalation-log-audit-samples-detect-silent-gaps",
    "title": "Testing whether escalation log audit samples detect silent gaps",
    "summary": "A grounded customer success note for customer success leaders: escalation log with explicit evidence, decision rights, and a verified close.",
    "cluster": "monitoring",
    "publishedAt": "2026-10-28",
    "image": "/october-28/customersuccessmanagers-testing-whether-escalation-log-audit-samples-detect-silent-gaps.png",
    "finding": "A grounded customer success note for customer success leaders: escalation log with explicit evidence, decision rights, and a verified close.",
    "sections": [
      {
        "heading": "Question and scope",
        "paragraphs": [
          "The scope is one defined population of escalation log cases observed from first request through verified close in the QBR template library. A count without a denominator is not a measurement, especially when the queue changes size during the day. A case is complete only when the QBR template library shows the approved destination value and the QBR packet supports it. Record the exclusions in advance so a difficult case cannot be removed after the result is known. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 escalation log exception log should show the reason code, owner, and release decision.",
          "Write the primary question and one supporting question, then stop; a long list of questions usually hides an undefined unit. A count without a denominator is not a measurement, especially when the queue changes size during the day. Define age from the first recorded request, not from the first time someone remembered to open the case. If the study is exploratory, label it exploratory and do not present the result as a stable baseline. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 escalation log recovery test should record the restore point and the reopen rate result."
        ]
      },
      {
        "heading": "Population and unit",
        "paragraphs": [
          "The unit is one escalation log case, from the opening request to the verified close, and linked events stay with that case. A case that moves between owners stays one case unless the process defines a new requirement at the handoff. The start event should be the first recorded request, not the first time the team opened the case. Use the same case key across the queue export and the evidence extract to avoid double counting. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the escalation log source, the owner, and the next review time.",
          "When several renewal risk memo updates belong to one request, state whether the request or each update is the unit and apply that rule consistently. A denominator that changes during the window should be reported separately for each period. The definition should make it possible to classify a case without asking the person who did the work. Report a case that moved between owners as one case with two owner periods unless the process creates a new requirement. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for escalation log should show the source version and the account executive decision."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "A pause should have a reason, an owner, and a review date; otherwise it is an unowned case with a different label. Test the data dictionary on a small set of cases and revise ambiguous fields before the main sample. Record the person who approved the definition and the date it became effective. Record the pause rule and the person authorized to release a paused case. Use the same note in the case file and the study extract; do not create a second version in a personal document. The escalation log review at Customer Success Managers should state whether the renewal risk memo was current on October 28.",
          "If the definition of completion changes, keep the old and new rules side by side for the transition period. Test the data dictionary on a small set of cases and revise ambiguous fields before the main sample. Before collection, test the definitions on a missing usage report, a reopened case, and a handoff. Write the start and stop events as observable actions, not as opinions about whether the work felt finished. Keep the measurement note short enough to read with the case and specific enough to support the reported renewal risk lead time. The October 28 escalation log note should distinguish a missing usage report from a confirmed negative."
        ]
      },
      {
        "heading": "Data dictionary and evidence",
        "paragraphs": [
          "If the source is a document, record the page or field; if the source is a system, record the record identifier and extraction time. Use a controlled list for exception reasons; do not let free text become the analysis category. A missing value should have a reason code, not a blank cell or a zero. A case key should remain stable if the case moves between owners or changes status. Link the observation to the exact field in the health dashboard and to the usage report that supports it. The support lead decision on escalation log should be dated October 28 and linked to the usage report.",
          "Each case needs the source, the observation time, the field supported, the owner, and the reviewer. If a field is derived, record the formula and the source fields used to calculate it. Store sensitive evidence in the approved repository and keep only the reference in the analysis file. Keep the original request, the approval, and the destination value linked to the same key. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 escalation log close should name the destination field, the approver, and the reopen rate check.",
          "Keep free-text notes separate from coded fields so the analysis does not depend on inconsistent wording. Name the required fields for each article type and mark conditional fields in the dictionary. Keep the source reference and the coded value in the same row, and do not overwrite the original with a later correction. Pilot the dictionary with two reviewers and compare their classifications before the main sample. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 escalation log exception log should show the reason code, owner, and release decision."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "Sample across the full observation window, including the days when the queue was busiest and the days when coverage changed. A second reviewer should re-extract a small subsample and record disagreements before the full analysis. Stratify by risk, channel, and owner so the sample is not dominated by the easiest queue. Include at least one case from each owner in scope when the frame allows it. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 escalation log recovery test should record the restore point and the onboarding milestone completion result.",
          "Stop expanding the sample only when the review question is answered, not when the result starts to look favorable. Record the time of each observation so a later reviewer can distinguish a late entry from a changed decision. If a stratum has fewer cases than planned, report the smaller count instead of replacing it with a convenience case. Use a random start and a fixed interval when the frame is ordered, and record both. Record this decision in the study log with the case key, the review date, and the person who approved the classification. The October 28 control note for Customer Success Managers should name the escalation log source, the owner, and the next review time.",
          "If the population is small, report every case and the reason the sample is exhaustive rather than presenting a false precision. If a source cannot be accessed, mark it unavailable and record the access problem rather than asking the operator to reconstruct it from memory. Keep the sample selection reproducible by recording the export date, filter, and random seed or start rule. Use a random start and a fixed interval when the frame is ordered, and record both. If the source changes after the observation, preserve the earlier value and add a dated note instead of replacing it. The October 28 evidence trail for escalation log should show the source version and the support lead decision."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "If the sample is small, report the instability and the cases that drive the result instead of a precise-looking percentage. Keep descriptive findings separate from causal claims. Record the sample date, the denominator, the numerator, and the exclusion count for every reported rate. When a measure is based on a small sample, state the case count and avoid ranking owners by the result. Use the same note in the case file and the study extract; do not create a second version in a personal document. The escalation log review at Customer Success Managers should state whether the health score note was current on October 28.",
          "Compare renewal risk lead time across owners only after checking the case mix, the channel, and the evidence standard. The analysis should end with the decision the evidence can support and the decision it cannot support. Record the sample date, the denominator, the numerator, and the exclusion count for every reported rate. Use a case-level table to explain an outlier before treating it as a process signal. Keep the measurement note short enough to read with the case and specific enough to support the reported renewal risk lead time. The October 28 escalation log note should distinguish a missing QBR packet from a confirmed negative."
        ]
      },
      {
        "heading": "Limitations",
        "paragraphs": [
          "The method also cannot observe work that never entered the queue, which may be the most important missing population. A clean summary can hide missing evidence, especially when the operator who did the work is also the reviewer. Do not treat a missing record as proof that the work did not happen; it is evidence about the record. Keep the limitations with the result so a local observation is not turned into a general claim. Link the observation to the exact field in the QBR template library and to the QBR packet that supports it. The customer sponsor decision on escalation log should be dated October 28 and linked to the QBR packet.",
          "Changes in definitions, staffing, or the renewal forecast during the window can create a trend that is not a process effect. The cited sources describe recordkeeping, privacy, security, or control practice; they do not supply a local benchmark. Record the response or access problems that prevented a case from being reviewed. A missing record is evidence about the record, not proof that the work was never done. If the case moved between owners, include both owner periods in the review note and name the handoff time. The October 28 escalation log close should name the destination field, the approver, and the reopen rate check."
        ]
      },
      {
        "heading": "Review and next action",
        "paragraphs": [
          "Keep the review note with the escalation log evidence so the next reviewer can see why the process changed. Keep the review note with the escalation log evidence so the next owner can see why the process changed. Link the action to the specific escalation log cases that motivated it. Report a failed action with the same detail as a successful one so the team can learn from it. When a value is missing, record the missing state and the reason instead of leaving an empty field in the extract. The October 28 escalation log exception log should show the reason code, owner, and release decision.",
          "Name the owner who will read the result and set a review date before the sample is collected. If the result is inconclusive, say so and choose a narrower question rather than claiming a trend. Record the owner, the due date, and the exact change that will be tested at the next review. Keep the prior procedure available so the next reviewer can compare the old and new states. If the evidence is sensitive, record the approved reference and access path rather than copying the content. The October 28 escalation log recovery test should record the restore point and the health score freshness result."
        ]
      }
    ],
    "sources": [
      {
        "label": "NIST Cybersecurity Framework",
        "publisher": "public source",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "Federal Trade Commission — business guidance",
        "publisher": "public source",
        "url": "https://www.ftc.gov/business-guidance",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Small Business Administration — manage your business",
        "publisher": "public source",
        "url": "https://www.sba.gov/business-guide/manage-your-business",
        "checkedAt": "2026-10-28"
      },
      {
        "label": "U.S. Government Accountability Office",
        "publisher": "public source",
        "url": "https://www.gao.gov/",
        "checkedAt": "2026-10-28"
      }
    ]
  }
];
