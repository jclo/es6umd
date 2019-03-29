/** ****************************************************************************
 * ES6UMD v0.7.1
 *
 * A template for writing micro ES6 Javascript libraries.
 * (you can download it from npm or github repositories)
 * Copyright (c) 2019 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr/).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 * ************************************************************************** */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ES6UMD = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = _interopRequireDefault(require("./src/main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _main.default;
exports.default = _default;
module.exports = exports.default;

},{"./src/main":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/** ****************************************************************************
 *
 * This library ...
 *
 * Private Methods:
 *
 *  . ...                    ...,
 *
 * Public Methods:
 *
 *  . ...                    ...,
 *
 * @namespace lib
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
var lib = {
  /**
   * Returns an array.
   *
   * @method ()
   * @public
   * @param {}          -,
   * @returns {Array}   returns an array,
   * @since 0.0.0
   */
  array: function array() {
    return [1, 2, 3];
  },

  /**
   * Returns a string.
   *
   * @method ()
   * @public
   * @param {}          -,
   * @returns {String}  returns a string,
   * @since 0.0.0
   */
  string: function string() {
    return 'I am a string!';
  }
};
var _default = lib;
exports.default = _default;
module.exports = exports.default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lib = _interopRequireDefault(require("./lib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ES6UMD =
/*#__PURE__*/
function () {
  /**
   * Initializes ...
   *
   * @constructor ()
   * @public
   * @param {}          -,
   */
  function ES6UMD() {
    _classCallCheck(this, ES6UMD);
  } // Stuff here.

  /**
   * Returns an array.
   *
   * @method ()
   * @public
   * @param {}          -,
   * @returns {Array}   returns an array,
   * @since 0.0.1
   */


  _createClass(ES6UMD, [{
    key: "getArray",
    value: function getArray() {
      return _lib.default.array();
    }
    /**
     * Returns a string.
     *
     * @method ()
     * @public
     * @param {}          -,
     * @returns {String}  returns a string,
     * @since 0.0.1
     */

  }, {
    key: "getString",
    value: function getString() {
      return _lib.default.string();
    }
  }]);

  return ES6UMD;
}();

var _default = ES6UMD;
exports.default = _default;
module.exports = exports.default;

},{"./lib":2}]},{},[1])(1)
});

//# sourceMappingURL=es6umd.js.map
