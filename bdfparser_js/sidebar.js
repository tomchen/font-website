module.exports = {
  sidebar: [
    'index',
    'editor',
    {
      type: 'category',
      label: 'BDF Parser (TS/JS) API',
      collapsed: false,
      items: ['font', 'glyph', 'bitmap'],
    },
    {
      type: 'category',
      label: 'API TS Doc (auto-generated)',
      collapsed: true,
      items: require('./typedoc-sidebar.js'),
    },
  ],
}
