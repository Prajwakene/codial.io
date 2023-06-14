// importing
//onr step above models/post 
const Post = require('../models/post');

//importing
const comment = require('../models/comment')

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
module.exports.destroy = function(req, res){
    //before deleting a post checking that post is avialble in the database or not 
    Post.findById(req.params.id, function(err, post){
        // checking the authorised person is deleting the post or not
        //.id means converting the object id in to string beacause when you are compaprng the two object id they both need to hbe in the string format
        if(post.user == req.user.id){
            post.remove();

            //deleting the commetns also
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back')
        }
    });
};
