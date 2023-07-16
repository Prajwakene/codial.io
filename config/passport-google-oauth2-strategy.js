//G1 importing passport
const passport = require('passport');

//importing google auth 20
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

//importing crypto
const crypto = require('crypto');
//importing user\
const User = require('../models/user');
const env = require('./environment');

// const { model } = require('mongoose');

//telling passport to use the new Strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_call_back_url
},
//callback fucction
//this access toaken is created as jwt access token//google is generate the access token that we were ,,,,in case  the accessToken is expired then we can use this refresh token to the access token  without asking the t login again
//profile is to contain the user info we RE are going to match the email with aur data base
function(accessToken, refreshToken, profile, done){
    User.findOne({email:profile.emails[0].value}).exec(function(err, user){
        if(err){
        console.log('Error in google startegy-passport', err);
        return;
        };
        console.log(err);
        //if we found user rerurn done user ,set this user as req.user
        if(user){
            return done(null, user)
        }else{
            //if the user is not found we create the user and set req.user
            User.create({
                name: profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
                //if there is callback fuction there may the error
            }, function(err, user){
                if(err){
                    console.log('Error in crating user google startegy-passport', err);
                    return;
                }
                return done(null, user);
                
            
            })
        }
    });

    }

));

// exporting
module.exports = passport;
