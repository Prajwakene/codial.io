//importing 
const { ConnectionStates } = require('mongoose');
const User = require('../models/user');

//impoting to deelet ea avatar 
const fs = require('fs');
const path = require('path');

// this controller is going to control the many controller

//export an action
// module.exports.profile = function(req, res){
//     // locatig a user
//     User.findById(req.params.id, function(err, user){
//         return res.end('user_profile',{
//             title:'User Profile',
//             profile_user:user
//         })
//     });
// };
module.exports.profile = async function (req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error('User not found');
         // Throw an error if user is not found
      }
      return res.render("user_profile", {
        title: "Users",
        profile_users: user,
      });
    } catch (err) {
      console.error(err);
      return res.redirect("/");
    }
    
  };
  
  


//creating an action for the updating the user
//coverting it to the async await 
module.exports.update = async function(req, res){
    // //if any one wants to fiddle with my webpage he shoulld not
    // if(req.user.id === req.params.id){
    //     // { name:req.body.name, email:req.body.email} => instrad of req.body
    //     User.findByIdAndUpdate(req.params.id, req.body ,function(err, user_id){
    //         return res.redirect('back')
    //     });
    // }else{
    //     //if anyone is trying to do the chages in the html code then this error would show
    //     //common http error
    //     // 200 =>success
    //     // 500 => internal server error
    //     // 401 => unauthorized
    //     res.status(401).send('unathorized');
    // };
    if(req.user.id === req.params.id){
        try{
            //1 find the user
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*******Multer Error: ',err)
                }
                user.name = req.body.name;
                user.email = req.body.email;

                //if there is file we are uploading it 
                if(req.file){
                    //if the user an already a avatar asssociated with it delete it 
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    }
                    //this is savaing the path of the uploaded file in to the avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                avatar.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'unauthorized!');
        return res.status(401).send('unauthorized');
    }
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
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully')
    //establishing the idetity for the user
    return res.redirect('/')  
};


//crewting an ction for the sign out
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success',"You have logged-out");
        res.redirect('/');
      });
}
