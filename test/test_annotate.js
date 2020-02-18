
const annotate = require("../annotate")
const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const _ = require('lodash');


//chai.use(chaiAlmost()); //tolerance of 10^-6
chai.use(chaiAlmost(0.0001));
var expect =chai.expect;
//
describe('Annotate spectrum', () => {
	var sequence = [];
	sequence.push(annotate.aminoAcids["A"]);
	sequence.push(_.cloneDeep(annotate.aminoAcids["C"]));
	sequence.push(_.cloneDeep(annotate.aminoAcids["W"]));
	before(() => {
		A = [1, 1.5, 3, 4];
		b = [2, 3.3, 2.9, 4.001];
	});
	it('mass correct', ()=>{
		assert.equal(186.079313, sequence[2].residue_mass);
	});
	it('modified', ()=>{
		assert.equal(0, sequence[1].modifications.length);
	});
	it('unmodified', ()=>{
		assert.equal(0, sequence[2].modifications.length);
	});
	describe('lets assemble everything', ()=>{
		describe('y ions', ()=>{
			let y_ions = annotate.f_get_masses(sequence, "y");
			let y_ions_chrg = annotate.f_get_charges(y_ions, 2);
			it('more ions are defined by charges', ()=>{
				assert.equal(y_ions_chrg.length, 2 *y_ions.length);
			});
			it('first ion correct', ()=>{
				var result = {label: "y1 1+", "mz" : 89.0476787 + 1.007276467};
				assert.deepEqual(result, y_ions_chrg[0]);
			});
			it('second ion correct', ()=>{
				var result = {label: "y1 2+", "mz" : (89.0476787 + 2 * 1.007276467 )/ 2};
				assert.deepEqual(result, y_ions_chrg[1]);
			});
		});
		describe('b ions', ()=>{
			let b_ions = annotate.f_get_masses(sequence, "b");
			let b_ions_chrg = annotate.f_get_charges(b_ions, 2);
			it('more ions are defined by charges', ()=>{
				assert.equal(b_ions_chrg.length, 2 *b_ions.length);
			});
			it('first ion correct', ()=>{
				var result = {label: "b1 1+", "mz" : 71.037114 + 1.007276467};
				assert.deepEqual(result, b_ions_chrg[0]);
			});
		});
	});
	describe('lets search and annotate', ()=>{
		before(() => {
			A = [1, 1.5, 3, 4];
			b = [2, 3.3, 2.9, 4.001];
		});
		describe(' ions', ()=>{
			it('first ion correct', ()=>{
			});
		});
	});
});

