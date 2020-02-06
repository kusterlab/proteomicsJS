compare = require("../compare.js")
var assert = require('assert');

describe('Merge strategies', function(){
	describe('binning', function(){
		it('should return 1 when spectrum is the same' );
	});
	describe('binary', function(){
		describe('helper', function(){
			it('compare ppm');
		});
		it('show how to binary merge');
	})
	describe('merging strategies', function(){
		it('how to choose between equal and part of');
	})
});

describe('Similarities', function(){
	describe('pearson_distance', function(){
		it('should return 1 when spectrum is the same', function(){
			compf = compare.ipsa_helper["comparison"]["pearson_correlation"] 
			a = compare.ipsa_helper["binning"](spectrum)
			c = compare.ipsa_helper["aligning"](a, a)
			assert.equal(1, compf(c["intensity_1"], c["intensity_2"]))
		});
	});
	describe('sa distance', function(){
		it('should return -1 when the value is not present');
	});
	describe('sa distance', function(){
		it('should return -1 when the value is not present');
	});
	describe('dot product', function(){
		it('at least 1 when the value is similiar');
	});
});

describe('Statistics', function(){
	it("how to extrapolate");
});

describe('Sample generation', function(){
	it("how to generate random samples");
})

