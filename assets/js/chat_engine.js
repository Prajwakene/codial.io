// this file will be communicating with the front end side 
// 1)creating a class this will have constructor id of chat and email id of user
class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }

    }


    connectionHandler() {
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function (data) {
                console.log('a user joined!');
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();
            document.getElementById('chat-message-input').value = '';
            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function (data) {
            // console.log('message received', data.message);
            
            function appendMessage(data) {
                let newMessage = $('<li>');

                let messageType = 'other-message';

                if (data.user_email == self.userEmail) {
                    messageType = 'self-message';
                }

                newMessage.append($('<span>', {
                    'html': data.message
                }));

                newMessage.append($('<sub>', {
                    'html': data.user_email
                }));

                newMessage.addClass(messageType);

                $('#chat-messages-list').append(newMessage);
            }
            
            getMessages(data);
            function getMessages(data) {
                // Prior to getting your messages.
                /*
                 * Get your messages, we'll just simulate it by appending a new one syncronously.
                 */
                appendMessage(data);
                // After getting your messages.
            }
    
    
        })
    }
}


// class ChatEngine{
//     constructor(chatBoxId, userEmail){
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

//         // initiating the connection on which the port have i run the socket server port 5000
//         // IO is a global variable that is available as soon as we include the CDNjs file in the home.ejs
//                this.socket = io.connect('http://localhost:5000')

//             //   3) calling the connectionHandler
//         if(this.userEmail){
//             this.connectionHandler();
//         }
//     }

//     // 2)creating a connectionHandeler this will have the to and fro interacation between the observer and subscriber
//     connectionHandler(){
//         //chat Room
//         // asking f the joining the room
//         let self = this;
//         this.socket.on('connect',function(){
//             console.log('connection established using socket...!');
        
//             //sending an event
//             self.socket.emit('join_room', {
//                 user_email : self.userEmail,
//                 chatroom: 'codial'
//             });
        
//             self.socket.on('user_joined', function(data){
//                 console.log('a user joined', data)
//             })
        
//         });
//         // send message on clicking the send messagge button
//         $('#send-message').click(function(){
//             let msg = $('#chat-message-input').val();

//             if(msg != ''){
//                 self.socket.emit('send_message', {
//                     message : msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codial'
//                 });
//             }
//         });
//         // detecting a receive message
//         self.socket.on('receive_message', function(data){
//             console.log('message received ', data.message)

//             // costructing new li
//             let newMessage = $('<li>');

//             let messageType = 'other-message';
//             //designing a message 
//             if(data.user_email == self.userEmail){
//                 messageType = 'self-message'
//             }
//             newMessage.append($('<span>', {
//                 'html': data.message
//             }));
//             //subscript = sub
//             newMessage.append($('<sub>', {
//                 'html': data.user_email
//             }));

//             // messageTypewuld be other message or self message
//             newMessage.addClass(messageType);

//             // append it to 
//             $('#chat-messages-list').append(newMessage);
//         });
//     }

// }