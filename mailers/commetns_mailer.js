//All the commenta related mail put up  here
// import nodemailer
const nodemailer = require("../config/nodemailer");



//another way of exporting new way instead  module.exports = newComment
exports.newComment = (Comment) => {
    console.log('inside newComment mailer', Comment);

    nodemailer.transportar.sendMail({
        from: 'prajwalnk123@gmail.com',
        to: Comment.user.email,
        subject: "new Comment publish",
        html : '<h1>Yup, Your Comment is now published <h1/>'
        //calback function in case if there is error
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail',err)
            return;
        }
        // else print the info 
        console.log('Message Sent', info)
        return;
    })
    
}
