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
