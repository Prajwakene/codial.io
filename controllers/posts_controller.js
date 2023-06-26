// importing
//onr step above models/post 
const Post = require('../models/post');

//importing
const comment = require('../models/comment')

//creating a new post from data in form 
module.exports.create = async function(req, res){
    try{
        let post= await Post.create({
            //saving user
            content: req.body.content,
            //creating an action to submit the data of form and save it in the data base
            user: req.user._id
    });

    //CHECKING if that request is an AJAX request and type of request is XML HTTP request(XHR)
    if(req.xhr){
        return res.status(200).json({
            data: {
                post: post
            },
            messege:"Post Created!"
        })
    }

    req.flash('success','Post Published!');
    return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
};

    
    // ,function(err, post){
    //     // catching err
    //     if(err){
    //         console.log("error in creating the post");
    //         return;
    //     }
    //     //else

//creating an action o delete a post
module.exports.destroy = async function(req, res){
    try{
        //before deleting a post checking that post is avialble in the database or not 
    let post = await Post.findById(req.params.id);
    // checking the authorised person is deleting the post or not
        //.id means converting the object id in to string beacause when you are compaprng the two object id they both need to hbe in the string format
        if(post.user == req.user.id){
            post.remove();

            //deleting the commetns also
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },messege: "Post deleted successfully"

                })
            }
            req.flash('success','Post and Associated comments deleted');

                return res.redirect('back');
            
        }else{
            req.flash('error','you can not delete this Post! ');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('Error',err);
        return res.redirect('back');
    }  
 };
