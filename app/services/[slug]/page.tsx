import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceBySlug } from '@/lib/content';
import { serviceDetails } from '@/lib/service-details';
import { site } from '@/lib/site';

export function generateStaticParams() { return site.services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = serviceBySlug(slug); const detail = serviceDetails[slug]; return service && detail ? { title: service.name, description: service.intro, alternates: { canonical: `/services/${service.slug}` }, openGraph: { title: service.name, description: service.short, images: [detail.image] } } : {}; }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = serviceBySlug(slug); const detail = serviceDetails[slug]; if (!service || !detail) notFound(); const related = site.services.filter((item) => item.slug !== service.slug).slice(0, 3); const schema = { '@context': 'https://schema.org', '@type': 'Service', name: service.name, description: service.intro, url: `https://${site.domain}/services/${service.slug}`, areaServed: 'Remote' };
  return <main id="main-content" className="service-page">
    <header className="service-manifesto"><div><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services">Services</Link><span aria-hidden="true">/</span><span>{service.name}</span></nav><p className="eyebrow">Focused customer success scope</p><h1>{service.name}</h1><p>{service.intro}</p><Link className="button primary" href="/contact-us">Discuss this role</Link></div><div className="service-hero-image" data-motion-image><Image src={detail.image} alt={detail.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div></header>
    <section className="service-context"><div><p className="eyebrow">Who needs it</p><h2>A focused fit for a visible operating gap.</h2><p>{detail.audience}</p></div><div><p className="eyebrow">The problem it solves</p><p className="service-problem">{detail.problem}</p></div></section>
    <section className="service-input-scope"><div><p className="eyebrow">Inputs</p><h2>What must be available.</h2><ul>{detail.inputs.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="eyebrow">Scope of work</p><h2>What the specialist maintains.</h2><ul>{service.tasks.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="service-workflow"><div><p className="eyebrow">Controlled workflow</p><h2>Move the record forward without moving the decision boundary.</h2></div><ol>{service.workflow.map((item, index) => <li key={item} data-stack-card><span>0{index + 1}</span><p>{item}</p></li>)}</ol></section>
    <section className="service-output-quality"><div><p className="eyebrow">Deliverables and outcomes</p><h2>A useful output leaves the owner ready to act.</h2><ul>{service.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="quality-panel"><p className="eyebrow">Quality checks</p><h2>Review the operating evidence.</h2><ul>{detail.qualityChecks.map((item) => <li key={item}>{item}</li>)}</ul><p className="quality-note">Measures assess process reliability and do not guarantee retention, adoption, revenue, or customer outcomes.</p></div></section>
    <section className="boundary-band"><div><p className="eyebrow">Human decision boundary</p><h2>Support prepares and coordinates. Authorized leaders decide.</h2><p>Customer judgment, commercial authority, product decisions, and final commitments stay with your accountable team.</p></div><ul>{service.boundaries.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section className="starting-scenarios"><div><p className="eyebrow">Starting scenarios</p><h2>Recognize the moment to add support.</h2></div><div>{detail.scenarios.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div></section>
    <section className="service-faq"><div><p className="eyebrow">Questions before you begin</p><h2>Clarify the handoff.</h2></div><div>{detail.faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
    <section className="related-services"><div><p className="eyebrow">Related services</p><h2>Connect adjacent operating work only when the boundary stays clear.</h2></div><div>{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`}><strong>{item.name}</strong><span>{item.short}</span></Link>)}</div></section>
    <section className="closing"><p className="eyebrow">Build the role around your process</p><h2>Start with one real {service.name.toLowerCase()} journey.</h2><p>Bring the source, owner, handoff, and exception. We will help shape a focused staffing conversation.</p><Link className="button primary" href="/contact-us">Request a free consultation</Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
