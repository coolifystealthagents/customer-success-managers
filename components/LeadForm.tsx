'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const personalDomains = new Set(['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','aol.com','proton.me','protonmail.com']);
const companySizes = ['1 to 10','11 to 50','51 to 200','201 to 500','501+'];
const positionCounts = ['1','2 to 3','4 to 10','11+','Not sure yet'];
const referralSources = ['Search engine','Referral','Customer success community','Social media','Stealth Agents','Other'];

export function LeadForm({ source = 'contact-page-consultation' }: { source?: string }) {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submissionIdRef = useRef<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  function validateBusinessEmail(input: HTMLInputElement) {
    const domain = input.value.trim().toLowerCase().split('@')[1];
    const message = domain && personalDomains.has(domain) ? 'Please use your organization email address.' : '';
    input.setCustomValidity(message); setEmailError(message);
  }

  async function submit(form: HTMLFormElement) {
    if (busy) return;
    if (emailRef.current) validateBusinessEmail(emailRef.current);
    if (!form.reportValidity()) return;
    setBusy(true); setError('');
    const data = new FormData(form);
    submissionIdRef.current ||= crypto.randomUUID();
    data.set('submission_id', submissionIdRef.current);
    try {
      const response = await fetch('/api/submit-lead', { method: 'POST', body: data, headers: { 'x-requested-with': 'customer-success-contact-form' } });
      const result = await response.json();
      if (!response.ok || !result.ok || result.status !== 'delivered') {
        setError(result.message || 'We could not deliver your request. Your information was not accepted.'); setBusy(false);
        queueMicrotask(() => errorRef.current?.focus()); return;
      }
      router.push('/thank-you');
    } catch {
      setError('We could not validate your request. Please try again.'); setBusy(false);
      queueMicrotask(() => errorRef.current?.focus());
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== 'Enter' || event.target instanceof HTMLTextAreaElement) return;
    event.preventDefault(); void submit(event.currentTarget);
  }

  return <form id="customer-success-contact" className="lead-form" onKeyDown={handleKeyDown}>
    <label>First Name <span aria-hidden="true">*</span><input name="first_name" autoComplete="given-name" maxLength={80} required /></label>
    <label>Last Name <span aria-hidden="true">*</span><input name="last_name" autoComplete="family-name" maxLength={80} required /></label>
    <label className="form-wide">Business Email <span aria-hidden="true">*</span><input ref={emailRef} name="email" type="email" autoComplete="email" maxLength={160} aria-invalid={Boolean(emailError)} aria-describedby="email-help email-error" onChange={(e) => validateBusinessEmail(e.currentTarget)} required /></label>
    <p id="email-help" className="form-help form-wide">Use your organization email. Personal email providers are not accepted.</p>
    {emailError && <p id="email-error" className="form-error form-wide" role="alert">{emailError}</p>}
    <label>Country code<select name="phone_country" defaultValue="+1" aria-label="Phone country code"><option value="+1">US/CA +1</option><option value="+44">UK +44</option><option value="+61">AU +61</option><option value="+63">PH +63</option><option value="other">Other</option></select></label>
    <label>Phone Number<input name="phone" type="tel" autoComplete="tel-national" inputMode="tel" maxLength={32} pattern="[0-9 ()+.-]{5,32}" /></label>
    <label>Company Name <span aria-hidden="true">*</span><input name="company" autoComplete="organization" maxLength={120} required /></label>
    <label>Website / URL<input name="company_website" type="url" autoComplete="url" maxLength={240} placeholder="https://" /></label>
    <label>Company Size <span aria-hidden="true">*</span><select name="company_size" defaultValue="" required><option value="" disabled>Select size</option>{companySizes.map((v) => <option key={v}>{v}</option>)}</select></label>
    <label>Positions to Fill <span aria-hidden="true">*</span><select name="positions_to_fill" defaultValue="" required><option value="" disabled>Select positions</option>{positionCounts.map((v) => <option key={v}>{v}</option>)}</select></label>
    <label className="form-wide">How Did You Hear About Us? <span aria-hidden="true">*</span><select name="referral_source" defaultValue="" required><option value="" disabled>Select a source</option>{referralSources.map((v) => <option key={v}>{v}</option>)}</select></label>
    <label className="form-wide">Customer success workflow<textarea name="message" rows={2} maxLength={800} placeholder="Describe the recurring journey, current owner, and handoff challenge. Do not include customer records or credentials." /></label>
    <input type="hidden" name="source" value={source} />
    <label className="honeypot" aria-hidden="true">Website<input name="website_url" tabIndex={-1} autoComplete="off" /></label>
    {error && <p ref={errorRef} tabIndex={-1} className="form-error form-wide" role="alert">{error}</p>}
    <button className="button primary form-wide" disabled={busy} aria-busy={busy} type="button" onClick={(event) => void submit(event.currentTarget.form!)}>{busy ? 'Sending request...' : 'Request a free consultation'}</button>
    <p className="form-privacy form-wide">Your contact and organization details are sent by our server so we may respond. Free-text workflow details are never sent through browser analytics.</p>
  </form>;
}
