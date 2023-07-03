// importing nodemailer ejs path as thjey require to set up the nodemailer
const nodemailer = require('nodemailer');

//importing ejs
const ejs = require('ejs');
//importing path
const path = require(path);

//defining transportar it is object willl attch it to the node mailer
let transportar = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:'false',
    auth:{
        user:'prajwalnk123@gmail.com',
        password:'Prajwal@123'
    }
});


//..wee are telling that we are using the EJS for rendering HTML tenplate 
let renderTemplate = (data, relativePath) => {
    //defined variable where we are storing what all HTMl is going t be sent in that mail 
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template');
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