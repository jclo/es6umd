/* global describe, it */
import {expect} from 'chai';
import UMDLib from '../index.js';

describe('UMDLib', function() {
  var umdlib = new UMDLib();

  // Test the first 'method'.
  describe('The method getArray():', function() {
    it ('Expects to return an array.', function() {
      expect(umdlib.getArray()).to.be.a('array');
    });
  });

  // Test the second 'method'.
  describe('The method getString():', function() {
    it ('Expects to return a string.', function() {
      expect(umdlib.getString()).to.be.a('string');
    });
  });

});
