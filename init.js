const rsaWrapper = require(‘./components/rsa-wrapper’);
// generate opened and closed keys for browser and server
rsaWrapper.generate(‘server’);
rsaWrapper.generate(‘client’);
console.log(‘Keys generated …’);
