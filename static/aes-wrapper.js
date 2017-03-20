(function () {
‘use strict’;
var crypto = window.crypto.subtle;
function importPublicKey(key){
return new Promise(function (resolve, rej) {
crypto.importKey(“raw”, converterWrapper.base64StringToArrayBuffer(key),
{
name: “AES-CBC”
},
false, //whether the key is extractable (i.e. can be used in exportKey)
[“encrypt”, “decrypt”]
).then(function (cryptKey) {
resolve(cryptKey);
});
});
}
function separateVectorFromData(data) {
var iv = data.slice(-24);
var message = data.substring(0, data.length — 24)
return{
iv: iv,
message: message
};
}
function getMessageWithIv(message, iv) {
return converterWrapper.arrayBufferToBase64String(message) + converterWrapper.arrayBufferToBase64String(iv);
}
function encryptMessage(key, message) {
var iv = window.crypto.getRandomValues(new Uint8Array(16));
return new Promise(function (resolve, rej) {
importPublicKey(key).then(function (key) {
crypto.encrypt(
{
name: “AES-CBC”,
//Don’t re-use initialization vectors!
//Always generate a new iv every time your encrypt!
iv: iv
},
key, //from generateKey or importKey above
converterWrapper.str2abUtf8(message) //ArrayBuffer of data you want to encrypt
)
.then(function (encrypted) {
encrypted = getMessageWithIv(encrypted, iv);
resolve(encrypted);
});
});
});
}
function decryptMessage(key, message) {
var data = aesWrapper.separateVectorFromData(message);
return new Promise(function (resolve, rej) {
importPublicKey(key).then(function (key) {
crypto.decrypt(
{
name: “AES-CBC”,
iv: converterWrapper.base64StringToArrayBuffer(data[‘iv’]),
},
key, //from generateKey or importKey above
converterWrapper.base64StringToArrayBuffer(data[‘message’]) //ArrayBuffer of data you want to encrypt
)
.then(function (decrypted) {
resolve(converterWrapper.arrayBufferToUtf8(decrypted));
});
});
});
}
window.aesWrapper = {
encryptMessage: encryptMessage,
decryptMessage: decryptMessage,
importPublicKey: importPublicKey,
separateVectorFromData: separateVectorFromData,
}
}());
