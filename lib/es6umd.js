/* eslint no-console: 1 */
import lib from './lib';

class ES6umd {

  constructor() {
    console.log('Constructor initialized...');
  }

  getArray() {
    return lib.array();
  }

  getString() {
    return lib.string();
  }
}

export default ES6umd;
