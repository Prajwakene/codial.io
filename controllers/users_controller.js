//importing 
const { ConnectionStates } = require('mongoose');
const User = require('../models/user')


// this controller is going to control the many controller

//export an action
module.exports.profile = function(req, res){
    // locatig a user
    User.findById(req.params.id, function(err, user){
        return res.end('user_profile',{
            title:'User Profile',
            profile_user:user
        })
    });
};


//creating an action for the updating the user
module.exports.update = function(req, res){
    //if any one wants to fiddle with my webpage he shoulld not
    if(req.user.id === req.params.id){
        // { name:req.body.name, email:req.body.email} => instrad of req.body
        User.findByIdAndUpdate(req.params.id, req.body ,function(err, user_id){
            return res.redirect('back')
        });
    }else{
        //if anyone is trying to do the chages in the html code then this error would show
        //common http error
        // 200 =>success
        // 500 => internal server error
        // 401 => unauthorized
        res.status(401).send('unathorized');
    };
};

//2nd step..adding action for the sign up and sign in
//render the signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codial  | Sign up"
    });
}

//render the signin page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"codial  | Sign in"
    });
};

//3rd step
//creating action for the sign up form for route users/create
//get the sign up data

module.exports.create = function (req, res){
   
    // checking whether password and confirm password are equal or not if not redirect back to the sign up page
    if(req.body.password != req.body.comfirm_password){
        return res.redirect('back');
    }
    //for email and a callback function 
    User.findOne({email:req.body.email},function(err, user){
        if(err){
            console.log('error in finding the user in signing up');
            return;
        };
        //if the user is not found
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up ');
                    return;
                };
                //if the above case is not then .. user is created then send it to the users/sign in
                return res.redirect('/users/sign-in');
            });
            
        }
        //finaally if the user is already present redirect back to th sign up page
        else{
            return res.redirect('back');
            
        }
        
    });
    
};

//sign In and create the session for the user
module.exports.createSession = function (req, res){
    req.flash('success', 'Logged in successfully')
    //establishing the idetity for the user
    return res.redirect('/')  
};


//crewting an ction for the sign out
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', ' You have logged out')

    return res.redirect('/')
}
