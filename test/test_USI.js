const assert = require('assert');
const chai = require('chai');
const chaiAlmost = require('chai-almost');
const _ = require('lodash');
// const annotate = require('../annotate');
const binary = require('../USI.js');

chai.use(chaiAlmost()); // tolerance of 10^-6
chai.use(chaiAlmost(0.0001));
const { expect } = chai;
//

describe('parse USI', () => {
  describe('extract', () => {
    const response = {};
    const testUsi = 'mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555:VLHPLEGAVVIIFK/2';
    it('get Interpretation', () => {
      usi = new USI(testUsi);
      assert.deepEqual(usi.proForma, 'VLHPLEGAVVIIFK/2');
    });
  });
  describe('extract with Tags', () => {
    const response = {};
    const testUsi = 'mzspec:PXD000966:CPTAC_CompRef_00_iTRAQ_05_2Feb12_Cougar_11-10-09.mzML:scan:12298:[iTRAQ4plex]-LHFFM[UNIMOD:35]PGFAPLTSR/2';
    it('get Interpretation', () => {
      usi = new USI(testUsi);
      assert.deepEqual(usi.proForma, '[iTRAQ4plex]-LHFFM[UNIMOD:35]PGFAPLTSR/2');
    });
  });
  describe('extractBroken', () => {
    const response = {};
    const testUsi = 'mzspec:PXD000561:Adult_Frontalcortex_bRP_Elite_85_f09:scan:17555';
    it('get Interpretation', () => {
      assert.throws(() => {
        usi = new USI(testUsi);
      }, /missing an interpretation/);
    });
  });
});

describe('parse ProForma', () => {
  describe('extract', () => {
    const response = {};
    const testProforma = '[additionalInformation]+[iTRAQ4plex]-LHFFM[Oxidation]PGFA[info:test]PLTSR/2';
    it('get Interpretation', () => {
      proForma = new ProForma(testProforma);
      const modString = proForma.generateModString();
      assert.deepEqual(modString, '[additionalInformation]+[iTRAQ4plex]-LHFFM[Oxidation]PGFA[info:test]PLTSR');
    });
    it('generate base sequence', () => {
      proForma = new ProForma(testProforma);

      proForma.modString = proForma.generateModString();
      const baseSequence = proForma.generateBaseSequence();
      assert.deepEqual(baseSequence, 'LHFFMPGFAPLTSR');
    });
    it('remove info tags', () => {
      proForma = new ProForma(testProforma);

      proForma.modString = proForma.generateModString();
      proForma.baseSequence = proForma.generateBaseSequence();
      const modString = proForma.removeAdditionalInformation();
      assert.deepEqual(modString, '[additionalInformation]+[iTRAQ4plex]-LHFFM[Oxidation]PGFAPLTSR');
    });
    it('remove prefix tag', () => {
      proForma = new ProForma(testProforma);

      proForma.modString = proForma.generateModString();
      proForma.baseSequence = proForma.generateBaseSequence();
      proForma.modString = proForma.removeAdditionalInformation();
      const modString = proForma.removePrefixTag();
      assert.deepEqual(modString, '[iTRAQ4plex]-LHFFM[Oxidation]PGFAPLTSR');
    });
    describe('Modification', () => {
      const testProformaHARD = '[additionalInformation]+[iTRAQ4plex][KUSTER]-LHFFM[Oxidation][MOX]PGFA[info:test]PLTSR-[33][UNIMOD:2]/2';

      it('parse Modifications', () => {
        proForma = new ProForma(testProformaHARD);

        proForma.modString = proForma.generateModString();
        proForma.baseSequence = proForma.generateBaseSequence();
        proForma.modString = proForma.removeAdditionalInformation();
        proForma.modString = proForma.removePrefixTag();
        const modifications = proForma.parseModification();
        const correctResponse = [
          {
            index: -1,
            name: 'iTRAQ4plex',
            site: 'N-terminus',
          },
          {
            index: -1,
            name: 'KUSTER',
            site: 'N-terminus',
          },
          {
            index: 4,
            name: 'Oxidation',
            site: 'M',
          },
          {
            index: 4,
            name: 'MOX',
            site: 'M',
          },
          {
            index: 13,
            name: '33',
            site: 'C-terminus',
          },
          {
            index: 13,
            name: 'UNIMOD:2',
            site: 'C-terminus',
          },
        ];

        assert.deepEqual(modifications, correctResponse);
      });
    });
  });
});
