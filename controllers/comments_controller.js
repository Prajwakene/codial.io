//importing
const Comment =require('../models/comment');
const Post = require('../models/post');

//creating comment over a post 
module.exports.create = function(req, res){
    //for that finding if the post is exixt or not 
    // if we find th epost handling the error using callback function
    Post.findById(eq.body.Post, function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err, comment){
                //handle err
                post.comments.push(comment);
                //whenever we update something we need to call save after it
                //save will tell th DB that it is the final version ,so block it 

                post.save();
                res.redirect('/')
                
            })
        }
    });
};