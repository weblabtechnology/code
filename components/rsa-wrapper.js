// encrypting RSA, using padding OAEP, with nodejs crypto:
rsaWrapper.encrypt = (publicKey, message) => {
let enc = crypto.publicEncrypt({
key: publicKey,
padding: crypto.RSA_PKCS1_OAEP_PADDING
}, Buffer.from(message));
return enc.toString(‘base64’);
};
// descrypting RSA, using padding OAEP, with nodejs crypto:
rsaWrapper.decrypt = (privateKey, message) => {
let enc = crypto.privateDecrypt({
key: privateKey,
padding: crypto.RSA_PKCS1_OAEP_PADDING
}, Buffer.from(message, ‘base64’));
return enc.toString();
};
// Loading RSA keys from files to variables:
rsaWrapper.initLoadServerKeys = (basePath) => {
rsaWrapper.serverPub = fs.readFileSync(path.resolve(basePath, ‘keys’, ‘server.public.pem’));
rsaWrapper.serverPrivate = fs.readFileSync(path.resolve(basePath, ‘keys’, ‘server.private.pem’));
rsaWrapper.clientPub = fs.readFileSync(path.resolve(basePath, ‘keys’, ‘client.public.pem’));
};
// Run RSA encryption test scenario. Message is encrypted, log on console in base64 format and message is decrypted and log on console.
rsaWrapper.serverExampleEncrypt = () => {
console.log(‘Server public encrypting’);
let enc = rsaWrapper.encrypt(rsaWrapper.serverPub, ‘Server init hello’);
console.log(‘Server private encrypting …’);
console.log(‘Encrypted RSA string ‘, ‘\n’, enc);
let dec = rsaWrapper.decrypt(rsaWrapper.serverPrivate, enc);
console.log(‘Decrypted RSA string …’);
console.log(dec);
};
