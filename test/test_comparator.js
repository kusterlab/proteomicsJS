const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const _ = require('lodash');
// const annotate = require('../annotate');
const AnnotationTransformer = require('../Comparator');

chai.use(chaiAlmost()); // tolerance of 10^-6
chai.use(chaiAlmost(0.00001));
const { expect } = chai;

describe('Comparator', () => {
  let spectrum_1 = {};
  let spectrum_2 = {};
  let spectrum_3 = {};
  let spectrum_4 = {};
  beforeEach(() => {
    spectrum_1 = [{ mz: 1019.74, intensity: 1000 },
      { mz: 326.1, intensity: 122095.0 },
      { mz: 326.12, intensity: 111771.0 },
      { mz: 351.1, intensity: 60817.0 },
      { mz: 354.1, intensity: 9004638.0 },
      { mz: 358.3, intensity: 69098.0 },
      { mz: 361.3, intensity: 96982.0 },
      { mz: 368.0, intensity: 80302.0 }];

    spectrum_2 = [{ mz: 1019.74, intensity: 1000 },
      { mz: 326.1, intensity: 122095.0 },
      { mz: 326.12, intensity: 111771.0 },
      { mz: 351.1, intensity: 60817.0 },
      { mz: 354.1, intensity: 9004638.0 },
      { mz: 358.3, intensity: 69098.0 },
      { mz: 361.3, intensity: 96982.0 },
      { mz: 368.0, intensity: 80302.0 }];

    spectrum_3 = [{ mz: 1019.74, intensity: 1000 },
      { mz: 326.1, intensity: 122095.0 },
      { mz: 326.12, intensity: 111771.0 },
      { mz: 354.1, intensity: 9004638.0 }];

    spectrum_4 = [{ mz: 1019.74, intensity: 1000 }];
  });
  /*
	    it('scores', () => {
		    let comparatator = new Comparator(spectrum_1, spectrum_2);
		    const scores = comparatator.calculate_scores();
		    const scores_exp = {
			    "full": {
			    "sa" : 1,
			    "corr" : 1
		    },
			    "spec1": {
			    "sa" : 1,
			    "corr" : 1
		    },
			    "spec2": {
			    "sa" : 1,
			    "corr" : 1
		    },
		    };
	      expect(scores).to.almost.eql(scores_exp);
	    }); */
	    it('scores2', () => {
		    const comparatator = new Comparator(spectrum_4, spectrum_3);
		    const scores = comparatator.calculate_scores();
		    const scores_exp = {
			    full: {
			    sa: 0.0000706871,
			    corr: 0.3275740,
		    },
			    spec1: {
			    sa: 1,
			    corr: 1,
		    },
			    spec2: {
			    sa: 0.0000706871,
			    corr: 0.3275740,
		    },
		    };
	      expect(scores).to.almost.eql(scores_exp);
	    });
});
