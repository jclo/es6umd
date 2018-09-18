/* eslint one-var: 0, semi-style: 0 */

// -- Node modules

// -- Local modules

// -- Local constants
const { name } = require('../package.json')
    ;

// -- Configuration file for Gulp
module.exports = {
  name,
  dist: './_dist',
  libdir: './lib',
  // Specific to browserify:
  browserify: {
    app: './index',
    debug: false,
    exportname: 'ES6UMD', // Name to expose outside the lib,
  },
  babel: {
    presets: [
      ['env', {
        targets: {
          browsers: ['last 2 versions', 'ie 9'],
        },
      }],
    ],
    plugins: ['add-module-exports'],
    env: {
      test: {
        plugins: ['istanbul'],
      },
    },
  },
  license: ['/** ****************************************************************************',
    ' * {{lib:name}} v{{lib:version}}',
    ' *',
    ' * {{lib:description}}.',
    ' * (you can download it from npm or github repositories)',
    ' * Copyright (c) 2018 {{lib:author}} <{{lib:email}}> ({{lib:url}}).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' * ************************************************************************** */',
    ''].join('\n'),
};
