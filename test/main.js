/* global describe, it */
import {expect} from 'chai';
import UMDLib from '../index.js';

describe('UMDLib', function() {
  var umdlib = new UMDLib();

  // Test the first 'method'.
  describe('getArray', function() {
    it ('Should be an array.', function() {
      expect(umdlib.getArray()).to.be.a('array');
    });
  });

  // Test the second 'method'.
  describe('getString', function() {
    it ('Should be a string.', function() {
      expect(umdlib.getString()).to.be.a('string');
    });
  });

});
