import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import BrandMark from '@site/src/components/BrandMark';
import Pipeline from '@site/src/components/Pipeline';
import styles from './index.module.css';

const STEPS = [
  { n: '01', title: 'Add products', text: 'Upload photos, import a feed or a Shopify store, or pick from Google Drive. Sizes become variants.', to: '/catalog/add-products' },
  { n: '02', title: 'Set the look', text: 'A brand profile fixes backdrop, light, shadow, format and margin once, for every SKU.', to: '/catalog/brand-profiles' },
  { n: '03', title: 'Generate', text: 'One product from its page, or a whole collection in a batch. The cost is shown before you start.', to: '/catalog/generate' },
  { n: '04', title: 'Review', text: 'Every image next to its photo, scored out of 100. Approve, reject, or mark what to change.', to: '/catalog/review' },
  { n: '05', title: 'Export', text: 'Only approved images leave: a ZIP with its manifest, one file per size, or Google Drive.', to: '/catalog/export' },
];

const FIGURES = [
  { value: '8', label: 'still-life angles' },
  { value: '9', label: 'on-model poses' },
  { value: '10,000', label: 'products per feed import' },
  { value: 'n/100', label: 'a quality check on every image' },
];

const CHECKS = ['Colour', 'Print and logo', 'Shape', 'Proportions', 'Edges', 'Outfit'];

const DOORS = [
  { kicker: 'New to Reica', title: 'Getting started', text: 'Your first approved image: one product, its front still life, review and download.', to: '/getting-started' },
  { kicker: 'Setting up a catalog', title: 'How the catalog works', text: 'The five steps, the words Reica uses, and what a shot goes through.', to: '/catalog' },
  { kicker: 'Buying for a team', title: 'Trust and compliance', text: 'Rights to your photos, AI Act marking on every file, privacy and deletion.', to: '/compliance' },
];

export default function Home() {
  return (
    <Layout
      title="Documentation"
      description="How to turn your product photos into approved catalog images with Reica: products, brand profiles, batches, validation, review and export.">
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>
                  <BrandMark size={18} condense />
                  Reica documentation
                </p>
                <h1 className={styles.display}>
                  From hanger to <em>catalog.</em>
                </h1>
                <p className={styles.lead}>
                  How catalog teams turn the photos they already take into still lifes and on-model images,
                  checked against the product and approved by a person before anything ships.
                </p>
                <div className={styles.cta}>
                  <Link className={styles.btn} to="/getting-started">Get started</Link>
                  <Link className={`${styles.btn} ${styles.btnOutline}`} to="/catalog">How the catalog works</Link>
                </div>
              </div>
              <Pipeline />
            </div>
          </div>
        </section>

        <section className={styles.figures}>
          <div className={`${styles.wrap} ${styles.figRow}`}>
            {FIGURES.map((f) => (
              <div key={f.label} className={styles.fig}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sHead}>
              <p className={styles.eyebrow}>The catalog flow</p>
              <h2 className={styles.h2}>Five steps, the same for one SKU or a <em>season.</em></h2>
            </div>
            <ol className={styles.steps}>
              {STEPS.map((s) => (
                <li key={s.n}>
                  <Link to={s.to} className={styles.step}>
                    <span className={styles.stepN}>{s.n}</span>
                    <b>{s.title}</b>
                    <p>{s.text}</p>
                    <span className={styles.more}>Read more</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.wrap} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>Validation</p>
              <h2 className={styles.h2}>Validate before anything <em>ships.</em></h2>
              <p className={styles.body}>
                Every image is compared with your product photo and scored out of 100. Defects come with where
                they are and how to fix them. An image under your threshold gets one automatic fix, kept only
                if it is better. Then a person decides.
              </p>
              <ul className={styles.checks}>
                {CHECKS.map((c) => (
                  <li key={c}><span className="state state--approved">{c}</span></li>
                ))}
              </ul>
              <Link className={styles.textLink} to="/catalog/validation">How validation works</Link>
            </div>
            <div className={styles.compare}>
              <figure className={styles.frame}>
                <div className={styles.well}>
                  <img src="/img/brand/cardigan-photo.webp" alt="A navy knit cardigan on a hanger, the shop photo" />
                </div>
                <figcaption><b>Photo</b><span>SKU KN-1048</span></figcaption>
              </figure>
              <figure className={styles.frame}>
                <div className={styles.well}>
                  <img src="/img/brand/cardigan-still.webp" alt="The cardigan as a catalog still life" />
                </div>
                <figcaption>
                  <b>Still life, V1</b>
                  <span className="state state--approved">Matches the photo</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.ink}>
          <div className={`${styles.wrap} ${styles.inkGrid}`}>
            <div>
              <p className={styles.eyebrowInk}>For enterprise teams</p>
              <h2 className={styles.h2}>Built for production. Not for experiments.</h2>
            </div>
            <ul className={styles.inkList}>
              <li><b>Approval-only export</b><span>Images waiting for review or rejected cannot be downloaded, exported or sent. Enforced on the server.</span></li>
              <li><b>AI Act marking</b><span>Every file carries machine-readable AI marking, article 50, and the manifest repeats it.</span></li>
              <li><b>Rights confirmed at import</b><span>Photos from feeds, Drive and links come in only after the rights and consent are confirmed.</span></li>
              <li><b>Every version kept</b><span>Corrections never overwrite: each version stays with its score, and you can go back.</span></li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.wrap} ${styles.doors}`}>
            {DOORS.map((d) => (
              <Link key={d.to} to={d.to} className={styles.door}>
                <span className={styles.kicker}>{d.kicker}</span>
                <b>{d.title}</b>
                <p>{d.text}</p>
                <span className={styles.more}>Open</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
