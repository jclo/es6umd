/* eslint one-var: 0 */

// -- Node modules

// -- Local modules

// -- Local constants
const name    = require('../package.json').name
    , release = require('../package.json').version
    ;

// -- Configuration file for Gulp
module.exports = {
  name,
  release,
  dist: './_dist',
  lib: './lib',
  srcfile: './index.js',
  debug: false,
  exportname: 'UMDLib',       // Name to expose outside the lib,
  babel: {
    presets: ['latest'],
    plugins: ['add-module-exports'],
    env: {
      test: {
        plugins: ['istanbul'],
      },
    },
  },
  license: ['/**',
    ` * ${name} v${release}`,
    ' *',
    ` * ${name} is ...`,
    ' * Copyright (c) 2017 John Doe <jdo@johndoe.com> (http://www.johndoe.com)',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' */',
    ''].join('\n'),
};
