# ES6UMD

[![NPM version][npm-image]][npm-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)
<!--- [![node version][node-image]][node-url] -->

[![NPM install][npm-install-image]][npm-install-url]

ES6UMD is a template for writing micro ES6 Javascript libraries that run both on Node.js and the browser.

ES6UMD uses [Babel](https://babeljs.io) to compile ES6 Javascript code to ES5. It uses [Browserify](http://browserify.org) to bundle all the JS files in one JS UMD file that can run both on Node.js and the browser.

ES6UMD uses [Gulp](http://gulpjs.com) for the build.

ES6UMD relies on [Mocha](https://mochajs.org) and [Chai](http://chaijs.com) for unitary testing. It relies on [Istanbul](https://gotwarlost.github.io/istanbul/) for code coverage.

ES6UMD uses [Travis CI](https://travis-ci.org) for continuous integration and [Coveralls.io](https://coveralls.io) to display test coverage.


## How to build it

Just execute the command `npm run build` to start a build. And `npm run watch` to launch an automatic build each time you modify a JS file. 


## How to test it

`npm run test` executes the tests and computes the test coverage.

`npm run check-coverage` checks if the test coverage matches the requirements. Here 100%.

`npm run display-coverage` opens your browser and reports the test coverage.


## How to use it

On Node.js, install ES6UMD (npm install es6umd) and create a file that contains:

```
var Lib = require('es6umd');

var lib = new Lib();
var a = lib.getArray();
var s = lib.getString();
...
```

On the browser, add the file `node_modules/ES6UMD/_dist/es6umd.js` as a script in your HTML file. `es6umd` is an immediately-invoked function expression. It attaches the `UMDLib` variable to the current context.

```
<!DOCTYPE html>
<html>
  <body>
    <script src="./node_modules/ES6UMD/_dist/es6umd.js"></script>
    <script>
        var lib = new UMDLib();
        lib.getArray();
        lib.getString();
    </script>
  </body>
</html>
```

## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/es6umd.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/es6umd.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/es6umd.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/es6umd.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/es6umd/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/es6umd/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/es6umd/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/es6umd.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/es6umd
[npm-install-url]: https://nodei.co/npm/es6umd
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/es6umd
[travis-url]: https://travis-ci.org/jclo/es6umd
[coveralls-url]: https://coveralls.io/github/jclo/es6umd?branch=master
[dependencies-url]: https://david-dm.org/jclo/es6umd#info=dependencies
[devdependencies-url]: https://david-dm.org/jclo/es6umd#info=devDependencies
[license-url]: http://opensource.org/licenses/MIT
