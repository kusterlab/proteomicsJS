const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const _ = require('lodash');
const annotate = require('../annotate');
const binary = require('../binary');
const AnnotationTransformer = require('../AnnotationTransformer');


chai.use(chaiAlmost()); // tolerance of 10^-6
chai.use(chaiAlmost(0.0001));
const { expect } = chai;
//
//


describe('Annotate spectrum', () => {
	beforeEach(() => {
		response = {
			aminoAcids: [
				{
					mass: 71.037114,
					modification: {
						site: 0,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'A',
				},
				{
					mass: 129.04259,
					modification: {
						site: 1,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'E',
				},
				{
					mass: 71.037114,
					modification: {
						site: 2,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'A',
				},
				{
					mass: 129.04259,
					modification: {
						site: 3,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'E',
				},
				{
					mass: 71.037114,
					modification: {
						site: 4,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'A',
				},
				{
					mass: 128.05858,
					modification: {
						site: 5,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'Q',
				},
				{
					mass: 71.037114,
					modification: {
						site: 6,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'A',
				},
				{
					mass: 129.04259,
					modification: {
						site: 7,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'E',
				},
				{
					mass: 129.04259,
					modification: {
						site: 8,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'E',
				},
				{
					mass: 113.08406,
					modification: {
						site: 9,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'L',
				},
				{
					mass: 87.032029,
					modification: {
						site: 10,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'S',
				},
				{
					mass: 147.06841,
					modification: {
						site: 11,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'F',
				},
				{
					mass: 97.052764,
					modification: {
						site: 12,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'P',
				},
				{
					mass: 156.10111,
					modification: {
						site: 13,
						deltaElement: null,
						deltaMass: 0,
					},
					name: 'R',
				},
			],
			precursorMz: 795.87335013701,
			precursorMass: 1589.7321473403,
			precursorCharge: 2,
			charge: 2,
			fragments: [
				{
					charge: 1,
					mz: 115.05020412311,
					number: 1,
					sequence: 'A',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 244.09279412311,
					number: 2,
					sequence: 'AE',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 315.12990812311,
					number: 3,
					sequence: 'AEA',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 444.17249812311,
					number: 4,
					sequence: 'AEAE',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 515.20961212311,
					number: 5,
					sequence: 'AEAEA',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 643.26819212311,
					number: 6,
					sequence: 'AEAEAQ',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 714.30530612311,
					number: 7,
					sequence: 'AEAEAQA',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 843.34789612311,
					number: 8,
					sequence: 'AEAEAQAE',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 972.39048612311,
					number: 9,
					sequence: 'AEAEAQAEE',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1085.4745461231,
					number: 10,
					sequence: 'AEAEAQAEEL',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1172.5065751231,
					number: 11,
					sequence: 'AEAEAQAEELS',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1319.5749851231,
					number: 12,
					sequence: 'AEAEAQAEELSF',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1416.6277491231,
					number: 13,
					sequence: 'AEAEAQAEELSFP',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 0,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
					],
					type: 'b',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 175.11895115091,
					number: 1,
					sequence: 'R',
					subPeptide: [
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 272.17171515091,
					number: 2,
					sequence: 'PR',
					subPeptide: [
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 419.24012515091,
					number: 3,
					sequence: 'FPR',
					subPeptide: [
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 506.27215415091,
					number: 4,
					sequence: 'SFPR',
					subPeptide: [
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 619.35621415091,
					number: 5,
					sequence: 'LSFPR',
					subPeptide: [
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 748.39880415091,
					number: 6,
					sequence: 'ELSFPR',
					subPeptide: [
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 877.44139415091,
					number: 7,
					sequence: 'EELSFPR',
					subPeptide: [
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 948.47850815091,
					number: 8,
					sequence: 'AEELSFPR',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1076.5370881509,
					number: 9,
					sequence: 'QAEELSFPR',
					subPeptide: [
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1147.5742021509,
					number: 10,
					sequence: 'AQAEELSFPR',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1276.6167921509,
					number: 11,
					sequence: 'EAQAEELSFPR',
					subPeptide: [
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1347.6539061509,
					number: 12,
					sequence: 'AEAQAEELSFPR',
					subPeptide: [
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
				{
					charge: 1,
					mz: 1476.6964961509,
					number: 13,
					sequence: 'EAEAQAEELSFPR',
					subPeptide: [
						{
							mass: 129.04259,
							modification: {
								site: 1,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 2,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 3,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 71.037114,
							modification: {
								site: 4,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 128.05858,
							modification: {
								site: 5,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'Q',
						},
						{
							mass: 71.037114,
							modification: {
								site: 6,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'A',
						},
						{
							mass: 129.04259,
							modification: {
								site: 7,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 129.04259,
							modification: {
								site: 8,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'E',
						},
						{
							mass: 113.08406,
							modification: {
								site: 9,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'L',
						},
						{
							mass: 87.032029,
							modification: {
								site: 10,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'S',
						},
						{
							mass: 147.06841,
							modification: {
								site: 11,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'F',
						},
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				},
			],
	fragTypes: {
		a: {
			selected: false,
				color: '#820cad',
				label: 'a',
		},
			b: {
				selected: true,
					color: '#0d75bc',
					label: 'b',
			},
			c: {
				selected: false,
					color: '#07a14a',
					label: 'c',
			},
			C: {
				selected: false,
					color: '#035729',
					label: 'c-1',
			},
			x: {
				selected: false,
					color: '#d1e02d',
					label: 'x',
			},
			y: {
				selected: true,
					color: '#be202d',
					label: 'y',
			},
			z: {
				selected: false,
					color: '#f79420',
					label: 'z\u2022',
			},
			Z: {
				selected: false,
					color: '#A16016',
					label: 'z+1',
			},
			H2O: {
				selected: false,
			},
			NH3: {
				selected: false,
			},
			HPO3: {
				selected: false,
			},
			CO2: {
				selected: false,
			},
			precursor: {
				selected: true,
					color: '#666666',
			},
			unassigned: {
				selected: true,
					color: '#a6a6a6',
			},
	},
	modifications: [
		{
			site: -1,
			deltaElement: 'C1 H1 N1 O1',
			deltaMass: 43.00581365623,
		},
		{
			site: 0,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 1,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 2,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 3,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 4,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 5,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 6,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 7,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 8,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 9,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 10,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 11,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 12,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 13,
			deltaElement: null,
			deltaMass: 0,
		},
		{
			site: 14,
			deltaElement: null,
			deltaMass: 0,
		},
	],
	peaks: [
		{
			mz: 175.118951167,
			intensity: 0.068374617497934,
			percentBasePeak: 6.8374617497934,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 175.11895115091,
						number: 1,
						sequence: 'R',
						subPeptide: [
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: 9.1886158132455e-5,
				},
			],
		},
		{
			mz: 201.086976467,
			intensity: 0.62503071184472,
			percentBasePeak: 62.503071184472,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 272.124086467,
			intensity: 0.40168133389918,
			percentBasePeak: 40.168133389918,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 272.171711167,
			intensity: 0.37320866185701,
			percentBasePeak: 37.320866185701,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 272.17171515091,
						number: 2,
						sequence: 'PR',
						subPeptide: [
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.014637483472721,
				},
			],
		},
		{
			mz: 401.166676467,
			intensity: 0.21313908556878,
			percentBasePeak: 21.313908556878,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 419.240121167,
			intensity: 0.23850818610261,
			percentBasePeak: 23.850818610261,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 419.24012515091,
						number: 3,
						sequence: 'FPR',
						subPeptide: [
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0095026900891929,
				},
			],
		},
		{
			mz: 472.203786467,
			intensity: 0.13584128118648,
			percentBasePeak: 13.584128118648,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 506.272151167,
			intensity: 0.33811284090148,
			percentBasePeak: 33.811284090148,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 506.27215415091,
						number: 4,
						sequence: 'SFPR',
						subPeptide: [
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0058938832806097,
				},
			],
		},
		{
			mz: 600.262366467,
			intensity: 0.078388912465659,
			percentBasePeak: 7.8388912465659,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 619.356211167,
			intensity: 0.24258169350696,
			percentBasePeak: 24.258169350696,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 619.35621415091,
						number: 5,
						sequence: 'LSFPR',
						subPeptide: [
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0048177591994711,
				},
			],
		},
		{
			mz: 671.299476467,
			intensity: 0.041877387147931,
			percentBasePeak: 4.1877387147931,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 748.398801167,
			intensity: 0.32723693909004,
			percentBasePeak: 32.723693909004,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 748.39880415091,
						number: 6,
						sequence: 'ELSFPR',
						subPeptide: [
							{
								mass: 129.04259,
								modification: {
									site: 8,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0039870575446209,
				},
			],
		},
		{
			mz: 800.342066467,
			intensity: 0.025520761207031,
			percentBasePeak: 2.5520761207031,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 877.441391167,
			intensity: 0.5663320006254,
			percentBasePeak: 56.63320006254,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 877.44139415091,
						number: 7,
						sequence: 'EELSFPR',
						subPeptide: [
							{
								mass: 129.04259,
								modification: {
									site: 7,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 129.04259,
								modification: {
									site: 8,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0034006933321884,
				},
			],
		},
		{
			mz: 929.384656467,
			intensity: 0.018399410332581,
			percentBasePeak: 1.8399410332581,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 948.478501167,
			intensity: 1,
			percentBasePeak: 100,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 948.47850815091,
						number: 8,
						sequence: 'AEELSFPR',
						subPeptide: [
							{
								mass: 71.037114,
								modification: {
									site: 6,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 129.04259,
								modification: {
									site: 7,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 129.04259,
								modification: {
									site: 8,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0073632760556604,
				},
			],
		},
		{
			mz: 1042.468716467,
			intensity: 0.011458589265373,
			percentBasePeak: 1.1458589265373,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 1076.537081167,
			intensity: 0.66078488307163,
			percentBasePeak: 66.078488307163,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 1076.5370881509,
						number: 9,
						sequence: 'QAEELSFPR',
						subPeptide: [
							{
								mass: 128.05858,
								modification: {
									site: 5,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'Q',
							},
							{
								mass: 71.037114,
								modification: {
									site: 6,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 129.04259,
								modification: {
									site: 7,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 129.04259,
								modification: {
									site: 8,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0064873834240102,
				},
			],
		},
		{
			mz: 1129.500746467,
			intensity: 0.0031009805454424,
			percentBasePeak: 0.31009805454424,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 1147.574191167,
			intensity: 0.69608116861361,
			percentBasePeak: 69.608116861361,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 1147.5742021509,
						number: 10,
						sequence: 'AQAEELSFPR',
						subPeptide: [
							{
								mass: 71.037114,
								modification: {
									site: 4,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 128.05858,
								modification: {
									site: 5,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'Q',
							},
							{
								mass: 71.037114,
								modification: {
									site: 6,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 129.04259,
								modification: {
									site: 7,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 129.04259,
								modification: {
									site: 8,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0095714151273964,
				},
			],
		},
		{
			mz: 1276.569156467,
			intensity: 0.001136572781488,
			percentBasePeak: 0.1136572781488,
			sn: null,
			matchedFeatures: [

			],
		},
		{
			mz: 1276.616781167,
			intensity: 0.18514551830426,
			percentBasePeak: 18.514551830426,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 1276.6167921509,
						number: 11,
						sequence: 'EAQAEELSFPR',
						subPeptide: [
							{
								mass: 129.04259,
								modification: {
									site: 3,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 71.037114,
								modification: {
									site: 4,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 128.05858,
								modification: {
									site: 5,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'Q',
							},
							{
								mass: 71.037114,
								modification: {
									site: 6,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 129.04259,
								modification: {
									site: 7,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 129.04259,
								modification: {
									site: 8,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.0086039200787866,
				},
			],
		},
		{
			mz: 1347.653891167,
			intensity: 0.15382111188046,
			percentBasePeak: 15.382111188046,
			sn: null,
			matchedFeatures: [
				{
					feature: {
						charge: 1,
						mz: 1347.6539061509,
						number: 12,
						sequence: 'AEAQAEELSFPR',
						subPeptide: [
							{
								mass: 71.037114,
								modification: {
									site: 2,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 129.04259,
								modification: {
									site: 3,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 71.037114,
								modification: {
									site: 4,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 128.05858,
								modification: {
									site: 5,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'Q',
							},
							{
								mass: 71.037114,
								modification: {
									site: 6,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'A',
							},
							{
								mass: 129.04259,
								modification: {
									site: 7,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 129.04259,
								modification: {
									site: 8,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'E',
							},
							{
								mass: 113.08406,
								modification: {
									site: 9,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'L',
							},
							{
								mass: 87.032029,
								modification: {
									site: 10,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'S',
							},
							{
								mass: 147.06841,
								modification: {
									site: 11,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'F',
							},
							{
								mass: 97.052764,
								modification: {
									site: 12,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'P',
							},
							{
								mass: 156.10111,
								modification: {
									site: 13,
									deltaElement: null,
									deltaMass: 0,
								},
								name: 'R',
							},
						],
						type: 'y',
						neutralLoss: null,
					},
					massError: -0.011118514182157,
				},
			],
		},
	],
	basePeak: {
		mZ: 948.478501167,
			intensity: 1,
	},
	sequence: 'AEAEAQAEELSFPR',
	tolerance: 10,
	matchType: '% Base Peak',
	cutoff: 0,
	isPPM: true,
	annotationTime: null,
	checkVar: null,
};


request = {
	sequence: 'AEAEAQAEELSFPR',
	precursorCharge: 2,
	charge: 2,
	fragmentTypes: {
		a: {
			selected: false,
			color: '#820cad',
			label: 'a',
		},
		b: {
			selected: true,
			color: '#0d75bc',
			label: 'b',
		},
		c: {
			selected: false,
			color: '#07a14a',
			label: 'c',
		},
		C: {
			selected: false,
			color: '#035729',
			label: 'c-1',
		},
		x: {
			selected: false,
			color: '#d1e02d',
			label: 'x',
		},
		y: {
			selected: true,
			color: '#be202d',
			label: 'y',
		},
		z: {
			selected: false,
			color: '#f79420',
			label: 'z•',
		},
		Z: {
			selected: false,
			color: '#A16016',
			label: 'z+1',
		},
		H2O: {
			selected: false,
		},
		NH3: {
			selected: false,
		},
		HPO3: {
			selected: false,
		},
		CO2: {
			selected: false,
		},
		precursor: {
			selected: true,
			color: '#666666',
		},
		unassigned: {
			selected: true,
			color: '#a6a6a6',
		},
	},
	peakData: [
		{
			mZ: 175.118951167,
			intensity: 0.06837461749793393,
		},
		{
			mZ: 201.086976467,
			intensity: 0.6250307118447209,
		},
		{
			mZ: 272.124086467,
			intensity: 0.40168133389917576,
		},
		{
			mZ: 272.171711167,
			intensity: 0.37320866185700563,
		},
		{
			mZ: 401.166676467,
			intensity: 0.21313908556878336,
		},
		{
			mZ: 419.240121167,
			intensity: 0.23850818610261107,
		},
		{
			mZ: 472.203786467,
			intensity: 0.1358412811864823,
		},
		{
			mZ: 506.27215116699995,
			intensity: 0.3381128409014764,
		},
		{
			mZ: 600.262366467,
			intensity: 0.07838891246565857,
		},
		{
			mZ: 619.356211167,
			intensity: 0.24258169350695763,
		},
		{
			mZ: 671.299476467,
			intensity: 0.04187738714793058,
		},
		{
			mZ: 748.398801167,
			intensity: 0.327236939090036,
		},
		{
			mZ: 800.342066467,
			intensity: 0.025520761207031336,
		},
		{
			mZ: 877.441391167,
			intensity: 0.5663320006254049,
		},
		{
			mZ: 929.384656467,
			intensity: 0.018399410332581356,
		},
		{
			mZ: 948.478501167,
			intensity: 1,
		},
		{
			mZ: 1042.4687164670001,
			intensity: 0.011458589265372675,
		},
		{
			mZ: 1076.537081167,
			intensity: 0.6607848830716312,
		},
		{
			mZ: 1129.5007464670002,
			intensity: 0.0031009805454423624,
		},
		{
			mZ: 1147.574191167,
			intensity: 0.6960811686136115,
		},
		{
			mZ: 1276.5691564670003,
			intensity: 0.0011365727814880168,
		},
		{
			mZ: 1276.616781167,
			intensity: 0.18514551830425946,
		},
		{
			mZ: 1347.653891167,
			intensity: 0.15382111188045836,
		},
	],
	mods: [
		{
			name: 'Carbamyl',
			site: 'N-terminus',
			index: -1,
			elementChange: 'C1 H1 N1 O1',
		},
	],
	toleranceType: 'ppm',
	tolerance: 10,
	matchingType: '% Base Peak',
	cutoff: 0,
};
});



it('calculateDeltaMass', () => {
	const annotation = new AnnotationTransformer.Annotation(request);
	assert.deepEqual(annotation.allMassOffset, 43.00581365623);
});

it('aminoAcids', () =>{

	request["mods"].push(
		{name: "Oxidation", site: "M", index: 0, elementChange: "O1"}
	);
	const annotation = new AnnotationTransformer.Annotation(request);

	response.aminoAcids[0].modification.deltaMass +=  15.99491461957;
	assert.deepEqual(annotation.aminoAcids[0] , response.aminoAcids[0]);
	assert.deepEqual(annotation.aminoAcids[1] , response.aminoAcids[1]);
}
);
it('precursorMz', () => {
	const annotation = new AnnotationTransformer.Annotation(request);
	// has to be calculated
	const r = annotation.response["precursorMz"];
	expect(r).to.almost.equal(response.precursorMz);
});
it('precursorMass', () => {
	// has to be calculated
	const annotation = new AnnotationTransformer.Annotation(request);
	// has to be calculated
	const r = annotation.response["precursorMass"];
	expect(r).to.almost.equal(response.precursorMass);
});
it('precursorCharge', () => {
	// has to be calculated
	assert.deepEqual(request.precursorCharge, response.precursorCharge);
});
it('charge', () => {
	// has to be calculated
	assert.deepEqual(request.charge, response.charge);
});
describe('fragments', () => {
	it('b',  () => {
		request.fragmentTypes.y.selected=false;

		var answer = 
			{
				charge: 1,
				mz: 315.1299081231089, //315.12990812311,
				number: 3,
				sequence: 'AEA',
				subPeptide: [
					{
						mass: 71.037114,
						modification: {
							site: 0,
							deltaElement: null,
							deltaMass: 0,
						},
						name: 'A',
					},
					{
						mass: 129.04259,
						modification: {
							site: 1,
							deltaElement: null,
							deltaMass: 0,
						},
						name: 'E',
					},
					{
						mass: 71.037114,
						modification: {
							site: 2,
							deltaElement: null,
							deltaMass: 0,
						},
						name: 'A',
					},
				],
				type: 'b',
				neutralLoss: null,
			};
		// is this weird subConstruct with subpeptides
		// assert.deepEqual(request.fragments, response.fragments);
		//
		const annotation = new AnnotationTransformer.Annotation(request);
		// has to be calculated
		const r = annotation.response["fragments"][2];
		assert.deepEqual(r, answer);
	}
	);
	it('y',  () => {
		var answer = 
			{
				charge: 1,
				mz: 175.118951150909 , //175.11895115091,
				number: 1,
				sequence: 'R',
				subPeptide: [
					{
						mass: 156.10111,
						modification: {
							site: 13,
							deltaElement: null,
							deltaMass: 0,
						},
						name: 'R',
					},
				],
				type: 'y',
				neutralLoss: null,
			};
		const annotation = new AnnotationTransformer.Annotation(request);
		// has to be calculated
		const r = annotation.response["fragments"][1];
		assert.deepEqual(r, answer);
	});
	it('y2',  () => {
		var answer = 
				{
					charge: 1,
					mz: 272.171715150909,// mz: 272.17171515091,
					number: 2,
					sequence: 'PR',
					subPeptide: [
						{
							mass: 97.052764,
							modification: {
								site: 12,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'P',
						},
						{
							mass: 156.10111,
							modification: {
								site: 13,
								deltaElement: null,
								deltaMass: 0,
							},
							name: 'R',
						},
					],
					type: 'y',
					neutralLoss: null,
				};
		const annotation = new AnnotationTransformer.Annotation(request);
		// has to be calculated
		const r = annotation.response["fragments"][3];
		assert.deepEqual(r, answer);
	});
	it('x');
	it('z');
	it('Z');
	it('a');
	it('c');
	it('C');
});
it('fragmentTypes', () => {
	assert.deepEqual(request.fragmentTypes, response.fragTypes);
});
it('modifications', () => {
	assert.deepEqual(request.modifications, response.mods);
});
it('peaks'
	// also includes this weird subpeptides
	//		assert.deepEqual(request["peaData"], response["peaks"]);
);
it('sequence', () => {
	assert.deepEqual(request.sequence, response.sequence);
});
it('tolerance', () => {
	assert.deepEqual(request.tolerance, response.tolerance);
});
it('matchType', () => {
	assert.deepEqual(request.matchingType, response.matchType);
});
it('cutoff', () => {
	assert.deepEqual(request.cutoff, response.cutoff);
});
it('isPPM', () => {
	// move string ppm to TRUE
	const annotation = new AnnotationTransformer.Annotation(request);
	assert.deepEqual(annotation.response.isPPM, response.isPPM);
});
it('annotationTime', () => {
	// move string ppm to TRUE
	// assert.deepEqual(request['toleranceType'], response["isPPM"]);
});
it('checkVar', () => {
	// move string ppm to TRUE
	// assert.deepEqual(request['toleranceType'], response["isPPM"]);
});
});

//
//
//
