import type { ResearchPost } from '../types';
export const october25ResearchPosts: ResearchPost[] = [
  {
    "slug": "onboarding-acceptance-consistency",
    "title": "Measuring Onboarding Acceptance Consistency",
    "summary": "A method for testing whether two reviewers agree that an onboarding acceptance record is complete.",
    "cluster": "Onboarding research",
    "publishedAt": "2026-10-25",
    "image": "/october-25/onboarding-acceptance-consistency.svg",
    "finding": "A method for testing whether two reviewers agree that an onboarding acceptance record is complete.",
    "methodology": [
      "Measuring Onboarding Acceptance Consistency asks whether reviewers agree that the acceptance criteria, verifier, and evidence are present. The unit is one customer success record or review event, not an individual performance rating. The method fixes the observation window, source, exclusions, and decision owner.",
      "The output is a reproducible evidence register, not a customer portfolio benchmark. It does not establish causation or a universal health score.",
      "Collect criterion, source, verifier, and date for each sampled record. Include routine, escalated, corrected, and unresolved cases. Preserve event time, load time, and source version so a later correction does not erase what was knowable.",
      "Mark missing or conflicting evidence explicitly. Do not merge records or backfill a field from a later state merely to make the sample cleaner.",
      "Two reviewers classify a frozen sample independently and record reasons. Measure acceptance agreement and agreement before drawing a conclusion. Resolve disagreements against the written rule and revise ambiguous definitions before expanding.",
      "Separate preparation from judgment. A reviewer can classify and route a question; the named owner decides the exception or changes the control.",
      "Report counts, denominators, missing-data rates, and limitations. A bounded sample cannot prove causation, and a clean record does not prove the customer outcome.",
      "Give the owner a short result, the affected population, one proposed control change, and a retest date. Change one control at a time."
    ],
    "findings": [
      "Acceptance agreement is only interpretable with the denominator and exclusions declared.",
      "The record can describe the sampled process, not the whole customer base.",
      "A clean status is not proof that the customer outcome was correct."
    ],
    "sources": [
      {
        "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
        "publisher": "BLS",
        "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "NIST Cybersecurity Framework 2.0",
        "publisher": "NIST",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "U.S. GAO, Assessing Data Reliability",
        "publisher": "GAO",
        "url": "https://www.gao.gov/products/gao-20-283g",
        "checkedAt": "2026-10-25"
      }
    ]
  },
  {
    "slug": "health-score-freshness",
    "title": "Measuring Health Score Input Freshness",
    "summary": "A protocol for coding whether each health input was current at the review timestamp.",
    "cluster": "Account health research",
    "publishedAt": "2026-10-25",
    "image": "/october-25/health-score-freshness.svg",
    "finding": "A protocol for coding whether each health input was current at the review timestamp.",
    "methodology": [
      "Measuring Health Score Input Freshness asks whether each signal used in a health review was current at the decision time. The unit is one customer success record or review event, not an individual performance rating. The method fixes the observation window, source, exclusions, and decision owner.",
      "The output is a reproducible evidence register, not a customer portfolio benchmark. It does not establish causation or a universal health score.",
      "Collect signal, source, event time, load time, and age rule for each sampled record. Include routine, escalated, corrected, and unresolved cases. Preserve event time, load time, and source version so a later correction does not erase what was knowable.",
      "Mark missing or conflicting evidence explicitly. Do not merge records or backfill a field from a later state merely to make the sample cleaner.",
      "Two reviewers classify a frozen sample independently and record reasons. Measure freshness rate and agreement before drawing a conclusion. Resolve disagreements against the written rule and revise ambiguous definitions before expanding.",
      "Separate preparation from judgment. A reviewer can classify and route a question; the named owner decides the exception or changes the control.",
      "Report counts, denominators, missing-data rates, and limitations. A bounded sample cannot prove causation, and a clean record does not prove the customer outcome.",
      "Give the owner a short result, the affected population, one proposed control change, and a retest date. Change one control at a time."
    ],
    "findings": [
      "Freshness rate is only interpretable with the denominator and exclusions declared.",
      "The record can describe the sampled process, not the whole customer base.",
      "A clean status is not proof that the customer outcome was correct."
    ],
    "sources": [
      {
        "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
        "publisher": "BLS",
        "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "NIST Cybersecurity Framework 2.0",
        "publisher": "NIST",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "U.S. GAO, Assessing Data Reliability",
        "publisher": "GAO",
        "url": "https://www.gao.gov/products/gao-20-283g",
        "checkedAt": "2026-10-25"
      }
    ]
  },
  {
    "slug": "renewal-risk-evidence",
    "title": "Measuring Renewal Risk Evidence Completeness",
    "summary": "A method for testing whether a renewal risk record supports the owner decision.",
    "cluster": "Renewal research",
    "publishedAt": "2026-10-25",
    "image": "/october-25/renewal-risk-evidence.svg",
    "finding": "A method for testing whether a renewal risk record supports the owner decision.",
    "methodology": [
      "Measuring Renewal Risk Evidence Completeness asks whether a reviewer can find the risk, evidence, owner, and next action. The unit is one customer success record or review event, not an individual performance rating. The method fixes the observation window, source, exclusions, and decision owner.",
      "The output is a reproducible evidence register, not a customer portfolio benchmark. It does not establish causation or a universal health score.",
      "Collect risk, evidence, owner, and review date for each sampled record. Include routine, escalated, corrected, and unresolved cases. Preserve event time, load time, and source version so a later correction does not erase what was knowable.",
      "Mark missing or conflicting evidence explicitly. Do not merge records or backfill a field from a later state merely to make the sample cleaner.",
      "Two reviewers classify a frozen sample independently and record reasons. Measure evidence completeness and agreement before drawing a conclusion. Resolve disagreements against the written rule and revise ambiguous definitions before expanding.",
      "Separate preparation from judgment. A reviewer can classify and route a question; the named owner decides the exception or changes the control.",
      "Report counts, denominators, missing-data rates, and limitations. A bounded sample cannot prove causation, and a clean record does not prove the customer outcome.",
      "Give the owner a short result, the affected population, one proposed control change, and a retest date. Change one control at a time."
    ],
    "findings": [
      "Evidence completeness is only interpretable with the denominator and exclusions declared.",
      "The record can describe the sampled process, not the whole customer base.",
      "A clean status is not proof that the customer outcome was correct."
    ],
    "sources": [
      {
        "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
        "publisher": "BLS",
        "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "NIST Cybersecurity Framework 2.0",
        "publisher": "NIST",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "U.S. GAO, Assessing Data Reliability",
        "publisher": "GAO",
        "url": "https://www.gao.gov/products/gao-20-283g",
        "checkedAt": "2026-10-25"
      }
    ]
  },
  {
    "slug": "qbr-lineage-completeness",
    "title": "Measuring QBR Metric Lineage",
    "summary": "A method for tracing every QBR metric to source, period, definition, and owner.",
    "cluster": "QBR research",
    "publishedAt": "2026-10-25",
    "image": "/october-25/qbr-lineage-completeness.svg",
    "finding": "A method for tracing every QBR metric to source, period, definition, and owner.",
    "methodology": [
      "Measuring QBR Metric Lineage asks whether a QBR metric can be reconstructed from the retained source. The unit is one customer success record or review event, not an individual performance rating. The method fixes the observation window, source, exclusions, and decision owner.",
      "The output is a reproducible evidence register, not a customer portfolio benchmark. It does not establish causation or a universal health score.",
      "Collect source, period, definition, and owner for each sampled record. Include routine, escalated, corrected, and unresolved cases. Preserve event time, load time, and source version so a later correction does not erase what was knowable.",
      "Mark missing or conflicting evidence explicitly. Do not merge records or backfill a field from a later state merely to make the sample cleaner.",
      "Two reviewers classify a frozen sample independently and record reasons. Measure lineage coverage and agreement before drawing a conclusion. Resolve disagreements against the written rule and revise ambiguous definitions before expanding.",
      "Separate preparation from judgment. A reviewer can classify and route a question; the named owner decides the exception or changes the control.",
      "Report counts, denominators, missing-data rates, and limitations. A bounded sample cannot prove causation, and a clean record does not prove the customer outcome.",
      "Give the owner a short result, the affected population, one proposed control change, and a retest date. Change one control at a time."
    ],
    "findings": [
      "Lineage coverage is only interpretable with the denominator and exclusions declared.",
      "The record can describe the sampled process, not the whole customer base.",
      "A clean status is not proof that the customer outcome was correct."
    ],
    "sources": [
      {
        "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
        "publisher": "BLS",
        "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "NIST Cybersecurity Framework 2.0",
        "publisher": "NIST",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "U.S. GAO, Assessing Data Reliability",
        "publisher": "GAO",
        "url": "https://www.gao.gov/products/gao-20-283g",
        "checkedAt": "2026-10-25"
      }
    ]
  },
  {
    "slug": "escalation-acknowledgement",
    "title": "Measuring Escalation Acknowledgement",
    "summary": "A method for separating detection, owner acknowledgement, and resolution time.",
    "cluster": "Escalation research",
    "publishedAt": "2026-10-25",
    "image": "/october-25/escalation-acknowledgement.svg",
    "finding": "A method for separating detection, owner acknowledgement, and resolution time.",
    "methodology": [
      "Measuring Escalation Acknowledgement asks how much escalation time reflects owner wait versus active work. The unit is one customer success record or review event, not an individual performance rating. The method fixes the observation window, source, exclusions, and decision owner.",
      "The output is a reproducible evidence register, not a customer portfolio benchmark. It does not establish causation or a universal health score.",
      "Collect detected time, owner, acknowledgement, and resolution for each sampled record. Include routine, escalated, corrected, and unresolved cases. Preserve event time, load time, and source version so a later correction does not erase what was knowable.",
      "Mark missing or conflicting evidence explicitly. Do not merge records or backfill a field from a later state merely to make the sample cleaner.",
      "Two reviewers classify a frozen sample independently and record reasons. Measure acknowledgement latency and agreement before drawing a conclusion. Resolve disagreements against the written rule and revise ambiguous definitions before expanding.",
      "Separate preparation from judgment. A reviewer can classify and route a question; the named owner decides the exception or changes the control.",
      "Report counts, denominators, missing-data rates, and limitations. A bounded sample cannot prove causation, and a clean record does not prove the customer outcome.",
      "Give the owner a short result, the affected population, one proposed control change, and a retest date. Change one control at a time."
    ],
    "findings": [
      "Acknowledgement latency is only interpretable with the denominator and exclusions declared.",
      "The record can describe the sampled process, not the whole customer base.",
      "A clean status is not proof that the customer outcome was correct."
    ],
    "sources": [
      {
        "label": "U.S. Bureau of Labor Statistics, Customer Service Representatives",
        "publisher": "BLS",
        "url": "https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "NIST Cybersecurity Framework 2.0",
        "publisher": "NIST",
        "url": "https://www.nist.gov/cyberframework",
        "checkedAt": "2026-10-25"
      },
      {
        "label": "U.S. GAO, Assessing Data Reliability",
        "publisher": "GAO",
        "url": "https://www.gao.gov/products/gao-20-283g",
        "checkedAt": "2026-10-25"
      }
    ]
  }
];
