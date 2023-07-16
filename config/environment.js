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
    jwt_secret: 'codial'

}


// 2)
const production = {
    name: 'production'
}

// 3)
module.exports = developement;