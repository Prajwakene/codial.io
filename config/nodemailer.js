// importing nodemailer
const nodemailer = require('nodemailer');

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


