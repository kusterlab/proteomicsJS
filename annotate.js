const _ = require('lodash');

const aminoAcids = 	{
	  A:
		{
		  residue_mass: 71.037114,
		  amino_acid: 'A',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  R:
		{
		  residue_mass: 156.101111,
		  amino_acid: 'R',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  N:
		{
		  residue_mass: 114.042927,
		  amino_acid: 'N',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  D:
		{
		  residue_mass: 115.026943,
		  amino_acid: 'D',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  C:
		{
		  residue_mass: 103.009185,
		  amino_acid: 'C',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  E:
		{
		  residue_mass: 129.042593,
		  amino_acid: 'E',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  Q:
		{
		  residue_mass: 128.058578,
		  amino_acid: 'Q',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  G:
		{
		  residue_mass: 57.021464,
		  amino_acid: 'G',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  H:
		{
		  residue_mass: 137.058912,
		  amino_acid: 'H',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  I:
		{
		  residue_mass: 113.084064,
		  amino_acid: 'I',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  L:
		{
		  residue_mass: 113.084064,
		  amino_acid: 'L',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  K:
		{
		  residue_mass: 128.094963,
		  amino_acid: 'K',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  M:
		{
		  residue_mass: 131.040485,
		  amino_acid: 'M',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  F:
		{
		  residue_mass: 147.068414,
		  amino_acid: 'F',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  P:
		{
		  residue_mass: 97.052764,
		  amino_acid: 'P',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  S:
		{
		  residue_mass: 87.032028,
		  amino_acid: 'S',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  T:
		{
		  residue_mass: 101.047679,
		  amino_acid: 'T',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  U:
		{
		  residue_mass: 150.95363,
		  amino_acid: 'U',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  W:
		{
		  residue_mass: 186.079313,
		  amino_acid: 'W',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  Y:
		{
		  residue_mass: 163.06332,
		  amino_acid: 'Y',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
	  V:
		{
		  residue_mass: 99.068414,
		  amino_acid: 'V',
		  modifications: [
		  ],
		  neutral_losses: [],
		},
};

const modifications = [
  {
    Name: 'Carbamidomethyl',
    unimod_id: 4,
    mass_monoisotopic: 57.021464,
    specificity: {
      'N-Term': false,
      'c-term': false,
      residue: ['C'],
    },
  },
  {
    Name: 'Oxidation',
    unimod_id: 35,
    mass_monoisotopic: 15.994915,
    specificity: {
      'N-Term': false,
      'c-term': false,
      residue: ['M'],
    },
  },
];

const constants = {};
constants.MASS = {
  PROTON: 1.007276467,
  ELECTRON: 0.00054858,
  H: 1.007825035,
  C: 12.0,
  O: 15.99491463,
  N: 14.003074,
};

constants.GROUPS = {
  neutral_n_terminal_group: constants.MASS.H,
  neutral_c_terminal_group: constants.MASS.O + constants.MASS.H,
};

const terminal = {
  a: { offset: constants.GROUPS.neutral_n_terminal_group - constants.MASS.C - constants.MASS.H - constants.MASS.O, 'n-terminal': true },
  b: { offset: constants.GROUPS.neutral_n_terminal_group - constants.MASS.H, 'n-terminal': true },
  c: { offset: constants.GROUPS.neutral_n_terminal_group + constants.MASS.N + 2 * constants.MASS.H, 'n-terminal': true },
  x: { offset: constants.GROUPS.neutral_c_terminal_group + constants.MASS.C + constants.MASS.O - constants.MASS.H, 'n-terminal': false },
  y: { offset: constants.GROUPS.neutral_c_terminal_group + constants.MASS.H, 'n-terminal': false },
  z: { offset: constants.GROUPS.neutral_c_terminal_group - constants.MASS.N - 2 * constants.MASS.H },
  'n-terminal': false,
};

const neutral_losses = [{ name: 'h2o', offset: -18.01528 },
  { name: 'nh3', offset: -17.031 },
  { name: 'co2', offset: -44.009 }];

const f_apply_nl = function (sequence, neutral_losses) {
  return sequence.reduce((prev, next) => {
    neutral_losses.map((nl) => {
      next.neutral_losses.push(nl);
    });
    prev.push(next);
    return prev;
  }, []);
};
const f_apply_modification = function (sequence, modifications) {
  return sequence.reduce((prev, next) => {
    modifications.map((nl) => {
      next.modifications.push(nl);
    });
    prev.push(next);
    return prev;
  }, []);
};

const f_get_masses = function (sequence, terminus, neutral_losses) {
  let residue_mass_seq = 0;
	 sequence = terminal[terminus]['n-terminal'] ? sequence : [...sequence].reverse();
  return sequence.reduce((prev, next, i) => {
    i += 1;
    const mod_mass = next.modifications.reduce((prev, modification) => prev + modification.mass_monoisotopic, 0);
    // no NL
    residue_mass_seq += next.residue_mass + mod_mass;
    prev.push({ label: terminus + i, mz: residue_mass_seq + terminal[terminus].offset });
    neutral_losses.map((nl) => {
      prev.push({ label: `${terminus + i}-${nl.name}`, mz: residue_mass_seq + nl.offset + terminal[terminus].offset });
    });
    return prev;
  }, []);
};

const f_get_charges = function (mass_list, max_charge) {
  const charges = [...Array(max_charge).keys()].map((x) => x + 1);
  return mass_list.reduce((prev, next) => {
    charges.map((chrg) => {
      const aminoAcid = _.cloneDeep(next);
      aminoAcid.label = `${aminoAcid.label} ${chrg}+`;
      aminoAcid.mz = (aminoAcid.mz + chrg * constants.MASS.PROTON) / chrg;
      prev.push(aminoAcid);
    });
    return prev;
  }, []);
};

const f_apply_termini = function () {
  const blub = sequence.reduce((prev, next) => {

  }, []);
};

exports.aminoAcids = aminoAcids;
exports.modifications = modifications;
exports.neutral_losses = neutral_losses;
exports.f_apply_nl = f_apply_nl;
exports.f_get_masses = f_get_masses;
exports.f_get_charges = f_get_charges;
