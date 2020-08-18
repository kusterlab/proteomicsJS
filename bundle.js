
> eubic@1.0.0 browserify /home/tschmidt/code/IPSA_helper
> browserify UsiParser.js

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

class UsiResponse {
	constructor(type){
		this.type=type;
		this.sequence = '';
		this.precursorCharge = 11588;
		this.aMz = [];
		this.aInt = [];
	};
	parseData(response){
		switch(this.type) {
			case "pride": // use data
				this.sequence = response.peptideSequence;
				this.precursorCharge = response.charge;
				this.aMz = response.mzs;
				this.aInt = response.intensities;
				//
				break;
			case "peptideatlas":
				let regexp = /^(\s)*(?<mz>(\d)*\.(\d)*)(\s)*(?<intensity>(\d)*\.(\d)*)/gm;
				const r = [...response.matchAll(regexp)]
					.map((e) => {
						return {"mz": parseFloat(e["groups"]["mz"]),
							"intensity": parseFloat(e["groups"]["intensity"])}
					});

				let regexpPCM = /^(\s)*PeptideIon tag: (?<peptideSequence>([A-Z]*))\/(?<precursorCharge>(\d))/gm;
				const r1 = [...response.matchAll(regexpPCM)]
					.map((e) => {
						return {"peptideSequence": e["groups"]["peptideSequence"],
							"precursorCharge": e["groups"]["precursorCharge"]}
					});
				this.sequence = r1[0]["peptideSequence"];
				this.precursorCharge = r1[0]["precursorCharge"];
				this.aMz = r.map((e)=>{return(e.mz)});
				this.aInt = r.map((e)=>{return(e.intensity)});
				//
				break;
			case "jpost":
				this.sequence = response["sequence"];
				this.precursorCharge = response["charge"];
				this.aMz = JSON.parse(response["ms2peaks"]).map((a)=>{return(a[0])});
				this.aInt = JSON.parse(response["ms2peaks"]).map((a)=>{return(a[0])});

				break;
			default:
				//
				break;
		}
	}
};

exports.UsiResponse = UsiResponse;

},{}]},{},[1]);
