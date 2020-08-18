
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
describe('Annotate spectrum', () => {
  const sequence = [];
  sequence.push(annotate.aminoAcids.A);
  sequence.push(_.cloneDeep(annotate.aminoAcids.C));
  sequence.push(_.cloneDeep(annotate.aminoAcids.W));
  sequence.push(_.cloneDeep(annotate.aminoAcids.R));
  before(() => {
    A = [1, 1.5, 3, 4];
    b = [2, 3.3, 2.9, 4.001];
  });
  it('mass correct', () => {
    assert.equal(186.079313, sequence[2].residue_mass);
  });
  it('modified', () => {
    assert.equal(0, sequence[1].modifications.length);
  });
  it('unmodified', () => {
    assert.equal(0, sequence[2].modifications.length);
  });
  describe('lets search and annotate', () => {
    before(() => {
      answer = [
        {
          charge: 1,
          mz: 175.118951150909, // 175.11895115091,
          number: 1,
          sequence: 'R',
          subPeptide: [
            {
              mass: 156.10111,
              modification: {
                site: 13,
                deltaElement: null,
                deltaMass: 0,
              },
              name: 'R',
            },
          ],
          type: 'y',
          neutralLoss: null,
        },
        {
          charge: 1,
          mz: 244.09279412311,
          number: 2,
          sequence: 'AE',
          subPeptide: [
            {
              mass: 71.037114,
              modification: {
                site: 0,
                deltaElement: null,
                deltaMass: 0,
              },
              name: 'A',
            },
            {
              mass: 129.04259,
              modification: {
                site: 1,
                deltaElement: null,
                deltaMass: 0,
              },
              name: 'E',
            },
          ],
          type: 'b',
          neutralLoss: null,
        }];

      peakData = [
        {
          mZ: 175.118951167,
          intensity: 0.06837461749793393,
        },
        {
          mZ: 201.086976467,
          intensity: 0.6250307118447209,
        },
        {
          mZ: 272.124086467,
          intensity: 0.40168133389917576,
        },
        {
          mZ: 272.171711167,
          intensity: 0.37320866185700563,
        },
        {
          mZ: 401.166676467,
          intensity: 0.21313908556878336,
        },
        {
          mZ: 419.240121167,
          intensity: 0.23850818610261107,
        },
        {
          mZ: 472.203786467,
          intensity: 0.1358412811864823,
        },
        {
          mZ: 506.27215116699995,
          intensity: 0.3381128409014764,
        },
        {
          mZ: 600.262366467,
          intensity: 0.07838891246565857,
        }];
      peaks = [
        {
          mz: 175.118951167,
          intensity: 0.068374617497934,
          percentBasePeak: 6.8374617497934,
          sn: null,
          matchedFeatures: [
            {
              feature: {
                charge: 1,
                mz: 175.11895115091,
                number: 1,
                sequence: 'R',
                subPeptide: [
                  {
                    mass: 156.10111,
                    modification: {
                      site: 13,
                      deltaElement: null,
                      deltaMass: 0,
                    },
                    name: 'R',
                  },
                ],
                type: 'y',
                neutralLoss: null,
              },
              massError: 9.1886158132455e-5,
            },
          ],
        }];
    }); /* end before */
    it('search a peak', () => {
      var spectrum_1 = answer; // we search in the calculated values
      const sorter_asc_mz = binary.my_sorter('mz', 'asc');
      var spectrum_1 = spectrum_1.sort(sorter_asc_mz);
      const peak = peakData[0];
      peak.mz = peak.mZ;
      const a = binary.getClosestValues_spec2(spectrum_1, peak.mz);
      compare_ppmF = compare_ppm_FACTORY('mz');

      is_inside = compare_ppmF(a, peak, 20); // TODO correct here?
      assert.deepEqual(is_inside, true);
      assert.deepEqual(a,
        { mz: 9.99999999999, intensity: 4569 });
    });
  });
});
