// Title:
module.exports = {
  title: 'ES6UMD',
  description: 'A template for writing micro ES6 Javascript libraries',
}

// Theme
module.exports = {
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jclo/es6umd' },
    ],

    // Sidebar
    sidebar: {

      // Guide
      '/guide/': [
        '',
      ],

      // fallback
      '/': [
        '',        /* / */
        'license.md',
      ]
    },

    lastUpdated: 'Last Updated', // string | boolean
  },
}
