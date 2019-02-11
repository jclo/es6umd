# Guide

ES6UMD is a template for writing micro ES6 Javascript libraries that run both on Node.js and the browser.

ES6UMD uses [Babel](https://babeljs.io) to compile ES6 Javascript code to ES5. It uses [Browserify](http://browserify.org) to bundle all the Javascript files in one Javascript UMD file that can run both on Node.js and the browser.

ES6UMD uses [Gulp](http://gulpjs.com) for the build.

ES6UMD relies on [Mocha](https://mochajs.org) and [Chai](http://chaijs.com) for unitary testing. It relies on [Istanbul](https://gotwarlost.github.io/istanbul/) for code coverage.

ES6UMD uses [Travis CI](https://travis-ci.org) for continuous integration and [Coveralls.io](https://coveralls.io) to display test coverage.


## Quick Startup

You can easily get your first ES6UMD library running in a couple of minutes by just typing a few command lines. But first, you need to create an empty folder. It will contain your library.

Then, you have to install the `es6umd` package globally. Open a terminal session and type the command line:

```
npm install es6umd -g
```

Or, if you don't have the rights to install ES6UMD globally, you can install it locally in your project. Open a terminal session, move to your working directory - the empty folder you created - and type the following command line:

```
npm install es6umd
```

Now populate your empty folder and create your first UMD library with these command lines:

```
// populate (// means a comment and not a command line!)
es6umd populate -n myapp
// Or, if you installed the package locally:
./node_modules/es6umd/bin/es6umd.js populate -n <name of your library>
// Install Node.js packages
npm install
```

Now your project folder contains the following files:

```
Your project Folder
      |_ docs                 // The Gitbook documentation of your project,
      |_ lib
      |   |_ lib.js           // Your lib converted by babel and browserify to an ES5 module,
      |_ src
      |  |_ main.js           // Your ES6 main library,
      |  |_ lib.js            // A second ES6 library,
      |_ tasks
      |   |_ ...              // The Gulp tasks to build your project,
      |_  test
      |     |_ main.js        // Your Mocha, Chai test file,
      |_ .babelrc             // The configuration file for Babel,
      |_ .eslintrc            // A Configuration file for the ESLint linter tool (if you use it),
      |_ .gitignore           // Files that Git must ignore (if you use git),
      |_ .travis.yml          // A configuration file for Travis CI (if you use it),
      |_ .CHANGELOG.md        // The changes between your different versions,
      |_ .gulpfile.js         // The main Gulp task,
      |_ index.js             // The link to your ES6 libraries,
      |_ LICENSE.md           // The license that applies to your library (here MIT),
      |_ package-lock.json    // The NPM dependency tree,
      |_ package.json         // The NPM package file,
      |_ README.md            // Your README file,
```

This project folder is now an NPM package.


### How to build it

Your `package.json` file provides two scripts to build and update your library:

  * `npm run build`,
  * `npm run watch`.

`npm run build` creates a folder `_dist` that contains the Javascript file `<name of your library>.js`. This file is an UMD javascript library that bundles all the es6 files of your project (here index.js, lib/main.js and lib/lib.js).

`npm run watch` updates on the fly `_dist/<name of your library>.js` each time you modify a Javascript file in your project.


## How to test it

Your `package.json` file contains three scripts to test your UMD library:

  * `npm run test`,
  * `npm run check-coverage`,
  * `npm run display-coverage`.

`npm run test` executes the tests and computes the test coverage.

`npm run check-coverage` checks if the test coverage matches the requirements. Here 100%.

`npm run display-coverage` opens your browser and reports the test coverage.


## How to use it

On Node.js, your project folder is viewed as a NPM package (usually, it has the same name as your library). Choose a working directory outside your project folder, create a folder `node_modules` and copy your project folder into `node_modules`. Then, on your terminal, type (at your working directory level):

```
node
> var MyLib = require('<name of your project folder>');
undefined
> var mylib = new MyLib();
undefined
> mylib.getString();
'I am a string!'
> mylib.getArray();
[ 1, 2, 3 ]
>
```

On the browser, pick-up the Javascript file `_dist/<name of your library>.js` and add it as a script in your HTML file. `<name of your library>.js` is an immediately-invoked function expression. It attaches the `UMDLib` variable to the current context.

```
<!DOCTYPE html>
<html>
  <body>
    <script src="<name of your library>.js"></script>
    <script>
      var lib = new <name of your library>();
      lib.getString();
      lib.getArray();
    </script>
  </body>
</html>
```

Enjoy!
