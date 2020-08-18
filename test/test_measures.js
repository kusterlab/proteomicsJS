
const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const measures = require('../measures.js');

chai.use(chaiAlmost(0.0001));
const { expect } = chai;

describe('measures', () => {
  describe('measure', () => {
    describe('binary spectra search', () => {
      let spectrum_exp;
      let spectrum_predicted;
      beforeEach(() => {
        spectrum_exp = [{ mz: 1019.74, intensity: 1000 },
          { mz: 326.1, intensity: 122095.0 },
          { mz: 326.12, intensity: 111771.0 },
          { mz: 351.1, intensity: 60817.0 },
          { mz: 354.1, intensity: 9004638.0 },
          { mz: 358.3, intensity: 69098.0 },
          { mz: 361.3, intensity: 96982.0 },
          { mz: 368.0, intensity: 80302.0 }];
      });
      it('getClosestValue_other_direction', () => {
        ary1 = [165800, 3224000, 2606000, 1684000, 1258000, 1115000, 763200, 1577000, 588700, 1186000, 460400, 1557000, 168300, 3213000, 224200, 5648000, 128700, 3801000, 4174000, 1244000, 1086000];

        ary2 = [0.068374617497934, 0.62503071184472, 0.40168133389918, 0.37320866185701, 0.21313908556878, 0.23850818610261, 0.13584128118648, 0.33811284090148, 0.078388912465659, 0.24258169350696, 0.041877387147931, 0.32723693909004, 0.025520761207031, 0.5663320006254, 0.018399410332581, 1, 0.011458589265373, 0.66078488307163, 0.69608116861361, 0.18514551830426, 0.15382111188046];

        beta_hat = measures.regressionThroughZero(ary1, ary2);

        expect(1.002027).to.be.almost(beta_hat);
      });
    });
  });
});
