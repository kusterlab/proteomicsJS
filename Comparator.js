const binary = require('./binary');
const measures = require('./measures');

Comparator = class Comparator {
  constructor(spectrum_1, spectrum_2, matching_type = "ppm", matching_tolerance = 10) {
    this.spectrum_1 = spectrum_1;
    this.spectrum_2 = spectrum_2;
    this.matching_tolerance = matching_tolerance;
    let binarySpectrum_1 = binary.binary_search_spectrum(this.spectrum_1, this.spectrum_2, matching_type, matching_tolerance);
    let binarySpectrum_2 = binary.binary_search_spectrum(this.spectrum_2, this.spectrum_1, matching_type, matching_tolerance);
		 binarySpectrum_1 = binary.selectMostIntensePeak(binarySpectrum_1);
		    binarySpectrum_2 = binary.selectMostIntensePeak(binarySpectrum_2);
    this.merged_spectrum = binary.full_merge(binarySpectrum_1, binarySpectrum_2);
  }

  calculate_scores1(merged_data) {
    const binarySpectrum = {};
		    binarySpectrum.intensity_1 = merged_data.map((x) => x.intensity_1);
		    binarySpectrum.intensity_2 = merged_data.map((x) => x.intensity_2);
    const result = {};
    const spectral_angle = measures.ipsa_helper.comparison.spectral_angle(binarySpectrum.intensity_1, binarySpectrum.intensity_2);
    const pearson_correlation = measures.ipsa_helper.comparison.pearson_correlation(binarySpectrum.intensity_1, binarySpectrum.intensity_2);
    result.sa = Math.round(spectral_angle * 100) / 100;
    result.corr = Math.round(pearson_correlation * 100) / 100;
    return result;
  }

  calculate_scores() {
    const result = {};
    result.full = this.calculate_scores1(this.merged_spectrum);
    let sided_merge = this.merged_spectrum.filter((e) => e.id_1 !== -1);
    result.spec1 = this.calculate_scores1(sided_merge);
		 sided_merge = this.merged_spectrum.filter((e) => e.id_2 !== -1);
    result.spec2 = this.calculate_scores1(sided_merge);

    return result;
  }
};
