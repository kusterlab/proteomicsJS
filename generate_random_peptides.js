
d3v4 = require('d3')
uniq = require('uniq')
stuff = require('./compare.js')
utility = require('./utility.js')
binary = require('./binary.js')
peptide_1="YLDGLTAER"
//peptide="YLDTRLEAG"
//https://www.ebi.ac.uk/pride/archive/spectra?usi=mzspec%3APXD015890%3A20190213_Rucks_atm6.raw%20%28F002091%29.mzid_20190213_Rucks_atm6.raw_%28F002091%29.MGF%3Aindex%3A914%3AYLDGLTAER%2F2

//peptide="LDGLTAERY"
offset=2
TRIALS = 400
CE = 30
var ref_exp_1 = [
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

peptide = "DLSSNQAIQIAQH"
//
var ref_exp =
	[
		 {
			    "mz": 101.07056,
			    "intensity": 1216
			  },
		 {
			    "mz": 101.806465,
			    "intensity": 940.1
			  },
		 {
			    "mz": 104.60396,
			    "intensity": 867.7
			  },
		 {
			    "mz": 107.96628,
			    "intensity": 1845
			  },
		 {
			    "mz": 111.696686,
			    "intensity": 1234
			  },
		 {
			    "mz": 120.08011,
			    "intensity": 1251
			  },
		 {
			    "mz": 129.05132,
			    "intensity": 1480
			  },
		 {
			    "mz": 136.07475,
			    "intensity": 1976
			  },
		 {
			    "mz": 147.11218,
			    "intensity": 1471
			  },
		 {
			    "mz": 156.07597,
			    "intensity": 3370
			  },
		 {
			    "mz": 173.12813,
			    "intensity": 62900
			  },
		 {
			    "mz": 201.12296,
			    "intensity": 75570
			  },
		 {
			    "mz": 202.12636,
			    "intensity": 2861
			  },
		 {
			    "mz": 218.04495,
			    "intensity": 10870
			  },
		 {
			    "mz": 229.11668,
			    "intensity": 9969
			  },
		 {
			    "mz": 239.44618,
			    "intensity": 1584
			  },
		 {
			    "mz": 243.13206,
			    "intensity": 1600
			  },
		 {
			    "mz": 267.10825,
			    "intensity": 1848
			  },
		 {
			    "mz": 286.11295,
			    "intensity": 3527
			  },
		 {
			    "mz": 314.20532,
			    "intensity": 7653
			  },
		 {
			    "mz": 322.7996,
			    "intensity": 1894
			  },
		 {
			    "mz": 346.16928,
			    "intensity": 1816
			  },
		 {
			    "mz": 355.17056,
			    "intensity": 8249
			  },
		 {
			    "mz": 357.21185,
			    "intensity": 2271
			  },
		 {
			    "mz": 359.121,
			    "intensity": 1905
			  },
		 {
			    "mz": 363.4599,
			    "intensity": 1877
			  },
		 {
			    "mz": 388.32358,
			    "intensity": 1651
			  },
		 {
			    "mz": 395.5097,
			    "intensity": 1863
			  },
		 {
			    "mz": 419.22482,
			    "intensity": 2213
			  },
		 {
			    "mz": 433.1819,
			    "intensity": 1938
			  },
		 {
			    "mz": 434.20267,
			    "intensity": 3240
			  },
		 {
			    "mz": 442.19675,
			    "intensity": 1986
			  },
		 {
			    "mz": 458.2587,
			    "intensity": 6211
			  },
		 {
			    "mz": 460.78522,
			    "intensity": 1764
			  },
		 {
			    "mz": 468.25403,
			    "intensity": 2152
			  },
		 {
			    "mz": 473.1747,
			    "intensity": 3021
			  },
		 {
			    "mz": 481.60034,
			    "intensity": 1746
			  },
		 {
			    "mz": 487.21323,
			    "intensity": 3323
			  },
		 {
			    "mz": 490.20184,
			    "intensity": 2075
			  },
		 {
			    "mz": 501.76508,
			    "intensity": 2324
			  },
		 {
			    "mz": 507.25964,
			    "intensity": 2034
			  },
		 {
			    "mz": 520.27423,
			    "intensity": 6153
			  },
		 {
			    "mz": 551.27826,
			    "intensity": 3227
			  },
		 {
			    "mz": 560.28094,
			    "intensity": 13310
			  },
		 {
			    "mz": 560.7866,
			    "intensity": 3083
			  },
		 {
			    "mz": 579.2874,
			    "intensity": 2550
			  },
		 {
			    "mz": 596.3126,
			    "intensity": 7885
			  },
		 {
			    "mz": 600.2528,
			    "intensity": 1989
			  },
		 {
			    "mz": 632.26483,
			    "intensity": 3369
			  },
		 {
			    "mz": 709.3958,
			    "intensity": 9077
			  },
		 {
			    "mz": 710.3967,
			    "intensity": 2200
			  },
		 {
			    "mz": 780.4294,
			    "intensity": 9791
			  },
		 {
			    "mz": 781.43225,
			    "intensity": 2316
			  },
		 {
			    "mz": 798.6191,
			    "intensity": 2009
			  },
		 {
			    "mz": 805.40784,
			    "intensity": 2027
			  },
		 {
			    "mz": 822.4112,
			    "intensity": 1871
			  },
		 {
			    "mz": 862.4275,
			    "intensity": 10030
			  },
		 {
			    "mz": 891.4616,
			    "intensity": 3134
			  },
		 {
			    "mz": 908.4882,
			    "intensity": 2389
			  },
		 {
			    "mz": 917.4287,
			    "intensity": 2416
			  },
		 {
			    "mz": 919.45074,
			    "intensity": 27770
			  },
		 {
			    "mz": 920.4515,
			    "intensity": 6046
			  },
		 {
			    "mz": 988.4651,
			    "intensity": 7662
			  },
		 {
			    "mz": 1006.4811,
			    "intensity": 43490
			  },
		 {
			    "mz": 1007.4894,
			    "intensity": 15740
			  },
		 {
			    "mz": 1030.5209,
			    "intensity": 3648
			  },
		 {
			    "mz": 1101.5535,
			    "intensity": 7160
			  },
		 {
			    "mz": 1109.5625,
			    "intensity": 2796
			  },
		 {
			    "mz": 1119.5641,
			    "intensity": 46120
			  },
		 {
			    "mz": 1120.5662,
			    "intensity": 19930
			  },
		 {
			    "mz": 1196.5916,
			    "intensity": 2634
			  },
		 {
			    "mz": 1375.198,
			    "intensity": 2360
			  }
	]

peptide_3 = "AEAEAQAEELSFPR"
// https://www.ebi.ac.uk/pride/archive/spectra?usi=mzspec:PXD015890:18May18_Olson_WT2.raw%20(F001551).mzid_18May18_Olson_WT2.raw_(F001551).MGF:index:6913:AEAEAQAEELSFPR/2
// mzspec:PXD015890:18May18_Olson_WT2.raw%20(F001551).mzid_18May18_Olson_WT2.raw_(F001551).MGF:index:6913:AEAEAQAEELSFPR/2
var ref_exp_3 = 
[
	  {
		      "mz": 101.07042,
		      "intensity": 40420
		    },
	  {
		      "mz": 102.05517,
		      "intensity": 77850
		    },
	  {
		      "mz": 115.08612,
		      "intensity": 10020
		    },
	  {
		      "mz": 120.69936,
		      "intensity": 3711
		    },
	  {
		      "mz": 128.07048,
		      "intensity": 3674
		    },
	  {
		      "mz": 129.06538,
		      "intensity": 11750
		    },
	  {
		      "mz": 129.91791,
		      "intensity": 3848
		    },
	  {
		      "mz": 130.04941,
		      "intensity": 11190
		    },
	  {
		      "mz": 143.08163,
		      "intensity": 52350
		    },
	  {
		      "mz": 147.07593,
		      "intensity": 18380
		    },
	  {
		      "mz": 148.05963,
		      "intensity": 24510
		    },
	  {
		      "mz": 149.25414,
		      "intensity": 18250
		    },
	  {
		      "mz": 155.08145,
		      "intensity": 135700
		    },
	  {
		      "mz": 156.06459,
		      "intensity": 21890
		    },
	  {
		      "mz": 172.10739,
		      "intensity": 17860
		    },
	  {
		      "mz": 173.09201,
		      "intensity": 905000
		    },
	  {
		      "mz": 173.1042,
		      "intensity": 27900
		    },
	  {
		      "mz": 174.09435,
		      "intensity": 24450
		    },
	  {
		      "mz": 175.1189,
		      "intensity": 165800
		    },
	  {
		      "mz": 183.07632,
		      "intensity": 212900
		    },
	  {
		      "mz": 184.05914,
		      "intensity": 32840
		    },
	  {
		      "mz": 200.10289,
		      "intensity": 339300
		    },
	  {
		      "mz": 201.08682,
		      "intensity": 3224000
		    },
	  {
		      "mz": 201.10146,
		      "intensity": 97380
		    },
	  {
		      "mz": 202.09036,
		      "intensity": 118700
		    },
	  {
		      "mz": 211.07104,
		      "intensity": 34650
		    },
	  {
		      "mz": 218.04507,
		      "intensity": 9952
		    },
	  {
		      "mz": 218.11342,
		      "intensity": 62530
		    },
	  {
		      "mz": 219.09618,
		      "intensity": 18630
		    },
	  {
		      "mz": 226.11836,
		      "intensity": 48480
		    },
	  {
		      "mz": 227.10263,
		      "intensity": 128100
		    },
	  {
		      "mz": 229.0809,
		      "intensity": 22790
		    },
	  {
		      "mz": 236.10147,
		      "intensity": 8864
		    },
	  {
		      "mz": 244.12897,
		      "intensity": 34350
		    },
	  {
		      "mz": 254.11325,
		      "intensity": 146100
		    },
	  {
		      "mz": 254.1595,
		      "intensity": 25280
		    },
	  {
		      "mz": 255.09656,
		      "intensity": 19810
		    },
	  {
		      "mz": 255.14485,
		      "intensity": 121600
		    },
	  {
		      "mz": 259.09116,
		      "intensity": 19890
		    },
	  {
		      "mz": 267.0963,
		      "intensity": 28040
		    },
	  {
		      "mz": 271.13998,
		      "intensity": 145500
		    },
	  {
		      "mz": 272.12384,
		      "intensity": 2606000
		    },
	  {
		      "mz": 272.17123,
		      "intensity": 1684000
		    },
	  {
		      "mz": 273.12753,
		      "intensity": 136400
		    },
	  {
		      "mz": 273.17484,
		      "intensity": 92110
		    },
	  {
		      "mz": 282.107,
		      "intensity": 19580
		    },
	  {
		      "mz": 284.1237,
		      "intensity": 44210
		    },
	  {
		      "mz": 285.1086,
		      "intensity": 50640
		    },
	  {
		      "mz": 289.14996,
		      "intensity": 122800
		    },
	  {
		      "mz": 298.13968,
		      "intensity": 68920
		    },
	  {
		      "mz": 299.13437,
		      "intensity": 9739
		    },
	  {
		      "mz": 300.1171,
		      "intensity": 30240
		    },
	  {
		      "mz": 311.13452,
		      "intensity": 240900
		    },
	  {
		      "mz": 312.1188,
		      "intensity": 300100
		    },
	  {
		      "mz": 312.13773,
		      "intensity": 12670
		    },
	  {
		      "mz": 313.1211,
		      "intensity": 18780
		    },
	  {
		      "mz": 315.16425,
		      "intensity": 29830
		    },
	  {
		      "mz": 325.14932,
		      "intensity": 19190
		    },
	  {
		      "mz": 329.14523,
		      "intensity": 252200
		    },
	  {
		      "mz": 330.129,
		      "intensity": 307600
		    },
	  {
		      "mz": 331.13095,
		      "intensity": 22880
		    },
	  {
		      "mz": 337.1507,
		      "intensity": 99150
		    },
	  {
		      "mz": 338.134,
		      "intensity": 192800
		    },
	  {
		      "mz": 340.11325,
		      "intensity": 36550
		    },
	  {
		      "mz": 342.17535,
		      "intensity": 26140
		    },
	  {
		      "mz": 343.1609,
		      "intensity": 287800
		    },
	  {
		      "mz": 344.16202,
		      "intensity": 20240
		    },
	  {
		      "mz": 355.16107,
		      "intensity": 126000
		    },
	  {
		      "mz": 356.1445,
		      "intensity": 114800
		    },
	  {
		      "mz": 357.13943,
		      "intensity": 26980
		    },
	  {
		      "mz": 358.12396,
		      "intensity": 176600
		    },
	  {
		      "mz": 365.14526,
		      "intensity": 154400
		    },
	  {
		      "mz": 371.15427,
		      "intensity": 28430
		    },
	  {
		      "mz": 372.1849,
		      "intensity": 28860
		    },
	  {
		      "mz": 373.1713,
		      "intensity": 415600
		    },
	  {
		      "mz": 374.17438,
		      "intensity": 41950
		    },
	  {
		      "mz": 382.17172,
		      "intensity": 199400
		    },
	  {
		      "mz": 383.15555,
		      "intensity": 640700
		    },
	  {
		      "mz": 384.16043,
		      "intensity": 62030
		    },
	  {
		      "mz": 399.18527,
		      "intensity": 21020
		    },
	  {
		      "mz": 400.18228,
		      "intensity": 438100
		    },
	  {
		      "mz": 401.16592,
		      "intensity": 1258000
		    },
	  {
		      "mz": 401.22736,
		      "intensity": 30600
		    },
	  {
		      "mz": 402.16937,
		      "intensity": 94800
		    },
	  {
		      "mz": 402.21216,
		      "intensity": 23200
		    },
	  {
		      "mz": 408.18564,
		      "intensity": 28100
		    },
	  {
		      "mz": 409.16928,
		      "intensity": 29720
		    },
	  {
		      "mz": 410.16705,
		      "intensity": 9854
		    },
	  {
		      "mz": 411.14993,
		      "intensity": 43830
		    },
	  {
		      "mz": 418.1904,
		      "intensity": 30620
		    },
	  {
		      "mz": 419.23962,
		      "intensity": 1115000
		    },
	  {
		      "mz": 420.2433,
		      "intensity": 120200
		    },
	  {
		      "mz": 426.19724,
		      "intensity": 86830
		    },
	  {
		      "mz": 427.18155,
		      "intensity": 280600
		    },
	  {
		      "mz": 428.17883,
		      "intensity": 45350
		    },
	  {
		      "mz": 429.16116,
		      "intensity": 86890
		    },
	  {
		      "mz": 436.18152,
		      "intensity": 82820
		    },
	  {
		      "mz": 440.17593,
		      "intensity": 21640
		    },
	  {
		      "mz": 441.16144,
		      "intensity": 46120
		    },
	  {
		      "mz": 442.16174,
		      "intensity": 9412
		    },
	  {
		      "mz": 443.22464,
		      "intensity": 52420
		    },
	  {
		      "mz": 444.2085,
		      "intensity": 273000
		    },
	  {
		      "mz": 445.21014,
		      "intensity": 22230
		    },
	  {
		      "mz": 453.20895,
		      "intensity": 60680
		    },
	  {
		      "mz": 454.157,
		      "intensity": 10780
		    },
	  {
		      "mz": 454.19238,
		      "intensity": 305100
		    },
	  {
		      "mz": 455.19363,
		      "intensity": 27930
		    },
	  {
		      "mz": 458.1875,
		      "intensity": 54110
		    },
	  {
		      "mz": 466.1903,
		      "intensity": 23560
		    },
	  {
		      "mz": 467.17496,
		      "intensity": 26700
		    },
	  {
		      "mz": 471.2193,
		      "intensity": 260900
		    },
	  {
		      "mz": 472.20303,
		      "intensity": 763200
		    },
	  {
		      "mz": 473.2062,
		      "intensity": 85660
		    },
	  {
		      "mz": 484.20264,
		      "intensity": 46910
		    },
	  {
		      "mz": 488.26007,
		      "intensity": 22220
		    },
	  {
		      "mz": 489.1909,
		      "intensity": 9785
		    },
	  {
		      "mz": 489.22946,
		      "intensity": 196400
		    },
	  {
		      "mz": 490.22812,
		      "intensity": 20610
		    },
	  {
		      "mz": 494.187,
		      "intensity": 77520
		    },
	  {
		      "mz": 497.23114,
		      "intensity": 9040
		    },
	  {
		      "mz": 498.21738,
		      "intensity": 47800
		    },
	  {
		      "mz": 501.22723,
		      "intensity": 17780
		    },
	  {
		      "mz": 506.27173,
		      "intensity": 1577000
		    },
	  {
		      "mz": 507.2747,
		      "intensity": 239400
		    },
	  {
		      "mz": 511.21402,
		      "intensity": 162400
		    },
	  {
		      "mz": 512.19666,
		      "intensity": 125100
		    },
	  {
		      "mz": 513.1988,
		      "intensity": 18400
		    },
	  {
		      "mz": 514.2512,
		      "intensity": 9743
		    },
	  {
		      "mz": 515.24475,
		      "intensity": 11050
		    },
	  {
		      "mz": 520.76,
		      "intensity": 21580
		    },
	  {
		      "mz": 525.2285,
		      "intensity": 21970
		    },
	  {
		      "mz": 529.22473,
		      "intensity": 225300
		    },
	  {
		      "mz": 529.76605,
		      "intensity": 269200
		    },
	  {
		      "mz": 530.21533,
		      "intensity": 26540
		    },
	  {
		      "mz": 530.268,
		      "intensity": 83690
		    },
	  {
		      "mz": 537.22754,
		      "intensity": 30190
		    },
	  {
		      "mz": 538.213,
		      "intensity": 21430
		    },
	  {
		      "mz": 538.77136,
		      "intensity": 107700
		    },
	  {
		      "mz": 539.209,
		      "intensity": 23620
		    },
	  {
		      "mz": 539.27185,
		      "intensity": 46620
		    },
	  {
		      "mz": 542.2569,
		      "intensity": 55150
		    },
	  {
		      "mz": 543.2384,
		      "intensity": 68590
		    },
	  {
		      "mz": 547.2135,
		      "intensity": 11290
		    },
	  {
		      "mz": 554.2485,
		      "intensity": 34750
		    },
	  {
		      "mz": 555.24,
		      "intensity": 100600
		    },
	  {
		      "mz": 556.7717,
		      "intensity": 73770
		    },
	  {
		      "mz": 557.2225,
		      "intensity": 10010
		    },
	  {
		      "mz": 557.26935,
		      "intensity": 25130
		    },
	  {
		      "mz": 560.2672,
		      "intensity": 34720
		    },
	  {
		      "mz": 564.2385,
		      "intensity": 32820
		    },
	  {
		      "mz": 565.22363,
		      "intensity": 65350
		    },
	  {
		      "mz": 565.2826,
		      "intensity": 16960
		    },
	  {
		      "mz": 565.7777,
		      "intensity": 145600
		    },
	  {
		      "mz": 566.2765,
		      "intensity": 42480
		    },
	  {
		      "mz": 571.26917,
		      "intensity": 29300
		    },
	  {
		      "mz": 572.2664,
		      "intensity": 57360
		    },
	  {
		      "mz": 574.2906,
		      "intensity": 121600
		    },
	  {
		      "mz": 574.7904,
		      "intensity": 40150
		    },
	  {
		      "mz": 582.2515,
		      "intensity": 266600
		    },
	  {
		      "mz": 583.2327,
		      "intensity": 168000
		    },
	  {
		      "mz": 584.2356,
		      "intensity": 25240
		    },
	  {
		      "mz": 600.26196,
		      "intensity": 588700
		    },
	  {
		      "mz": 601.26025,
		      "intensity": 100300
		    },
	  {
		      "mz": 601.34204,
		      "intensity": 10600
		    },
	  {
		      "mz": 617.2536,
		      "intensity": 31480
		    },
	  {
		      "mz": 619.3557,
		      "intensity": 1186000
		    },
	  {
		      "mz": 620.35876,
		      "intensity": 182700
		    },
	  {
		      "mz": 620.79974,
		      "intensity": 9473
		    },
	  {
		      "mz": 623.2224,
		      "intensity": 8994
		    },
	  {
		      "mz": 625.2828,
		      "intensity": 26150
		    },
	  {
		      "mz": 626.2767,
		      "intensity": 64320
		    },
	  {
		      "mz": 635.2747,
		      "intensity": 19940
		    },
	  {
		      "mz": 636.2597,
		      "intensity": 9666
		    },
	  {
		      "mz": 638.8098,
		      "intensity": 39790
		    },
	  {
		      "mz": 640.2556,
		      "intensity": 30520
		    },
	  {
		      "mz": 642.3098,
		      "intensity": 41320
		    },
	  {
		      "mz": 643.303,
		      "intensity": 64710
		    },
	  {
		      "mz": 643.80194,
		      "intensity": 8991
		    },
	  {
		      "mz": 647.8054,
		      "intensity": 18980
		    },
	  {
		      "mz": 653.2876,
		      "intensity": 88350
		    },
	  {
		      "mz": 654.273,
		      "intensity": 74220
		    },
	  {
		      "mz": 656.322,
		      "intensity": 33970
		    },
	  {
		      "mz": 656.8144,
		      "intensity": 53560
		    },
	  {
		      "mz": 658.2639,
		      "intensity": 59100
		    },
	  {
		      "mz": 659.2999,
		      "intensity": 9002
		    },
	  {
		      "mz": 665.325,
		      "intensity": 93060
		    },
	  {
		      "mz": 665.822,
		      "intensity": 57540
		    },
	  {
		      "mz": 669.28064,
		      "intensity": 9099
		    },
	  {
		      "mz": 671.2989,
		      "intensity": 460400
		    },
	  {
		      "mz": 672.30054,
		      "intensity": 93690
		    },
	  {
		      "mz": 674.33167,
		      "intensity": 90400
		    },
	  {
		      "mz": 674.83325,
		      "intensity": 52010
		    },
	  {
		      "mz": 684.2802,
		      "intensity": 19720
		    },
	  {
		      "mz": 688.29016,
		      "intensity": 19540
		    },
	  {
		      "mz": 711.2896,
		      "intensity": 41450
		    },
	  {
		      "mz": 712.2809,
		      "intensity": 31830
		    },
	  {
		      "mz": 713.3479,
		      "intensity": 9288
		    },
	  {
		      "mz": 714.32935,
		      "intensity": 30580
		    },
	  {
		      "mz": 729.3006,
		      "intensity": 112800
		    },
	  {
		      "mz": 729.8433,
		      "intensity": 11000
		    },
	  {
		      "mz": 730.3008,
		      "intensity": 31540
		    },
	  {
		      "mz": 730.3857,
		      "intensity": 75180
		    },
	  {
		      "mz": 731.38245,
		      "intensity": 24110
		    },
	  {
		      "mz": 735.32416,
		      "intensity": 10330
		    },
	  {
		      "mz": 739.35455,
		      "intensity": 11280
		    },
	  {
		      "mz": 743.8407,
		      "intensity": 43670
		    },
	  {
		      "mz": 744.342,
		      "intensity": 29210
		    },
	  {
		      "mz": 745.3117,
		      "intensity": 19900
		    },
	  {
		      "mz": 747.35126,
		      "intensity": 9541
		    },
	  {
		      "mz": 747.85236,
		      "intensity": 11190
		    },
	  {
		      "mz": 748.3985,
		      "intensity": 1557000
		    },
	  {
		      "mz": 749.4017,
		      "intensity": 335400
		    },
	  {
		      "mz": 753.3373,
		      "intensity": 22960
		    },
	  {
		      "mz": 755.31696,
		      "intensity": 29020
		    },
	  {
		      "mz": 756.3632,
		      "intensity": 52080
		    },
	  {
		      "mz": 756.85565,
		      "intensity": 48740
		    },
	  {
		      "mz": 757.3461,
		      "intensity": 20710
		    },
	  {
		      "mz": 764.3195,
		      "intensity": 10140
		    },
	  {
		      "mz": 765.36707,
		      "intensity": 124500
		    },
	  {
		      "mz": 765.8659,
		      "intensity": 59340
		    },
	  {
		      "mz": 771.3482,
		      "intensity": 31590
		    },
	  {
		      "mz": 772.34656,
		      "intensity": 22580
		    },
	  {
		      "mz": 782.32916,
		      "intensity": 48730
		    },
	  {
		      "mz": 783.3174,
		      "intensity": 33260
		    },
	  {
		      "mz": 800.3397,
		      "intensity": 168300
		    },
	  {
		      "mz": 801.34033,
		      "intensity": 49790
		    },
	  {
		      "mz": 816.3493,
		      "intensity": 21630
		    },
	  {
		      "mz": 818.3533,
		      "intensity": 8962
		    },
	  {
		      "mz": 824.38324,
		      "intensity": 13260
		    },
	  {
		      "mz": 825.3616,
		      "intensity": 20070
		    },
	  {
		      "mz": 840.36395,
		      "intensity": 20790
		    },
	  {
		      "mz": 842.38965,
		      "intensity": 85400
		    },
	  {
		      "mz": 843.3762,
		      "intensity": 25220
		    },
	  {
		      "mz": 858.3425,
		      "intensity": 26550
		    },
	  {
		      "mz": 859.4321,
		      "intensity": 168000
		    },
	  {
		      "mz": 860.4329,
		      "intensity": 53270
		    },
	  {
		      "mz": 877.4406,
		      "intensity": 3213000
		    },
	  {
		      "mz": 878.44403,
		      "intensity": 787900
		    },
	  {
		      "mz": 887.3907,
		      "intensity": 33420
		    },
	  {
		      "mz": 901.3879,
		      "intensity": 19880
		    },
	  {
		      "mz": 911.3811,
		      "intensity": 47360
		    },
	  {
		      "mz": 912.3613,
		      "intensity": 11170
		    },
	  {
		      "mz": 912.4522,
		      "intensity": 23450
		    },
	  {
		      "mz": 913.4255,
		      "intensity": 29210
		    },
	  {
		      "mz": 914.4074,
		      "intensity": 27210
		    },
	  {
		      "mz": 929.3834,
		      "intensity": 224200
		    },
	  {
		      "mz": 930.3827,
		      "intensity": 42280
		    },
	  {
		      "mz": 930.47406,
		      "intensity": 175100
		    },
	  {
		      "mz": 931.46826,
		      "intensity": 58070
		    },
	  {
		      "mz": 945.38824,
		      "intensity": 18520
		    },
	  {
		      "mz": 948.4775,
		      "intensity": 5648000
		    },
	  {
		      "mz": 949.48047,
		      "intensity": 1575000
		    },
	  {
		      "mz": 949.57715,
		      "intensity": 22100
		    },
	  {
		      "mz": 950.4805,
		      "intensity": 23730
		    },
	  {
		      "mz": 971.43384,
		      "intensity": 38190
		    },
	  {
		      "mz": 998.40393,
		      "intensity": 8969
		    },
	  {
		      "mz": 1000.4578,
		      "intensity": 10610
		    },
	  {
		      "mz": 1014.4603,
		      "intensity": 9442
		    },
	  {
		      "mz": 1016.41736,
		      "intensity": 23980
		    },
	  {
		      "mz": 1024.455,
		      "intensity": 31930
		    },
	  {
		      "mz": 1025.4507,
		      "intensity": 18760
		    },
	  {
		      "mz": 1041.4958,
		      "intensity": 28080
		    },
	  {
		      "mz": 1042.4706,
		      "intensity": 128700
		    },
	  {
		      "mz": 1043.4738,
		      "intensity": 38120
		    },
	  {
		      "mz": 1058.5275,
		      "intensity": 477100
		    },
	  {
		      "mz": 1059.5121,
		      "intensity": 702800
		    },
	  {
		      "mz": 1060.514,
		      "intensity": 186300
		    },
	  {
		      "mz": 1076.5361,
		      "intensity": 3801000
		    },
	  {
		      "mz": 1077.5393,
		      "intensity": 1208000
		    },
	  {
		      "mz": 1078.5352,
		      "intensity": 20990
		    },
	  {
		      "mz": 1087.5125,
		      "intensity": 16450
		    },
	  {
		      "mz": 1111.4865,
		      "intensity": 84080
		    },
	  {
		      "mz": 1112.5371,
		      "intensity": 274500
		    },
	  {
		      "mz": 1113.5391,
		      "intensity": 101600
		    },
	  {
		      "mz": 1129.5479,
		      "intensity": 81030
		    },
	  {
		      "mz": 1130.551,
		      "intensity": 195400
		    },
	  {
		      "mz": 1131.5472,
		      "intensity": 68850
		    },
	  {
		      "mz": 1147.5728,
		      "intensity": 4174000
		    },
	  {
		      "mz": 1148.5757,
		      "intensity": 1428000
		    },
	  {
		      "mz": 1148.7032,
		      "intensity": 18870
		    },
	  {
		      "mz": 1149.5806,
		      "intensity": 38020
		    },
	  {
		      "mz": 1240.5594,
		      "intensity": 10420
		    },
	  {
		      "mz": 1241.5698,
		      "intensity": 37160
		    },
	  {
		      "mz": 1242.5698,
		      "intensity": 11220
		    },
	  {
		      "mz": 1258.6029,
		      "intensity": 151000
		    },
	  {
		      "mz": 1259.5912,
		      "intensity": 143600
		    },
	  {
		      "mz": 1260.5887,
		      "intensity": 45460
		    },
	  {
		      "mz": 1276.615,
		      "intensity": 1244000
		    },
	  {
		      "mz": 1277.618,
		      "intensity": 466100
		    },
	  {
		      "mz": 1311.6381,
		      "intensity": 33930
		    },
	  {
		      "mz": 1312.617,
		      "intensity": 11950
		    },
	  {
		      "mz": 1329.6384,
		      "intensity": 48730
		    },
	  {
		      "mz": 1330.6301,
		      "intensity": 115400
		    },
	  {
		      "mz": 1331.6215,
		      "intensity": 31820
		    },
	  {
		      "mz": 1347.6526,
		      "intensity": 1086000
		    },
	  {
		      "mz": 1348.655,
		      "intensity": 462400
		    },
	  {
		      "mz": 1458.6696,
		      "intensity": 11730
		    },
	  {
		      "mz": 1476.6924,
		      "intensity": 9166
		    },
	  {
		      "mz": 1486.6791,
		      "intensity": 9813
		    },
	  {
		      "mz": 1487.6658,
		      "intensity": 9117
		    }
]


y_alt = [
"PVIEEKPAIPVVEK",
"PTDAQTKQSTSEPAS",
"DGSKASKTEPSANQK",
"KAVPEEKAPLPIQK",
"AVPEEKAPLPIQKK",
"ITGSPEIQVVWYR",
"PTFSISDVERIRK",
"SNLQVVEAISQGFR",
"NGPTSLASGHFTGSSK",
"TYFSELTMELEGK",
"SLGDLFHKGYRVR",
"QGGSNIFITVKQKK",
"AGTTAGASEIKREEK",
"VISSILAFREKER",
"MQRPSNLETSGISK",
"RASSRSEHSGGTSTK",
"ESLFRSSKEPLVR",
"EEKEEEEQEKLK",
"DIANENEAQFQIR",
"EMMRFSWQNYR",
"EVSKAASQPDMSAAR",
"EEALELINGYIRK",
"VGSSPKNLEEGGSMR",
"FHPPFIVESYRR",
"DLEINAEEETEKK",
"DNAQTSVTQAQQEK",
"VKAITAATLQFAEGK",
"NSSNTGVGSPSNTIGR",
"TLGDGEKAGKPLFSK",
"SQASTVSANIASKKR",
"DKDRNWDDIENK",
"LLNRLLAHMPLEK",
"YSLPFLVAPGSQLR",
"EAIFTKNQQNARK",
"MVLMYIHSQLKGK",
"SAYQDRDKPAQIR",
"VKSVSHDLEQLHR",
"GQPYAITSDTPELR",
"KDDSLGDRGDWQR",
"PPMGMGKGFSEPKGK",
"LKLSFEEIERQR",
"HYAQAPLWPVGPIV",
"KLETQEILSEDDK",
"DFHENQDFPRSR",
"PQRAHRTFPVGPGK",
"PFVISRSTFSGHGR",
"IPRDRGPAPATAGLR",
"TISDPEVFLQASLK",
"TLAVASAKSEVKESK",
"SGKVLVVWDESSNK",
"GITITAYSPLGSPDR",
"LWEANTNRTLTTK",
"MAAEEMQWPVPMK",
"DLEHNVSPGYNFR",
"VNVASSKTVTTLSIK",
"PIRQISDYFPRR",
"SVSQVETEGAKQER",
"MLQETVTKEAELR",
"VGDAIAQRILKAHR",
"APSMEGTAGKVGGNGSK",
"VSSAAIAHPFGVHVR",
"TAFNMLSGKPSVAPK",
"TFKTSEFNVYALK",
"SDLGVGVFTPTVEAR",
"SSDDQPSGGTTVLQR",
"KPEKPTSSGFQWR",
"IARDGLSTSATTNLK",
"MALTPQRGSSSGLSR",
"PRPTSMTFLEVNR",
"FPPRFVQQKSGEK",
"IDNLWQFENLKK",
"AIIHPKSSPEISLR",
"PPLQQSQVPSPDVR",
"SFIFPMDSDFWR",
"KRHSELELGWHR",
"LIQEKDFVSTVIR",
"KPQAMHTGLPNPTR",
"QQVQQLHELLALK",
"LFITWTNQKIRK",
"DILLEHSLQSHKK",
"DLQKFQSNQLAQK",
"AEREDEDREASLK",
"RSPRGPSQVSAHLR",
"PHATQLYQHVPEK",
"NEKTGKPSDSLSER",
"RTFLLVDSVVGITK",
"NALTPRHLQAWLK",
"LSSAGLVYLHFGRK",
"WLGSALHGRGPPGSR",
"GSLPTSGNISGFVRR",
"VKNGKMSVDEALEK",
"PETDKEQESEVEK",
"MTSIEKQLSEILR",
"VGQSRTGVILKYVK",
"GIKVEKQIFGEATK",
"GPIPAPPATKWQER",
"EGKDFNYEYVQR",
"GYFSLVEHPQRSK",
"NGSDDDDDEKPGKR",
"AAEGDYLLQAARNR",
"RLNHSYHPVSLPK",
"HDHAVQPRFSVVR",
"PRSSPHFQHAEVR",
"QKSLLSLGNDSEEK",
"ADEAAPVGNYEQRK",
"GDGRDLQERGDSDK",
"VKWSILLEDIFGK",
"RLLEYQTVLKER",
"SASSTKSSSTDPPAPK",
"LMAEIQDLKSKGSK",
"EQAQWTPTKFPSK",
"ARLLGTAPQPSDPPK",
"SEESSQPEGAVSRGK",
"GKPGDMGPAGPQGPPGK",
"KLLQEHKAVILQK",
"SPHITGAGASAGTHKR",
"VQTSEEGMPLSTIR",
"TGSEKTKAQDNQLK",
"QVIEEQTLPHEPQ",
"KARLLGPTVTLGGHK",
"GEPPPNPDPSQTRR",
"VLDLAYEKRVSVR",
"YRINLSILSPDTR",
"TQSSLVPALTEFVR",
"RAQEAFSLVRENK",
"TITDQSLDEAQAKK",
"GDQSVMMIEQGKPK",
"QYALDTPGAAGEARK",
"VVSRPDGTVVFESR",
"SASGDQSDQKTAPKK",
"DHALMTNFRDSLK",
"EADTSVESVVDVVAK",
"LSLGGYAKLGGDLGAR",
"VKSVYFPPIGRER",
"PQKVAAHITGITRR",
"DSLKPEAARYLER",
"HKAPIINIGIADTGK",
"RGSLETKDEIPFR",
"YFQLRNVTEHLK",
"AMVQFEWHDGTVK",
"YNGYAPSIGYLSSR",
"EPGEPPPGEQEEPR",
"GRNLLSSTQSFIPK",
"ELTAAIDRAFEGVR",
"QEFETERKPDLR",
"EDRPGAHIVAETPR",
"YLDTTEDADSYVR",
"METPQDSRQSIQK",
"PAEPAFLSRFKER",
"EIQAVTGNSQVFVR",
"YVEVTLLSAKRLR",
"WQLGSEAADMRKR",
"MAHLRGFAHQHSR",
"SLDLLTMKSIDRR",
"LQKLGFSDTGPDNR",
"LVQHHSAEPSSLDK",
"TSSTASAKDRPLSAR",
"LPRLSTFLRESTK",
"EKNDVINFKALEK",
"GHNGSKRAQPPITGK",
"WDLMMKTKEHTK",
"GTTITALAQMRLSGK",
"EYGQLLKLLELTK",
"EVFEPSPWNSLSR",
"LRQQVEAHPVSRK",
"IFDTYGGAQRTYR",
"PGPPGFQGPPGTEGPR",
"VTQLRPESHHSEK",
"ALGQFRLSTQWLK",
"LSQLQESHLEAHR",
"DGYPGKAGSPGLPGFK",
"EMLNIGDLEAWEK",
"LPLHSTPKDGGPGSGK",
"ETFNSHRVAMDLK",
"MITEVILFSYGFK",
"SPALIALRYLFQR",
"RYGVSQPDAVAAWK",
"TNKPAAPSVSHVSPR",
"PWASAVFDLTVSVR",
"QIAEAYDVLSDPVK",
"AAAKMREIEQSWK",
"VQSKAVDDSEEGRK",
"LDLITHPLENVRK",
"EVKVKEESETEIK",
"SSYEDYTDTPLEK",
"MDAVSTATQGTGRPR",
"ENEREEEAEQER",
"LRQRSVNEGGYIR",
"SDGLRSPGEVVYLR",
"KADIDLASGSSAVEGK",
"HVALAVGGREILKGK",
"KEIRHSMGYEGLK",
"VIESEKLDEATEGK",
"MEGLVLRPAKDYR",
"SRWYSMKETTMK",
"RLSEQELLDSSDR",
"LGELINFLIFLQK",
"NLRLAYKQEEQR",
"VRNFKLEQEQEK",
"EAFREQKEELLR",
"SHQHYDLSYRNK",
"ILLTVVDLKHRIK",
"AVDFGAKGGGLANAGDK",
"FEFHTPDVETTPK",
"ALGLHKLHLSDTSR",
"PQSIPSNGSSALSFR",
"FEIVKELEERQK",
"NRYPQKNLLFVR",
"QATLIPDDLFDATK",
"LEELIQLAVNHLR",
"TVASETLLSLGEDGR",
"KLGAMVEISTEELK",
"TANDPVNYLERKK",
"LLRALSSFREEAR",
"FAWAVHFEKEGVK",
"EGGSNENDDQNLGAK",
"TVKELAEQLEFIK",
"DSKVVEMVEEKVR",
"VMSGGEELKNPSSGR",
"VKKLEGSTGPYVGGR",
"PQFEVEDVTWVAK",
"LQEEEEQKMQQK",
"AESTPSPALDEFQR",
"GGYAWEPEIERLK",
"YPSHVDSDDRDNK",
"KQKQVTIFINSGGK",
"DLAMLSSGLRIMLK",
"SDEAKKADAEAQER",
"LEEAARKFEEVVK",
"ARDEDFHELEMR",
"WLDIHLVPDRRK",
"KFDHSGGTESILEK",
"NKGEQEDIWDSVK",
"EVAIKPVPSVEHSR",
"DDLRNAEVEMTVR",
"DDGKNSGLTSSPKNK",
"YEFQEDIYSIIK",
"FEPKAQHQYMLR",
"PLLRRGMAEYITK",
"QKVEMAMLLEEVK",
"GMKSYKLDAFFLK",
"TGAQEEEEEQELR",
"QSVDSGAIGMAVGIDK",
"AQSEDSDAQLDGRR",
"REHQEYRNIFR",
"VPAHGLIENQLTQK",
"AQGVSMQAVGEEWR",
"GEKLLANAEQAYLK",
"THVQGIFDIFGEGK",
"MEYPVPVVTKSGLK",
"EEKVMLVSESKLR",
"DHFQHQRESAHR",
"AQGPGKTSGKLYQGR",
"DFDQQPASGTLVNR",
"YRGMKDTVSHLIK",
"QRYIESSVGGAQPR",
"MRLSSVTTQQRLK",
"LKSELLKYEVVAR",
"GYLIQMKPTLEVR",
"QQALRASFETLQR",
"KEENSTKANGLTQK",
"RQQQVSDAAAKMSK",
"QGLSKDVKETTADR",
"MNGGNFDISSLQHK",
"EGSGNMWWLAPGSR",
"ESMKTVINNPWTK",
"AQEADASILDSGDKK",
"MVFHHFSNSKWK",
"EKQKALQELAFSR",
"NHNDPTSSGSFSGLK",
"RSEEGDALDVATER",
"TVNSSPPLLTYSIR",
"TGDTTVVQILSGSNR",
"EGLDTWLVNTLMR",
"LWLLEENEMSRK",
"ITITEENEENIDK",
"LLLPTPSYQSESGR",
"DLYIFTGEIVLHK",
"ILVLKNMNGAEFAK",
"EASTEEVSIDQIAR",
"GESLLIYDPKEKR",
"INQTPGVYSGGLDVK",
"TDKETVTPESPESK",
"TGESSMLVRTTTHK",
"GPKPQPVRQGVGVTK",
"TKELLVFDEGIRK",
"ENVLFGISVAVFPR",
"SKENEQQRLLFR",
"MYREGRGISFGFK",
"AAPLLRALGPVRTGR",
"GTGHLLRTAEDLHK",
"VMVEVSGETLWGIK",
"MESFKAMSKDFAR",
"LTGDPSWWHAIHK",
"PEEKLDYELHFK",
"EENASNNAASNDRR",
"HGPSLVRGSYLPHK",
"GMFKMIYEGEQSK",
"LTIISPIDKVHRR",
"PNKDLSGIIAHVKR",
"LKEEQAAQLEFNK",
"PLDQGLQLIGQLPR",
"EHNSYQIYIPQR",
"GTFYLVRAPVRIR",
"KSRTEDLLAYPVR",
"LSAHYMRIYHEK",
"MELLTPNGTTKSKK",
"KLMRENGQMSTPR",
"VRYSSAEPRLELK",
"MPSSRQGSGWSLVR",
"SLSESPVDSVDERK",
"QLSMLKILFTEPK",
"RARIHNGYYLER",
"NLSPRLFSTRNDK",
"AFYYIAEDVIDTK",
"TGGVMNSLYDVTYK",
"SLELPSPPLPELKK",
"HMVNEELKYQEK",
"FLHLDELYDNLR",
"MTGDLSNGGEYYIK",
"RRGLYQESIGQIK",
"SPKHLPWEVAKQK",
"LYEQIWNESLPR",
"ANNVSNRLGAFEQK",
"VLLEAEHRQLLAR",
"LPPAAARSPSTRAPR",
"HEGGDKQIFIEFK",
"AEFLERNDLRER",
"HHWGLELESRKR",
"ELQMIGPHPQELR",
"KWITNLLTKQFR",
"KQLLSYDPVDANGK",
"VLSTTAIESDPDATK",
"IGTEARDLNMWNK",
"AQPDAFDIQLNGMK",
"KIDEEGRTFHSTK",
"LEIGQYLVEIKDK",
"ELELYLSILEGIR",
"SARLTMSASPVAGGSR",
"KSTAEDLRLYPVR",
"AVNNHNSFNMNASK",
"KDKQLTLPSGSAFR",
"PVQSPGYAIVYLLK",
"QANTEEELETKKK",
"QHDVGQAPPSIDQR",
"LIVTSVFKDEQIR",
"LQLNEGQEMSENR",
"RVLEMEISSKDLK",
"AMQQRQSAKDSGLK",
"GTFFVVEGLGPRLR",
"MNVLAKHYAFILK",
"RLMKEEITAITDK",
"EAPAPIPGGLWGTGPK",
"PSMTVERPGMSAER",
"TKQEEEEKEELR",
"DMPDWHFSPYPR",
"HKATDTFLERDSK",
"SKARNGPMTLTPFK",
"HHSNGSLNRGPDEK",
"SVESLMNELSAPDR",
"TNDSVSTLSQSPRR",
"ENDSTLAFALPTIR",
"SVFEVQADYFTNK",
"TVEFLMISANTHGK",
"RLGFHLYVLGASSK",
"LQSGSKGPRTEEMK",
"MVVPINGYEAADLR",
"NWRSDNSILSNNK",
"FDTKFSWYKGLR",
"MPGAVAAQAQMSMVR",
"GEPSVQSISSVSSKR",
"KGDSQQHKPDHDR",
"GGMFYLFAEELDR",
"PDQLKQDKETQSM",
"ERVKEILWLPHK",
"LDVTSQPYITAVLK",
"GSERQWQPSETSR",
"ERNQQSSQMGQVR",
"WTMDAELALIQEK",
"NEENSLEAGQETVK",
"DRPEETDVEMKAK",
"SDLLLESARTRMR",
"RVENIDDQEQSSK",
"ALAMNENMSVKIVK",
"IKMMLSDILDQLK",
"QPEHPLTQEEIVK",
"VLPRPFHDPIQTK",
"LWESQVNEEEER",
"LELEKMKESLAEK",
"QVQRRQAQQLHR",
"GGYYNMIQVSPYR",
"DELKDRIFQGQAK",
"RSYLLQSYFQDK",
"PEVFLTSLQSNANK",
"ANRLQIKEEQYR",
"DLPEPAASAAPAPAAAK",
"ESRYQAAASSGHAGR",
"LKQSGKDYVLVVAK",
"SVTQQEIELELMK",
"VLAQRYQEEKQR",
"VLLLMKKVEPSYK",
"KMRAELIDEEVSK",
"QRSPRFEPSNTTK",
"YLQKHKTDLVFR",
"RVVHAEVLATPVEK",
"VATVESGGRVAGRGTM",
"VVRPGRASQPTSHR",
"VAGGGGGGGAAEGGGTVVSM",
"DNLYKPYSTYVGK",
"VNFFMSAMQGMER",
"EETSHQFTQLDGR",
"SPPDPKLQPVPLEM",
"KQVQHISVANVVPE",
"LMPPGSRGPGARVPR",
"YFHLADIAVIETR",
"LGKMEGGIIQFGLGK",
"QLRLKVMELVYR",
"AEIPIGGAALEELHK",
"VGGEWSKDRWGDR",
"HKYQFFNPPELK",
"MVFAPKVKSLHYK",
"DYKIEGIVDVKIR",
"ERAEEDRTPWMK",
"QFYKAPKWPNLR",
"KLLFAIEEQLSEK",
"RAAAEPSSTLSSKSR",
"VVHRNLAMLNPKR",
"HSYLTKLARTETK",
"QIEGLDGEFAAELR",
"QAAMMMPQNIVEGK",
"IDTPASTVSRGTKSK",
"SVHYDHGKARSYK",
"SSGEEGDPDEEKLR",
"RPLSISQNKYWR",
"PPPAWELNRGRVR",
"ERFLQYPLVARR",
"LLEEEDHTMMGDK",
"TIHETLQTRSSFK",
"LRVQNGASVYSVVR",
"PEGTHIAQHTTLSR",
"WDSRLREEWDR",
"SRSRSSSGSGSYSSR",
"LRTKVESMASAAAGR",
"YNEGTPVSRRQIK",
"PGSHIHQKHTLHR",
"IEHSILHSSHIFK",
"KLASLLTVEVRYR",
"RGISALEELEATMK",
"IYEDGFVDGNQYK",
"QAGSNFAVGQQSPTR",
"ALPYTYLEMRYK",
"RLGVRLVLFFVTK",
"TNGIVEAIAGFKDGR",
"LFPVIEPVEFTEK",
"TEEKESLKTIIEK",
"KPEHAESDMMTSGK",
"VSSGRVFIGVTQLGK",
"MGHAQAERYELDK",
"FSSLYELAVEYVK",
"QTIVASVPSEIFTR",
"PNSPQPEPGQGAIKK",
"AKALFEVGQTNLTR",
"PEPGRLEPLQQKR",
"LVRDVQHLPGSKAK",
"NSAQREDWREEK",
"RDMLEDQIEASIK",
"VKNMGSLEDSPSKR",
"SHESRDTGESRMR",
"TSVLGAEKQLMQSR",
"MSQAPDQSPFVGVGK",
"SQIEMRAGIASNDR",
"EAAASPYHRNEFR",
"QKLESQEVLMSQK",
"VVMTMYGVDEEFK",
"TSLKYKQPVINTR",
"ELVLAVSRYLEQK",
"EEKNSNTTENLLR",
"IYRTQAGGYTDFR",
"IFQSKSGGQHPSFK",
"QRPESPSSSSSSRR",
"PSLRESISPVPPIR",
"RRGGPPEPLSLLAGK",
"KVTAEDIWNGEASK",
"MGLMSSINVRVKGR",
"GLGSQGRPGHDGKPGK",
"TPDGSYQALAIQRK",
"GRTVTEVSDEPETK",
"SLWEQKLDSSAVGK",
"PYKEEVDFFFVK",
"AVGLVQDVTMGTKTK",
"VANVAMMVPDDEEK",
"AIENEFKPIFPSR",
"PQGYQVPQFRLSK",
"RQEFSLQAQEALK",
"KGEPKTPLPLGEGPK",
"MGPAGPAGPPGPIGPFK",
"ALIYSPEEGQSEPK",
"WVNKTETKDSVIK",
"ELEGSQGQLKAMEK",
"LLFKLQADEITEK",
"LFIALIDKQSPDGM",
"LPSPEKRPNPTPSK",
"ANLYSLEAQAPKSR",
"APALLRHERLDEK",
"LGVPSWQHQSGVPR",
"QIMNLSLANLKFR",
"LGDALIETLSSGSER",
"QPPSPLALPLVEMR",
"WSFTKTKQPSLPK",
"IEANIHDLFNPHK",
"NEGFVRSQVSLGVR",
"DFVVALYKQLHSK",
"RLGSSSGNELISEAK",
"GGRPAPRPLLDGLTK",
"EIETESEKEKVVK",
"AGGKDDELNENEEK",
"NQGEFLDWPSKVK",
"QIRLSGPSGPGLLPR",
"IIGSELLLTKAFDK",
"LEAYSQRKAAADPK",
"KEEEDFNLVRLR",
"LWFISMFYQGKK",
"IALEAALKEGTYLR",
"FRYQSSYEAQLR",
"VIQNSTQGPRYER",
"SPPPPPPSFAERLR",
"AAQQADSPVRVMFK",
"GYPSSMLVLRLALK",
"ERQAYRGVAPSVSK",
"QWEALKIDFRNK",
"ESKSSNYFELESK",
"LKLAQLFSLEEEK",
"LIYGGENVRSRQR",
"SLYVESPDKLPSGR",
"HRTDYQELDATAK",
"QDKHTPQLNVIVR",
"GDWSGRLVSQEWK",
"YALKDVALGVKENK",
"PSINSNTTMANLER",
"TRTREGSDGTGGEPK",
"KNSSSQKTWYYR",
"RHARPQATVTAALR",
"ILLSSSALALFKER",
"LEGEGDGYPVDLQR",
"SIEADLVSQMAEVR",
"RKIIHLPEDIGEK",
"GTSRKIVTIQPGYK",
"EWQRSDASSGLRR",
"EHSSELLESFLTR",
"KDQAKEAPAEASTAM",
"VLKYNLLGTLEER",
"IQFIYMFVTEEK",
"GPILQFTVIPPLPR",
"AIYGLLKEGDITVR",
"EMGSHSVNGTAENSK",
"DGDFIEFTKYKGK",
"DEDHLSQVHQALR",
"GVIGMINFQDAAALK",
"HWAGQGQRQGPGLR",
"SAENESPWERKSK",
"DDHFESVQLKSSR",
"DSLTDVNWPMKNK",
"LITITTTLFPKGSR",
"EPRATDNRGQYLK",
"PTGAGSAQTTTIITTK",
"GTLVSVVGHQIFYK",
"VYEEKTENDKHR",
"APQDVAMEDLEDKS",
"EGEEGAGNKEEAAEK",
"LTSLPAEESTGEGTR",
"LGSWFRLPFLRR",
"LRIQSEEFSLLGR",
"QDMRNSLLNTVTR",
"VKQDSASGKFVLIR",
"LFDIEALTDLLER",
"VLRALPHLDPFGGR",
"SHLTAHFGQHERK",
"QSLEREVMAEDLK",
"NLTDEKIMSVLER",
"VWEVPELDAQYAK",
"MPLSFGVRSVTTPR",
"ENEDSSDAMTPVPR",
"RQILYADRQASVK",
"KASVLFIEGNMNPK",
"SDGRKYPELVLDR",
"AALPPVRLAALEAKK",
"MMKEDISNNIPKK",
"DKTSEDTIRLIEK",
"KNEVVVEFRWNK",
"DVDIADAAYYFER",
"HRKSSSDSDDEER",
"REHVSNGPGPIIGSK",
"HQKGTEYQDASRK",
"KQASFAASASAQPRK",
"DRLASFTDVRVLR",
"EVENFLRNVGRSK",
"NLFQQQSSEVDPR",
"TSGAKDDVSPEEQGK",
"LHVQWGPTAASPAGR",
"TIETTSLTLTIGGLK",
"LLDQNKDSLINFK",
"LKVSTMEHQFSIK",
"VWASQQKATSQASR",
"HLEQKGLLFFTSK",
"VANAILFFRLDIR",
"EVKSSPSESPLMEK",
"SFQELLNQVGSLGR",
"VLTALSHKLEPAIR",
"GGSGHPLPELADELR",
"SHSQGRDKLFNMK",
"QKVDEKETNLESK",
"AIAQMGMNFYFVR",
"DMTDMRSKYSGTR",
"VPLQPPYQLHEVK",
"AKQLNNRVNHIIK",
"PDDFNELDEVAQR",
"LTVFARNMIRAQK",
"VQRAKQIEDMSSR",
"NRGLMAESESAKVR",
"YIRIHPTKSYNR",
"RLEGEDDPDRSMK",
"FLEVFMETQTFR",
"TDEPDSPSSRDWR",
"GLENQDEDKDKEK",
"EVKHLHRMLQEK",
"AEVQISLTLETDTK",
"SNNRTSQFGNFEF",
"KYQPNIDVQDSIK",
"DHYLAAHAEQQHK",
"GPGDGAEEDESNTGGR",
"PSAEADFQLSEILK",
"LHPFSLSQAHSPAR",
"GVLEQGWQADSTTR",
"NQLLPAVKAHSDVR",
"LKTLVDEENAFLR",
"YPRKVAFISELPK",
"LLSKDRLVLTYVK",
"ASVHKHVVFLEPGK",
"HMLGHHAEMEISR",
"LKSHTTVIHQLDR",
"GNVLFGSWFEHVR",
"GEAHDALHSLIQEK",
"ASSTVAEKVEDQKR",
"KQPPMMLNSSEASK",
"GETRLEQISYPVR",
"RASELEHNVDHLK",
"VRAQNSSGMMGGPQK",
"GMPEKSELDELGDK",
"GLFSRAEIEIAVSR",
"GNQLESTKGIYLPK",
"LHATHNLMELLGAK",
"AEIFRNFLIIRR",
"FDSDAENPRDEPR",
"GAGEGGKDGEGGKEGDK",
"ITGDVTISFPSGIIK",
"AHRKLEIYFQSR",
"SHSSGHGTYVFRGR",
"GSYLYNMKAHHVK",
"TPSLPDSDSGELSSR",
"NTVDQIWSFGPRK",
"YLGLPGSLKWEER",
"EHRQQRPSSPVAR",
"DGRLNLDYKALNR",
"ILSSSTGGRNDQGKK",
"SEPPGSGSPAPPRRR",
"KLSADHSFLNEMR",
"HSSPEPHSAVEENK",
"TRYSNQDPTVPNR",
"SPGDGAANFASISILK",
"DESDLVGPWAESDK",
"GMQVQMYYKIMR",
"HDPFVAPSNRDHR",
"QNDILKVLYDAKK",
"DHEVYYLMGHRK",
"MKIVKVEFALNQK",
"SLEAEVADYHASKK",
"PEQKEMENQSSLK",
"PEDVDTSAEDKEGR",
"RAPGPRIAAWPSLR",
"KFQSGLTDENRPR",
"VILFAKGSNDEAQR",
"QLSSTGLAVARGFIK",
"QLITGQTILNAYGR",
"EDNDNLVSLGKESK",
"ASGPSLALAAYWANR",
"AAYQADLEPVEWR",
"TDFATKLERLIIK",
"TTMSLTVGLQQLQK",
"LQKSDMSHYLGLR",
"ERSGVRNLFNEVK",
"DHIFAFSGQSLGLR",
"NQELLVHRARSPK",
"YMSLLEIPRQAAR",
"INGGHELMDHIRR",
"GPPVVGLHQYVEPR",
"PESKGHNVLNIIVK",
"FPDTLLLLEFDPK",
"VSSSAITNAKNIKSK",
"GKSLRFADYVHVR",
"TELEKESIAAEATR",
"TENELHKHQQRK",
"KAEYGSIHSVTDLK",
"FLGKLWKQIWTK",
"SRDQVAAPHIGKIR",
"EKGPTGPPNGAGPSGPK",
"ELVSESLFKQVLR",
"SVLLTPSSTPFDKR",
"MLAKKHVSDYISR",
"PLRIYAPQTDAFR",
"KESQPSHPEDTHR",
"ESQPSHPEDTHRK",
"WTWEFLGPERVK",
"DEFYYAADAIDVR",
"SWEWSKLRTNLK",
"GAGLRAPDDEFDER",
"LLSEVLWDEALEM",
"FVFSVPPNGEDALR",
"LGDQAKANTARQFK",
"EEIVIGSDVESDQK",
"SQDSATKATLNGARK",
"LAVLQEFKDLESR",
"SLKNMEEQRVEGK",
"QVQALDEALGYRGK",
"LAPKLVEDQYIMK",
"ALFGYVQWPSSHR",
"LMRSDPDDEGERK",
"DEMTRDSPVEAAAR",
"KYVSGKPGPVSDDAK",
"YVSGKPGPVSDDAKK",
"TKEHADAYTVEGAR",
"PAKLSTFLSAKSLGK",
"DLGEVIKFESVRR",
"LNYLWDFKHRR",
"DMQKRVEIEDER",
"TLTDVIASVVKMDR",
"LQMRDQLSSLAASK",
"RKMAADSYAHEIR",
"AAPPPPSRRELSNR",
"NEEYTYGVRNFR",
"KEQGAHVTPDYFR",
"KHESLNFLLKYR",
"EVVRVRYALSVTR",
"KIGIATEEVGFIDR",
"NGRKTEAESVSIEK",
"HIMELENQSKYR",
"SATVQMTVTDLLLR",
"EMQIQNKIRIFK",
"KTKDMVTFYGETK",
"TKDMVTFYGETKK",
"SQSIMLTELTSLPK",
"DFTDWVLSSAPPGR",
"GWHYRGLTPFVSK",
"DENDEVPSGVFAIR",
"FAPLNDVPYVTPSK",
"YVPNGYLSVASYSK",
"HVSLGWVLAKYFK",
"FEGTVPDRRTLTR",
"DTKNLIMLDTNNR",
"TLEDRTPFAIKEK",
"YNGADNLQQQRLK",
"ATDTELTLSIQVEK",
"KLVDTAAGMSGVSRR",
"MFTKVPNATGKTPR",
"DKNIHYYIALAVK",
"YLQWQQYFEDK",
"EFTMIQDSRRHK",
"QTSNENAWQQWR",
"SKSDIGFALQNIVR",
"EPIERGFVMRWK",
"QLEELARPYLSTK",
"IGTVKTPLESVFEK",
"IDQDVGPREYVTR",
"TEEELQSSKKLQK",
"VFTVFIRKEGVPR",
"PATGNADSPSTSTADR",
"THNPIKNSLHSGDK",
"GEHHGHFSPHLHR",
"ATAQLDKALTQMEK",
"ARDLIDQILFSTR",
"PAERAEEKMETEK",
"SGDLKYDEYDQSK",
"VLYQNQPNLEMAK",
"WGNKIISAKDIFR",
"KDLVVFDNEANRK",
"LQWEESKDTQQR",
"LYNLDGLWIVVDK",
"APGGGERPGTPGGAGPGR",
"VLSLPIHQILEASK",
"LTPSTPASIRADYR",
"ARLAIEVRIELHK",
"YHALSLFDLLVEK",
"MSHGNKNSQLYLR",
"QSIKQLSRTFDPK",
"SALIVHERTHTGVK",
"QTGRRTSEEAEQR",
"RQAAAAVHPGKTVNK",
"HNGNVVVAGRPNASR",
"VQENLLASGGSDSDR",
"TPKSPASKPLVPVVK",
"VSRLAISTLGDLFR",
"LRHLFYMQRQR",
"NKLITLMGQKTSLT",
"QRRSTVPLPLAPGR",
"WVEVTMLRRETK",
"RWYVSTSHSLRR",
"NSVDFQGRTIIAAR",
"AFAVIYALQMHKR",
"DGFIDKEDLHDML",
"MVKFYEDEVLFK",
"EEQLKNSTEEIMP",
"WVGNSAVSRIHPPK",
"AFNKNQVVELTER",
"HNLSYFPTVNDIK",
"EHNTELDKAFDTK",
"GAEKPRFSILQSSK",
"NLDDTIDDETLRK",
"SKPEHLHLTVGDSK",
"REAPRDAPPLQAAR",
"LAAALLGAGPRRLLR",
"ENKEQNQGESAGEK",
"EETFVKTSDPAVPK",
"RRWIFLLLFVGK",
"SILSPTGLMLDGTSR",
"QEDGRYTTDYSGR",
"TTRVKEQQGTPFR",
"NTPVDEPQHEIIR",
"EVSGQLLYVGRAQK",
"LHIYLEIHPERK",
"VLAQEMKKIFVNK",
"RRAYSTNQISSHK",
"GLTGDIYLDKSPLR",
"GRRQSPLPPNNPSK",
"FRSLVHTYVNRR",
"NTNTYIQELVPQK",
"KYLENIREELIK",
"YLENIREELIKK",
"SLMLDTQVVEREK",
"EETEGDKLAKENGK",
"KHSMLFSFASHKK",
"NNRSRALFLGNSAK",
"VFSKAIVNNKNVSK",
"NKVYLRSPNWDR",
"WYRAPELLVGDTK",
"LEEANFLQPHPPR",
"QKFLINEKTGEIK",
"LMEKYKLQLLIR",
"EGDGKYSQLRGIPK",
"VSRSSTWAKEALGR",
"QLMAAEYVDSHQR",
"EESQYKQEHNKK",
"NKISESDKTVWLK",
"AWASLLLFDQDLR",
"AMRTRLTWQQEK",
"VPLSQPRRSPSPVK",
"VVTVKRITEYVLK",
"KGETGYGSPGRPGER",
"RVSSSENSHKSSDK",
"LLAYPRSGDERDR",
"ADYVHKTKTFPIK",
"NHAEAEGSTEDFLK",
"VFQMIGRNVITNR",
"DLRMELEAVSEQK",
"PLESRWLKYLDK",
"TELEKALIQFEAR",
"KPPPRTNQYPHGR",
"QESMVPVGYIRLR",
"LLRLLAEPILSGPR",
"SRSSYYSDYTYR",
"SINALQESDSGASLR",
"NPSPKSSVLTSRFK",
"EHIKIKHSLSSLR",
"YNTVPSHTSALTTR",
"SLDTILDETANDIK",
"LGQAAELSVRPHNR",
"ERYQLRDDALIR",
"TWKDELAEEDRR",
"DKNDQTDVEGPAMK",
"GLGTNRSTQASTARK",
"KETKIAQWSESLK",
"ETLMWVLNGSGGAGR",
"ISHLIFHQLNPTK",
"LRSAEWPNNAAYR",
"LQFVMEDNDVPLK",
"DEMDELEVDEPVK"

];
peptide = peptide_1;
ref_exp = ref_exp_1;
var x = [...Array(TRIALS)].map(x => utility.randomizer_b(peptide, offset))
x.push(peptide);
//x.push("AEAEAQAELESFPR");
//peptide_3 = "AEAEAQAEELSFPR"
var y = uniq(x);
console.log(y);

y_alt.push(peptide);
//y_alt.push("AEAEAQAEELSFPR"); //original
y_alt.push("AEAEQAAEELSFPR");
y_alt.push("AEAEAQAELESFPR");
y_alt.push("AEAEAQAEESLFPR");
y_alt.push("AEEAAQAEELSFPR");
// y = y_alt;

const pos = y.findIndex(x=> x==peptide);
var modStrings = [...Array(y.length)].map(x => "");

var a = utility.create_post_body_for_prediction(y, 2, CE, modStrings);
console.log(a);

abc =d3v4.json('https://www.proteomicsdb.org/logic/api/getFragmentationPrediction.xsjs', {
	method:"POST",
	body: JSON.stringify(a)}).then(json => {return json})
	.catch(function () {
		console.log("Promise Rejected");
	})
	.then(e => {
		ref = e[0];	
		ref.ions = ref_exp;
		var ref_spec = stuff.ipsa_helper["binning"](ref.ions);
		return e.map( el => {
			var pred_spec = stuff.ipsa_helper["binning"](el.ions);
			var mergedSpectrum = stuff.ipsa_helper["aligning"](ref_spec, pred_spec);

			var similarity= stuff.ipsa_helper["comparison"]["spectral_angle"](mergedSpectrum["intensity_1"], mergedSpectrum["intensity_2"]);
			return {"similarity": similarity, "sequence": el.sequence, "precursorCharge": el.precursorCharge,
			hypothesis: true?el.sequence == peptide : false}
			return stuff.ipsa_helper["comparison"]["spectral_angle"](mergedSpectrum["intensity_1"], mergedSpectrum["intensity_2"]);

		});
	});

def =d3v4.json('https://www.proteomicsdb.org/logic/api/getFragmentationPrediction.xsjs', {
	method:"POST",
	body: JSON.stringify(a)}).then(json => {return json})
	.catch(function () {
		console.log("Promise Rejected");
	})
	.then(e => {
		return e.map( el => {

			// var binarySpectrum = binary.binary_search_spectrum(ref_exp, el["ions"]);
			var binarySpectrum = binary.binary_full_merge(ref_exp, el["ions"]);
			if (el.sequence == peptide){
				console.log(
				stuff.ipsa_helper["comparison"]["spectral_angle"](binarySpectrum["intensity_1"], binarySpectrum["intensity_2"]));
			}
//			console.log(binarySpectrum);
			var similarity =  stuff.ipsa_helper["comparison"]["spectral_angle"](binarySpectrum["intensity_1"], binarySpectrum["intensity_2"]);
			return {"similarity": similarity, "sequence": el.sequence, "precursorCharge": el.precursorCharge,
			"hypothesis": el.sequence == peptide ?true : false}
		});
	});



g =d3v4.json('https://www.proteomicsdb.org/logic/api/getFragmentationPrediction.xsjs', {
	method:"POST",
	body: JSON.stringify(a)}).then(json => {return json})
	.catch(function () {
		console.log("Promise Rejected");
	})

iz = def.then((data) =>
	data.map((x,i) =>{
		return({"seq" : a.sequence[i], "similarity": x})

	}));

console.log(iz.then(x=>{console.log("here");x.filter(y => y.similarity > 0.1)}));
exports.blub = Promise.all([def, def, def, def, def, def])
exports.blub.then(data => {console.log(data)});
exports.abc = abc
