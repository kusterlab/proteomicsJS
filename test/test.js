compare = require('../compare.js');
const assert = require('assert');

describe('Merge strategies', () => {
  describe('binning', () => {
    it('should return 1 when spectrum is the same');
  });
  describe('binary', () => {
    describe('helper', () => {
      it('compare ppm');
    });
    it('show how to binary merge');
  });
  describe('merging strategies', () => {
    it('how to choose between equal and part of');
  });
});

describe('Similarities', () => {
  describe('pearson_distance', () => {
    it('should return 1 when spectrum is the same', () => {
      compf = compare.ipsa_helper.comparison.pearson_correlation;
      a = compare.ipsa_helper.binning(spectrum);
      c = compare.ipsa_helper.aligning(a, a);
      assert.equal(1, compf(c.intensity_1, c.intensity_2));
    });
  });
  describe('sa distance', () => {
    it('should return 1 when spectrum is the same', () => {
      compf = compare.ipsa_helper.comparison.spectral_angle;
      a = compare.ipsa_helper.binning(spectrum);
      c = compare.ipsa_helper.aligning(a, a);
      assert.equal(1, compf(c.intensity_1, c.intensity_2));
    });
  });
  describe('sa distance', () => {
    it('should return 1 when spectrum is the same', () => {
      compf = compare.ipsa_helper.comparison.dot_product;
      a = compare.ipsa_helper.binning(spectrum);
      c = compare.ipsa_helper.aligning(a, a);
      assert.equal(1, compf(c.intensity_1, c.intensity_2));
    });
  });
});

describe('Statistics', () => {
  it('how to extrapolate');
});

describe('Sample generation', () => {
  it('how to generate random samples');
});
