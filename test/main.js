/* global describe, it */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { expect } from 'chai';
import UMDLib from '../index';

describe('UMDLib', () => {
  const umdlib = new UMDLib();

  // Test the first 'method'.
  describe('The method getArray():', () => {
    it('Expects the method to return an array.', () => {
      expect(umdlib.getArray()).to.be.a('array');
    });
  });

  // Test the second 'method'.
  describe('The method getString():', () => {
    it('Expects the method to return a string.', () => {
      expect(umdlib.getString()).to.be.a('string');
    });
  });
});
