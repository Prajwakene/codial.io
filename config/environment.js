// importing file system
const fs = require('fs');
// importing rotating-file-stream
const rfs = require('rotating-file-stream');
// creating path
const path = require('path');

// to store our logs
const logDirectory = path.join(__dirname, '../production_logs');

// finding if the productionLogs are exixst or created (if it does not exist)
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//as user is acesssing my website
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
}); 
// this file will contain the environment like production and developement
// defining two objects developement and production
// 1)
const developement = {
    name: 'developement',
    // we need to getting different password ,different files over here and access it from this part say static files that we put in
    //creating an key asset_path for the static files that we put in the index.js
    asset_path: './assets',
    //creating an key sesssion_cookie_key for the static files that we put in the index.js
    session_cookie_key: 'blahsomething',
    db: 'codial_developement',
    smtp: {
        service: 'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:'false',
        auth:{
            user:'prajwalnk123@gmail.com',
            password:'Prajwal@123'
        }
    },//this are the passport-google-oauth2-strategy.js
    google_client_id:"668723213895-arldcq5ii6593tfme8evfc5jpn2db9h3.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codial',
    //importing all in th environment
    morgan: {
        mode: 'dev',
        options: {stream : accessLogStream}
    }
}


// 2)
const production = {
    name: 'production',
    asset_path: './assets',
    // asset_path: process.env.CODIAL_ASSET_PATH,
    //creating an key sesssion_cookie_key for the static files that we put in the index.js

    // RandomKeyGen=>CodeIgniter Encryption Keys - Can be used for any other 256-bit key requirement.
    // this kwy will go in tot he bash profile
    session_cookie_key: 'process.env.CODIAL_SESSION_COOKIE_KEY',
    db: process.env.CODIAL_DB,
    // db: 'codial_production',
    smtp: {
        service: 'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:'false',
        auth:{
            // user:'prajwalnk123@gmail.com',
            // password:'Prajwal@123'
            user:'process.env.CODIAL_GMAIL_USERNAME',
            password:'process.env.CODIAL_GMAIL_PASSWORD'
        }
    },//this are the passport-google-oauth2-strategy.js
    google_client_id:"process.env.CODIAL_GOOGLE_CLIENT_ID",
    google_client_Secret: "process.env.CODIAL_GOOGLE_CLIENT_SECRET",
    google_call_back_url: "process.env.CODIAL_GOOGLE_CALL_BACK_URL",

    // RandomKeyGen=>CodeIgniter Encryption Keys - Can be used for any other 256-bit key requirement.
    jwt_secret: 'process.env.CODIAL_JWT_SECRET',
    //importing all in th environment
    morgan: {
        mode: 'combined',
        options: {stream : accessLogStream}
    }
}

// 3)
module.exports = eval(process.env.CODIAL_ENVIRONMENT) == undefined ? developement : eval(process.env.CODIAL_ENVIRONMENT);
// module.exports = developement;