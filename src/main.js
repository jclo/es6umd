/* eslint no-useless-constructor: 0, class-methods-use-this: 0 */
import lib from './lib';

/**
* This library ...
*
* @namespace ES6UMD
*/
class ES6umd {

/**
 * Initializes ...
 *
 * @constructor ()
 * @public
 * @param {}          -,
 */
  constructor() {
    // Stuff here.
  }

/**
 * Returns an array.
 *
 * @method ()
 * @public
 * @param {}          -,
 * @returns {Array}   returns an array,
 * since 0.0.1
 */
  getArray() {
    return lib.array();
  }

/**
 * Returns a string.
 *
 * @method ()
 * @public
 * @param {}          -,
 * @returns {String}  returns a string,
 * since 0.0.1
 */
  getString() {
    return lib.string();
  }
}

export default ES6umd;
