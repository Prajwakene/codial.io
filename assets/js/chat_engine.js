// this file will be communicating with the front end side 
// 1)creating a class this will have constructor id of chat and email id of user
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // initiating the connection on which the port have i run the socket server port 5000
        // IO is a global variable that is available as soon as we include the CDNjs file in the home.ejs
               this.socket = io.connect('http://localhost:5000')

            //   3) calling the connectionHandler
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    // 2)creating a connectionHandeler this will have the to and fro interacation between the observer and subscriber
    connectionHandler(){
        this.socket.on('connect',function(){
            console.log('connection established using socket...!');
        });
    }

}