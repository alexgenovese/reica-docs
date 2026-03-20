// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Reica Docs',
  tagline: "Your creative process is changing. We're not automating your creativity, we're helping you to rethink it.",
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.getreica.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  organizationName: 'reica',
  projectName: 'reica-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/reica-social-card.png',
      navbar: {
        title: 'Reica',
        logo: {
          alt: 'Reica Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://getreica.com',
            label: 'Go to App',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/getting-started' },
              { label: 'How It Works', to: '/how-it-works' },
              { label: 'Use Cases', to: '/use-cases' },
            ],
          },
          {
            title: 'Features',
            items: [
              { label: 'Board', to: '/features/board' },
              { label: 'Character', to: '/features/character' },
              { label: 'Still Life', to: '/features/still-life' },
              { label: 'Library', to: '/features/library' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Pricing', to: '/pricing' },
              { label: 'FAQ', to: '/faq' },
              { label: 'getreica.com', href: 'https://getreica.com' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Reica. All rights reserved.`,
      },
      prism: {
        theme: { plain: { color: '#151210', backgroundColor: '#FAF8F4' }, styles: [] },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
