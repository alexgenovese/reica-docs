import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    let instance;
    let alive = true;
    loadScalar(scriptUrl)
      .then((Scalar) => {
        if (!alive || !mount.current) return;
        instance = Scalar.createApiReference(mount.current, {
          url: schemaUrl,
          // Requests go straight to the app: '' turns off Scalar's default proxy (proxy.scalar.com).
          proxyUrl: '',
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
  return <div ref={mount} className={styles.reference} />;
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
          is not saved. Only <code>POST /generations</code> and <code>POST /batches</code> spend credits. For the flow,
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
