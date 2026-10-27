import { site } from './site';
import type { BlogPost, ResearchPost } from './types';
import { october12BlogPosts } from './october-12/blogPosts';
import { october12ResearchPosts } from './october-12/researchPosts';
import { october27BlogPosts } from './october-27/blogPosts';
import { october26BlogPosts } from './october-26/blogPosts';
import { october25BlogPosts } from './october-25/blogPosts';
import { october22BlogPosts } from './october-22/blogPosts';
import { october27ResearchPosts } from './october-27/researchPosts';
import { october26ResearchPosts } from './october-26/researchPosts';
import { october25ResearchPosts } from './october-25/researchPosts';
import { october22ResearchPosts } from './october-22/researchPosts';
import { enrichBlogPost, enrichResearchPost } from './editorial-enrichment';

const rawBlogPosts: BlogPost[] = [
  ...october27BlogPosts,
  ...october26BlogPosts,
  ...october25BlogPosts,
  ...october22BlogPosts,
  ...october12BlogPosts,
  {
    "slug": "customer-success-director-vs-csm-va",
    "title": "Customer success director vs CSM VA",
    "description": "A practical guide to customer success director vs csm va for customer success leaders, SaaS operators, and account teams.",
    "category": "Role design",
    "publishedAt": "2026-10-04",
    "readTime": "9 min read",
    "sections": [
      {
        "heading": "Quick overview",
        "paragraphs": [
          "Customer success director vs CSM VA starts with one practical distinction: repeatable preparation can be delegated, while accountable judgment stays with the person who owns the outcome. For customer success leaders, SaaS operators, and account teams, that boundary protects quality and gives the assistant a role they can perform consistently.",
          "A clear role brief names the queue, source material, expected output, review owner, and escalation triggers. It should be short enough to use during real work, not stored as a policy nobody opens."
        ]
      },
      {
        "heading": "Why the workflow becomes difficult",
        "paragraphs": [
          "Recurring work becomes fragile when status lives in inboxes, memory, or private notes. People repeat checks, miss context, and spend meetings reconstructing what happened instead of deciding what happens next.",
          "The goal is not to automate every judgment or move every task away from the team. The goal is to make routine preparation visible so the accountable owner can review the right evidence at the right time."
        ]
      },
      {
        "heading": "What customer onboarding support can handle",
        "paragraphs": [
          "Keep plans, tasks, and approved communication organized. The role can prepare records, maintain approved statuses, coordinate routine communication, and surface exceptions for the right owner.",
          "The assistant should never be asked to invent policy, make a licensed decision, or hide uncertainty. When a request falls outside the documented path, escalation is the work."
        ]
      },
      {
        "heading": "Build the handoff around evidence",
        "paragraphs": [
          "Start with the material the assistant receives. Name the system of record, required fields, acceptable sources, and the point when incomplete information must be returned or escalated.",
          "Then define the output. A useful output might be a review-ready record, an updated queue, a concise status summary, or a documented exception. Each output should show what was checked and what still needs judgment."
        ]
      },
      {
        "heading": "Set decision rights before volume grows",
        "paragraphs": [
          "Decision rights explain who can prepare, approve, communicate, and close the work. They prevent a capable assistant from being pushed into decisions the role should not own.",
          "Use three simple labels: proceed under the written rule, pause for review, and escalate immediately. Apply them to real examples from your workflow so the boundary is easy to recognize."
        ]
      },
      {
        "heading": "Create a practical review rhythm",
        "paragraphs": [
          "Review a small sample at a predictable interval. Look for missed fields, weak source notes, unclear escalation, and repeated exceptions. A focused sample is more useful than checking every task without a learning goal.",
          "When a pattern appears, change the checklist or source guidance. Coaching should improve the operating system, not just correct one isolated item."
        ]
      },
      {
        "heading": "Common mistakes to avoid",
        "paragraphs": [
          "Avoid delegating an entire function before one workflow is stable. Large handoffs make it difficult to see whether the problem is training, access, source quality, or an unclear decision boundary.",
          "Avoid measuring activity alone. A long task log can hide weak outputs. Review whether the record is complete, the next owner is clear, and the evidence supports the status."
        ]
      },
      {
        "heading": "What good support looks like",
        "paragraphs": [
          "Good support reduces search, repetition, and uncertainty for the accountable team. The assistant knows where work enters, what complete means, and when the work must change hands.",
          "The manager can inspect the system without chasing updates. That visibility is what makes delegation sustainable as the queue changes."
        ]
      },
      {
        "heading": "Plan the first controlled workflow",
        "paragraphs": [
          "Choose a workflow that repeats often and already has a known owner. Write the acceptance checklist, test it on a small batch, and record the exceptions that appear.",
          "Use the first review to narrow the role before you expand it. A precise role is easier to hire for, easier to manage, and more useful to the team."
        ]
      }
    ],
    "faq": [
      {
        "q": "What should stay with the accountable owner?",
        "a": "Judgment, approval, licensed work, sensitive exceptions, and policy decisions should stay with the qualified owner."
      },
      {
        "q": "What is the safest place to begin?",
        "a": "Begin with one repeatable workflow that has a known source, clear output, and an available reviewer."
      },
      {
        "q": "How should quality be reviewed?",
        "a": "Review a focused sample against a short acceptance checklist, then update the process when patterns appear."
      }
    ],
    "internalService": "/services/customer-onboarding-support",
    "internalSibling": "/blog/customer-onboarding-handoff",
    "source": {
      "label": "National Institute of Standards and Technology",
      "url": "https://www.nist.gov/privacy-framework"
    }
  },
  {
    "slug": "customer-onboarding-handoff",
    "title": "Build a customer onboarding handoff",
    "description": "A practical guide to build a customer onboarding handoff for customer success leaders, SaaS operators, and account teams.",
    "category": "Customer onboarding",
    "publishedAt": "2026-10-05",
    "readTime": "10 min read",
    "sections": [
      {
        "heading": "Quick overview",
        "paragraphs": [
          "Build a customer onboarding handoff starts with one practical distinction: repeatable preparation can be delegated, while accountable judgment stays with the person who owns the outcome. For customer success leaders, SaaS operators, and account teams, that boundary protects quality and gives the assistant a role they can perform consistently.",
          "A clear role brief names the queue, source material, expected output, review owner, and escalation triggers. It should be short enough to use during real work, not stored as a policy nobody opens."
        ]
      },
      {
        "heading": "Why the workflow becomes difficult",
        "paragraphs": [
          "Recurring work becomes fragile when status lives in inboxes, memory, or private notes. People repeat checks, miss context, and spend meetings reconstructing what happened instead of deciding what happens next.",
          "The goal is not to automate every judgment or move every task away from the team. The goal is to make routine preparation visible so the accountable owner can review the right evidence at the right time."
        ]
      },
      {
        "heading": "What customer health operations can handle",
        "paragraphs": [
          "Prepare consistent views from approved health signals. The role can prepare records, maintain approved statuses, coordinate routine communication, and surface exceptions for the right owner.",
          "The assistant should never be asked to invent policy, make a licensed decision, or hide uncertainty. When a request falls outside the documented path, escalation is the work."
        ]
      },
      {
        "heading": "Build the handoff around evidence",
        "paragraphs": [
          "Start with the material the assistant receives. Name the system of record, required fields, acceptable sources, and the point when incomplete information must be returned or escalated.",
          "Then define the output. A useful output might be a review-ready record, an updated queue, a concise status summary, or a documented exception. Each output should show what was checked and what still needs judgment."
        ]
      },
      {
        "heading": "Set decision rights before volume grows",
        "paragraphs": [
          "Decision rights explain who can prepare, approve, communicate, and close the work. They prevent a capable assistant from being pushed into decisions the role should not own.",
          "Use three simple labels: proceed under the written rule, pause for review, and escalate immediately. Apply them to real examples from your workflow so the boundary is easy to recognize."
        ]
      },
      {
        "heading": "Create a practical review rhythm",
        "paragraphs": [
          "Review a small sample at a predictable interval. Look for missed fields, weak source notes, unclear escalation, and repeated exceptions. A focused sample is more useful than checking every task without a learning goal.",
          "When a pattern appears, change the checklist or source guidance. Coaching should improve the operating system, not just correct one isolated item."
        ]
      },
      {
        "heading": "Common mistakes to avoid",
        "paragraphs": [
          "Avoid delegating an entire function before one workflow is stable. Large handoffs make it difficult to see whether the problem is training, access, source quality, or an unclear decision boundary.",
          "Avoid measuring activity alone. A long task log can hide weak outputs. Review whether the record is complete, the next owner is clear, and the evidence supports the status."
        ]
      },
      {
        "heading": "What good support looks like",
        "paragraphs": [
          "Good support reduces search, repetition, and uncertainty for the accountable team. The assistant knows where work enters, what complete means, and when the work must change hands.",
          "The manager can inspect the system without chasing updates. That visibility is what makes delegation sustainable as the queue changes."
        ]
      },
      {
        "heading": "Plan the first controlled workflow",
        "paragraphs": [
          "Choose a workflow that repeats often and already has a known owner. Write the acceptance checklist, test it on a small batch, and record the exceptions that appear.",
          "Use the first review to narrow the role before you expand it. A precise role is easier to hire for, easier to manage, and more useful to the team."
        ]
      }
    ],
    "faq": [
      {
        "q": "What should stay with the accountable owner?",
        "a": "Judgment, approval, licensed work, sensitive exceptions, and policy decisions should stay with the qualified owner."
      },
      {
        "q": "What is the safest place to begin?",
        "a": "Begin with one repeatable workflow that has a known source, clear output, and an available reviewer."
      },
      {
        "q": "How should quality be reviewed?",
        "a": "Review a focused sample against a short acceptance checklist, then update the process when patterns appear."
      }
    ],
    "internalService": "/services/customer-health-operations",
    "internalSibling": "/blog/customer-health-review",
    "source": {
      "label": "National Institute of Standards and Technology",
      "url": "https://www.nist.gov/privacy-framework"
    }
  },
  {
    "slug": "customer-health-review",
    "title": "A practical customer health review",
    "description": "A practical guide to a practical customer health review for customer success leaders, SaaS operators, and account teams.",
    "category": "Health systems",
    "publishedAt": "2026-10-06",
    "readTime": "11 min read",
    "sections": [
      {
        "heading": "Quick overview",
        "paragraphs": [
          "A practical customer health review starts with one practical distinction: repeatable preparation can be delegated, while accountable judgment stays with the person who owns the outcome. For customer success leaders, SaaS operators, and account teams, that boundary protects quality and gives the assistant a role they can perform consistently.",
          "A clear role brief names the queue, source material, expected output, review owner, and escalation triggers. It should be short enough to use during real work, not stored as a policy nobody opens."
        ]
      },
      {
        "heading": "Why the workflow becomes difficult",
        "paragraphs": [
          "Recurring work becomes fragile when status lives in inboxes, memory, or private notes. People repeat checks, miss context, and spend meetings reconstructing what happened instead of deciding what happens next.",
          "The goal is not to automate every judgment or move every task away from the team. The goal is to make routine preparation visible so the accountable owner can review the right evidence at the right time."
        ]
      },
      {
        "heading": "What business review preparation can handle",
        "paragraphs": [
          "Organize context and materials for accountable account owners. The role can prepare records, maintain approved statuses, coordinate routine communication, and surface exceptions for the right owner.",
          "The assistant should never be asked to invent policy, make a licensed decision, or hide uncertainty. When a request falls outside the documented path, escalation is the work."
        ]
      },
      {
        "heading": "Build the handoff around evidence",
        "paragraphs": [
          "Start with the material the assistant receives. Name the system of record, required fields, acceptable sources, and the point when incomplete information must be returned or escalated.",
          "Then define the output. A useful output might be a review-ready record, an updated queue, a concise status summary, or a documented exception. Each output should show what was checked and what still needs judgment."
        ]
      },
      {
        "heading": "Set decision rights before volume grows",
        "paragraphs": [
          "Decision rights explain who can prepare, approve, communicate, and close the work. They prevent a capable assistant from being pushed into decisions the role should not own.",
          "Use three simple labels: proceed under the written rule, pause for review, and escalate immediately. Apply them to real examples from your workflow so the boundary is easy to recognize."
        ]
      },
      {
        "heading": "Create a practical review rhythm",
        "paragraphs": [
          "Review a small sample at a predictable interval. Look for missed fields, weak source notes, unclear escalation, and repeated exceptions. A focused sample is more useful than checking every task without a learning goal.",
          "When a pattern appears, change the checklist or source guidance. Coaching should improve the operating system, not just correct one isolated item."
        ]
      },
      {
        "heading": "Common mistakes to avoid",
        "paragraphs": [
          "Avoid delegating an entire function before one workflow is stable. Large handoffs make it difficult to see whether the problem is training, access, source quality, or an unclear decision boundary.",
          "Avoid measuring activity alone. A long task log can hide weak outputs. Review whether the record is complete, the next owner is clear, and the evidence supports the status."
        ]
      },
      {
        "heading": "What good support looks like",
        "paragraphs": [
          "Good support reduces search, repetition, and uncertainty for the accountable team. The assistant knows where work enters, what complete means, and when the work must change hands.",
          "The manager can inspect the system without chasing updates. That visibility is what makes delegation sustainable as the queue changes."
        ]
      },
      {
        "heading": "Plan the first controlled workflow",
        "paragraphs": [
          "Choose a workflow that repeats often and already has a known owner. Write the acceptance checklist, test it on a small batch, and record the exceptions that appear.",
          "Use the first review to narrow the role before you expand it. A precise role is easier to hire for, easier to manage, and more useful to the team."
        ]
      }
    ],
    "faq": [
      {
        "q": "What should stay with the accountable owner?",
        "a": "Judgment, approval, licensed work, sensitive exceptions, and policy decisions should stay with the qualified owner."
      },
      {
        "q": "What is the safest place to begin?",
        "a": "Begin with one repeatable workflow that has a known source, clear output, and an available reviewer."
      },
      {
        "q": "How should quality be reviewed?",
        "a": "Review a focused sample against a short acceptance checklist, then update the process when patterns appear."
      }
    ],
    "internalService": "/services/business-review-preparation",
    "internalSibling": "/blog/adoption-follow-up-queue",
    "source": {
      "label": "National Institute of Standards and Technology",
      "url": "https://www.nist.gov/privacy-framework"
    }
  },
  {
    "slug": "adoption-follow-up-queue",
    "title": "Design an adoption follow up queue",
    "description": "A practical guide to design an adoption follow up queue for customer success leaders, SaaS operators, and account teams.",
    "category": "Adoption operations",
    "publishedAt": "2026-10-07",
    "readTime": "12 min read",
    "sections": [
      {
        "heading": "Quick overview",
        "paragraphs": [
          "Design an adoption follow up queue starts with one practical distinction: repeatable preparation can be delegated, while accountable judgment stays with the person who owns the outcome. For customer success leaders, SaaS operators, and account teams, that boundary protects quality and gives the assistant a role they can perform consistently.",
          "A clear role brief names the queue, source material, expected output, review owner, and escalation triggers. It should be short enough to use during real work, not stored as a policy nobody opens."
        ]
      },
      {
        "heading": "Why the workflow becomes difficult",
        "paragraphs": [
          "Recurring work becomes fragile when status lives in inboxes, memory, or private notes. People repeat checks, miss context, and spend meetings reconstructing what happened instead of deciding what happens next.",
          "The goal is not to automate every judgment or move every task away from the team. The goal is to make routine preparation visible so the accountable owner can review the right evidence at the right time."
        ]
      },
      {
        "heading": "What adoption follow up support can handle",
        "paragraphs": [
          "Coordinate approved education and next steps around product use. The role can prepare records, maintain approved statuses, coordinate routine communication, and surface exceptions for the right owner.",
          "The assistant should never be asked to invent policy, make a licensed decision, or hide uncertainty. When a request falls outside the documented path, escalation is the work."
        ]
      },
      {
        "heading": "Build the handoff around evidence",
        "paragraphs": [
          "Start with the material the assistant receives. Name the system of record, required fields, acceptable sources, and the point when incomplete information must be returned or escalated.",
          "Then define the output. A useful output might be a review-ready record, an updated queue, a concise status summary, or a documented exception. Each output should show what was checked and what still needs judgment."
        ]
      },
      {
        "heading": "Set decision rights before volume grows",
        "paragraphs": [
          "Decision rights explain who can prepare, approve, communicate, and close the work. They prevent a capable assistant from being pushed into decisions the role should not own.",
          "Use three simple labels: proceed under the written rule, pause for review, and escalate immediately. Apply them to real examples from your workflow so the boundary is easy to recognize."
        ]
      },
      {
        "heading": "Create a practical review rhythm",
        "paragraphs": [
          "Review a small sample at a predictable interval. Look for missed fields, weak source notes, unclear escalation, and repeated exceptions. A focused sample is more useful than checking every task without a learning goal.",
          "When a pattern appears, change the checklist or source guidance. Coaching should improve the operating system, not just correct one isolated item."
        ]
      },
      {
        "heading": "Common mistakes to avoid",
        "paragraphs": [
          "Avoid delegating an entire function before one workflow is stable. Large handoffs make it difficult to see whether the problem is training, access, source quality, or an unclear decision boundary.",
          "Avoid measuring activity alone. A long task log can hide weak outputs. Review whether the record is complete, the next owner is clear, and the evidence supports the status."
        ]
      },
      {
        "heading": "What good support looks like",
        "paragraphs": [
          "Good support reduces search, repetition, and uncertainty for the accountable team. The assistant knows where work enters, what complete means, and when the work must change hands.",
          "The manager can inspect the system without chasing updates. That visibility is what makes delegation sustainable as the queue changes."
        ]
      },
      {
        "heading": "Plan the first controlled workflow",
        "paragraphs": [
          "Choose a workflow that repeats often and already has a known owner. Write the acceptance checklist, test it on a small batch, and record the exceptions that appear.",
          "Use the first review to narrow the role before you expand it. A precise role is easier to hire for, easier to manage, and more useful to the team."
        ]
      }
    ],
    "faq": [
      {
        "q": "What should stay with the accountable owner?",
        "a": "Judgment, approval, licensed work, sensitive exceptions, and policy decisions should stay with the qualified owner."
      },
      {
        "q": "What is the safest place to begin?",
        "a": "Begin with one repeatable workflow that has a known source, clear output, and an available reviewer."
      },
      {
        "q": "How should quality be reviewed?",
        "a": "Review a focused sample against a short acceptance checklist, then update the process when patterns appear."
      }
    ],
    "internalService": "/services/adoption-follow-up",
    "internalSibling": "/blog/customer-escalation-record",
    "source": {
      "label": "National Institute of Standards and Technology",
      "url": "https://www.nist.gov/privacy-framework"
    }
  },
  {
    "slug": "customer-escalation-record",
    "title": "Create a useful customer escalation record",
    "description": "A practical guide to create a useful customer escalation record for customer success leaders, SaaS operators, and account teams.",
    "category": "Health systems",
    "publishedAt": "2026-10-08",
    "readTime": "13 min read",
    "sections": [
      {
        "heading": "Quick overview",
        "paragraphs": [
          "Create a useful customer escalation record starts with one practical distinction: repeatable preparation can be delegated, while accountable judgment stays with the person who owns the outcome. For customer success leaders, SaaS operators, and account teams, that boundary protects quality and gives the assistant a role they can perform consistently.",
          "A clear role brief names the queue, source material, expected output, review owner, and escalation triggers. It should be short enough to use during real work, not stored as a policy nobody opens."
        ]
      },
      {
        "heading": "Why the workflow becomes difficult",
        "paragraphs": [
          "Recurring work becomes fragile when status lives in inboxes, memory, or private notes. People repeat checks, miss context, and spend meetings reconstructing what happened instead of deciding what happens next.",
          "The goal is not to automate every judgment or move every task away from the team. The goal is to make routine preparation visible so the accountable owner can review the right evidence at the right time."
        ]
      },
      {
        "heading": "What knowledge operations can handle",
        "paragraphs": [
          "Maintain accurate, reviewable customer-facing resources. The role can prepare records, maintain approved statuses, coordinate routine communication, and surface exceptions for the right owner.",
          "The assistant should never be asked to invent policy, make a licensed decision, or hide uncertainty. When a request falls outside the documented path, escalation is the work."
        ]
      },
      {
        "heading": "Build the handoff around evidence",
        "paragraphs": [
          "Start with the material the assistant receives. Name the system of record, required fields, acceptable sources, and the point when incomplete information must be returned or escalated.",
          "Then define the output. A useful output might be a review-ready record, an updated queue, a concise status summary, or a documented exception. Each output should show what was checked and what still needs judgment."
        ]
      },
      {
        "heading": "Set decision rights before volume grows",
        "paragraphs": [
          "Decision rights explain who can prepare, approve, communicate, and close the work. They prevent a capable assistant from being pushed into decisions the role should not own.",
          "Use three simple labels: proceed under the written rule, pause for review, and escalate immediately. Apply them to real examples from your workflow so the boundary is easy to recognize."
        ]
      },
      {
        "heading": "Create a practical review rhythm",
        "paragraphs": [
          "Review a small sample at a predictable interval. Look for missed fields, weak source notes, unclear escalation, and repeated exceptions. A focused sample is more useful than checking every task without a learning goal.",
          "When a pattern appears, change the checklist or source guidance. Coaching should improve the operating system, not just correct one isolated item."
        ]
      },
      {
        "heading": "Common mistakes to avoid",
        "paragraphs": [
          "Avoid delegating an entire function before one workflow is stable. Large handoffs make it difficult to see whether the problem is training, access, source quality, or an unclear decision boundary.",
          "Avoid measuring activity alone. A long task log can hide weak outputs. Review whether the record is complete, the next owner is clear, and the evidence supports the status."
        ]
      },
      {
        "heading": "What good support looks like",
        "paragraphs": [
          "Good support reduces search, repetition, and uncertainty for the accountable team. The assistant knows where work enters, what complete means, and when the work must change hands.",
          "The manager can inspect the system without chasing updates. That visibility is what makes delegation sustainable as the queue changes."
        ]
      },
      {
        "heading": "Plan the first controlled workflow",
        "paragraphs": [
          "Choose a workflow that repeats often and already has a known owner. Write the acceptance checklist, test it on a small batch, and record the exceptions that appear.",
          "Use the first review to narrow the role before you expand it. A precise role is easier to hire for, easier to manage, and more useful to the team."
        ]
      }
    ],
    "faq": [
      {
        "q": "What should stay with the accountable owner?",
        "a": "Judgment, approval, licensed work, sensitive exceptions, and policy decisions should stay with the qualified owner."
      },
      {
        "q": "What is the safest place to begin?",
        "a": "Begin with one repeatable workflow that has a known source, clear output, and an available reviewer."
      },
      {
        "q": "How should quality be reviewed?",
        "a": "Review a focused sample against a short acceptance checklist, then update the process when patterns appear."
      }
    ],
    "internalService": "/services/knowledge-operations",
    "internalSibling": "/blog/customer-success-director-vs-csm-va",
    "source": {
      "label": "National Institute of Standards and Technology",
      "url": "https://www.nist.gov/privacy-framework"
    }
  }
];
const rawResearchPosts: ResearchPost[] = [
  ...october27ResearchPosts,
  ...october26ResearchPosts,
  ...october25ResearchPosts,
  ...october22ResearchPosts,
  ...october12ResearchPosts,
  {
    "slug": "customer-onboarding-support-workflow-boundary-review-1",
    "title": "Customer onboarding support: workflow boundary review",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer onboarding support workflows.",
    "cluster": "Customer onboarding",
    "publishedAt": "2026-10-01",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "customer-health-operations-source-quality-audit-2",
    "title": "Customer health operations: source quality audit",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer health operations workflows.",
    "cluster": "Health systems",
    "publishedAt": "2026-10-02",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "business-review-preparation-exception-pattern-study-3",
    "title": "Business review preparation: exception pattern study",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve business review preparation workflows.",
    "cluster": "Adoption operations",
    "publishedAt": "2026-10-03",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "adoption-follow-up-handoff-reliability-brief-4",
    "title": "Adoption follow up support: handoff reliability brief",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve adoption follow up support workflows.",
    "cluster": "Role design",
    "publishedAt": "2026-10-04",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "knowledge-operations-review-consistency-report-5",
    "title": "Knowledge operations: review consistency report",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve knowledge operations workflows.",
    "cluster": "Customer onboarding",
    "publishedAt": "2026-10-05",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "escalation-coordination-workflow-boundary-review-6",
    "title": "Escalation coordination: workflow boundary review",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve escalation coordination workflows.",
    "cluster": "Health systems",
    "publishedAt": "2026-10-06",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "customer-onboarding-support-source-quality-audit-7",
    "title": "Customer onboarding support: source quality audit",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer onboarding support workflows.",
    "cluster": "Adoption operations",
    "publishedAt": "2026-10-07",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "customer-health-operations-exception-pattern-study-8",
    "title": "Customer health operations: exception pattern study",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer health operations workflows.",
    "cluster": "Role design",
    "publishedAt": "2026-10-08",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "business-review-preparation-handoff-reliability-brief-9",
    "title": "Business review preparation: handoff reliability brief",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve business review preparation workflows.",
    "cluster": "Customer onboarding",
    "publishedAt": "2026-10-01",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "adoption-follow-up-review-consistency-report-10",
    "title": "Adoption follow up support: review consistency report",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve adoption follow up support workflows.",
    "cluster": "Health systems",
    "publishedAt": "2026-10-02",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "knowledge-operations-workflow-boundary-review-11",
    "title": "Knowledge operations: workflow boundary review",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve knowledge operations workflows.",
    "cluster": "Adoption operations",
    "publishedAt": "2026-10-03",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "escalation-coordination-source-quality-audit-12",
    "title": "Escalation coordination: source quality audit",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve escalation coordination workflows.",
    "cluster": "Role design",
    "publishedAt": "2026-10-04",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "customer-onboarding-support-exception-pattern-study-13",
    "title": "Customer onboarding support: exception pattern study",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer onboarding support workflows.",
    "cluster": "Customer onboarding",
    "publishedAt": "2026-10-05",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "customer-health-operations-handoff-reliability-brief-14",
    "title": "Customer health operations: handoff reliability brief",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer health operations workflows.",
    "cluster": "Health systems",
    "publishedAt": "2026-10-06",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "business-review-preparation-review-consistency-report-15",
    "title": "Business review preparation: review consistency report",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve business review preparation workflows.",
    "cluster": "Adoption operations",
    "publishedAt": "2026-10-07",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "adoption-follow-up-workflow-boundary-review-16",
    "title": "Adoption follow up support: workflow boundary review",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve adoption follow up support workflows.",
    "cluster": "Role design",
    "publishedAt": "2026-10-08",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "knowledge-operations-source-quality-audit-17",
    "title": "Knowledge operations: source quality audit",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve knowledge operations workflows.",
    "cluster": "Customer onboarding",
    "publishedAt": "2026-10-01",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "escalation-coordination-exception-pattern-study-18",
    "title": "Escalation coordination: exception pattern study",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve escalation coordination workflows.",
    "cluster": "Health systems",
    "publishedAt": "2026-10-02",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "customer-onboarding-support-handoff-reliability-brief-19",
    "title": "Customer onboarding support: handoff reliability brief",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer onboarding support workflows.",
    "cluster": "Adoption operations",
    "publishedAt": "2026-10-03",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  },
  {
    "slug": "customer-health-operations-review-consistency-report-20",
    "title": "Customer health operations: review consistency report",
    "summary": "A source-led brief on how customer success leaders, SaaS operators, and account teams can define, inspect, and improve customer health operations workflows.",
    "cluster": "Role design",
    "publishedAt": "2026-10-04",
    "finding": "The most useful control is a visible boundary between routine preparation and accountable judgment, supported by source records and explicit escalation.",
    "sources": [
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "United States Department of Labor",
        "url": "https://www.dol.gov/general/topic/workhours"
      },
      {
        "label": "National Institute of Standards and Technology",
        "url": "https://www.nist.gov/privacy-framework"
      }
    ]
  }
];

export const blogPosts: BlogPost[] = rawBlogPosts.map(enrichBlogPost);
const october22ResearchSlugs = new Set(october22ResearchPosts.map((post) => post.slug));
export const researchPosts: ResearchPost[] = rawResearchPosts.map((post) => october22ResearchSlugs.has(post.slug) ? post : enrichResearchPost(post));

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/contact-us', label: 'Contact Us' }
];

export function serviceBySlug(slug: string) { return site.services.find((service) => service.slug === slug); }
export function blogBySlug(slug: string) { return blogPosts.find((post) => post.slug === slug); }
export function researchBySlug(slug: string) { return researchPosts.find((post) => post.slug === slug); }
