module.exports = {
  sidebar: [
    'index',
    'intro',
    'tape_format',
    {
      type: 'category',
      label: 'File Format',
      collapsed: false,
      items: [
        'file_format/index',
        'file_format/global_font_info',
        'file_format/individual_glyph_info',
      ],
    },
    'examples',
  ],
}
