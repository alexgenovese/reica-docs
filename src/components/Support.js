import React from 'react';
import styles from './Intro.module.css';
import own from './Support.module.css';

const SUPPORT = 'support@getreica.com';

// Each request type opens an email with a subject tag and a short template, so a request arrives
// with what is needed to answer it. The template holds no personal data: the person fills it in.
const TYPES = [
  {
    tag: 'Problem',
    title: 'Something is not working',
    text: 'An error, a page that does not load, an import or a batch that stopped.',
    body: [
      'What I was doing:',
      'What happened (the message on screen, if any):',
      'Where (link to the product, batch or page):',
      'When (date and time):',
      '',
      'A screenshot helps: attach it to this email.',
    ],
  },
  {
    tag: 'Image',
    title: 'A question about an image',
    text: 'A shot that does not match the product, a quality check you do not agree with.',
    body: [
      'Product SKU:',
      'Shot (front, back, on-model pose):',
      'Version (V1, V2...):',
      'What differs from the product photo:',
      'Link to the shot in Review:',
    ],
  },
  {
    tag: 'Billing',
    title: 'Plans, credits and invoices',
    text: 'Changing plan, a charge you do not recognise, an invoice, a refund.',
    body: ['Account email:', 'Plan:', 'Invoice number or date of the charge (if any):', 'Question:'],
  },
  {
    tag: 'Privacy',
    title: 'Data, privacy and deletion',
    text: 'A copy of your data, a deletion request, a question about how photos are used.',
    body: ['Account email:', 'Request (access, deletion, correction, other):', 'Details:'],
  },
  {
    tag: 'Security',
    title: 'Report a security issue',
    text: 'Something that could expose data or let someone in. Please do not share it publicly.',
    body: ['What you found:', 'How to reproduce it:', 'What it could expose:'],
  },
];

function mailto(tag, body) {
  const subject = `[${tag}] `;
  return `mailto:${SUPPORT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join('\n'))}`;
}

export function RequestTypes() {
  return (
    <div className={own.types}>
      {TYPES.map((t) => (
        <a key={t.tag} href={mailto(t.tag, t.body)} className={styles.door}>
          <span className={styles.kicker}>{t.tag}</span>
          <b>{t.title}</b>
          <p>{t.text}</p>
          <span className={styles.more}>Write to us</span>
        </a>
      ))}
      <a href="https://getreica.com/contact" className={`${styles.door} ${own.sales}`}>
        <span className={styles.kicker}>Enterprise</span>
        <b>A plan for your team</b>
        <p>More products per batch, unlimited brand profiles, a contract and dedicated support.</p>
        <span className={styles.more}>Contact sales</span>
      </a>
    </div>
  );
}
