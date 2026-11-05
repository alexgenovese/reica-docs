import React from 'react';
import Link from '@docusaurus/Link';
import BrandMark from '@site/src/components/BrandMark';
import styles from './Intro.module.css';

// Small illustrations built from the app's own parts: the light table, swatches, state words, file names.

function Photos() {
  return (
    <div className={styles.artWells}>
      <div className={styles.miniWell}><img src="/img/brand/hanger.webp" alt="" /></div>
      <span className={styles.arrow} aria-hidden="true">→</span>
      <div className={styles.miniWell}><img src="/img/brand/still-dress.webp" alt="" /></div>
    </div>
  );
}

function Look() {
  const swatches = ['#FFFFFF', '#171717', '#808080', '#F4C2C2', '#B0D8E6', '#98E6A8', '#FBF3D5'];
  return (
    <div className={styles.artLook}>
      <div className={styles.swatches}>
        {swatches.map((c, i) => (
          <span key={c} className={i === 0 ? styles.swatchOn : undefined} style={{ background: c }} />
        ))}
      </div>
      <div className={styles.rows}>
        <span><b>Light</b>Frontal</span>
        <span><b>Shadow</b>Under the product</span>
        <span><b>Margin</b>10%</span>
      </div>
    </div>
  );
}

function Scale() {
  return (
    <div className={styles.artScale}>
      <BrandMark size={84} condense />
      <p>A batch is a grid of SKUs. When it is done, the approved cells draw the garment.</p>
    </div>
  );
}

function Checks() {
  return (
    <div className={styles.artChecks}>
      <div className={styles.scoreBig}>96<span>/100</span></div>
      <span className="state state--approved">Matches the photo</span>
      <ul>
        <li><span className="state state--approved">Print and logo</span></li>
        <li><span className="state state--approved">Shape</span></li>
        <li><span className="state state--review">Hem position</span></li>
      </ul>
    </div>
  );
}

function Decide() {
  return (
    <div className={styles.artDecide}>
      <div className={styles.versions}>
        <span>V1<i className={styles.vDotReview} /></span>
        <span className={styles.vOn}>V2<i className={styles.vDotOk} /></span>
      </div>
      <div className={styles.buttons}>
        <span className={styles.btnOutline}>Reject <kbd>R</kbd></span>
        <span className={styles.btnInk}>Approve V2 <kbd>A</kbd></span>
      </div>
    </div>
  );
}

function Files() {
  return (
    <div className={styles.artFiles}>
      <code>reica-approved-shots.zip</code>
      <ul>
        <li>DR-2291_front.png</li>
        <li>DR-2291_on-model-front.png</li>
        <li>KN-1048_front.png</li>
        <li className={styles.manifest}>manifest.csv</li>
      </ul>
    </div>
  );
}

const FEATURES = [
  { art: Photos, title: 'Starts from your photos', text: 'A garment on a hanger, a table or a mannequin. Reica removes everything that is not the product.', to: '/catalog/add-products' },
  { art: Look, title: 'Keeps one look', text: 'A brand profile fixes backdrop, light, shadow, format and margin once, so every product of the season lines up.', to: '/catalog/brand-profiles' },
  { art: Scale, title: 'Works at catalog scale', text: 'One product from its page, or hundreds in a batch, with your feed’s SKUs and sizes.', to: '/catalog/generate' },
  { art: Checks, title: 'Checks every image', text: 'Each image is scored against your photo for print, colour, shape and defects, and fixed once when it falls short.', to: '/catalog/validation' },
  { art: Decide, title: 'Lets people decide', text: 'Every version is kept. A person approves, rejects or asks for a change, next to the photo.', to: '/catalog/review' },
  { art: Files, title: 'Exports what was approved', text: 'A ZIP named by SKU with its manifest, one file per size, or straight to Google Drive.', to: '/catalog/export' },
];

export function Features() {
  return (
    <div className={styles.features}>
      {FEATURES.map(({ art: Art, title, text, to }) => (
        <Link key={title} to={to} className={styles.feature}>
          <div className={styles.art}><Art /></div>
          <b>{title}</b>
          <p>{text}</p>
        </Link>
      ))}
    </div>
  );
}

const ROLES = [
  { role: 'Content managers', text: 'Import the catalog, run batches with one brand profile, export by SKU.' },
  { role: 'Studio producers', text: 'Set the look once, review every image at full size, mark what to change.' },
  { role: 'Merchandisers', text: 'See what needs attention, approve in bulk the images that passed the check.' },
];

export function Roles() {
  return (
    <div className={styles.roles}>
      {ROLES.map((r) => (
        <div key={r.role}>
          <b>{r.role}</b>
          <p>{r.text}</p>
        </div>
      ))}
    </div>
  );
}

const DOORS = [
  { kicker: 'New to Reica', title: 'Getting started', text: 'Your first approved image in a few minutes.', to: '/getting-started' },
  { kicker: 'Setting up a catalog', title: 'How the catalog works', text: 'The five steps and the words Reica uses.', to: '/catalog' },
  { kicker: 'Looking for an image', title: 'Library', text: 'Everything you upload and generate, in folders.', to: '/features/library' },
];

export function Doors() {
  return (
    <div className={styles.doors}>
      {DOORS.map((d) => (
        <Link key={d.to} to={d.to} className={styles.door}>
          <span className={styles.kicker}>{d.kicker}</span>
          <b>{d.title}</b>
          <p>{d.text}</p>
          <span className={styles.more}>Open</span>
        </Link>
      ))}
    </div>
  );
}
