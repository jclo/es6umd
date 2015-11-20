#!/usr/bin/env node
/* ****************************************************************************
 * es6umd.js creates the skeleton for writing a micro UMD Javascript library.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr)
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
/* eslint curly: 0, no-console: 0, max-len: [1, 110, 2] */
'use strict';

// -- Node modules
var fs      = require('fs')
  , nopt    = require('nopt')
  , path    = require('path')
  ;

// -- Global variables
var baseapp        = process.cwd()
  , baselib        = __dirname.replace('/bin', '')
  , version        = require('../package.json').version
  , lib            = 'lib'
  , test           = 'test'
    // Command line Options
  , opts = {
    help:       [Boolean, false],
    version:    [String, null],
    collection: [Boolean, false],
    path:       path,
    name:       [String, null]
  }
  , shortOpts = {
    h: ['--help'],
    v: ['--version', version],
    c: ['--collection'],
    p: ['--path'],
    n: ['--name']
  }
  , parsed = nopt(opts, shortOpts, process.argv, 2)
  ;

// -- Templates
var readme = [
  '# MyApp',
  ' ',
  'Bla bla ...',
  ' ',
  '## License',
  ' ',
  'MIT.',
  ''].join('\n');

var license = [
  'The MIT License (MIT)',
  '',
  'Copyright (c) 2015 John Doe <jdo@johndoe.com> (http://www.johndoe.com)',
  '',
  'Permission is hereby granted, free of charge, to any person obtaining a copy',
  'of this software and associated documentation files (the "Software"), to deal',
  'in the Software without restriction, including without limitation the rights',
  'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
  'copies of the Software, and to permit persons to whom the Software is',
  'furnished to do so, subject to the following conditions:',
  '',
  'The above copyright notice and this permission notice shall be included in',
  'all copies or substantial portions of the Software.',
  '',
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
  'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
  'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
  'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
  'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
  'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN',
  'THE SOFTWARE.',
  ''].join('\n');

var changelog = [
  '### HEAD',
  '',
  '',
  '### 0.1.0 (Month Day, Year)',
  '',
  '  * Initial build.',
  ''].join('\n');


// -- Private functions
// -- Private functions

/**
 * Removes the cached files and returns the array.
 *
 * @function (arg1)
 * @private
 * @param {Array}     an array of files,
 * @returns {Array}   returns the filtered array,
 */
function _filter(files) {
  var filtered
    , i
    ;

  filtered = [];
  for (i = 0; i < files.length; i++)
    if (files[i].match(/^\./) === null)
      filtered.push(files[i]);

  return filtered;
}

/**
 * Copies source file to destination.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the source file,
 * @param {String}    the destination file,
 * @returns {}        -,
 */
function _copyFile(source, dest) {
  fs.createReadStream(source).pipe(fs.createWriteStream(dest));
}

/**
 * Removes UMDLib dependencies to package.json
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}    the root path of UMDLib,
 * @param {String}    the root path of UMD library,
 * @param {String}    the name of the UMD library,
 * @returns {}        -,
 */
function _customizeApp(baseumdlib, baseapp, appname) {
  var npm   = 'package.json'
    , json
    , obj
    ;

  // Rework package.json
  json = fs.readFileSync(path.join(baseumdlib, npm), 'utf8', function (error) {
    if (error)
      throw error;
  });

  obj = JSON.parse(json);
  obj.name = appname.toLowerCase();
  obj.version = '0.0.0';
  obj.description = appname + ' ...';
  obj.main = '_dist/' + appname.toLowerCase() + '.js';
  obj.repository.url = 'https://github.com/author/libname.git';
  obj.keywords = ['to be filled'];
  obj.author = 'John Doe <jdo@johndoe.com> (http://www.johndoe.com)';
  obj.bugs.url = 'https://github.com/author/libname/issues';
  obj.homepage = 'https://github.com/author/libname';
  delete obj.devDependencies.bin;
  delete obj.devDependencies.nopt;
  delete obj.devDependencies.path;

  console.log('  ' + npm);
  fs.writeFileSync(path.join(baseapp, npm), JSON.stringify(obj, null, 2));

}

