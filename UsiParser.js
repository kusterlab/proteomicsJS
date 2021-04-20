UsiResponse = class UsiResponse {
  constructor(type) {
    this.type = type;
    this.sequence = '';
    this.precursorCharge = 11588;
    this.aMz = [];
    this.aInt = [];
    this.spectrum_name = '';
    this.modifications = [];
    // name
    // index
    // site
  }

  parseAttributes(response) {
    this.precursorCharge = parseInt(response.attributes.filter((element) => element.name === 'charge state')[0].value);
    this.spectrum_name = response.attributes.filter((element) => element.name === 'spectrum name')[0].value;
    this.sequence = response.attributes.filter((element) => element.accession === 'MS:1000888')[0].value;
  }

  parseSpectrumName(spectrumNameString) {
    // [iTRAQ4plex]-LHFFM[Oxidation]PGFAPLTSR/2
    let arySpectrumName;
    arySpectrumName = spectrumNameString.split('/');
    let modString;
    modString = arySpectrumName[0];
    let nTerminalModification;
    nTerminalModification = false;
    let cTerminalModification;
    cTerminalModification = false;
    if (modString[0] === '[') {
      nTerminalModification = true;
    }
    let positionTracker = 0;
    if (nTerminalModification) {
      const position = modString.indexOf(']', 0); // returns -1 if false
      const modification = modString.substring(1, position);
      const m = {
        name: modification,
        index: -1,
        site: 'N-terminus',
      };
      this.modifications.push(m);
      positionTracker = position + 2; // + 2 to get over ']-'
    }
    modString = modString.substring(positionTracker);

    const check = modString.indexOf('-[', 0);
    if (check !== -1) {
      const modification = modString.substring(check + 2, modString.length - 1); // +2 to remove '-[' and length -1 for ']'
      const m = {
        name: modification,
        index: this.sequence.length,
        site: 'C-terminus',
      };
      this.modifications.push(m);
      modString = modString.substring(0, check);
    }

    // parse Modifications within peptide
    while (modString.indexOf('[', 0) !== -1) { // LHFFMPGFAPLTSR
      const check = modString.indexOf('[', 0);
      const position = modString.indexOf(']', 0); // returns -1 if false
      const modification = modString.substring(check + 1, position);

      positionTracker = position + 2; // + 2 to get over ']-'
      const m = {
        name: modification,
        index: check,
        site: modString[check - 1],
      };
      this.modifications.push(m);
      modString = modString.substring(0, check)
          + modString.substring(position + 1);
    }
    this.modifications = this.modifications.map((el) => {
      el.index += -1;
      return el;
    });
  }

  parseData(response) {
    switch (this.type) {
      case 'ProteomeCentral':
        this.parseAttributes(response);
        this.parseSpectrumName(this.spectrum_name);
        this.aMz = response.mzs;
        this.aInt = response.intensities;
        break;
      case 'PeptideAtlas':
        this.parseAttributes(response);
        this.parseSpectrumName(this.spectrum_name);
        this.aMz = response.mzs;
        this.aInt = response.intensities;
        break;
      case 'pride': // use data
        this.sequence = response.peptideSequence;
        this.precursorCharge = response.charge;
        this.aMz = response.mzs;
        this.aInt = response.intensities;
        //
        break;
      case 'peptideatlas':
        const regexp = /^(\s)*(?<mz>(\d)*\.(\d)*)(\s)*(?<intensity>(\d)*\.(\d)*)/gm;
        const r = [...response.matchAll(regexp)]
          .map((e) => ({
            mz: parseFloat(e.groups.mz),
            intensity: parseFloat(e.groups.intensity),
          }));

        const regexpPCM = /^(\s)*PeptideIon tag: (?<peptideSequence>([A-Z]*))\/(?<precursorCharge>(\d))/gm;
        const r1 = [...response.matchAll(regexpPCM)]
          .map((e) => ({
            peptideSequence: e.groups.peptideSequence,
            precursorCharge: e.groups.precursorCharge,
          }));
        this.sequence = r1[0].peptideSequence;
        this.precursorCharge = r1[0].precursorCharge;
        this.aMz = r.map((e) => (e.mz));
        this.aInt = r.map((e) => (e.intensity));
        //
        break;
      case 'jpost':
        this.sequence = response.sequence;
        this.precursorCharge = response.charge;
        this.aMz = JSON.parse(response.ms2peaks).map((a) => (a[0]));
        this.aInt = JSON.parse(response.ms2peaks).map((a) => (a[1]));
        break;
      default:
        //
        break;
    }
  }
};

// exports.UsiResponse = UsiResponse;
module.exports = { UsiResponse };
