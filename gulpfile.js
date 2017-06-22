/* eslint one-var: 0, prefer-arrow-callback: 0*/
/* eslint strict: 0 */

'use strict';

// -- Node modules
const gulp        = require('gulp')
    , runSequence = require('run-sequence')
    ;

// -- Local modules

// -- Local constants

// -- Local variables

// Include all build tasks:
require('require-dir')('./tasks');


// -- Gulp Public Tasks

// Bundle all project JS and vendor JS file together:
gulp.task('build', function(callback) {
  runSequence('browserify', callback);
});

// Watch:
gulp.task('watch', ['watchify']);

// Make a distribution:
gulp.task('makedist', function(callback) {
  runSequence('skeleton', 'copyproject', callback);
});

// Build and then make a distribution:
gulp.task('default', function(callback) {
  runSequence('build', 'makedist', callback);
});
