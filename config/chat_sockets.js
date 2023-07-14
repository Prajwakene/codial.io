
// this file will be communicating with the server end side 
// it going to receive the incomming connetions ...observer and subscriber pattern
module.exports.chatSockets= function(socketServer){

    // receiving the request for connection     
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        cosnole.log('new connection received', socket.id)
    });

}