/**
 * Recursively copies source to destination.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the source folder/file,
 * @param {String}    the destination folder/file,
 * @returns {}        -,
 */
function _copyRecursiveSync(source, dest) {
  var files
    , i
    ;

  if (fs.statSync(source).isDirectory()) {
    fs.mkdirSync(dest);
    files = _filter(fs.readdirSync(source));
    for (i = 0; i < files.length; i++) {
      if (fs.statSync(source + '/' + files[i]).isDirectory()) {
        console.log('  ' + 'Add folder: ' + files[i]);
        _copyRecursiveSync(source + '/' + files[i], dest + '/' + files[i]);
      } else {
        console.log('  ' + 'Add file: ' + files[i]);
        _copyFile(source + '/' + files[i], dest + '/' + files[i]);
      }
    }
  } else {
    _copyFile(source, dest);
  }
}

/**
 * Displays help message.
 *
 * @function ()
 * @private
 */
function _help() {

  var message = ['',
    'Usage: command [options]',
    '',
    'populate            populate the app',
    '',
    'Options:',
    '',
    '-h, --help          output usage information',
    '-v, --version       output the version number',
    '-n, --name          the name of the app',
    ''
  ].join('\n');

  console.log(message);
  process.exit(0);
}

/**
 * Creates and populates the web app.
 *
 * @function (arg1)
 * @private
 * @param {Object}    the command line options,
 * @returns {}        -,
 */
function _populate(opts) {
  var app = opts.name || 'myApp'
    , files
    ;

  // Check that the folder app is empty.
  console.log('Checks that the folder app is empty...');
  files = _filter(fs.readdirSync(baseapp));
  if (files.length > 1 || (files[0] !== undefined && files[0] !== 'node_modules')) {
    console.log('This folder already contains files and/or folders. Clean it up first! Process aborted...');
    process.exit(1);
  }

  // Ok. Populate it.
  console.log('Populates the folder with:');

  // Create README.md, LICENSE.md, CHANGELOG.md
  console.log('  ' + 'README.md');
  fs.writeFileSync(path.join(baseapp, 'README.md'), readme);
  console.log('  ' + 'LICENSE.md');
  fs.writeFileSync(path.join(baseapp, 'LICENSE.md'), license);
  console.log('  ' + 'CHANGELOG.md');
  fs.writeFileSync(path.join(baseapp, 'CHANGELOG.md'), changelog);

  // Add index.js, .eslintrc, .gitignore, .travis.yml and gulfile.js
  console.log('  ' + 'index.js');
  _copyFile(path.join(baselib, 'index.js'), path.join(baseapp, 'index.js'));
  console.log('  ' + '.eslintrc');
  _copyFile(path.join(baselib, '.eslintrc'), path.join(baseapp, '.eslintrc'));
  console.log('  ' + '.gitignore');
  _copyFile(path.join(baselib, '.gitignore'), path.join(baseapp, '.gitignore'));
  console.log('  ' + '.travis.yml');
  _copyFile(path.join(baselib, '.travis.yml'), path.join(baseapp, '.travis.yml'));
  console.log('  ' + 'gulpfile.js');
  _copyFile(path.join(baselib, 'gulpfile.js'), path.join(baseapp, 'gulpfile.js'));

  // Add the package.json and remove ES6UMD dependencies.
  _customizeApp(baselib, baseapp, app);

  // Create and fill lib and test folders.
  console.log('Fills the UMD lib skeleton:');
  _copyRecursiveSync(path.join(baselib, lib), path.join(baseapp, lib));
  _copyRecursiveSync(path.join(baselib, test), path.join(baseapp, test));
  console.log('Done. Enjoy!');

}


// -- Main
if (parsed.help)
  _help();

if (parsed.version) {
  console.log('es6umd version: ' + parsed.version);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'populate')
  _populate(parsed);

else
  _help();
