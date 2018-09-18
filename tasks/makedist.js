/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0,
  semi-style: 0 */

// -- Node modules
const del         = require('del')
    , gulp        = require('gulp')
    , concat      = require('gulp-concat')
    , header      = require('gulp-header')
    , replace     = require('gulp-replace')
    , runSequence = require('run-sequence')
    , uglify      = require('gulp-uglify')
    ;

// -- Local modules
const config = require('./config')
    , pack   = require('../package.json')
    ;

// -- Local constants
const { dist }     = config
    , { libdir }   = config
    // , { libname }  = config
    // , { noparent } = config
    , { name }         = pack
    , { license }  = config
    ;

// -- Local variables


// -- Gulp Tasks

// Remove previous dist:
gulp.task('deldist', function() {
  return del.sync(dist);
});

// Copy README and LICENSE:
gulp.task('skeleton', function() {
  return gulp.src(['README.md', 'LICENSE.md'])
    .pipe(gulp.dest(dist));
});

// Copy the development version:
gulp.task('copydev', function() {
  return gulp.src(`${libdir}/${name}.js`)
    .pipe(header(license))
    .pipe(replace('{{lib:name}}', `${name}`))
    .pipe(replace('{{lib:version}}', pack.version))
    .pipe(replace('{{lib:description}}', pack.description))
    .pipe(replace('{{lib:author}}', pack.author.name))
    .pipe(replace('{{lib:email}}', pack.author.email))
    .pipe(replace('{{lib:url}}', pack.author.url))
    .pipe(gulp.dest(dist));
});

// Copy the development version:
gulp.task('copymap', function() {
  return gulp.src(`${libdir}/${name}.js.map`)
    .pipe(gulp.dest(dist));
});

// Create the minified version:
gulp.task('makeminified', function() {
  return gulp.src(`${libdir}/${name}.js`)
    .pipe(uglify())
    .pipe(header(license))
    .pipe(replace('{{lib:name}}', `${name}`))
    .pipe(replace('{{lib:version}}', pack.version))
    .pipe(replace('{{lib:description}}', pack.description))
    .pipe(replace('{{lib:author}}', pack.author.name))
    .pipe(replace('{{lib:email}}', pack.author.email))
    .pipe(replace('{{lib:url}}', pack.author.url))
    .pipe(concat(`${name}.min.js`))
    .pipe(gulp.dest(dist));
});


// -- Gulp Main Task:
gulp.task('builddist', function(callback) {
  runSequence(
    'deldist',
    ['skeleton', 'copydev', 'copymap', 'makeminified'],
    callback,
  );
});
