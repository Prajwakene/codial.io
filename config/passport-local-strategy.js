// importing passport
    const passport = require('passport');


//importing the passport-local strategy that is th property
    const LocalStrategy = require('passport-local').Strategy;

    //importing user for authentication
    const user = require('../models/user');
const User = require('../models/user');

//we need to tell passport to use th local strategy 
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },

    //done is call abck functin 
    function(email, password, done){
//find the user and establish the identity
        user.findOne({email:email}, function(err, user){
            if(err){
                console.log('error in finding the --> passport');
                //done willl take th etewo argument i.e 1)err and 2)something else  ...we go with th first one we pass on err
                //this will return an error to passportf
                return done(err);
                
            }
            
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null, false)
            }//if user is found
            return done(null, user) ;

        });
    }

    ));


    //we need serioulize and Deseriolize
    //serializing the user to decide ewhcih key is to kept in the cookies
    passport.serializeUser(function (user, done){
        //this will automatically encrypt the cookies and no one will be able to Decrypt it
        done(null,user.id);
    });


    //Deserializing the user from the key in the cookies
    passport.deserializeUser(function (id, done){
        User.findById(id, function(err, user){
            if(err){
                console.log('error in finding the --> passport');
                return done(err);
            }
            return done(null, user);
        });
    });

    //chcck if the user is authenticated
    passport.checkAuthentication = function(req, res, next){
        //if the user is signed in then pass on the request to the next functon(controller's action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ) 
        if(req.isAuthenticated()){
            return next();
        }
        //if user is not signed in 
        return res.redirect('/users/sign-in');
    }
    
    passport.setAuthenticatedUser = function(req, res, next){
        if(req.isAuthenticated){
            //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for th views
            res.locals.user =req.user
        }
        next();
    }


        module.exports = passport;