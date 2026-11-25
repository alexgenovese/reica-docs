import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './api-reference.module.css';

/**
 * The API reference: Scalar on the schema the app serves (https://app.getreica.com/api/v1/openapi.json, generated from
 * the app's code, so it never drifts from the API).
 *
 * Scalar's script is served by this site (static/vendor/scalar, copied by scripts/vendor-scalar.mjs): no CDN.
 * Test Request goes straight from the browser to the app, which allows this origin (CORS, reica-twopointzero #317).
 * The key the reader pastes stays in memory: no proxy (Scalar's default sends requests through proxy.scalar.com),
 * no local storage, no telemetry.
 *
 * The two calls that spend credits (POST /generations, POST /batches) wait for a confirmation in the page before they
 * are sent (customFetch); cancelled, Scalar shows a local answer and nothing reaches the app (reica-twopointzero #270).
 */
const SCALAR_VERSION = '1.76.2';

/** Scalar's theme on the site's light-table colours (the same mapping the app used). */
const THEME_CSS = `
.light-mode, .light-mode .t-doc__sidebar {
  --scalar-background-1: #FFFFFF;
  --scalar-background-2: #F4F4F4;
  --scalar-background-3: #EBEBEB;
  --scalar-background-accent: rgba(30, 91, 215, 0.08);
  --scalar-color-1: #171717;
  --scalar-color-2: #4A4A4A;
  --scalar-color-3: #767676;
  --scalar-color-accent: #1E5BD7;
  --scalar-border-color: #E4E4E4;
  --scalar-sidebar-background-1: #FFFFFF;
  --scalar-sidebar-color-1: #171717;
  --scalar-sidebar-color-2: #767676;
  --scalar-sidebar-border-color: #E4E4E4;
  --scalar-sidebar-item-hover-background: #F4F4F4;
  --scalar-sidebar-item-active-background: #EBEBEB;
  --scalar-sidebar-color-active: #171717;
  --scalar-sidebar-search-background: #FFFFFF;
  --scalar-sidebar-search-border-color: #D4D4D4;
  --scalar-color-green: #15803D;
  --scalar-color-red: #B91C1C;
  --scalar-color-orange: #B45309;
  --scalar-color-yellow: #B45309;
  --scalar-color-blue: #1E5BD7;
}
.dark-mode, .dark-mode .t-doc__sidebar {
  --scalar-background-1: #161616;
  --scalar-background-2: #1F1F1F;
  --scalar-background-3: #2A2A2A;
  --scalar-background-accent: rgba(110, 155, 255, 0.12);
  --scalar-color-1: #EDEDED;
  --scalar-color-2: #C4C4C4;
  --scalar-color-3: #A3A3A3;
  --scalar-color-accent: #6E9BFF;
  --scalar-border-color: #2F2F2F;
  --scalar-sidebar-background-1: #161616;
  --scalar-sidebar-color-1: #EDEDED;
  --scalar-sidebar-color-2: #A3A3A3;
  --scalar-sidebar-border-color: #2F2F2F;
  --scalar-sidebar-item-hover-background: #1F1F1F;
  --scalar-sidebar-item-active-background: #2A2A2A;
  --scalar-sidebar-color-active: #EDEDED;
  --scalar-sidebar-search-background: #161616;
  --scalar-sidebar-search-border-color: #3A3A3A;
  --scalar-color-green: #4ADE80;
  --scalar-color-red: #F87171;
  --scalar-color-orange: #F59E0B;
  --scalar-color-yellow: #F59E0B;
  --scalar-color-blue: #6E9BFF;
}
.scalar-app, .scalar-api-reference {
  --scalar-font: 'Instrument Sans', system-ui, sans-serif;
  --scalar-radius: 6px;
  --scalar-radius-lg: 8px;
  --scalar-radius-xl: 10px;
}
`;

/** The operations that spend credits: a POST to exactly these paths (not /batches/{id}/cancel or /review). */
const SPENDING = /\/api\/v1\/(generations|batches)\/?$/;

/** `{ method, path }` when a request spends credits, else null. Scalar passes a Request, or (url, init) in Electron. */
function spendingCall(input, init) {
  const method = (init?.method ?? (typeof input === 'object' ? input.method : undefined) ?? 'GET').toUpperCase();
  if (method !== 'POST') return null;
  let path;
  try {
    path = new URL(typeof input === 'object' ? input.url : String(input), window.location.href).pathname;
  } catch {
    return null;
  }
  return SPENDING.test(path) ? { method, path: path.replace(/^\/api\/v1/, '') } : null;
}

/** What Scalar shows when the reader cancels: a local answer in the API's error shape, never sent. */
const notSent = () => new Response(
  JSON.stringify({ error: 'Not sent: you cancelled it in the reference. Nothing was charged.', code: 'NOT_SENT' }),
  { status: 499, statusText: 'Not sent', headers: { 'Content-Type': 'application/json' } },
);

