/* eslint no-console: 1 */

let lib;
/* istanbul ignore next */
lib = function() {};

lib = {
  array: function() {
    console.log('Returns an array...');
    return [1, 2, 3];
  },

  string: function() {
    console.log('Returns a string...');
    return 'I am a string!';
  }
};

export default lib;
