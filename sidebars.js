/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    { type: 'doc', id: 'intro', label: 'Introduction' },
    { type: 'doc', id: 'getting-started/index', label: 'Getting started' },
    {
      type: 'category',
      label: 'Catalog',
      collapsed: false,
      items: [
        { type: 'doc', id: 'catalog/index', label: 'How the catalog works' },
        { type: 'doc', id: 'catalog/add-products', label: 'Add products' },
        { type: 'doc', id: 'catalog/brand-profiles', label: 'Brand profiles' },
        { type: 'doc', id: 'catalog/generate', label: 'Generate' },
        { type: 'doc', id: 'catalog/validation', label: 'Validation' },
        { type: 'doc', id: 'catalog/review', label: 'Review' },
        { type: 'doc', id: 'catalog/export', label: 'Export' },
      ],
    },
    { type: 'doc', id: 'features/library/index', label: 'Library' },
    { type: 'doc', id: 'compliance/index', label: 'Trust and compliance' },
    { type: 'doc', id: 'pricing/index', label: 'Pricing' },
    { type: 'doc', id: 'faq/index', label: 'FAQ' },
    { type: 'doc', id: 'support/index', label: 'Support' },
  ],
};

export default sidebars;
