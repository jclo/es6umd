#!/usr/bin/env node
/* ****************************************************************************
 * es6umd.js creates the skeleton for writing a micro UMD Javascript library.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr)
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
/* eslint one-var: 0, object-shorthand: 0, no-console: 0, max-len: [1, 110, 2] */
/* eslint strict: 0 */

'use strict';

// -- Node modules
const fs      = require('fs')
    , nopt    = require('nopt')
    , path    = require('path')
    ;

// -- Global variables
const baseapp   = process.cwd()
    , baselib   = __dirname.replace('/bin', '')
    , version   = require('../package.json').version
    , src       = 'src'
    , test      = 'test'
    , gulptasks = 'tasks'
    // Command line Options
  , opts = {
    help: [Boolean, false],
    version: [String, null],
    collection: [Boolean, false],
    path: path,
    name: [String, null],
  }
  , shortOpts = {
    h: ['--help'],
    v: ['--version', version],
    c: ['--collection'],
    p: ['--path'],
    n: ['--name'],
  }
  , parsed = nopt(opts, shortOpts, process.argv, 2)
  ;

// -- Templates
const readme = [
  '# MyApp',
  ' ',
  'Bla bla ...',
  ' ',
  '## License',
  ' ',
  'MIT.',
  ''].join('\n');

const license = [
  'The MIT License (MIT)',
  '',
  'Copyright (c) 2017 John Doe <jdo@johndoe.com> (http://www.johndoe.com)',
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

const changelog = [
  '### HEAD',
  '',
  '',
  '### 0.1.0 (Month Day, Year)',
  '',
  '  * Initial build.',
  ''].join('\n');


// -- Private functions --------------------------------------------------------
/* eslint-disable no-underscore-dangle */

/**
 * Removes the cached files and returns the array.
 *
 * @function (arg1)
 * @private
 * @param {Array}     an array of files,
 * @returns {Array}   returns the filtered array,
 */
function _filter(files) {
  const filtered = [];

  for (let i = 0; i < files.length; i++) {
    if (files[i].match(/^\./) === null) {
      filtered.push(files[i]);
    }
  }
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
function _customizeApp(baseumdlib, baseApp, appname) {
  const npm   = 'package.json';

  // Rework package.json
  const json = fs.readFileSync(path.join(baseumdlib, npm), 'utf8', (error) => {
    if (error) {
      throw error;
    }
  });

  const obj = JSON.parse(json);
  const pack = {};
  pack.name = appname.toLowerCase();
  pack.version = '0.0.0';
  pack.description = `${appname} ...`;
  pack.main = obj.main;
  pack.scripts = obj.scripts;
  pack.repository = obj.repository;
  pack.repository.url = 'https://github.com/author/libname.git';
  pack.keywwords = ['to be filled!'];
  pack.author = obj.author;
  pack.author.name = 'John Doe';
  pack.author.email = 'jdo@johndoe.com';
  pack.author.url = 'http://www.johndoe.com';
  pack.license = obj.license;
  pack.bugs = obj.bugs;
  pack.bugs.url = 'https://github.com/author/libname/issues';
  pack.homepage = 'https://github.com/author/libname';
  pack.dependencies = obj.dependencies;
  delete obj.dependencies.nopt;
  delete obj.dependencies.path;
  pack.devDependencies = obj.devDependencies;
  pack.browser = obj.browser;
  pack['browserify-shim'] = obj['browserify-shim'];
  pack['browserify-swap'] = obj['browserify-swap'];
  pack.browserify = obj.browserify;
  pack.engines = obj.engines;

  console.log(`  ${npm}`);
  fs.writeFileSync(path.join(baseApp, npm), JSON.stringify(obj, null, 2));
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
  if (fs.statSync(source).isDirectory()) {
    fs.mkdirSync(dest);
    const files = _filter(fs.readdirSync(source));
    for (let i = 0; i < files.length; i++) {
      if (fs.statSync(`${source}/${files[i]}`).isDirectory()) {
        console.log(`  Add folder: ${files[i]}`);
        _copyRecursiveSync(`${source}/${files[i]}`, `${dest}/${files[i]}`);
      } else {
        // console.log('  ' + 'Add file: ' + files[i]);
        console.log(`  Add folder: ${files[i]}`);
        _copyFile(`${source}/${files[i]}`, `${dest}/${files[i]}`);
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
  const message = ['',
    'Usage: command [options]',
    '',
    'populate            populate the app',
    '',
    'Options:',
    '',
    '-h, --help          output usage information',
    '-v, --version       output the version number',
    '-n, --name          the name of the app',
    '',
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
function _populate(options) {
  const app = options.name || 'myApp';

  // Check that the folder app is empty.
  console.log('Checks that the folder app is empty...');
  const files = _filter(fs.readdirSync(baseapp));
  if (files.length > 1 || (files[0] !== undefined && files[0] !== 'node_modules')) {
    console.log('This folder already contains files and/or folders. Clean it up first! Process aborted...');
    process.exit(1);
  }

  // Ok. Populate it.
  console.log('Populates the folder with:');

  // Create README.md, LICENSE.md, CHANGELOG.md
  console.log('  README.md');
  fs.writeFileSync(path.join(baseapp, 'README.md'), readme);
  console.log('  LICENSE.md');
  fs.writeFileSync(path.join(baseapp, 'LICENSE.md'), license);
  console.log('  CHANGELOG.md');
  fs.writeFileSync(path.join(baseapp, 'CHANGELOG.md'), changelog);

  // Add index.js, .eslintrc, .gitignore, .travis.yml, .babelrc and gulfile.js
  console.log('  index.js');
  _copyFile(path.join(baselib, 'index.js'), path.join(baseapp, 'index.js'));
  console.log('  .eslintrc');
  _copyFile(path.join(baselib, '.eslintrc'), path.join(baseapp, '.eslintrc'));
  console.log('  .gitignore');
  // _copyFile(path.join(baselib, '.gitignore'), path.join(baseapp, '.gitignore'));
  fs.closeSync(fs.openSync('.gitignore', 'w'));
  console.log('  .travis.yml');
  _copyFile(path.join(baselib, '.travis.yml'), path.join(baseapp, '.travis.yml'));
  console.log('  .babelrc');
  _copyFile(path.join(baselib, '.babelrc'), path.join(baseapp, '.babelrc'));
  // copy gulfile.js and gulp tasks:
  console.log('  gulpfile.js & gulp tasks');
  _copyFile(path.join(baselib, 'gulpfile.js'), path.join(baseapp, 'gulpfile.js'));
  _copyRecursiveSync(path.join(baselib, gulptasks), path.join(baseapp, gulptasks));

  // Add the package.json and remove ES6UMD dependencies.
  _customizeApp(baselib, baseapp, app);

  // Create and fill src and test folders.
  console.log('Fills the UMD lib skeleton:');
  _copyRecursiveSync(path.join(baselib, src), path.join(baseapp, src));
  _copyRecursiveSync(path.join(baselib, test), path.join(baseapp, test));
  console.log('Done. Enjoy!');
}


// -- Main
if (parsed.help) {
  _help();
}
if (parsed.version) {
  console.log(`es6umd version: ${parsed.version}`);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'populate') {
  _populate(parsed);
} else {
  _help();
}
