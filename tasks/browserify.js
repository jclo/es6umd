/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0,
  max-len: [1, 130, 0], semi-style: 0 */

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
const { libdir }                     = config
    , { name }                       = config
    , { release }                    = config
    , { browserify: { app } }        = config
    , { browserify: { debug } }      = config
    , { browserify: { exportname } } = config
    , { babel }                      = config
    ;


// -- Local variables


// -- Gulp Private Tasks

// Remove previous versions:
gulp.task('removelib', function() {
  del.sync([libdir]);
});

// Browserify:
gulp.task('browserify-int', function() {
  // Set up the browserify instance.
  const b = browserify({ entries: app, debug, standalone: exportname })
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
    .pipe(gulp.dest(libdir));
});

// Watchify:
gulp.task('watchify-int', function() {
  const b = browserify({
    entries: app,
    debug,
    standalone: exportname,
    cache: {},
    packageCache: {},
    plugin: [watchify],
  }).transform(babelify, { presets: babel.presets, plugins: babel.plugins });

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
      .pipe(gulp.dest(libdir));
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
