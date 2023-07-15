
// this file will be communicating with the server end side 
// it going to receive the incomming connetions ...observer and subscriber pattern
module.exports.chatSockets= function(socketServer){

    // receiving the request for connection     
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        cosnole.log('new connection received', socket.id);


        // another event whenever the client is disconnect an autonatic disconnect event is fired
        socket.on('disconnect', function(){
            cosnole.log('socket disconnected')
        });

        //detecting an event
        socket.on('join_room', function(data){
            cosnole.log('joining request rec.', data);

            //when th ejoining request aha sbeen received i just want that user to ber joined the socket to be that particular room
            socket.join(data.chartroom);

            //whle we wqant to emit in a specific chat room we do emit 
            io.in(data.chartroom).emit('user_joined', data)

    });

});
}
