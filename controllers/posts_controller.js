// importing
//onr step above models/post 
const Post = require('../models/post') 

//creating a new post from data in form 
module.exports.create = function(req, res){
    Post.create({
        //saving user
        content: req.body.content,
        //creating an action to submit the data of form and save it in the data base
        user: req.user._id
    },function(err, post){
        // catching err
        if(err){
            console.log("error in creating the post");
            return;
        }
        //else
        return res.redirect('back')
    });
};

//creating an action o delete a post

