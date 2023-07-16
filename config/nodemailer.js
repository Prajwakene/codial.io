// importing nodemailer ejs path as thjey require to set up the nodemailer
const nodemailer = require('nodemailer');

//importing environment files
const env = require('./environment')
//importing ejs
const ejs = require('ejs');
//importing path
const path = require('path');

// defining transportar it is SMTP object willl attch it to the node mailer
//copying th whole object for environment 
// smtp object in the enivonment.js
let transportar = nodemailer.createTransport(env.smtp);


//..wee are telling that we are using the EJS for rendering HTML tenplate 
let renderTemplate = (data, relativePath) => {
    //defined variable where we are storing what all HTMl is going t be sent in that mail 
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template', err);
                return;
            }
            mailHTML = template;

        }
    )
    return mailHTML;
    
}

module.exports = {
    transportar: transportar,
    renderTemplate: renderTemplate
}