import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './Support.module.css';

// The support form posts to /api/support (api/support.mjs). No email address is in the page.

const TYPES = [
  { id: 'problem', tag: 'Problem', title: 'Something is not working', text: 'An error, a page that does not load, an import or a batch that stopped.',
    hint: 'What you were doing, what happened (the message on screen), and when.' },
  { id: 'image', tag: 'Image', title: 'A question about an image', text: 'A shot that does not match the product, a quality check you do not agree with.',
    hint: 'Which shot and version, and what differs from the product photo.' },
  { id: 'billing', tag: 'Billing', title: 'Plans, credits and invoices', text: 'Changing plan, a charge you do not recognise, an invoice.',
    hint: 'Your plan, and the invoice number or the date of the charge.' },
  { id: 'privacy', tag: 'Privacy', title: 'Data, privacy and deletion', text: 'A copy of your data, a deletion request, how photos are used.',
    hint: 'The request (access, deletion, correction) and the email of the account.' },
  { id: 'security', tag: 'Security', title: 'Report a security issue', text: 'Something that could expose data or let someone in.',
    hint: 'What you found, how to reproduce it, and what it could expose. Please do not share it publicly.' },
  { id: 'enterprise', tag: 'Enterprise', title: 'A plan for your team', text: 'More products per batch, unlimited brand profiles, a contract.',
    hint: 'Your catalog size (SKUs a season), the team, and what you need.' },
];

function useTurnstile(siteKey) {
  const box = useRef(null);
  const widget = useRef(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!siteKey || !box.current) return undefined;
    let cancelled = false;
    const render = () => {
      if (cancelled || !window.turnstile || widget.current !== null) return;
      widget.current = window.turnstile.render(box.current, {
        sitekey: siteKey,
        appearance: 'interaction-only',
        callback: (t) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };
    if (window.turnstile) render();
    else {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = render;
      document.head.appendChild(s);
    }
    return () => { cancelled = true; };
  }, [siteKey]);

  const reset = () => {
    setToken('');
    if (window.turnstile && widget.current !== null) window.turnstile.reset(widget.current);
  };

  return { box, token, reset };
}

export function SupportForm() {
  const { siteConfig } = useDocusaurusContext();
  const siteKey = siteConfig.customFields?.turnstileSiteKey || '';
  const { box, token, reset } = useTurnstile(siteKey);
  const startedAt = useRef(Date.now());
  const formRef = useRef(null);
  const [type, setType] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const chosen = TYPES.find((t) => t.id === type);

  const pick = (id) => {
    setType(id);
    setError('');
    requestAnimationFrame(() => formRef.current?.querySelector('input[name="name"]')?.focus({ preventScroll: false }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!type) { setError('Choose the kind of request first.'); return; }
    const f = e.currentTarget.elements;
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name: f.name.value,
          email: f.email.value,
          company: f.company.value,
          reference: f.reference.value,
          message: f.message.value,
          website: f.website.value,
          formStartedAt: startedAt.current,
          turnstileToken: token,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'The message could not be sent. Try again in a few minutes.');
      setState('sent');
    } catch (err) {
      setState('error');
      setError(err.message);
      reset();
    }
  };

  if (state === 'sent') {
    return (
      <div className={styles.sent} role="status">
        <span className="state state--approved">Request sent</span>
        <b>Thank you. We will answer by email.</b>
        <p>A confirmation is on its way to your inbox. Reply to it if you want to add something, such as a screenshot.</p>
        <button type="button" className={styles.btnOutline} onClick={() => { setState('idle'); setType(''); startedAt.current = Date.now(); }}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.types} role="radiogroup" aria-label="Kind of request">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={type === t.id}
            className={`${styles.type} ${type === t.id ? styles.typeOn : ''} ${t.id === 'enterprise' ? styles.typeInk : ''}`}
            onClick={() => pick(t.id)}>
            <span className={styles.kicker}>{t.tag}</span>
            <b>{t.title}</b>
            <span className={styles.typeText}>{t.text}</span>
          </button>
        ))}
      </div>

      <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate={false}>
        <div className={styles.formHead}>
          <b>{chosen ? chosen.title : 'Your request'}</b>
          {chosen && <span className={styles.tag}>{chosen.tag}</span>}
        </div>

        <div className={styles.grid}>
          <label className={styles.field}>
            <span>Name</span>
            <input name="name" required maxLength={120} autoComplete="name" />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input name="email" type="email" required maxLength={254} autoComplete="email" />
          </label>
          <label className={styles.field}>
            <span>Company <i>optional</i></span>
            <input name="company" maxLength={120} autoComplete="organization" />
          </label>
          <label className={styles.field}>
            <span>SKU, link or reference <i>optional</i></span>
            <input name="reference" maxLength={500} placeholder="JKT-001, or the link to the shot in Review" />
          </label>
          <label className={`${styles.field} ${styles.full}`}>
            <span>Message</span>
            <textarea name="message" required rows={6} maxLength={5000} placeholder={chosen ? chosen.hint : 'Choose the kind of request above, then tell us what you need.'} />
          </label>
        </div>

        <label className={styles.honeypot} aria-hidden="true">
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <div ref={box} className={styles.turnstile} />

        <div className={styles.actions}>
          <button type="submit" className={styles.btnInk} disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Send request'}
          </button>
          <p className={styles.note}>
            Never send passwords or card numbers. We use your details only to answer this request.
          </p>
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </form>
    </div>
  );
}
