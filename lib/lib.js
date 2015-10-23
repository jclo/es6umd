/* eslint */

let lib;

/**
* This library ...
*
* @namespace lib
*/
/* istanbul ignore next */
lib = function() {};

lib = {

/**
 * Returns an array.
 *
 * @method ()
 * @public
 * @param {}          -,
 * @returns {Array}   returns an array,
 * since 0.0.1
 */
  array: function() {
    return [1, 2, 3];
  },

/**
 * Returns a string.
 *
 * @method ()
 * @public
 * @param {}          -,
 * @returns {String}  returns a string,
 * since 0.0.1
 */
  string: function() {
    return 'I am a string!';
  }
};

export default lib;
