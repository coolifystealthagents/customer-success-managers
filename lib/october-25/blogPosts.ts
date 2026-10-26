import type { BlogPost } from '../types';
export const october25BlogPosts: BlogPost[] = [
  {
    "slug": "onboarding-acceptance-evidence",
    "title": "Make Onboarding Acceptance Evidence Explicit",
    "description": "An acceptance gate that defines the observable customer outcome, verifier, and evidence.",
    "category": "Customer onboarding",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/onboarding-acceptance-evidence.svg",
    "sections": [
      {
        "heading": "Set the onboarding acceptance boundary",
        "paragraphs": [
          "Make Onboarding Acceptance Evidence Explicit begins with a written definition of the customer outcome, the evidence that will prove it, and the implementation owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is launch without a shared definition of done. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For onboarding acceptance, collect criterion, source, verifier, and acceptance date. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The implementation owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for onboarding acceptance: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review onboarding acceptance by exception type, age, owner wait, and rework. Track acceptance evidence rate with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one onboarding acceptance category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the onboarding acceptance decision?",
        "a": "Implementation owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/customer-onboarding",
    "internalSibling": "/blog/qbr-data-lineage",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "qbr-data-lineage",
    "title": "Trace QBR Data Back to Its Source",
    "description": "A QBR pack that labels source, period, definition, and owner for every metric.",
    "category": "QBR operations",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/qbr-data-lineage.svg",
    "sections": [
      {
        "heading": "Set the QBR data lineage boundary",
        "paragraphs": [
          "Trace QBR Data Back to Its Source begins with a written definition of the customer outcome, the evidence that will prove it, and the account owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is metrics that cannot be reconstructed. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For QBR data lineage, collect source, period, definition, and owner. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The account owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for QBR data lineage: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review QBR data lineage by exception type, age, owner wait, and rework. Track lineage coverage with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one QBR data lineage category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the QBR data lineage decision?",
        "a": "Account owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/qbr-support",
    "internalSibling": "/blog/usage-report-reconciliation",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "renewal-risk-register",
    "title": "Keep a Renewal Risk Register",
    "description": "A renewal register that records risk, evidence, owner, and next review date.",
    "category": "Renewals",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/renewal-risk-register.svg",
    "sections": [
      {
        "heading": "Set the renewal risk boundary",
        "paragraphs": [
          "Keep a Renewal Risk Register begins with a written definition of the customer outcome, the evidence that will prove it, and the renewal owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is late surprises and unsupported forecasts. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For renewal risk, collect risk, evidence, owner, and review date. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The renewal owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for renewal risk: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review renewal risk by exception type, age, owner wait, and rework. Track renewal evidence completeness with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one renewal risk category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the renewal risk decision?",
        "a": "Renewal owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/renewal-support",
    "internalSibling": "/blog/health-score-override-review",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "health-score-override-review",
    "title": "Review Health Score Overrides",
    "description": "A review process for manual overrides with reason, owner, expiry, and evidence.",
    "category": "Account health",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/health-score-override-review.svg",
    "sections": [
      {
        "heading": "Set the health score override boundary",
        "paragraphs": [
          "Review Health Score Overrides begins with a written definition of the customer outcome, the evidence that will prove it, and the CS lead who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is silent score manipulation. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For health score override, collect override reason, evidence, owner, and expiry. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The CS lead owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for health score override: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review health score override by exception type, age, owner wait, and rework. Track override review rate with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one health score override category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the health score override decision?",
        "a": "Cs lead owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/account-health",
    "internalSibling": "/blog/churn-signal-triage",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "escalation-owner-map",
    "title": "Map Every Escalation to an Owner",
    "description": "An escalation map that names severity, route, acknowledgement, and resolution evidence.",
    "category": "Escalations",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/escalation-owner-map.svg",
    "sections": [
      {
        "heading": "Set the escalation ownership boundary",
        "paragraphs": [
          "Map Every Escalation to an Owner begins with a written definition of the customer outcome, the evidence that will prove it, and the support lead who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is escalations that wait without an owner. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For escalation ownership, collect severity, owner, acknowledgement, and resolution. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The support lead owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for escalation ownership: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review escalation ownership by exception type, age, owner wait, and rework. Track acknowledgement time with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one escalation ownership category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the escalation ownership decision?",
        "a": "Support lead owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/escalation-support",
    "internalSibling": "/blog/customer-commitment-log",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "customer-commitment-log",
    "title": "Log Customer Commitments Without Overpromising",
    "description": "A commitment log that records wording, authority, deadline, and evidence.",
    "category": "Customer communication",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/customer-commitment-log.svg",
    "sections": [
      {
        "heading": "Set the customer commitments boundary",
        "paragraphs": [
          "Log Customer Commitments Without Overpromising begins with a written definition of the customer outcome, the evidence that will prove it, and the account owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is promises made without authority. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For customer commitments, collect wording, approver, deadline, and proof. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The account owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for customer commitments: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review customer commitments by exception type, age, owner wait, and rework. Track commitment evidence rate with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one customer commitments category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the customer commitments decision?",
        "a": "Account owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/customer-success",
    "internalSibling": "/blog/onboarding-acceptance-evidence",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "churn-signal-triage",
    "title": "Triage Churn Signals Before the Renewal",
    "description": "A triage method for usage, support, sponsor, and commercial signals.",
    "category": "Retention",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/churn-signal-triage.svg",
    "sections": [
      {
        "heading": "Set the churn signals boundary",
        "paragraphs": [
          "Triage Churn Signals Before the Renewal begins with a written definition of the customer outcome, the evidence that will prove it, and the retention owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is last-minute churn surprises. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For churn signals, collect signal, source, freshness, and next action. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The retention owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for churn signals: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review churn signals by exception type, age, owner wait, and rework. Track signal review coverage with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one churn signals category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the churn signals decision?",
        "a": "Retention owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/retention-support",
    "internalSibling": "/blog/renewal-risk-register",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "account-plan-ownership",
    "title": "Assign Ownership for Every Account Plan",
    "description": "An account plan that separates actions, owners, dates, and customer decisions.",
    "category": "Account planning",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/account-plan-ownership.svg",
    "sections": [
      {
        "heading": "Set the account plan ownership boundary",
        "paragraphs": [
          "Assign Ownership for Every Account Plan begins with a written definition of the customer outcome, the evidence that will prove it, and the CS manager who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is plans that no one maintains. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For account plan ownership, collect action, owner, due date, and decision. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The CS manager owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for account plan ownership: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review account plan ownership by exception type, age, owner wait, and rework. Track plan action closure with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one account plan ownership category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the account plan ownership decision?",
        "a": "Cs manager owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/account-planning",
    "internalSibling": "/blog/expansion-readiness-check",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "usage-report-reconciliation",
    "title": "Reconcile Usage Reports Before a Customer Call",
    "description": "A pre-call check that matches usage exports, periods, definitions, and anomalies.",
    "category": "Reporting",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/usage-report-reconciliation.svg",
    "sections": [
      {
        "heading": "Set the usage report reconciliation boundary",
        "paragraphs": [
          "Reconcile Usage Reports Before a Customer Call begins with a written definition of the customer outcome, the evidence that will prove it, and the analytics owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is conflicting usage numbers in a call. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For usage report reconciliation, collect export, period, definition, and exception. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The analytics owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for usage report reconciliation: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review usage report reconciliation by exception type, age, owner wait, and rework. Track report reconciliation rate with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one usage report reconciliation category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the usage report reconciliation decision?",
        "a": "Analytics owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/usage-reporting",
    "internalSibling": "/blog/qbr-data-lineage",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "executive-sponsor-change",
    "title": "Handle an Executive Sponsor Change",
    "description": "A transition record for sponsor changes, commitments, and relationship risk.",
    "category": "Relationship management",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/executive-sponsor-change.svg",
    "sections": [
      {
        "heading": "Set the executive sponsor change boundary",
        "paragraphs": [
          "Handle an Executive Sponsor Change begins with a written definition of the customer outcome, the evidence that will prove it, and the account owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is lost context after a sponsor change. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For executive sponsor change, collect old sponsor, new sponsor, commitments, and date. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The account owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for executive sponsor change: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review executive sponsor change by exception type, age, owner wait, and rework. Track transition evidence completeness with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one executive sponsor change category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the executive sponsor change decision?",
        "a": "Account owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/relationship-support",
    "internalSibling": "/blog/customer-commitment-log",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "success-plan-versioning",
    "title": "Version Customer Success Plans",
    "description": "A versioned success plan with outcome, milestone, owner, and change reason.",
    "category": "Success planning",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/success-plan-versioning.svg",
    "sections": [
      {
        "heading": "Set the success plan versioning boundary",
        "paragraphs": [
          "Version Customer Success Plans begins with a written definition of the customer outcome, the evidence that will prove it, and the CS lead who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is silent scope drift. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For success plan versioning, collect outcome, milestone, owner, and version. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The CS lead owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for success plan versioning: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review success plan versioning by exception type, age, owner wait, and rework. Track plan version coverage with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one success plan versioning category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the success plan versioning decision?",
        "a": "Cs lead owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/success-planning",
    "internalSibling": "/blog/account-plan-ownership",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  },
  {
    "slug": "expansion-readiness-check",
    "title": "Run an Expansion Readiness Check",
    "description": "A readiness review for usage, value evidence, sponsor support, and commercial fit.",
    "category": "Expansion",
    "publishedAt": "2026-10-25",
    "readTime": "7 min read",
    "image": "/october-25/expansion-readiness-check.svg",
    "sections": [
      {
        "heading": "Set the expansion readiness boundary",
        "paragraphs": [
          "Run an Expansion Readiness Check begins with a written definition of the customer outcome, the evidence that will prove it, and the commercial owner who accepts the decision. The record should state the source, the date, and the point where the CSM must stop and route the question.",
          "The practical risk is expansion offers without evidence. Capture the customer request or internal signal before changing a status. A later summary can explain the outcome, but it is not a substitute for the original evidence."
        ]
      },
      {
        "heading": "Define evidence and ownership",
        "paragraphs": [
          "For expansion readiness, collect usage, value, sponsor, and fit. Keep the source identifier beside each field so another reviewer can reconstruct what was known. Mark missing facts as missing instead of inferring them from a later system state.",
          "The commercial owner owns the commercial or relationship decision. The CSM may prepare, check, and route the record, but cannot approve an exception or turn an unverified assumption into a commitment."
        ]
      },
      {
        "heading": "Separate preparation from judgment",
        "paragraphs": [
          "Use three labels for expansion readiness: proceed under the written rule, pause for missing evidence, and escalate for a decision. Test the labels on real accounts before the process scales, because preparation and judgment fail differently.",
          "A complete pack is not approval. The record should show who decided, what they decided, and which source was current when the decision was made."
        ]
      },
      {
        "heading": "Review exceptions and cadence",
        "paragraphs": [
          "Review expansion readiness by exception type, age, owner wait, and rework. Track readiness evidence rate with a denominator and observation window rather than a bare percentage. Repeated gaps usually point to an unclear intake or source.",
          "Sample ordinary, urgent, and adverse accounts. Confirm the source, the owner, the stop point, and the retention evidence. A closed task is not proof that the customer or downstream team received the change."
        ]
      },
      {
        "heading": "Pilot one controlled workflow",
        "paragraphs": [
          "Start with one expansion readiness category and a named reviewer. Review the first batch together and update the example when a new exception appears. Expand only when another person can reproduce the evidence path.",
          "Write the revised rule and review date into the playbook. The aim is a repeatable lane that survives a queue spike, a sponsor change, or a tool migration."
        ]
      }
    ],
    "faq": [
      {
        "q": "Who owns the expansion readiness decision?",
        "a": "Commercial owner owns the decision. The CSM can prepare the record and route exceptions but should not approve its own high-risk item."
      },
      {
        "q": "What belongs in the exception log?",
        "a": "Record the account, source, issue, owner, next action, due date, and disposition. Keep it open until evidence and decision are attached."
      }
    ],
    "internalService": "/services/expansion-support",
    "internalSibling": "/blog/usage-report-reconciliation",
    "source": {
      "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
      "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm"
    }
  }
];
