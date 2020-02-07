const utility = require("../utility")
const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');

//chai.use(chaiAlmost()); //tolerance of 10^-6
chai.use(chaiAlmost(0.0001));
var expect =chai.expect;
//
describe('Statistics', () => {
	var A;
	var b;
	before(() => {
	A = [1, 1.5, 3, 4];
	b = [2, 3.3, 2.9, 4.001];
	});
	it('how to fit model', ()=>{
		var model = utility.fit_linear_model(A, b);
		/*
		 *> A = c(1, 1.5, 3, 4)
		 *> b = c(2, 3.3, 2.9, 4.001)
		 *> lm(b ~ A)
		*	 Call:
		* lm(formula = b ~ A)
		*	Coefficients:
		*(Intercept)            A  
		*1.9325       0.4706  
		 *
		 */
		expect(1.9325).to.be.almost(model.coef[0]);
		expect(0.4706).to.be.almost(model.coef[1]);
	});
	it('how to predict with a model', ()=>{
		/*A = data.frame(x=c(1, 1.5, 3, 4))
		 *  m = lm(b ~ x, A)
		*predict(m, data.frame(x = c(5)))
		 */
		var model = utility.fit_linear_model(A, b);
		var predictor = utility.predict_wrapper(model);
		var x_new = 5;
		expect(4.285615).to.be.almost(predictor(x_new)["y_predicted"]);
	})
});

describe('Sample generation', () => {
	it('how to create post body', () =>{
		let aSequence, iCharge, dCe, aMods;
		iCharge = 2;
		dCe = 30;
		aSequence = ["TOBIAS", "SCHMIDT"];
		aMods = ["", "blub"];
		var postBody = utility.create_post_body_for_prediction(aSequence, iCharge, dCe, aMods);
		var oResult = {"sequence": ["TOBIAS", "SCHMIDT"], "charge": [2, 2], "ce": [30, 30], "mods": ["", "blub"]}
		assert.deepEqual(oResult, postBody);
		
	});
	it('how to generate random samples');
	it('check for stargin string');
	// https://www.chaijs.com/plugins/chai-string/
});
