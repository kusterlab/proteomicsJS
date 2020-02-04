
d3v4 = require('d3')
uniq = require('uniq')
stuff = require('./compare.js')
peptide="YLDGLTAER"
offset=1


/**
 * Generate random peptide sequence but keep the n-first and n-last amino acids
 * @constructor
 * @param {string} peptide - The peptide sequence
 * @param {integer} offset - How many amino acids to keep
 *
 */
randomizer = function(peptide,offset){
	pepl=peptide.length
	all_pepidxs=Array.from(new Array(pepl), (x,i) => i)
	pepidxs=Array.from(new Array(pepl -offset *2), (x,i) => i + offset)
	pepidxs_shuffle=d3v4.shuffle(pepidxs)
	//	console.log(pepidxs)

	pepidxs_concat=all_pepidxs.slice(0,offset).concat(pepidxs_shuffle.concat(all_pepidxs.slice(-offset)))
	chars = peptide.split('')
	new_chars = pepidxs_concat.map(x => chars[x])
	new_peptide=new_chars.join('')

	return new_peptide
}

var postbody = {"sequence": [], "charge": [], "ce": [], "mods":[]};

x = [...Array(1000)].map(x => randomizer(peptide, offset))
y = uniq(x)
var charge = 2;
var ce = 30;
var mods = "";
function reducer(total, el){
	total["sequence"].push(el);
	total["charge"].push(charge);
	total["ce"].push(ce);
	total["mods"].push(mods);
	return total;
}
a = y.reduce(reducer, postbody);

console.log(a["sequence"].length);
console.log(a["charge"].length);
console.log(a["ce"].length);
console.log(a["mods"].length);



