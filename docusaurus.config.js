module.exports = {
  title: 'Font & Typography',
  tagline: "Tom Chen's Font Library, Tutorial, Collection Website",
  url: 'https://font.tomchen.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tomchen', // Usually your GitHub org/user name.
  projectName: 'font-website', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    navbar: {
      title: 'Font & Typography',
      logo: {
        alt: 'Font & Typography',
        src: 'img/logo.svg',
      },
      items: [
        {
          // to: 'all/',
          // activeBasePath: 'all',
          label: 'Standard Font',
          position: 'left',
          items: [
            // {
            //   to: 'all/',
            //   activeBasePath: 'all',
            //   label: 'Standard Font',
            // },
            {
              to: 'font_template/',
              activeBasePath: 'font_template',
              label: 'Simple Font Template',
              title:
                'Simple way to create font with Adobe Illustrator and FontForge',
            },
          ],
        },
        {
          // to: 'bitmap_font/',
          // activeBasePath: 'bitmap_font',
          label: 'Bitmap / BDF Font',
          position: 'left',
          items: [
            // {
            //   to: 'bitmap_font/',
            //   activeBasePath: 'bitmap_font',
            //   label: 'Guide to Bitmap Fonts',
            // },
            {
              to: 'bdfparser_js/',
              activeBasePath: 'bdfparser_js',
              label: 'BDF Parser (TypeScript / JavaScript)',
            },
            {
              to: 'bdfparser_py/',
              activeBasePath: 'bdfparser_py',
              label: 'BDF Parser (Python)',
            },
            {
              to: 'bdf_spec/',
              activeBasePath: 'bdf_spec',
              label: 'BDF Spec',
            },
            // {
            //   to: 'bdf_collection/',
            //   activeBasePath: 'bdf_collection',
            //   label: 'Bitmap Font Collection',
            // },
          ],
        },
        {
          position: 'right',
          label: 'View & Star GitHub Repo of ...',
          className: 'header-github-link',
          items: [
            {
              href: 'https://github.com/tomchen/bdfparser-js',
              label: 'BDF Parser (TypeScript / JavaScript)',
            },
            {
              href: 'https://github.com/tomchen/bdfparser',
              label: 'BDF Parser (Python)',
            },
            // {
            //   href: 'https://github.com/tomchen/bitmap-font-collection',
            //   label: 'Bitmap Font Collection',
            // },
            {
              href: 'https://github.com/tomchen/font-template',
              label: 'Simple Font Template',
            },
            {
              href: 'https://github.com/tomchen/font-website',
              label: 'This website',
            },
            {
              href: 'https://github.com/tomchen',
              label: 'And follow @tomchen there!',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Standard Font',
          items: [
            {
              label: 'Font Template (Illustrator + FontForge)',
              to: 'bdf_spec/',
            },
          ],
        },
        {
          title: 'Bitmap Font',
          items: [
            {
              label: 'BDF Parser (TypeScript / JavaScript)',
              to: 'bdfparser_js/',
            },
            {
              label: 'BDF Parser (Python)',
              to: 'bdfparser_py/',
            },
            {
              label: 'BDF Specification',
              to: 'bdf_spec/',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              href: 'https://github.com/tomchen/bdfparser-js',
              label: 'BDF Parser (TypeScript / JavaScript) on GitHub',
            },
            {
              href: 'https://github.com/tomchen/bdfparser',
              label: 'BDF Parser (Python) on GitHub',
            },
            {
              href: 'https://github.com/tomchen/font-template',
              label: 'Font Template on GitHub',
            },
            {
              href: 'https://github.com/tomchen/font-website',
              label: 'This website on GitHub',
            },
            {
              href: 'https://github.com/tomchen',
              label: '@tomchen on GitHub',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tom Chen`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'all',
          path: 'all',
          routeBasePath: 'all',
          sidebarPath: require.resolve('./all/sidebar.js'),
          editUrl: 'https://github.com/tomchen/font-website/edit/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
  plugins: [
    // [
    //   'docusaurus-plugin-typedoc',
    //   {
    //     entryPoints: ['../bdfparser-js/src/index.ts'],
    //     tsconfig: '../bdfparser-js/tsconfig.json',
    //     docsRoot: 'bdfparser_js',
    //     out: 'api',
    //     allReflectionsHaveOwnDocument: true,
    //     readme: 'none',
    //     categorizeByGroup: false,
    //     sidebar: {
    //       sidebarFile: './bdfparser_js/typedoc-sidebar.js',
    //       fullNames: true,
    //       readmeLabel: 'Overview',
    //     },
    //     categorizeByGroup: true,
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'font_template',
        path: 'font_template',
        routeBasePath: 'font_template',
        sidebarPath: require.resolve('./font_template/sidebar.js'),
        editUrl: 'https://github.com/tomchen/font-website/edit/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bitmap_font',
        path: 'bitmap_font',
        routeBasePath: 'bitmap_font',
        sidebarPath: require.resolve('./bitmap_font/sidebar.js'),
        editUrl: 'https://github.com/tomchen/font-website/edit/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bdfparser_js',
        path: 'bdfparser_js',
        routeBasePath: 'bdfparser_js',
        sidebarPath: require.resolve('./bdfparser_js/sidebar.js'),
        editUrl: 'https://github.com/tomchen/font-website/edit/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
        remarkPlugins: [
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
        ],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bdfparser_py',
        path: 'bdfparser_py',
        routeBasePath: 'bdfparser_py',
        sidebarPath: require.resolve('./bdfparser_py/sidebar.js'),
        editUrl: 'https://github.com/tomchen/font-website/edit/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bdf_spec',
        path: 'bdf_spec',
        routeBasePath: 'bdf_spec',
        sidebarPath: require.resolve('./bdf_spec/sidebar.js'),
        editUrl: 'https://github.com/tomchen/font-website/edit/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bdf_collection',
        path: 'bdf_collection',
        routeBasePath: 'bdf_collection',
        sidebarPath: require.resolve('./bdf_collection/sidebar.js'),
        editUrl: 'https://github.com/tomchen/font-website/edit/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    'docusaurus-plugin-sass',
  ],
}
