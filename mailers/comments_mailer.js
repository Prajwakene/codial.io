//All the commenta related mail put up  here
// import nodemailer
const nodemailer = require("../config/nodemailer");



//another way of exporting new way instead  module.exports = newComment
exports.newComment = (comment) => {
    let htmlString= nodemailer.renderTemplate({ comment: comment}, '/comments/new_comments.ejs')

    nodemailer.transportar.sendMail({
        from: 'prajwalnk123@gmail.com',
        to: Comment.user.email,
        subject: "new Comment publish",
        html : htmlString
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
