/*
interpretation```
https://www.psidev.info/usi
    ```;

''`

    https://pubs.acs.org/doi/10.1021/acs.jproteome.7b00851
    ```;
interpretatio
Unimod Interim Names

ProForma (Proteoform and Peptidoform Notation)

support subset of the Proforma specification
Unimod
name parsing by
4.2.5 delta mass notation

it does not support the fixed modification

also not
EMEVEESPEK/2+ELVISLIVER/3

This does not define as Base Level Support

*/

/*
mzspec:<collection>:<msRun>:<indexType>:<indexNumber>:<optionalInterpretation>
 */
USI = class USI {
  constructor(baseString) {
    this.baseString = baseString;
    this.proForma = '';
    this.parse();
  }

  /**
   * @return {string} returns the ProForma string
   */
  parse() {
    const usiSplit = this.baseString.split(':');
    // const proFormaString = this.baseString.slice(usiSplitPosition + 1);
    // if (proFormaString.lastIndexOf('/') === -1) {
    if (usiSplit.length <= 5) {
      throw 'missing an interpretation';
    } else {
      let i = 0;
      let position = 0;
      // hard copy
      let _baseString = this.baseString.slice();
      while (i < 5) {
        position = _baseString.indexOf(':');
        _baseString = _baseString.slice(position + 1);
        i++;
      }
      // this.proForma = ;
      this.proForma = _baseString;
    }
  }
};

ProForma = class ProForma {
  constructor(baseString) {
    this.baseString = baseString;
    this.precursorCharge = -1;
    this.modifications = [];
    this.baseSequence = '';
    this.modString = '';
  }

  parse() {
    this.modString = this.generateModString();
    this.baseSequence = this.generateBaseSequence();
    this.modString = this.removeAdditionalInformation();
    this.modString = this.removePrefixTag();
    this.modifications = this.parseModification();
  }

  generateModString() {
    const baseStringSplit = this.baseString.split('/');
    this.precursorCharge = parseInt(baseStringSplit[1]);

    return baseStringSplit[0];
  }

  // remove Additional information
  removeAdditionalInformation() {
    return this.modString.replace(/\[info:.+?\]/g, '');
  }

  generateBaseSequence() {
    const modStringWithoutMods = this.modString.replace(/\[.+?\]/g, '');
    // notation rule 6
    const modStringWithoutMods6 = modStringWithoutMods.replace(/\+/g, '');
    // notation rule 7
    return modStringWithoutMods6.replace(/-/g, '');
  }

  removePrefixTag() {
    return this.modString.replace(/^\[.+?\]\+/g, '');
  }

  parseNterminalModifications(annotation, beforeChar, afterChar) {

  }

  parseModification() {
    // deepCopy
    const modifications = [];
    let modString = this.modString.slice();
    let skip = 0; // marks jumps

    while (modString.indexOf('[', 0) !== -1) { // if -1 we have modifications
      const positionBracketOpen = modString.indexOf('[', 0);
      const positionBracketClose = modString.indexOf(']', 0);

      // N terminus
      if (positionBracketOpen === 0) {
        const modification = modString.substring(positionBracketOpen + 1, positionBracketClose);
        const m = {
          name: modification,
          index: -1,
          site: 'N-terminus',
        };
        modifications.push(m);
        if (modString[positionBracketClose + 1] === '[') {
          // another n terminal modification
          skip = 1;
        } else {
          skip = 2;
        }
      }
      // inside
      if (positionBracketOpen !== 0 && modString[positionBracketOpen - 1] !== '-') {
        const modification = modString.substring(positionBracketOpen + 1, positionBracketClose);

        const m = {
          name: modification,
          index: positionBracketOpen - 1,
          site: modString[positionBracketOpen - 1],
        };
        modifications.push(m);
        skip = 1;
      }
      if (positionBracketOpen !== 0 && modString[positionBracketOpen - 1] === '-') {
        // now parse all the rest
        let cTerminalModstring = modString.substring(positionBracketOpen);

        while (cTerminalModstring.indexOf('[', 0) !== -1) { // if -1 we have modifications
          const cTerminalpositionBracketOpen = cTerminalModstring.indexOf('[', 0);
          const cTerminalpositionBracketClose = cTerminalModstring.indexOf(']', 0);
          const modification = cTerminalModstring.substring(cTerminalpositionBracketOpen + 1,
            cTerminalpositionBracketClose);

          const m = {
            name: modification,
            index: this.baseSequence.length - 1,
            site: 'C-terminus',
          };
          modifications.push(m);
          cTerminalModstring = cTerminalModstring.substring(positionBracketClose + skip);
          skip = 1;
        }
      }
      modString = modString.slice(0, positionBracketOpen)
          + modString.slice(positionBracketClose + skip);
    }
    return modifications;
  }

  getModifications() {
    let { modString } = this;
    let nTerminalModification = false;
    let cTerminalModification;
    cTerminalModification = false;
    let modifications = [];
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
      modifications.push(m);
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
      modifications.push(m);
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
      modifications.push(m);
      modString = modString.substring(0, check)
                + modString.substring(position + 1);
    }
    modifications = modifications.map((el) => {
      el.index += -1;
      return el;
    });
    return modifications;
  }
};

module.exports = { USI, ProForma };
