//importing
const Comment =require('../models/comment');
const Post = require('../models/post');
// importing mailer
const commentsMailer = require('../mailers/commetns_mailer');

//creating comment over a post 
module.exports.create = async function(req, res){
    //for that finding if the post is exixt or not 
    // if we find th epost handling the error using callback function
    //after the comment is made the email would be send technically.
    try{
        let post= await Post.findById(req.body.Post)
            if(post){
                let comment = await Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                });
                    //handle err
                    post.comments.push(comment);
                    //whenever we update something we need to call save after it
                    //save will tell th DB that it is the final version ,so block it 
                    post.save();

                    // populating the user every time
                    comment = await comment.populate('user', 'name email').execPopulate();
                    //calling mailer
                    commentsMailer.newComment(comment);

                    if(req.xhr){
                        //similar to comment to fertch the user id's
                        return res.status(200).json({
                            data: {
                                comment: comment
                            },
                            message: "Post Created!"
                        });
                    }
                    req.flash('success', 'comment published!')

                    res.redirect('/')
            }
    }catch(err){
        console.log('Error', err);
        return;
    }
};

//we need to delete a comment 
module.exports.destroy =async function(req, res){
    try{
        let comment= await Comment.findById(req.params.id);
        //check if the comment actually available or not
        if(comment.user == req.user.id){
            //before deleting a comment we nned to fetch the post id ,because we need to go inside that post and then delete it 
            let postId = comment.post;
            
            comment.remove();
            //if comment was there the post must be there
            //we need to pull out the comment from the list of the list of comment
           let post= await  Post.findByIdAndUpdate(postId, { $pull:{comments:req.params.id}});
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}