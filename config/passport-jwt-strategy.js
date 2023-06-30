// importing passport
const passport = require('passport');
// importing JWT strategy
const JWTStrategy = require('passport-jwt').Strategy;
//importing moodule which will help us to extract jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;
// since we  are using the user model fr authentication .whenever we going to establish the identity of user wiill be needing the user model
const User  = require('../models/user');

//while defining the JWT strategy we need to have the option 1)encryption
let opts = {
    //eccryption and decryption key 
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codial'
}

//done is calback function
passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    //find user based on the payload infomatin
    User.findById(jwtPayload._id), function(err, user){
        if(err){
            console.log('Error in finding the user in JWT');
            return;
        }
        
        if(user){
            
            return done(null, user);
        }else{
            //means the user was not found
            return done(null, false);
        }
    }
}));


module.exports = passport;