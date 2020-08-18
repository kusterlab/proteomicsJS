
const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const _ = require('lodash');
const annotate = require('../annotate');
const binary = require('../binary');


// chai.use(chaiAlmost()); //tolerance of 10^-6
chai.use(chaiAlmost(0.0001));
const { expect } = chai;
//
describe('Generation of variants', () => {
  var sequence = [];
  sequence.push(_.cloneDeep(annotate.aminoAcids.A));
  sequence.push(_.cloneDeep(annotate.aminoAcids.C));
  sequence[1].modifications.push(_.cloneDeep(annotate.modifications[0]));
  sequence.push(_.cloneDeep(annotate.aminoAcids.W));
  sequence.push(_.cloneDeep(annotate.aminoAcids.R));
  before(() => {
    A = [1, 1.5, 3, 4];
    b = [2, 3.3, 2.9, 4.001];
  });
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
  });
it('calculating allowed error', /*()=>{
	 *
	 * delta is in 20 ppm distance?
	 *
	 *
	assert.equal(2, 0);
}*/);
  it('mass correct',/*()=>{
	  /*
	  GQ,185.08004200000002
	  AGG,185.08004200000002
	  assert.equal(1, 0);
  }*/);
  /*
	 * it('mass correct', () => {
	});
	*/
});
