/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0,
  max-len: [1, 130, 0] */
/* eslint strict: 0 */

'use strict';

// -- Node modules
const babelify     = require('babelify')
    , browserify   = require('browserify')
    , del          = require('del')
    , gulp         = require('gulp')
    , replace      = require('gulp-replace')
    , sourcemaps   = require('gulp-sourcemaps')
    , gutil        = require('gulp-util')
    , runSequence  = require('run-sequence')
    , buffer       = require('vinyl-buffer')
    , sourcestream = require('vinyl-source-stream')
    , watchify     = require('watchify')
    ;

// -- Local modules
const config = require('./config')
  ;

// -- Local constants
const srcfile    = config.srcfile
    , babel      = config.babel
    , debug      = config.debug
    , exportname = config.exportname
    , name       = config.name
    , release    = config.release
    , lib        = config.lib
    ;


// -- Local variables


// -- Gulp Private Tasks

// Remove previous versions:
gulp.task('removelib', function() {
  del.sync([lib]);
});

// Browserify:
// process.env.BROWSERIFYSWAP_ENV = 'dist';
// process.env.NODE_ENV = 'production';
// Browserify:
gulp.task('browserify-int', function() {
  // Set up the browserify instance.
  const b = browserify({ entries: srcfile, debug, standalone: exportname })
              .transform(babelify, { presets: babel.presets, plugins: babel.plugins });

  return b.bundle()
    // Log errors if they happen.
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(sourcestream(`${name}.js`))
    // Optionnal, remove if you don't want sourcemaps.
    .pipe(buffer())
    // Load map from browserify file.
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here.
    .pipe(replace('{{lib:version}}', release))
    // Write .map file.
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(lib))
    ;
});

// Watchify:
gulp.task('watchify-int', function() {
  // Set up the browserify instance:
  // process.env.BROWSERIFYSWAP_ENV = 'dist';
  // process.env.NODE_ENV = 'production';
  const b = browserify({ entries: srcfile, debug, standalone: exportname, cache: {}, packageCache: {}, plugin: [watchify] })
              .transform(babelify, { presets: babel.presets, plugins: babel.plugins });

  function build() {
    b.bundle()
      // Log errors if they happen.
      .on('error', gutil.log)
      .pipe(sourcestream(`${name}.js`))
      // Optionnal, remove if you don't want sourcemaps.
      .pipe(buffer())
      // Load map from browserify file.
      .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      .pipe(replace('{{lib:version}}', release))
      // Write .map file.
      .pipe(sourcemaps.write('./'))
      // Write stream to destination path.
      .pipe(gulp.dest(lib))
      ;
  }

  // On any update, run the bundler and output build logs to the terminal.
  b.on('update', build);
  b.on('log', gutil.log);

  return build();
});


// -- Gulp Public Tasks

// Build ES5 Library:
gulp.task('browserify', function(callback) {
  runSequence('removelib', 'browserify-int', callback);
});

gulp.task('watchify', function(callback) {
  runSequence('watchify-int', callback);
});