var ref_exp = [
	  {
		      "mz": 110.071495,
		      "intensity": 5751
		    },
	  {
		      "mz": 112.08705,
		      "intensity": 5563
		    },
	  {
		      "mz": 113.07133,
		      "intensity": 1866
		    },
	  {
		      "mz": 115.086784,
		      "intensity": 5037
		    },
	  {
		      "mz": 116.07062,
		      "intensity": 6557
		    },
	  {
		      "mz": 119.049286,
		      "intensity": 16670
		    },
	  {
		      "mz": 120.08105,
		      "intensity": 4150
		    },
	  {
		      "mz": 129.06595,
		      "intensity": 2392
		    },
	  {
		      "mz": 129.1024,
		      "intensity": 3045
		    },
	  {
		      "mz": 130.06529,
		      "intensity": 12950
		    },
	  {
		      "mz": 130.0861,
		      "intensity": 2530
		    },
	  {
		      "mz": 130.09796,
		      "intensity": 2622
		    },
	  {
		      "mz": 135.06854,
		      "intensity": 1776
		    },
	  {
		      "mz": 136.07578,
		      "intensity": 624800
		    },
	  {
		      "mz": 137.07913,
		      "intensity": 40110
		    },
	  {
		      "mz": 143.11197,
		      "intensity": 1802
		    },
	  {
		      "mz": 143.11813,
		      "intensity": 8429
		    },
	  {
		      "mz": 145.09723,
		      "intensity": 8128
		    },
	  {
		      "mz": 147.0441,
		      "intensity": 7911
		    },
	  {
		      "mz": 147.11343,
		      "intensity": 2730
		    },
	  {
		      "mz": 149.045,
		      "intensity": 76400
		    },
	  {
		      "mz": 149.24179,
		      "intensity": 2706
		    },
	  {
		      "mz": 150.04956,
		      "intensity": 2190
		    },
	  {
		      "mz": 154.06133,
		      "intensity": 2995
		    },
	  {
		      "mz": 155.08167,
		      "intensity": 4727
		    },
	  {
		      "mz": 157.10832,
		      "intensity": 3588
		    },
	  {
		      "mz": 158.0925,
		      "intensity": 13360
		    },
	  {
		      "mz": 159.09152,
		      "intensity": 2888
		    },
	  {
		      "mz": 167.05553,
		      "intensity": 97780
		    },
	  {
		      "mz": 168.05527,
		      "intensity": 2618
		    },
	  {
		      "mz": 170.06015,
		      "intensity": 2248
		    },
	  {
		      "mz": 171.11285,
		      "intensity": 4549
		    },
	  {
		      "mz": 172.07138,
		      "intensity": 2881
		    },
	  {
		      "mz": 173.09216,
		      "intensity": 18490
		    },
	  {
		      "mz": 173.12828,
		      "intensity": 2596
		    },
	  {
		      "mz": 175.11908,
		      "intensity": 106500
		    },
	  {
		      "mz": 176.12263,
		      "intensity": 5257
		    },
	  {
		      "mz": 183.1135,
		      "intensity": 2733
		    },
	  {
		      "mz": 197.12907,
		      "intensity": 5298
		    },
	  {
		      "mz": 201.08713,
		      "intensity": 13150
		    },
	  {
		      "mz": 201.12344,
		      "intensity": 5696
		    },
	  {
		      "mz": 204.13812,
		      "intensity": 10580
		    },
	  {
		      "mz": 207.03323,
		      "intensity": 2411
		    },
	  {
		      "mz": 215.13937,
		      "intensity": 4982
		    },
	  {
		      "mz": 221.08443,
		      "intensity": 6216
		    },
	  {
		      "mz": 223.06369,
		      "intensity": 13010
		    },
	  {
		      "mz": 225.04309,
		      "intensity": 20960
		    },
	  {
		      "mz": 226.04335,
		      "intensity": 2930
		    },
	  {
		      "mz": 226.11876,
		      "intensity": 4517
		    },
	  {
		      "mz": 227.02277,
		      "intensity": 3483
		    },
	  {
		      "mz": 227.10188,
		      "intensity": 2879
		    },
	  {
		      "mz": 229.11862,
		      "intensity": 6424
		    },
	  {
		      "mz": 239.09512,
		      "intensity": 45690
		    },
	  {
		      "mz": 240.09637,
		      "intensity": 4190
		    },
	  {
		      "mz": 240.13527,
		      "intensity": 2526
		    },
	  {
		      "mz": 241.09293,
		      "intensity": 2447
		    },
	  {
		      "mz": 244.12924,
		      "intensity": 2652
		    },
	  {
		      "mz": 246.15642,
		      "intensity": 5283
		    },
	  {
		      "mz": 249.15994,
		      "intensity": 213800
		    },
	  {
		      "mz": 250.16339,
		      "intensity": 22710
		    },
	  {
		      "mz": 252.09804,
		      "intensity": 3883
		    },
	  {
		      "mz": 254.14993,
		      "intensity": 9568
		    },
	  {
		      "mz": 258.14484,
		      "intensity": 8722
		    },
	  {
		      "mz": 269.12457,
		      "intensity": 19900
		    },
	  {
		      "mz": 270.10907,
		      "intensity": 2873
		    },
	  {
		      "mz": 270.64774,
		      "intensity": 2318
		    },
	  {
		      "mz": 272.1607,
		      "intensity": 8168
		    },
	  {
		      "mz": 277.15503,
		      "intensity": 19410
		    },
	  {
		      "mz": 281.05173,
		      "intensity": 23820
		    },
	  {
		      "mz": 282.0511,
		      "intensity": 3410
		    },
	  {
		      "mz": 282.145,
		      "intensity": 2642
		    },
	  {
		      "mz": 283.03085,
		      "intensity": 15680
		    },
	  {
		      "mz": 285.01062,
		      "intensity": 3353
		    },
	  {
		      "mz": 286.13992,
		      "intensity": 31020
		    },
	  {
		      "mz": 287.1355,
		      "intensity": 31340
		    },
	  {
		      "mz": 288.1381,
		      "intensity": 3110
		    },
	  {
		      "mz": 299.06198,
		      "intensity": 415100
		    },
	  {
		      "mz": 300.06247,
		      "intensity": 39780
		    },
	  {
		      "mz": 302.13516,
		      "intensity": 9015
		    },
	  {
		      "mz": 304.1619,
		      "intensity": 10080
		    },
	  {
		      "mz": 306.1145,
		      "intensity": 2316
		    },
	  {
		      "mz": 317.22287,
		      "intensity": 8611
		    },
	  {
		      "mz": 324.9867,
		      "intensity": 4587
		    },
	  {
		      "mz": 325.1871,
		      "intensity": 10340
		    },
	  {
		      "mz": 326.96625,
		      "intensity": 7393
		    },
	  {
		      "mz": 327.13022,
		      "intensity": 5996
		    },
	  {
		      "mz": 340.16122,
		      "intensity": 5928
		    },
	  {
		      "mz": 342.99747,
		      "intensity": 4959
		    },
	  {
		      "mz": 343.16135,
		      "intensity": 3438
		    },
	  {
		      "mz": 343.19937,
		      "intensity": 4141
		    },
	  {
		      "mz": 344.97678,
		      "intensity": 110800
		    },
	  {
		      "mz": 345.9767,
		      "intensity": 17350
		    },
	  {
		      "mz": 351.1668,
		      "intensity": 3890
		    },
	  {
		      "mz": 353.2186,
		      "intensity": 5634
		    },
	  {
		      "mz": 355.07004,
		      "intensity": 3273
		    },
	  {
		      "mz": 358.17267,
		      "intensity": 27810
		    },
	  {
		      "mz": 359.02878,
		      "intensity": 42150
		    },
	  {
		      "mz": 360.02835,
		      "intensity": 6879
		    },
	  {
		      "mz": 369.17725,
		      "intensity": 23630
		    },
	  {
		      "mz": 371.22894,
		      "intensity": 6069
		    },
	  {
		      "mz": 375.19928,
		      "intensity": 30660
		    },
	  {
		      "mz": 387.18753,
		      "intensity": 13660
		    },
	  {
		      "mz": 392.18256,
		      "intensity": 3923
		    },
	  {
		      "mz": 395.19205,
		      "intensity": 4130
		    },
	  {
		      "mz": 399.00568,
		      "intensity": 3020
		    },
	  {
		      "mz": 412.21954,
		      "intensity": 4942
		    },
	  {
		      "mz": 415.03665,
		      "intensity": 18160
		    },
	  {
		      "mz": 416.0376,
		      "intensity": 4585
		    },
	  {
		      "mz": 432.2208,
		      "intensity": 5984
		    },
	  {
		      "mz": 440.21426,
		      "intensity": 13340
		    },
	  {
		      "mz": 441.211,
		      "intensity": 7073
		    },
	  {
		      "mz": 449.20453,
		      "intensity": 3555
		    },
	  {
		      "mz": 458.2307,
		      "intensity": 7066
		    },
	  {
		      "mz": 459.22058,
		      "intensity": 23040
		    },
	  {
		      "mz": 460.2212,
		      "intensity": 3613
		    },
	  {
		      "mz": 476.24686,
		      "intensity": 68640
		    },
	  {
		      "mz": 477.24893,
		      "intensity": 12300
		    },
	  {
		      "mz": 481.5739,
		      "intensity": 2677
		    },
	  {
		      "mz": 517.26404,
		      "intensity": 4944
		    },
	  {
		      "mz": 517.3357,
		      "intensity": 2980
		    },
	  {
		      "mz": 553.3051,
		      "intensity": 2485
		    },
	  {
		      "mz": 560.2806,
		      "intensity": 5418
		    },
	  {
		      "mz": 587.2678,
		      "intensity": 3221
		    },
	  {
		      "mz": 589.3314,
		      "intensity": 16700
		    },
	  {
		      "mz": 590.33264,
		      "intensity": 6578
		    },
	  {
		      "mz": 602.3248,
		      "intensity": 10300
		    },
	  {
		      "mz": 611.31537,
		      "intensity": 4106
		    },
	  {
		      "mz": 628.3417,
		      "intensity": 8317
		    },
	  {
		      "mz": 629.3269,
		      "intensity": 8525
		    },
	  {
		      "mz": 646.3523,
		      "intensity": 224200
		    },
	  {
		      "mz": 647.35486,
		      "intensity": 57650
		    },
	  {
		      "mz": 647.41205,
		      "intensity": 4389
		    },
	  {
		      "mz": 700.3658,
		      "intensity": 4549
		    },
	  {
		      "mz": 701.3567,
		      "intensity": 2949
		    },
	  {
		      "mz": 717.35156,
		      "intensity": 6302
		    },
	  {
		      "mz": 743.3691,
		      "intensity": 23480
		    },
	  {
		      "mz": 744.3576,
		      "intensity": 15960
		    },
	  {
		      "mz": 761.3793,
		      "intensity": 244400
		    },
	  {
		      "mz": 762.3819,
		      "intensity": 70760
		    },
	  {
		      "mz": 771.35986,
		      "intensity": 3483
		    },
	  {
		      "mz": 856.45233,
		      "intensity": 7430
		    },
	  {
		      "mz": 857.4454,
		      "intensity": 5613
		    },
	  {
		      "mz": 874.4629,
		      "intensity": 53060
		    },
	  {
		      "mz": 875.4654,
		      "intensity": 22060
		    },
	  {
		      "mz": 989.6116,
		      "intensity": 3088
		    }
]

abc =d3v4.json('https://www.proteomicsdb.org/logic/api/getFragmentationPrediction.xsjs', {
	method:"POST",
	body: JSON.stringify(a)}).then(json => {console.log(json);return json})
	.catch(function () {
		console.log("Promise Rejected");
	})
	.then(e => {
		ref = e[0];	
		ref.ions = ref_exp;
		console.log(ref);
		var ref_spec = stuff.ipsa_helper["binning"](ref.ions);
		return e.map( el => {
			var pred_spec = stuff.ipsa_helper["binning"](el.ions);
			var mergedSpectrum = stuff.ipsa_helper["aligning"](ref_spec, pred_spec);
			return stuff.ipsa_helper["comparison"]["spectral_angle"](mergedSpectrum["intensity_1"], mergedSpectrum["intensity_2"]);


		});
	});





console.log(y.length)

exports.randomizer = randomizer


