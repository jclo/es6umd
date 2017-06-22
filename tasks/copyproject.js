/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0 */
/* eslint strict: 0 */

'use strict';

// -- Node modules
const gulp        = require('gulp')
    , concat      = require('gulp-concat')
    , header      = require('gulp-header')
    , uglify      = require('gulp-uglify')
    , runSequence = require('run-sequence')
    ;

// -- Local modules
const config = require('./config')
    ;

// -- Local constants
const dist    = config.dist
    , lib     = config.lib
    , name    = config.name
    , license = config.license
    ;

// -- Local variables


// -- Gulp Private Tasks

// Create a minified version of the library:
gulp.task('uglify', function() {
  return gulp.src(`${lib}/${name}.js`)
    .pipe(uglify())
    .pipe(header(license))
    .pipe(concat(`${name}-min.js`))
    .pipe(gulp.dest(lib));
});

// Copy the lib to dist:
gulp.task('copylib', function() {
  return gulp.src(`${lib}/${name}-min.js`)
    .pipe(gulp.dest(dist));
});

// Copy the map to dist:
gulp.task('copymap', function() {
  return gulp.src(`${lib}/${name}.js.map`)
    .pipe(concat(`${name}.js.map`))
    .pipe(gulp.dest(dist));
});

// -- Gulp Public Tasks
gulp.task('copyproject', function(callback) {
  runSequence('uglify', ['copylib', 'copymap'], callback);
});
