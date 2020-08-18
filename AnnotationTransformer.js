const binary = require('./binary');

class Annotation {
	ChemistryConstants = {
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
	N_TERMINUS = this.ChemistryConstants.H;
	C_TERMINUS = this.ChemistryConstants.O + this.ChemistryConstants.H;
	B_ION_TERMINUS = this.ChemistryConstants.Proton; // wiki
	A_ION_TERMINUS = this.B_ION_TERMINUS - this.ChemistryConstants.C - this.ChemistryConstants.O; // wiki
	C_ION_TERMINUS = 4 * this.ChemistryConstants.H + this.ChemistryConstants.N - this.ChemistryConstants.Proton; 

	Y_ION_TERMINUS = this.ChemistryConstants.Proton + 2* this.ChemistryConstants.H + this.ChemistryConstants.O;
	X_ION_TERMINUS = this.ChemistryConstants.Proton + 2* this.ChemistryConstants.H + this.ChemistryConstants.O;
	Y_ION_TERMINUS = this.ChemistryConstants.Proton + 2* this.ChemistryConstants.H + this.ChemistryConstants.O;

	AminoAcids = {
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

	constructor(request){
		this.response = {};
		this.aminoAcids = this.generateAminoAcids(
			request["sequence"], request["mods"]);
		this.precursorMz = this.calculatePrecursorMZ(request.sequence, request.precursorCharge, request.mods);
		this.response["isPPM"] = this.transformIsPPM(request);
		this.response["precursorMz"] = this.calculatePrecursorMZ(request.sequence, request.precursorCharge, request.mods);
		this.response["precursorMass"] = this.calculatePrecursorMass(request.sequence, request.mods);
		this.response["fragments"] = this.calculateFragments(request["sequence"], 
			request["precursorCharge"], 
			request.mods,
			request["fragmentTypes"]) ;
		this.allMassOffset = this.calculateAllMassOffset(
			request.mods);
	}
	transformIsPPM(json) {
		return json.toleranceType === 'ppm';
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
		const m = this.calculateAllMassOffset(request.mods);
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
	calculateFragments(sequence, precursorCharge, mods, fragmentTypes) {
		/*
		 * position starts at 1
		 */
		const ENABLE_x = fragmentTypes.x.selected;
		const ENABLE_y = fragmentTypes.y.selected;
		const ENABLE_z = fragmentTypes.z.selected;
		const ENABLE_Z = fragmentTypes.Z.selected;

		const ENABLE_a = fragmentTypes.a.selected;
		const ENABLE_b = fragmentTypes.b.selected;
		const ENABLE_c = fragmentTypes.c.selected;
		const ENABLE_C = fragmentTypes.C.selected;


		const lengthPeptide = sequence.length;

		var fragments = [];
		for (let c = 1; c <= precursorCharge; c++){
			for (let i = 0; i < lengthPeptide - 1; i++) {
				if(ENABLE_b){
					const subPeptide = sequence.slice(0, i + 1);
					const subPeptideMass = this.calculateAminoSequenceMass(subPeptide);
					var element = {};
					element["sequence"] = subPeptide;
					element["number"] = i + 1;
					element["charge"] = c;
					const allowedMods = mods.filter((m) => { return m.index <= i + 1; });
					const modMass = this.calculateAllMassOffset(allowedMods);
					element["mz"] = (subPeptideMass + 
						modMass + 
						this.B_ION_TERMINUS +  // already charged
						(c-1) *this.ChemistryConstants.Proton ) /
						c ;
					element["subPeptide"] = this.generateAminoAcids(subPeptide, allowedMods);
					element["type"] = 'b';
					element["neutralLoss"] = null;
					fragments.push(element);
				}
				if(ENABLE_y){
					const subPeptide = sequence.slice(lengthPeptide-i-1, lengthPeptide);
					const subPeptideMass = this.calculateAminoSequenceMass(subPeptide);
					var element = {};
					element["sequence"] = subPeptide;
					element["number"] = i + 1;
					element["charge"] = c;
					const allowedMods = mods.filter((m) => { return m.index >= i + 1; });
					const modMass = this.calculateAllMassOffset(allowedMods);
					element["mz"] = (subPeptideMass + 
						modMass + 
						this.Y_ION_TERMINUS +  // already charged
						(c-1) *this.ChemistryConstants.Proton ) /
						c ;
					var e = this.generateAminoAcids(subPeptide, allowedMods);
					e = e.map((el) =>{
						el.modification.site += lengthPeptide - i - 1;
						return el;
					})
					element["subPeptide"] = e;
					element["type"] = 'y';
					element["neutralLoss"] = null;
					fragments.push(element);
				}
			}
		}
		return fragments;
	}
}

exports.Annotation = Annotation;
