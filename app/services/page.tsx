import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/Icons';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Customer success support services',
  description: 'Compare six bounded customer success operating scopes for onboarding, health, business reviews, adoption, knowledge, and escalation coordination.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Customer success support services', description: 'Six focused operating scopes for customer success teams.', images: ['/images/optimization/services-onboarding-review.jpg'] },
};

const decisions = [
  { title: 'Begin with onboarding', body: 'Choose this when an approved customer plan exists, but tasks, reminders, blockers, and completion records are inconsistent.' },
  { title: 'Begin with health operations', body: 'Choose this when approved signals exist, but source freshness, missing inputs, and review packets require repeatable preparation.' },
  { title: 'Begin with reviews or adoption', body: 'Choose a review scope for meeting preparation. Choose adoption follow up for approved education, response capture, and risk transfer.' },
  { title: 'Begin with knowledge or escalation', body: 'Choose knowledge operations for version control and publication flow. Choose escalation coordination when issue context and ownership keep fragmenting.' },
];

export default function ServicesPage() {
  return <main id="main-content" className="services-index">
    <header className="services-manifesto">
      <div><p className="eyebrow">Customer success support services</p><h1>One support system. Six distinct operating roles.</h1><p>Start with the recurring customer work that loses context. Define the approved source, repeatable action, completion record, review owner, and point where a specialist must hand judgment back.</p><div className="hero-actions"><Link className="button primary" href="/contact-us">Plan a support scope <ArrowIcon /></Link><Link className="quiet-link" href="#service-directory">Compare the roles</Link></div></div>
      <div className="services-hero-image" data-motion-image><Image src="/images/optimization/services-onboarding-review.jpg" alt="Customer success team reviewing an onboarding plan and assigning operational owners" fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div>
    </header>
    <div className="signal-marquee" aria-label="Supported customer success operating scopes"><div>{[...site.services, ...site.services].map((service, index) => <span key={`${service.slug}-${index}`}>{service.name}</span>)}</div></div>
    <section className="services-argument"><p className="eyebrow">Capacity should not blur authority</p><div><h2>Delegate the operating layer, not the customer relationship.</h2><p>These scopes are designed for repeatable, source-based work. Specialists prepare records, coordinate approved actions, and surface exceptions. Your authorized leaders retain strategy, commercial authority, product judgment, and customer commitments.</p></div></section>
    <section id="service-directory" className="service-directory-editorial" aria-labelledby="directory-title"><div className="directory-heading"><p className="eyebrow">The complete service system</p><h2 id="directory-title">Choose by the record that must stay reliable.</h2></div><div className="directory-list">{site.services.map((service, index) => <article className="directory-row" key={service.slug} data-stack-card><span className="directory-number">0{index + 1}</span><div><h3>{service.name}</h3><p>{service.intro}</p></div><div><strong>Useful outputs</strong><ul>{service.outcomes.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><Link className="text-link" href={`/services/${service.slug}`}>Review scope and boundaries <ArrowIcon /></Link></div></article>)}</div></section>
    <section className="operating-guidance"><div><p className="eyebrow">A practical operating contract</p><h2>Five facts should be settled before capacity is added.</h2></div><ol><li><strong>Source</strong><span>Name the approved system, record, template, or instruction.</span></li><li><strong>Action</strong><span>Define the repeatable preparation or coordination work.</span></li><li><strong>Evidence</strong><span>State what a complete, reviewable output contains.</span></li><li><strong>Owner</strong><span>Keep judgment with the accountable person.</span></li><li><strong>Exception</strong><span>Document when work stops and transfers.</span></li></ol></section>
    <section className="decision-guide"><div><p className="eyebrow">Decision support</p><h2>Where should your team start?</h2><p>Open the situation that most closely matches the operating gap. The answer identifies a starting scope, not a guaranteed business outcome.</p></div><div className="decision-accordion">{decisions.map((item, index) => <details key={item.title} open={index === 0}><summary>{item.title}</summary><p>{item.body}</p></details>)}</div></section>
    <section className="services-faq"><p className="eyebrow">Frequently asked questions</p><h2>Set the boundary before you set the volume.</h2><div><details><summary>Can one role cover several scopes?</summary><p>It can, when the sources, review owners, skills, and service levels are compatible. Begin with one dependable workflow before combining queues.</p></details><details><summary>What proof should we review?</summary><p>Use process evidence such as source freshness, record completeness, exception age, named ownership, and documented transfer. These measures should not be presented as guaranteed retention or revenue results.</p></details><details><summary>What remains with our team?</summary><p>Customer strategy, pricing, contracts, product decisions, sensitive interpretations, remedies, and final commitments remain with authorized leaders.</p></details></div></section>
    <section className="closing"><p className="eyebrow">Begin with one recurring journey</p><h2>Turn the queue that loses context into a bounded support brief.</h2><p>Bring the current source, owner, completion standard, and exception. We will help map the operating scope.</p><Link className="button primary" href="/contact-us">Plan a support scope</Link></section>
  </main>;
}
