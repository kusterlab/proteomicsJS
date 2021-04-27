# ProteomicJs
[![NPM](https://nodei.co/npm/proteomicjs.png?mini=true)](https://npmjs.org/package/proteomicjs)
[![DOI](https://zenodo.org/badge/291287157.svg)](https://zenodo.org/badge/latestdoi/291287157)

We use [nvm](https://github.com/nvm-sh/nvm) for the local development of ProteomicsJS.

### Features
- parsing of [USI](https://www.psidev.info/usi) and extracting ProForma sequence
- Annotation of spectra by user specified rules
- parsing of ProForma according to the Notation rules
  - supports parsing of all rules besides prefix tags
  ![alt text](https://www.ncbi.nlm.nih.gov/pmc/articles/instance/5837035/bin/nihms944952f1.jpg)


## Prerequisite
The node version is controlled by .nvmrc and the following has to be executed once
```
nvm use
nvm install
npm install 
```

## Development
```
npm run test_watch
```

## "Deployment"
Code for Node (server side javascript) is developed in packages, but can't be directly ported to the browser as `require` doesn't exists there. We use `browserify` for bundling our code for the browser.

Executing `npm run browserify` creates a bundle.js that can be used for the [Universal Spectrum Explorer](https://github.com/kusterlab/universal_spectrum_explorer)


