compare = require('../measures.js');
const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');

chai.use(chaiAlmost()); // tolerance of 10^-6
// chai.use(chaiAlmost(0.0001));

const { expect } = chai;

describe('Similarities', () => {
  let spectrum_exp;
  let spectrum_predicted;
  let comparison;
  let complex_comparison;
  beforeEach(() => {
    spectrum_exp = [{ mz: 1019.74, intensity: 1000 },
      { mz: 326.1, intensity: 122095.0 },
      { mz: 326.12, intensity: 111771.0 },
      { mz: 351.1, intensity: 60817.0 },
      { mz: 354.1, intensity: 9004638.0 },
      { mz: 358.3, intensity: 69098.0 },
      { mz: 361.3, intensity: 96982.0 },
      { mz: 368.0, intensity: 80302.0 }];

    spectrum_predicted = Object.assign([], spectrum_exp);
    spectrum_predicted.push({ mz: 326.1111, intensity: 12 });
    spectrum_predicted.push({ mz: 1326.1111, intensity: 17 });
    spectrum_exp.push({ mz: 326.111, intensity: 13 });
    comparison = spectrum_exp.reduce((prev, next) => {
      prev.intensity_1.push(next.intensity);
      prev.intensity_2.push(next.intensity);
      return prev;
    }, { intensity_1: [], intensity_2: [] });

    let predInt = [0.061676815, 0.0, 0.0, 0.0, 0.0, 0.0, 0.059971936, 0.0, 0.0, 0.16496861, 0.0, 0.0, 0.116641514, 0.0, 0.0, 0.09471084, 0.0, 0.0, 0.13723746, 0.0, 0.0, 0.08254829, 0.005120869, 0.0, 0.118453555, 0.0, 0.0, 0.051641595, 0.0089475745, 0.0, 1.0, 0.33541074, 0.0, 0.13125512, 0.026044667, 0.0, 0.05482724, 0.012259874, 0.0, 0.51089317, 0.07472019, 0.0, 0.0056412136, 0.0, 0.0, 0.076914944, 0.008754277, 2.7190367E-4, 0.0, 0.0, 0.0, 0.0, 0.0, 2.5633117E-4, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0];
    predInt = [1, 2, 3];

    let measInt = [0.42158616468694216, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1764362644488344, 0.0, 0.0, 0.11323422187370705, 0.0, 0.0, 0.10856733524727794, 0.0, 0.0, 0.09958399828261519, 0.0, 0.0, 0.0, 0.0, 0.0, 0.11501018245566962, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.41840225145890175, 0.0, 0.09864587596245396, 0.0841908015739343, 0.0, 0.0, 0.0, 0.0, 0.4906744600715831, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0];

    measInt = [1, 2, 4];

    complex_comparison = predInt.reduce((prev, next, currentIndex) => {
      prev.intensity_1.push(predInt[currentIndex]);
      prev.intensity_2.push(measInt[currentIndex]);
      return prev;
    }, { intensity_1: [], intensity_2: [] });
  });
  /* predInt =c( 1, 2, 3)
	 * measInt = c(1,2,4)
	 *
	 * norm_pred = norm(predInt, "2")
	 * norm_pred
	 * norm_int = norm(measInt, "2")
	 * a = predInt / norm_pred
	 * b = measInt / norm_int
	 *
	 * dot =  sum(b*a)
	 * sa = 1 - 2 * acos(dot) / pi
	 * cor(measInt,predInt)
	 */
  describe('pearson_distance', () => {
    it('should return 1 when spectrum is the same', () => {
      const compf = compare.ipsa_helper.comparison.pearson_correlation;
      expect(1).to.be.almost(compf(comparison.intensity_1, comparison.intensity_2));
    });
    it('should return 0 when spectrum is not the same', () => {
      // R cor(c(1,0,0), c(0,0,1))
      const compf = compare.ipsa_helper.comparison.pearson_correlation;
	    const spec1 = [0, 0, 1];
	    const spec2 = [1, 0, 0];
      expect(-0.5).to.be.almost(compf(spec1, spec2));
    });

    it('show special problem', () => {
      const compf = compare.ipsa_helper.comparison.pearson_correlation;
      expect(0.9819805).to.be.almost(compf(complex_comparison.intensity_1, complex_comparison.intensity_2));
    });
  });
  describe('sa distance', () => {
    it('should return 1 when spectrum is the same', () => {
      const compf = compare.ipsa_helper.comparison.spectral_angle;
      expect(1).to.be.almost(compf(comparison.intensity_1, comparison.intensity_2));
    });
    it('show special problem', () => {
      const compf = compare.ipsa_helper.comparison.spectral_angle;
      expect(0.9167412).to.be.almost(compf(complex_comparison.intensity_1, complex_comparison.intensity_2));
    });
  });
  describe('dot product', () => {
    it('should return 1 when spectrum is the same', () => {
      const compf = compare.ipsa_helper.comparison.dot_product;
      expect(1).to.be.almost(compf(comparison.intensity_1, comparison.intensity_2));
    });
    it('show special problem', () => {
      const compf = compare.ipsa_helper.comparison.dot_product;
      expect(0.9914601).to.be.almost(compf(complex_comparison.intensity_1, complex_comparison.intensity_2));
    });
  });
});
