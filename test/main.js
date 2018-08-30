/* global describe, it */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { expect } from 'chai';
import ES6UMD from '../index';

describe('ES6UMD', () => {
  const lib = new ES6UMD();

  // Test the first 'method'.
  describe('The method getArray():', () => {
    it('Expects the method to return an array.', () => {
      expect(lib.getArray()).to.be.a('array');
    });
  });

  // Test the second 'method'.
  describe('The method getString():', () => {
    it('Expects the method to return a string.', () => {
      expect(lib.getString()).to.be.a('string');
    });
  });
});
