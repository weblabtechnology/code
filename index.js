const express = require(‘express’);
const app = express();
const http = require(‘http’).Server(app);
const io = require(‘socket.io’)(http);
// middleware for static processing
app.use(express.static(__dirname + ‘/static’));
// web socket connection event
io.on(‘connection’, function(socket){
 console.log(‘connection’);
});
http.listen(3000, function(){
 console.log(‘listening on *:3000’);
});
const rsaWrapper = require(‘./components/rsa-wrapper’);
const rsaWrapper = require(‘./components/rsa-wrapper’);
….
const aesWrapper = require(‘./components/aes-wrapper’);
Go in the block:
io.on(‘connection’, function(socket){
….
// Test AES key sending
const aesKey = aesWrapper.generateKey();
let encryptedAesKey = rsaWrapper.encrypt(rsaWrapper.clientPub, (aesKey.toString(‘base64’)));
socket.emit(‘send key from server to client’, encryptedAesKey);
