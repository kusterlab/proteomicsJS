
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
			it('getClosestValue_other_direction', ()=>{
				var spectrum_1 = [{ mz: 10.0000000001, intensity: 10}, { mz: 12, intensity: 88 },
					{mz: 9, intensity:123}, {mz:9.99999999999, intensity:4569}];
				var sorter_asc_mz = binary.my_sorter('mz', 'asc');
				var spectrum_1 = spectrum_1.sort(sorter_asc_mz);
				assert.deepEqual(binary.getClosestValues_spec2(spectrum_1, 10), 
					{mz: 9.99999999999, intensity: 4569}
				);
			});
			it('getClosestValue', ()=>{
				var spectrum_1 = [{ mz: 10.00002, intensity: 10}, { mz: 12, intensity: 88 },
					{mz: 9, intensity:123}, {mz:9.99999999999, intensity:4569}];
				var sorter_asc_mz = binary.my_sorter('mz', 'asc');
				var spectrum_1 = spectrum_1.sort(sorter_asc_mz);
				var a = binary.getClosestValues_spec2(spectrum_1, 10);
				compare_ppmF = compare_ppm_FACTORY("mz");  
				assert.deepEqual(a,
					{mz: 9.99999999999, intensity: 4569});
			});
			it('retrieve_merged_peaks_contain',()=>{
				var spectrum_1 = [{ mz: 10.00002, intensity: 10}, { mz: 12, intensity: 88 },
					{mz: 9, intensity:123}, {mz:9.99999999999, intensity:4569}];
				var spectrum_2 = [{ mz: 10, intensity: 545}];
				var contain_2_peak = binary.binary_search_spectrum(spectrum_1, spectrum_2);
				assert.deepEqual(
					contain_2_peak, [{
						"id_1": [1,2],
						"id_2": 0,
						"intensity_1": [4569,10],
						"intensity_2": 545,
						"mz_1": [9.99999999999, 10.00002],
						"mz_2": 10
					}]

				);
			});
			it('retrieve_merged_peaks_contain2',() =>{
				var spectrum_2 = [{ mz: 10.00002, intensity: 10}, { mz: 12, intensity: 88 },
					{mz: 9, intensity:123}, {mz:9.99999999999, intensity:4569}];
				var spectrum_1 = [{ mz: 10, intensity: 545}];
				var contain_1_peak = binary.binary_search_spectrum(spectrum_1, spectrum_2);
				assert.deepEqual([
					{
						"id_1": [],
						"id_2": 0,
						"intensity_1": [],
						"intensity_2": 123,
						"mz_1": [],
						"mz_2": 9
					},
					{
						"id_1": [
							0
						],
						"id_2": 1,
						"intensity_1": [
							545
						],
						"intensity_2": 4569,
						"mz_1": [
							10
						],
						"mz_2": 9.99999999999
					},
					{
						"id_1": [],
						"id_2": 2,
						"intensity_1": [],
						"intensity_2": 10,
						"mz_1": [],
						"mz_2": 10.00002,
					},
					{
						"id_1": [],
						"id_2": 3,
						"intensity_1": [],
						"intensity_2": 88,
						"mz_1": [],
						"mz_2": 12
					}
				]	, contain_1_peak);

			}
			);
			it('clean merged spectra for multiple annotation',()=>{
				var input = [{
					"id_1": [1,2],
					"id_2": 0,
					"intensity_1": [4569,10],
					"intensity_2": 545,
					"mz_1": [9.99999999999, 10.00002],
					"mz_2": 10
				}];
				var output = [{
					"id_1": 1,
					"id_2": 0,
					"intensity_1": 4569,
					"intensity_2": 545,
					"mz_1": 9.99999999999,
					"mz_2": 10
				}];
				assert.deepEqual(
					binary.selectMostIntensePeak(input), 
					output

				);
			});
			it('clean merged spectra for multiple annotation2',()=>{
				var input = 	[
					{
						"id_1": [],
						"id_2": 0,
						"intensity_1": [],
						"intensity_2": 123,
						"mz_1": [],
						"mz_2": 9
					},
					{
						"id_1": [
							0
						],
						"id_2": 1,
						"intensity_1": [
							545
						],
						"intensity_2": 4569,
						"mz_1": [
							10
						],
						"mz_2": 9.99999999999
					},
					{
						"id_1": [],
						"id_2": 2,
						"intensity_1": [],
						"intensity_2": 10,
						"mz_1": [],
						"mz_2": 10.00002,
					},
					{
						"id_1": [],
						"id_2": 3,
						"intensity_1": [],
						"intensity_2": 88,
						"mz_1": [],
						"mz_2": 12
					}
				]
				var output = 	[
					{
						"id_1": -1,
						"id_2": 0,
						"intensity_1": -1,
						"intensity_2": 123,
						"mz_1": -1,
						"mz_2": 9
					},
					{
						"id_1": 
						0
						,
						"id_2": 1,
						"intensity_1": 
						545
						,
						"intensity_2": 4569,
						"mz_1": 
						10
						,
						"mz_2": 9.99999999999
					},
					{
						"id_1": -1,
						"id_2": 2,
						"intensity_1": -1,
						"intensity_2": 10,
						"mz_1": -1,
						"mz_2": 10.00002,
					},
					{
						"id_1": -1,
						"id_2": 3,
						"intensity_1": -1,
						"intensity_2": 88,
						"mz_1": -1,
						"mz_2": 12
					}
				]
				assert.deepEqual(
					binary.selectMostIntensePeak(input), 
					output

				);
			});
			it('swapped labels exists 2x grouping -> out', () =>{
				var spec_1_spec_2 = [
					{
						"id_1": 1,
						"id_2": 2,
						"intensity_1": 100,
						"intensity_2": 22,
						"mz_1": -1,
						"mz_2": 12
					},
					{
						"id_1": 1,
						"id_2": 3,
						"intensity_1": 100,
						"intensity_2": 33,
						"mz_1": -1,
						"mz_2": 12
					}

				];

				var spec_2_spec_1 = [
					{
						"id_1": 3,
						"id_2": 4,
						"intensity_1": 3,
						"intensity_2": 4.4,
						"mz_1": -1,
						"mz_2": 12
					},
					{
						"id_1": 3,
						"id_2": 1,
						"intensity_1": 33,
						"intensity_2": 100,
						"mz_1": 12,
						"mz_2": -1
					}
				];
				var output = [
					{
					"id_1": -1,
					"id_2": 2,
					"intensity_1": -1,
					"intensity_2": 22,
					"mz_1": -1,
					"mz_2": 12
				}

				,{
					"id_1": 1,
					"id_2": 3,
					"intensity_1": 100,
					"intensity_2": 33,
					"mz_1": -1,
					"mz_2": 12

				},
				{
					"id_1": 4,
					"id_2": -1,
					"intensity_1": 4.4,
					"intensity_2": -1,
					"mz_1": 12,
					"mz_2": -1
				}

				]
				var r = binary.full_merge(spec_1_spec_2, spec_2_spec_1);
				assert.deepEqual(
					// binary.groupBy(spec_1_spec_2, "id_1")["1"], 
					r,
					output

				);
		});
			it('swapped labels exists 2x grouping + additional-> out', () =>{
				var spec_1_spec_2 = [
					{
						"id_1": 1,
						"id_2": 2,
						"intensity_1": 100,
						"intensity_2": 22,
						"mz_1": -1,
						"mz_2": 12
					},
					{
						"id_1": 1,
						"id_2": 3,
						"intensity_1": 100,
						"intensity_2": 33,
						"mz_1": -1,
						"mz_2": 12
					},
					{
						"id_1": -1,
						"id_2": 6,
						"intensity_1": -1,
						"intensity_2": 66,
						"mz_1": -1,
						"mz_2": 120
					},


				];

				var spec_2_spec_1 = [
					{
						"id_1": 3,
						"id_2": 4,
						"intensity_1": 3,
						"intensity_2": 4.4,
						"mz_1": -1,
						"mz_2": 12
					},
					{
						"id_1": 3,
						"id_2": 1,
						"intensity_1": 33,
						"intensity_2": 100,
						"mz_1": 12,
						"mz_2": -1
					},
					{
						"id_1": -1,
						"id_2": 7,
						"intensity_1": -1,
						"intensity_2": 10,
						"mz_1": -1,
						"mz_2": 20
					},
					{
						"id_1": -1,
						"id_2": 5,
						"intensity_1": -1,
						"intensity_2": 5,
						"mz_1": -1,
						"mz_2": 15
					},

				];
				var output = [
					{
						"id_1":-1,
						"id_2":2,
						"intensity_1":-1,
						"intensity_2":22,
						"mz_1":-1,
						"mz_2":12
					},
					{
						"id_1":1,
						"id_2":3,
						"intensity_1":100,
						"intensity_2":33,
						"mz_1":-1,
						"mz_2":12
					},
					{
						"id_1":-1,
						"id_2":6,
						"intensity_1":-1,
						"intensity_2":66,
						"mz_1":-1,
						"mz_2":120
					},
					{
						"id_1":4,
						"id_2":-1,
						"intensity_1":4.4,
						"intensity_2":-1,
						"mz_1":12,
						"mz_2":-1
					},
					{
						"id_1":5,
						"id_2":-1,
						"intensity_1":5,
						"intensity_2":-1,
						"mz_1":15,
						"mz_2":-1
					},
					{
						"id_1":7,
						"id_2":-1,
						"intensity_1":10,
						"intensity_2":-1,
						"mz_1":20,
						"mz_2":-1
					}
				];
				var r = binary.full_merge(spec_1_spec_2, spec_2_spec_1);
				assert.deepEqual(
					// binary.groupBy(spec_1_spec_2, "id_1")["1"], 
					r,
					output	

				);
			});
			it('generate spectra', () => { /*
				 spec1: sort exp by mz
							* spec2: sort predicted by intensity asc
							*
							* loop over spec2:
							* 	add a exp_intensity to every peak
							* loop over spec2:
							* 	replace exp_intensity from spec1
							* reduce to two lists

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
				*/	});
		it('do full binary cotain merge',
		); 
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
