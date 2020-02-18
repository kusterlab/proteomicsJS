
const assert = require('assert');
const binary = require('../binary.js');

describe('utils strategies', () => {
  describe('binary', () => {
    describe('helper', () => {
      it('compare ppm', () => {
        const ppm = 20;
        const basePeak = 100;
        const offset = basePeak * ppm / Math.pow(10, 6);
        const peak1 = { mz: basePeak, intensity: 1 };
        const peak2 = { mz: basePeak + offset, intensity: 1 };

        const test = binary.compare_ppm;
        var result = test(peak1, peak2, ppm);

        assert.ok(!result);
        var result = test(peak2, peak1, ppm);

        assert.ok(result);
      });
    });
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

        spectrum_predicted = Object.assign([], spectrum_exp);
        spectrum_predicted.push({ mz: 326.1111, intensity: 12 });
        spectrum_predicted.push({ mz: 1326.1111, intensity: 17 });
        spectrum_exp.push({ mz: 326.111, intensity: 13 });
      });
	it('change it', ()=>{
		// change to getClosestValues_spec
		assert.equal(1, 0);
	});
      it('stupid tobi test', () => {
        spectrum_exp = [{ mz: 761.378791167, intensity: 10 }, { mz: 987, intensity: 88 }];
        spectrum_ref = [{ mz: 113, intensity: 545 }, { mz: 761.3793, intensity: 1155 }, { mz: 123, intensity: 456 }];
        const zz = binary.binary_search_spectrum(spectrum_exp, spectrum_ref);
        assert.equal(zz.intensity_1.length, spectrum_ref.length);
				 assert.deepEqual({ intensity_1: [0, 0, 0], intensity_2: [545, 456, 1155] }, zz);
        // assert.equal(1, zz);
      });
      it('generate spectra', () => {
        /* spec1: sort exp by mz
				 * spec2: sort predicted by intensity asc
				 *
				 * loop over spec2:
				 * 	add a exp_intensity to every peak
				 * loop over spec2:
				 * 	replace exp_intensity from spec1
				 * reduce to two lists
				 */
        const sorter_asc_intensity = binary.my_sorter('intensity', 'desc');
        spectrum_pr = spectrum_predicted.sort(sorter_asc_intensity);

        const sorter_asc_mz = binary.my_sorter('mz', 'asc');
        spectrum_exp = spectrum_exp.sort(sorter_asc_mz);

        const f_peak = binary.generate_searchF(spectrum_exp);

        const zz = spectrum_pr.map(binary.add_exp_flag).map(f_peak).reduce(binary.extract_mzs, { intensity_1: [], intensity_2: [] });
        // experimental blown up
        //	assert.deepEqual([9004638, 122095, 111771, 96982, 80302, 69098, 60817, 1000, 0, 13], zz.intensity_1);
        // predicted blown up
        //	assert.deepEqual([9004638, 122095, 111771, 96982, 80302, 69098, 60817, 1000, 17, 12], zz.intensity_2);
      });
      it('do full binary cotain merge', () => {
        const zz = binary.binary_search_spectrum(spectrum_exp, spectrum_predicted);

        assert.deepEqual([122095, 0, 111771, 60817, 9004638, 69098, 96982, 80302, 1000, 0], zz.intensity_1);
        // predicted blown up
        assert.deepEqual([122095, 12, 111771, 60817, 9004638, 69098, 96982, 80302, 1000, 17], zz.intensity_2);
      });
    });
    describe('sorter', () => {
      let spectrum;
      beforeEach(() => {
        spectrum = [{ mz: 1019.74, intensity: 1000 },
          { mz: 326.1, intensity: 122095.0 },
          { mz: 326.12, intensity: 111771.0 },
          { mz: 351.1, intensity: 60817.0 },
          { mz: 354.1, intensity: 9004638.0 },
          { mz: 358.3, intensity: 69098.0 },
          { mz: 361.3, intensity: 96982.0 },
          { mz: 368.0, intensity: 80302.0 }];
      });
      it('sort mz', () => {
        const sorter_asc_mz = binary.my_sorter('mz', 'asc');


        const spectrum123 = spectrum.sort(sorter_asc_mz);
        assert.equal(326.1, spectrum123[0].mz);
      });
      it('sort intensity', () => {
        const sorter_asc_intensity = binary.my_sorter('intensity', 'desc');
        const spectrum123 = spectrum.sort(sorter_asc_intensity);
        assert.equal(354.1, spectrum123[0].mz);
        assert.equal(9004638.0, spectrum123[0].intensity);
      });
    });
  });
});
