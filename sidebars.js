/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '👋 Introduction',
    },
    {
      type: 'doc',
      id: 'getting-started/index',
      label: '🚀 Getting Started',
    },
    {
      type: 'doc',
      id: 'how-it-works/index',
      label: '⚙️ How It Works',
    },
    {
      type: 'doc',
      id: 'use-cases/index',
      label: '💡 Use Cases',
    },
    {
      type: 'category',
      label: '✨ Features',
      collapsed: false,
      items: [
        { type: 'doc', id: 'features/home/index', label: 'Home & Dashboard' },
        { type: 'doc', id: 'features/still-life/index', label: 'Still Life' },
        { type: 'doc', id: 'features/board/index', label: 'Board' },
        { type: 'doc', id: 'features/character/index', label: 'Character' },
        { type: 'doc', id: 'features/library/index', label: 'Library' },
        { type: 'doc', id: 'features/history/index', label: 'History' },
      ],
    },
    {
      type: 'doc',
      id: 'pricing/index',
      label: '💳 Pricing',
    },
    {
      type: 'doc',
      id: 'faq/index',
      label: '❓ FAQ',
    },
  ],
};

export default sidebars;
