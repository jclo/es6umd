/* eslint one-var: 0, semi-style: 0 */


// -- Node modules

// -- Local modules

// -- Local constants
const { name } = require('../package.json')
    , release  = require('../package.json').version
    ;

module.exports = {
  name,
  release,
  dist: './_dist',
  libdir: './lib',
  libname: 'ES6UMD',
  index: './index.js',
  // Specific to browserify:
  browserify: {
    // The entry point:
    app: './index',
    debug: false,
    // The name to expose outside the module:
    exportname: 'ES6UMD',
  },
  license: ['/*! ****************************************************************************',
    ' * {{lib:name}} v{{lib:version}}',
    ' *',
    ' * {{lib:description}}.',
    ' * (you can download it from npm or github repositories)',
    ' * Copyright (c) 2019 {{lib:author}} <{{lib:email}}> ({{lib:url}}).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' * ************************************************************************** */',
    ''].join('\n'),
};
