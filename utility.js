const jstat = require("jstat")



/*
 *
 *
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

exports.fit_linear_model = fit_linear_model
exports.predict_wrapper = predict_wrapper
