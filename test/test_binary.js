
const binary = require("../binary.js")
var assert = require('assert');

describe('utils strategies', function(){
	describe('binary', function(){
		describe('helper', function(){
			it('compare ppm', function(){
				var ppm = 20;
				var basePeak = 100;
				var offset = basePeak * ppm / Math.pow(10, 6);
				var peak1 = {"mz": basePeak, "intensity":1}
				var peak2 = {"mz": basePeak + offset, "intensity":1}

				var test = binary.compare_ppm;
				var result = test(peak1, peak2, ppm);

				assert.ok(!result);
				var result = test(peak2, peak1, ppm);

				assert.ok(result);
			});
		});
		describe('binary spectra search', function(){
			it('generate spectra')
		});
		describe('sorter 1312312331', function(){
			beforeEach(function() {

				spectrum = [{"mz":1019.74, "intensity": 1000000000},
					{"mz":326.1, "intensity": 122095.0},
					{"mz":326.12, "intensity": 111771.0},
					{"mz":351.1, "intensity": 60817.0},
					{"mz":354.1, "intensity": 94638.0},
					{"mz":358.3, "intensity": 69098.0},
					{"mz":361.3, "intensity": 96982.0},
					{"mz":368.0, "intensity": 80302.0}]

			});
			it('sort mz', function(){
				var sorter_asc_mz = sorter("mz", "asc");
				foo.greet(); //ReferenceError, foo is not defined

				assert.equal(0, spectrum);

				var spectrum = spectrum.sort(sorter_asc_mz)
				assert.equal(326.1, spectrum[0]["mz"]);

			});
			it('sort intensity');
		})
	})
});