/** Asks before a call that spends credits; resolves true to send it. */
function ConfirmSpend({ call, onAnswer }) {
  const cancel = useRef(null);
  useEffect(() => {
    cancel.current?.focus();
    const onKey = (event) => event.key === 'Escape' && onAnswer(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onAnswer]);
  // On <body>, so no container of the page clips it or stacks it under Scalar's client.
  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="spend-title" aria-describedby="spend-text">
        <h2 id="spend-title">This call spends credits</h2>
        <p id="spend-text">
          <code>{call.method} {call.path}</code> starts a real run with your key: it holds the run's price from your
          wallet and makes the images. To see the price first, send the same body to <code>POST /estimate</code>, which
          is free.
        </p>
        <div className={styles.actions}>
          <button ref={cancel} type="button" className="button button--secondary" onClick={() => onAnswer(false)}>
            Cancel
          </button>
          <button type="button" className="button button--primary" onClick={() => onAnswer(true)}>
            Send and spend credits
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Loads the script once per page view; resolves with window.Scalar. */
function loadScalar(src) {
  if (window.Scalar) return Promise.resolve(window.Scalar);
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => (window.Scalar ? resolve(window.Scalar) : reject(new Error('Scalar did not load')));
    script.onerror = () => reject(new Error('Scalar did not load'));
    document.body.appendChild(script);
  });
}

function Reference({ schemaUrl }) {
  const mount = useRef(null);
  const { colorMode } = useColorMode();
  const scriptUrl = useBaseUrl(`/vendor/scalar/api-reference-${SCALAR_VERSION}.js`);
  const [failed, setFailed] = useState(false);
  const [asking, setAsking] = useState(null);

  useEffect(() => {
    // Every request of the page (the schema too) goes through here; only the two spending calls wait for an answer.
    const customFetch = (input, init) => {
      const call = spendingCall(input, init);
      if (!call) return fetch(input, init);
      return new Promise((resolve) => {
        setAsking({
          call,
          answer: (send) => {
            setAsking(null);
            resolve(send ? fetch(input, init) : notSent());
          },
        });
      });
    };
    let instance;
    let alive = true;
    loadScalar(scriptUrl)
      .then((Scalar) => {
        if (!alive || !mount.current) return;
        instance = Scalar.createApiReference(mount.current, {
          url: schemaUrl,
          // Requests go straight to the app: '' turns off Scalar's default proxy (proxy.scalar.com).
          proxyUrl: '',
          customFetch,
          telemetry: false,
          persistAuth: false,
          theme: 'none',
          customCss: THEME_CSS,
          withDefaultFonts: false,
          forceDarkModeState: colorMode === 'dark' ? 'dark' : 'light',
          hideDarkModeToggle: true,
          hideClientButton: true,
          showSidebar: true,
          isEditable: false,
          // No Scalar toolbar, hosted AI agent or MCP links: the page shows Reica's API only.
          showDeveloperTools: 'never',
          agent: { disabled: true },
          mcp: { disabled: true },
          authentication: { preferredSecurityScheme: 'BearerAuth' },
        });
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
      instance?.destroy();
    };
  }, [schemaUrl, scriptUrl, colorMode]);

  if (failed) {
    return (
      <p className={styles.notice}>
        The reference did not load. Reload the page, or read the schema directly: <a href={schemaUrl}>openapi.json</a>.
      </p>
    );
  }
  return (
    <>
      <div ref={mount} className={styles.reference} />
      {asking && <ConfirmSpend call={asking.call} onAnswer={asking.answer} />}
    </>
  );
}

export default function ApiReferencePage() {
  const { siteConfig } = useDocusaurusContext();
  const schemaUrl = siteConfig.customFields.apiSchemaUrl;
  return (
    <Layout
      title="API Reference"
      description="Every endpoint of the Reica API with its fields, examples and error codes. Try each call with your own API key."
    >
      <header className={styles.intro}>
        <h1>API Reference</h1>
        <p>
          Every endpoint of the Reica API, with its fields, an example of each request and answer, and the errors it can
          return. To try a call, paste your API key (<code>reica_live_...</code>, from <b>Settings</b> &gt;{' '}
          <b>Developer</b> in Reica) in the authentication field: it is sent only to <code>app.getreica.com</code> and
          is not saved. Only <code>POST /generations</code> and <code>POST /batches</code> spend credits: the page asks
          before it sends them, and <code>POST /estimate</code> gives their price for free. To check your webhook
          receiver, send a test event with <code>POST /webhooks/&#123;id&#125;/test</code>. For the flow,
          credits, limits and webhooks in short, read the <a href={useBaseUrl('/developer')}>Developer API</a> guide.
          The schema itself is at <a href={schemaUrl}>openapi.json</a>.
        </p>
      </header>
      <main>
        <Reference schemaUrl={schemaUrl} />
      </main>
    </Layout>
  );
}
