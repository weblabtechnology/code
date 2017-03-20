(function () {
‘use strict’;
var crypto = window.crypto.subtle;
var rsaParams = {name:”RSA-OAEP”, hash: {name: “SHA-1”}};
// Open key import. For it, pem line should be cleaned from any comments
// and converted from base64 to ArrayBuffer type
function importPublicKey(keyInPemFormat){
return new Promise(function(resolve, reject){
var key = converterWrapper.convertPemToBinary2(keyInPemFormat);
key = converterWrapper.base64StringToArrayBuffer(key);
crypto.importKey(‘spki’, key, rsaParams, false, [“encrypt”])
.then(function(cryptokey) {
resolve(cryptokey);
});
});
}
// Import private key in pkcs8 format
function importPrivateKey(keyInPemFormat){
var key = converterWrapper.convertPemToBinary2(keyInPemFormat);
key = converterWrapper.base64StringToArrayBuffer(key);
return new Promise(function(resolve, reject){
crypto.importKey(‘pkcs8’, key, rsaParams, false, [“decrypt”])
.then(function(cryptokey) {
resolve(cryptokey);
});
});
}
// encrypt with public key. Key must be pem string
function publicEncrypt(keyInPemFormat, message) {
return new Promise(function(resolve, reject){
importPublicKey(keyInPemFormat).then(function (key) {
crypto.encrypt(rsaParams, key, converterWrapper.str2abUtf8(message))
.then(function(encrypted){
resolve(converterWrapper.arrayBufferToBase64String(encrypted));
});
})
});
}
// decrypt with private key. Private key in pkcs8 format, message must be base64 encoded:
function privateDecrypt(keyInPemFormat, encryptedBase64Message) {
return new Promise(function(resolve, reject){
importPrivateKey(keyInPemFormat).then(function (key) {
crypto.decrypt(rsaParams, key, converterWrapper.base64StringToArrayBuffer(encryptedBase64Message))
.then(function(decrypted){
resolve(converterWrapper.arrayBufferToUtf8(decrypted));
});
});
});
}
window.rsaWrapper = {
checkSign: checkSign,
decryptWithSignature: decryptWithSignature,
importPrivateKey: importPrivateKey,
importPublicKey: importPublicKey,
privateDecrypt: privateDecrypt,
publicEncrypt: publicEncrypt
}
}());
