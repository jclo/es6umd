/* ****************************************************************************
 * gulpfile.js is the script to build an ES6 UMD Module.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr/)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ***************************************************************************/
/* eslint-env node */
/* eslint */
'use strict';

// -- Node modules
var browserify = require('browserify')
  , del        = require('del')
  , gulp       = require('gulp')
  , header     = require('gulp-header')
  , replace    = require('gulp-replace')
  , sourcemaps = require('gulp-sourcemaps')
  , gutil      = require('gulp-util')
  , buffer     = require('vinyl-buffer')
  , source     = require('vinyl-source-stream')
  , watchify   = require('watchify')
  ;

// -- Local declarations
var name       = require('./package.json').name.toLowerCase()
  , release    = require('./package.json').version
  , srcfile    = './index.js'
  , dist       = './_dist'
  , exportname = 'UMDLib'	// Name to expose outside the lib.
  , debug      = true
  ;

// License
var license = ['/**',
' * ' + name + ' v' + release,
' *',
' * ' + name + ' is ...',
' * Copyright (c) 2015 John Doe <jdo@johndoe.com> (http://www.johndoe.com).',
' * Released under the MIT license. You may obtain a copy of the License',
' * at: http://www.opensource.org/licenses/mit-license.php).',
' */',
''].join('\n');

// -- Local functions

// -- Gulp Tasks

// Remove the previous '_dist'.
gulp.task('remove', function() {
  del.sync([dist]);
});

// Create './dist' and populate it.
gulp.task('create', ['remove'], function() {
  return gulp.src(['./*.md'])
    .pipe(gulp.dest(dist));
});

// Browserify.
gulp.task('browserify', ['create'], function() {
  var b
    ;

  // Set up the browserify instance.
  b = browserify({ entries: srcfile, debug: debug, standalone: exportname });

  return b.bundle()
    // Log errors if they happen.
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(name + '.js'))
    // Optionnal, remove if you don't want sourcemaps.
    .pipe(buffer())
    // Load map from browserify file.
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here.
    //.pipe(uglify())
    .pipe(header(license))
    .pipe(replace('@#Release#@', release))
    // Write .map file.
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist))
    ;
});

// Watch.
gulp.task('watch', function() {
  var b
    ;

  // Set up the watchify instance.
  b = watchify(browserify(
    {
      entries:    [srcfile],
      debug:      debug,
      standalone: exportname
    },
    watchify.args
  ));

  function build() {
    b.bundle()
      // Log errors if they happen.
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(name + '.js'))
      // Optionnal, remove if you don't want sourcemaps.
      .pipe(buffer())
      // Load map from browserify file.
      .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      //.pipe(uglify())
      .pipe(header(license))
      .pipe(replace('@#Release#@', release))
      // Write .map file.
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dist))
      ;
  }

  // On any update, run the bundler and output build logs to the terminal.
  b.on('update', build);
  b.on('log', gutil.log);

  return build();
});

// The default task (called when you run `gulp` from cli).
gulp.task('default', []);
