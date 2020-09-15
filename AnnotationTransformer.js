const binary = require('./binary');

Annotation = class Annotation {

	constructor(request){

	this.ChemistryConstants = {
		Proton: 1.007276466879,
		H: 1.00782503223,
		h: 2.01410177812,
		C: 12.0,
		c: 13.00335483507,
		N: 14.00307400443,
		n: 15.00010889888,
		O: 15.99491461957,
		o: 17.99915961286,
		Na: 22.9897692820,
		P: 30.97376199842,
		S: 31.9720711744,
	};
	this.N_TERMINUS = this.ChemistryConstants.H;
	this.C_TERMINUS = this.ChemistryConstants.O + this.ChemistryConstants.H;
this.B_ION_TERMINUS = this.ChemistryConstants.Proton; // wiki
	this.A_ION_TERMINUS = this.B_ION_TERMINUS - this.ChemistryConstants.C - this.ChemistryConstants.O; // wiki
	this.C_ION_TERMINUS = (2+1) * this.ChemistryConstants.H + this.ChemistryConstants.N - this.ChemistryConstants.Proton; 

	this.Y_ION_TERMINUS = this.ChemistryConstants.Proton + 2* this.ChemistryConstants.H + this.ChemistryConstants.O;
	this.X_ION_TERMINUS = this.ChemistryConstants.Proton + 2* this.ChemistryConstants.H + this.ChemistryConstants.O;
	this.Y_ION_TERMINUS = this.ChemistryConstants.Proton + 2* this.ChemistryConstants.H + this.ChemistryConstants.O;
	this.NH3 = this.ChemistryConstants.H * 3 + this.ChemistryConstants.N;
	this.H2O = this.ChemistryConstants.H * 2 + this.ChemistryConstants.O;
	this.CO2 = this.ChemistryConstants.O * 2 + this.ChemistryConstants.C;

	this.AminoAcids = {
		A: 71.037114,
		C: 103.00919,
		D: 115.02694,
		E: 129.04259,
		F: 147.06841,
		G: 57.021464,
		H: 137.05891,
		I: 113.08406,
		K: 128.09496,
		L: 113.08406,
		M: 131.04048,
		N: 114.04293,
		P: 97.052764,
		Q: 128.05858,
		R: 156.10111,
		S: 87.032029,
		T: 101.04768,
		V: 99.068414,
		W: 186.07931,
		Y: 163.06333,
	};

		this.peakData = request["peakData"].map((el, i) =>{
			return {"mz": el["mZ"],
				"intensity": el["intensity"],
			}
		});
		this.fragmentTypes = request.fragmentTypes;
		var max_peak = this.peakData.reduce((e,i)=>{ return e.intensity > i.intensity ? e : i});
		let max_peak_intensity = max_peak.intensity;
		this.base_peak = max_peak;
		this.peakData = this.peakData.map((el) => {
			let bac_intensity = el["intensity"];
			el["intensity"] = el["intensity"] / max_peak_intensity * 100;
			return(el);
		})
		this.response = {};
		this.tolerance = request["tolerance"];
		this.isPPM =  request.toleranceType === 'ppm';
		this.cutoff = request.cutoff;
		this.mods = request.mods===undefined? []: request.mods;
		this.aminoAcids = this.generateAminoAcids(
			request["sequence"], this.mods);
		this.precursorCharge = parseInt(request.precursorCharge);
		this.matchType = request.matchingType;
		this.modification = request["mods"];
		this.precursorMz = this.calculatePrecursorMZ(request.sequence, request.precursorCharge, this.mods);
		this.response["isPPM"] = this.transformIsPPM(request);
		this.response["precursorMz"] = this.calculatePrecursorMZ(request.sequence, request.precursorCharge, this.mods);
		this.response["precursorMass"] = this.calculatePrecursorMass(request.sequence, this.mods);
		this.response["fragments"] = this.calculateFragments(request["sequence"], 
			request["precursorCharge"], 
			this.mods,
			request["fragmentTypes"]) ;
		this.allMassOffset = this.calculateAllMassOffset(
			this.mods);
		this.response["modifications"] =this.mods;
		this.sequence = request["sequence"];
		this.peaks = this.annotatePeaks();
		this.modifications = [];// this.generateModifications();
		this.modifications = new Array(this.sequence.length + 2).fill(undefined).map((e, i) =>{
			return {
				site: i -1,
				deltaElement: null,
				deltaMass: 0
			}
		});
	}
	

	fakeAPI(){
		return{
			tolerance: this.tolerance,
			sequence: this.sequence,
			precursorMz : this.precursorMz,
			precursorMass : this.response["precursorMass"],
			precursorCharge : this.precursorCharge,
			peaks : this.peaks,
			modifications: this.modifications,
			matchType: this.matchType,
			isPPM: this.isPPM,
			fragments : this.response["fragments"],
			fragTypes : this.fragmentTypes,
			cutoff: this.cutoff,
			checkVar: null,
			charge: this.precursorCharge,
			basePeak: {
				"mZ": this.base_peak.mz,
				"intensity": 100
			},
			annotationTime: null,
			aminoAcids: this.aminoAcids

		}
	}
	transformIsPPM(json) {
		return json.toleranceType === 'ppm';
	}
	annotatePeaks(){
		var spectrum_1 = this.peakData; // we search through experimental data
		spectrum_1.map((el) =>{
			el["matchedFeatures"] = [];
			el["percentBasePeak"] = el["intensity"] ;
			el["sn"] = null;
			return(el);
		})
		// var spectrum_1 = answer; // we search in the calculated values
		var sorter_asc_mz = binary.my_sorter('mz', 'asc');
		var compare_F = binary.compare_FACTORY('mz', this.isPPM? "ppm" : "Da", this.tolerance);
		spectrum_1.sort(sorter_asc_mz);


		var bla = this.response["fragments"].map((el) =>{ // el are calculated frags
			var a = binary.getClosestValues_spec2(spectrum_1, el.mz); //peak in exp // is a reference


			var is_inside = compare_F(a, el); // TODO correct here?
			if(is_inside){
				a["matchedFeatures"].push({
					"feature": el,
					"massError": (a["mz"] -el["mz"]) / el["mz"] * Math.pow(10, 6) // https://github.com/coongroup/IPSA/blob/0b5125a8923d1a1897b61c53390164e7e7c5d356/support/php/NegativeModeAnnotateEntireFile.php#L898

				});
				return(a)
			}


		}).filter((el) =>{return el !== undefined});
		spectrum_1 = spectrum_1.map((el) => {
			if (el["percentBasePeak"] <= this.cutoff){
				el["matchedFeatures"] = [];
			}
			return el;
		});
		return(spectrum_1);

	}
	generateAminoAcids(sequence, mods){
		var r = sequence.split(""); // 
		r = r.map((e, i) => {
			let possibleMod = mods.filter(e => {return e.index ==i});
			let m = this.calculateAllMassOffset(possibleMod) ;


			return(
				{"mass": this.AminoAcids[e],
					"modification": {
						"deltaElement": null,
						"deltaMass": 0 + m,
						"site": i 
					},
					"name": e
				});

		});
		return(r);
	}
	calculateAllMassOffset(aMods) {
		return aMods.map((Mod) => this.calculateMassOfElementChange(Mod.elementChange)).reduce((a, b) => a + b, 0);
	}
	calculateMassOfElementChange(str) {
		/*
		 *
		 *  "mods":[
		 *        {
		 *                 "name":"Carbamyl",
		 *                          "site":"N-terminus",
		 *                                   "index":-1,
		 *                                            "elementChange":"C1 H1 N1 O1"
		 *                                                  }
		 *                                                     ],
		 *
		 *
		 */
		const aMods = str.split(' ');
		const deltaMass = aMods.map((mod) => {
			const element = this.ChemistryConstants[mod[0]];
			return mod.slice(1) * element;
		}).reduce((a, b) => a + b, 0);
		return deltaMass;
	}
	calculateAminoSequenceMass(sequence) {
		const aSequence = sequence.split('');
		const SequenceMass = aSequence.map((aS) => this.AminoAcids[aS]).reduce((a, b) => a + b, 0);
		return SequenceMass;
	}

	calculatePrecursorMass(sequence, mods) {
		const m = this.calculateAllMassOffset(mods);
		return this.calculateAminoSequenceMass(sequence) + m
			+ this.N_TERMINUS + this.C_TERMINUS;
	}

	calculatePrecursorMZ(sequence, precursorCharge, mods) {
		const r = this.calculatePrecursorMass(sequence, mods);
		const m = this.calculateAllMassOffset(mods);
		var woCharge = r + precursorCharge * this.ChemistryConstants.Proton;
		return woCharge / precursorCharge;
	}


	countH20 = (str) => {
		const re = /[STED]/g;
		return ((str || '').match(re) || []).length;
	};
	countNH3 = (str) => {
		const re = /[RKQN]/g;
		return ((str || '').match(re) || []).length;
	};

	get_losses(){
		let returnV = [];
		if(this.fragmentTypes.NH3.selected){
			returnV.push({
				"mass": this.NH3,
				"name": "-NH3"
			});
		};
		if(this.fragmentTypes.H2O.selected){
			returnV.push({
				"mass": this.H2O,
				"name": "-H2O"
			});
		};
		if(this.fragmentTypes.CO2.selected){
			returnV.push({
				"mass": this.CO2,
				"name": "-CO2"
			});
		};
		return returnV;
	}
	get_fragmentTypes(){
		// according to http://www.matrixscience.com/help/fragmentation_help.html
		// [N] is the molecular mass of the neutral N-terminal group, [C] is the molecular mass of the neutral C-terminal group, [M] [M] is molecular mass of the neutral amino acid residues
		var returnV = [];
		if(this.fragmentTypes.x.selected){
			returnV.push({
				"reverse": true,
				"type": "x",
				"offset": this.C_TERMINUS + this.ChemistryConstants.O + this.ChemistryConstants.C - this.ChemistryConstants.H * 0 //  [C]+[M]+CO-H
			});
		};
		if(this.fragmentTypes.y.selected){
			returnV.push({
				"reverse": true,
				"type": "y",
				"offset": this.C_TERMINUS + this.ChemistryConstants.H  // [C]+[M]+H
			});
		};
		if(this.fragmentTypes.z.selected){
			returnV.push({
				"reverse": true,
				"type": "z",
				"offset": this.C_TERMINUS - 1*this.ChemistryConstants.H - this.ChemistryConstants.N // [C]+[M]-NH2 // changed this
			});
		};
		if(this.fragmentTypes.a.selected){
			returnV.push({
				"reverse": false,
				"type": "a",
				"offset": this.N_TERMINUS - this.ChemistryConstants.C - this.ChemistryConstants.H - this.ChemistryConstants.O // [N]+[M]-CHO
			});
		};
		if(this.fragmentTypes.b.selected){
			returnV.push({
				"reverse": false,
				"type" : "b",
				"offset": this.N_TERMINUS - this.ChemistryConstants.H // [N]+[M]-H
			});
		};
		if(this.fragmentTypes.c.selected){
			returnV.push({
				"reverse": false,
				"type": "c",
				"offset": this.N_TERMINUS + this.ChemistryConstants.N + 2*this.ChemistryConstants.H // [N]+[M]+NH2
			});
		};
		return returnV;
	}
	calculateFragments(sequence, precursorCharge, mods, fragmentTypes) {
		/*
		 * position starts at 1
		 */


		const fragTypes = this.get_fragmentTypes();
		const losses = this.get_losses();


		const lengthPeptide = sequence.length;

		var fragments = [];
		for (var c = 1; c <= precursorCharge-1; c++){
			for (var i = 0; i < lengthPeptide - 1; i++) {
				for (var frag of fragTypes){ // gives an int
					var subPeptideSub = frag.reverse? sequence.slice(lengthPeptide -i-1, lengthPeptide): sequence.slice(0, i+ 1);
					var subPeptideMass = this.calculateAminoSequenceMass(subPeptideSub);
					var element = {};
					element["sequence"] = subPeptideSub;
					element["number"] = i + 1;
					element["charge"] = c;
					var allowedMods = frag.reverse? mods.filter((m) => { return m.index >= i + 1; }) : mods.filter((m) => {return m.index <= i+1;});
					const modMass = this.calculateAllMassOffset(allowedMods);
					element["mz"] = (subPeptideMass + 
						modMass + 
						frag.offset + 
						(c) *this.ChemistryConstants.Proton ) /
						c ;
					var e = this.generateAminoAcids(subPeptideSub, allowedMods);
					if (frag.reverse){
						e = e.map((el) =>{
							el.modification.site += lengthPeptide - i - 1;
							return el;
						});
					}
					element["subPeptide"] = e;
					element["type"] = frag.type;
					element["neutralLoss"] = null;
					fragments.push(element);

					for (var loss of losses){ // gives an int
						if(loss.name == "-NH3" && this.countNH3(subPeptideSub) > 0){
						let more = {...element};
						more["mz"] -= loss.mass / c;
						more["neutralLoss"] = loss.name;
						fragments.push(more);
						}else if(loss.name == "-H2O" && this.countH20(subPeptideSub) > 0 ){
						let more = {...element};
						more["mz"] -= loss.mass / c;
						more["neutralLoss"] = loss.name;
						fragments.push(more);
						}
						else if(loss.name =="-CO2"){ // co2 always
						let more = {...element};
						more["mz"] -= loss.mass / c;
						more["neutralLoss"] = loss.name;
						fragments.push(more);
						}
					}

				}
			}

		}
		for (var c = 1; c <= precursorCharge; c++){
			var element = {};
			element["charge"] = c;
			element["isPrecursor"] = true;
			element["type"] = "M";
			element["mz"] = ( this.response["precursorMass"] + c * this.ChemistryConstants["Proton"] ) / c;
			element["number"] = "+" + c + "H";
			element["neutralLoss"] = "";
			fragments.push(element);
		}
		return fragments;
	}
}

exports.Annotation = Annotation;
