// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Reica Docs',
  tagline: 'Turn your product photos into approved catalog images.',
  favicon: 'img/favicon.svg',

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

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/InstrumentSans-Latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'reica',
        logo: {
          alt: 'Reica',
          src: 'img/mark.svg',
          srcDark: 'img/mark-dark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/support',
            label: 'Support',
            position: 'right',
          },
          {
            href: 'https://app.getreica.com',
            label: 'Open Reica',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Catalog',
            items: [
              { label: 'How the catalog works', to: '/catalog' },
              { label: 'Add products', to: '/catalog/add-products' },
              { label: 'Brand profiles', to: '/catalog/brand-profiles' },
              { label: 'Generate', to: '/catalog/generate' },
              { label: 'Review', to: '/catalog/review' },
              { label: 'Export', to: '/catalog/export' },
              { label: 'Library', to: '/features/library' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Trust and compliance', to: '/compliance' },
              { label: 'Pricing', to: '/pricing' },
              { label: 'FAQ', to: '/faq' },
              { label: 'Support', to: '/support' },
              { label: 'Status', href: 'https://status.getreica.com' },
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
