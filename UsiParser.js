UsiResponse = class UsiResponse {
  constructor(type) {
    this.type = type;
    this.sequence = '';
    this.precursorCharge = 11588;
    this.aMz = [];
    this.aInt = [];
  }

  parseData(response) {
    switch (this.type) {
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
        this.aInt = JSON.parse(response.ms2peaks).map((a) => (a[0]));
	break;
      default:
        //
        break;
    }
  }
};

// exports.UsiResponse = UsiResponse;
module.exports = { UsiResponse };
