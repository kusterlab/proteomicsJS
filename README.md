# ProteomicsJS

We use [nvm](https://github.com/nvm-sh/nvm) for the local development of ProteomicsJS.

### Features
- parsing of USI and extracting ProForma sequence
- Annotation of spectra

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


