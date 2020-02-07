const jstat = require("jstat")



/*
 *
 *
 */
var fit_linear_model = function(X, y){
	var A = X.map((el) => {
		return [1, el]
	}); // of the x-axis
	var b = y.map((el) => {
		return el 
	});
	var model=jstat.models.ols(b,A);
	return model;
}
var predict_wrapper = function(model){
	return function(x){
		return {
			"x": x,
			"y_predicted": model.coef[1] * x + model.coef[0]
		}
	}
};

var create_random_sequence = function(sBaseSequence){
	x = [...Array(1000)].map(x => randomizer(peptide, offset))
	y = uniq(x)
	return (x);
}

var create_post_body_for_prediction = function(aSequence, iCharge, dCe, aMods){
	var postbody = {"sequence": [], "charge": [], "ce": [], "mods":[]};

	function reducer(total, el, i){
		total["sequence"].push(el);
		total["charge"].push(iCharge);
		total["ce"].push(dCe);
		total["mods"].push(aMods[i]);
		return total;
	}
	return aSequence.reduce(reducer, postbody);
}

/**
 * Generate random peptide sequence but keep the n-first amimo acids
 * @constructor
 * @param {string} peptide - The peptide sequence
 * @param {integer} offset - How many amino acids to keep
 *
 */
var randomizer_b = function(peptide,offset){
	pepl=peptide.length
	// get array with amino acid idx
	all_pepidxs=Array.from(new Array(pepl), (x,i) => i)
	// get index with allowed poistions
	pepidxs=Array.from(new Array(pepl -offset ), (x,i) => i + offset)
	//shuffle
	pepidxs_shuffle=d3v4.shuffle(pepidxs)
	//	console.log(pepidxs)


	pepidxs_concat=all_pepidxs.slice(0,offset).concat(pepidxs_shuffle)
	chars = peptide.split('')
	new_chars = pepidxs_concat.map(x => chars[x])
	new_peptide=new_chars.join('')

	return new_peptide
}

/**
 * Generate random peptide sequence but keep the n-first and n-last amino acids
 * @constructor
 * @param {string} peptide - The peptide sequence
 * @param {integer} offset - How many amino acids to keep
 */
var randomizer = function(peptide,offset){
	pepl=peptide.length
	// get array with amino acid idx
	all_pepidxs=Array.from(new Array(pepl), (x,i) => i)
	// get index with allowed poistions
	pepidxs=Array.from(new Array(pepl -offset *2), (x,i) => i + offset)
	//shuffle
	pepidxs_shuffle=d3v4.shuffle(pepidxs)
	//	console.log(pepidxs)


	pepidxs_concat=all_pepidxs.slice(0,offset).concat(pepidxs_shuffle.concat(all_pepidxs.slice(-offset)))
	chars = peptide.split('')
	new_chars = pepidxs_concat.map(x => chars[x])
	new_peptide=new_chars.join('')

	return new_peptide
}

exports.fit_linear_model = fit_linear_model
exports.predict_wrapper = predict_wrapper
exports.create_post_body_for_prediction = create_post_body_for_prediction
exports.randomizer = randomizer
