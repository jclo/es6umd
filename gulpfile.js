/* eslint-env node */
/* eslint one-var: 0, semi-style: 0 */


// -- Node modules
const { watch, series } = require('gulp')
    ;

// -- Local constants
const filesToWatch = 'src/**/*.js'
    ;

// -- Local variables

// -- Gulp Private Tasks
const { browserify } = require('./tasks/makejs')
    , { watchify }   = require('./tasks/makejs')
    , makedist       = require('./tasks/makedist')
    , makeprivate    = require('./tasks/makeprivatepackage')
    ;


// -- Gulp watch
function fwatch() {
  watch(filesToWatch, series(watchify));
}


// Gulp Public Tasks:
exports.build = browserify;
exports.watch = fwatch;
exports.makedist = makedist;
exports.makeprivate = makeprivate;
exports.default = series(browserify, makedist, makeprivate);
