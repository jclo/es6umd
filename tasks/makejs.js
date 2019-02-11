/* eslint  one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */


// -- Node modules
const { dest, series } = require('gulp')
    , babelify     = require('babelify')
    , browserify   = require('browserify')
    , del          = require('del')
    , sourcemaps   = require('gulp-sourcemaps')
    , gutil        = require('gulp-util')
    , buffer       = require('vinyl-buffer')
    , sourcestream = require('vinyl-source-stream')
    , watchify     = require('watchify')
    ;


// -- Local modules
const config = require('./config')
   ;


// -- Local constants
const destination  = config.libdir
    , lib          = config.libname
    , name         = lib.replace(/\s+/g, '').toLowerCase()
    , { browserify: { app } }        = config
    , { browserify: { debug } }      = config
    , { browserify: { exportname } } = config
    ;


// -- Local variables


// -- Gulp Private Tasks

// Removes the previous version.
function clean(done) {
  del.sync(destination);
  done();
}

// Browserify:
function build() {
  // Set up the browserify instance.
  const b = browserify({ entries: app, debug, standalone: exportname })
    .transform(babelify)
    ;

  return b.bundle()
    // Log errors if they happen.
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(sourcestream(`${name}.js`))
    // Optionnal, remove if you don't want sourcemaps.
    .pipe(buffer())
    // Load map from browserify file.
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Write .map file.
    .pipe(sourcemaps.write('./'))
    .pipe(dest(destination));
}

// Watchify:
function watch(done) {
  const b = browserify({
    entries: app,
    debug,
    standalone: exportname,
    cache: {},
    packageCache: {},
    plugin: [watchify],
  }).transform(babelify);

  function rebuild() {
    b.bundle()
      // Log errors if they happen.
      .on('error', gutil.log)
      .pipe(sourcestream(`${name}.js`))
      // Optionnal, remove if you don't want sourcemaps.
      .pipe(buffer())
      // Load map from browserify file.
      .pipe(sourcemaps.init({ loadMaps: true }))
      // Write .map file.
      .pipe(sourcemaps.write('./'))
      // Write stream to destination path.
      .pipe(dest(destination));
  }

  // On any update, run the bundler and output build logs to the terminal.
  b.on('update', build);
  b.on('log', gutil.log);

  rebuild();
  done();
}


// -- Gulp Public Task(s)
exports.watchify = series(watch);
exports.browserify = series(clean, build);
