import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LeadForm } from '@/components/LeadForm';
import { ReviewLane } from '@/components/ReviewLane';
import { site } from '@/lib/site';
import './contact.css';

export const metadata: Metadata = {
  title: 'Contact our customer success staffing team',
  description: 'Describe a recurring customer journey and discuss a focused remote customer success support role.',
  alternates: { canonical: '/contact-us' },
  openGraph: { title: 'Contact our customer success staffing team', description: 'Plan a clear customer success support role around your workflow.', images: ['/hero.png'] },
};
const steps = [
  ['Journey discovery','Map the recurring workflow, current owner, approved systems, handoffs, and common exceptions.'],
  ['Role and boundary design','Define tasks, access, outputs, decision rights, review ownership, and escalation rules.'],
  ['Candidate matching','Consider remote professionals whose strengths align with the documented customer-success work.'],
  ['Controlled launch','Begin with one journey, sample the output, and adjust the procedure before expansion.'],
];
const faqs = [
  ['What customer success work can remote staff support?','Staff can organize onboarding, compile approved health indicators, prepare business reviews, coordinate approved adoption follow-up, maintain knowledge records, and route escalations.'],
  ['Can remote staff make commercial or product commitments?','No. Pricing, renewals, concessions, roadmap promises, contract changes, security decisions, and final relationship commitments stay with authorized owners.'],
  ['Can support work in our customer systems?','The role can account for approved CRM, customer-success, support, product, knowledge, scheduling, and communication systems. Your organization controls access, privacy, retention, and final records.'],
  ['What should we put in the form?','Describe the organization, recurring journey, current owner, and handoff challenge. Do not include credentials, confidential customer records, contract terms, or support histories.'],
];

export default function ContactPage() {
  const schema = {'@context':'https://schema.org','@type':'ContactPage',name:`Contact ${site.name}`,url:`https://${site.domain}/contact-us`,description:'Inquiry page for remote customer success staffing.',breadcrumb:{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`https://${site.domain}/`},{'@type':'ListItem',position:2,name:'Contact Us',item:`https://${site.domain}/contact-us`}]}};
  return <main id="main-content" className="contact-page">
    <section className="contact-first-fold"><ReviewLane /><div className="contact-form-card"><p className="eyebrow">Start with one customer journey</p><h1>Tell us where the handoff loses momentum.</h1><p>Fields marked with an asterisk are required. Submission starts a conversation and does not guarantee a placement.</p><LeadForm /></div></section>

    <section className="team-credibility" aria-labelledby="team-title"><div className="team-photo"><Image src="/brand/stealth-agents-team-bacolod.webp" alt="Stealth Agents team in the Bacolod office" fill sizes="(max-width: 900px) 100vw, 52vw" /></div><div className="team-copy"><Image className="team-logo" src="/brand/stealth-agents-logo-black.png" alt="Stealth Agents" width={190} height={54} /><p className="team-plate">Official team, Bacolod</p><h2 id="team-title">A managed staffing team behind the match.</h2><p>Stealth Agents supports recruiting, matching, and management around documented roles. Your organization still defines access, approves customer communication, reviews output, and owns every commercial, product, security, and relationship decision.</p><a className="text-link" href="https://stealthagents.com/" rel="noopener noreferrer">Learn about Stealth Agents</a></div></section>

    <section className="contact-section"><div className="contact-container"><div className="section-heading"><p className="eyebrow">What follows</p><h2>A clear path from inquiry to possible launch.</h2><p>Each stage depends on fit and agreement. No role begins merely because a form was submitted.</p></div><div className="step-grid">{steps.map(([title,copy]) => <article key={title} className="step-card"><span className="orbit-mark" aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="contact-section boundary-section"><div className="contact-container boundary-grid"><article><p className="eyebrow">Useful preparation</p><h2>Bring operational context.</h2><ul className="check-list"><li>The recurring customer journey or queue</li><li>Who owns and reviews it today</li><li>Approved systems and likely access</li><li>What a complete record should show</li><li>When the work must transfer</li></ul></article><article className="boundary-card"><p className="eyebrow">Responsibility stays clear</p><h2>Keep accountable decisions with accountable people.</h2><p>Remote staff can prepare, coordinate, document, and follow approved procedures. They do not set pricing, approve concessions, change contracts, promise product work, make privacy or security decisions, or commit the company.</p></article></div></section>

    <section className="contact-section"><div className="contact-container"><div className="section-heading"><p className="eyebrow">Focused scopes</p><h2>Review a likely starting point.</h2></div><div className="path-grid">{site.services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><h3>{service.name}</h3><p>{service.short}</p><span className="text-link">View this scope</span></Link>)}</div></div></section>

    <section className="contact-section faq-section"><div className="contact-container narrow"><div className="section-heading"><p className="eyebrow">Before you submit</p><h2>Contact questions.</h2></div>{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
  </main>;
}
