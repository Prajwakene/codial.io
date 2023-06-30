//importing
// ../ takes me to v1 ../takes me to api ../takes to models takes to post
const Post = require('../../../models/post');

// imoprting comments schema
const comment =require('../../../models/comment')

module.exports.index  = async function(req, res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    //pre-loading the comments and the user of the comments
    .populate({
     path:'comments',
     populate: {
        path:'user'
    }
});

    return res.json(200,{
        message:"List of posts",
        posts: posts
    });
    
};

module.exports.destroy = async function(req, res){
    try{
        //before deleting a post checking that post is avialble in the database or not 
    let post = await Post.findById(req.params.id);
    // checking the authorised person is deleting the post or not
        //.id means converting  the object id in to string beacause when you are compaprng the two object id they both need to hbe in the string format
        if(post.user == req.user.id){
            post.remove();

            //deleting the commetns also
            await Comment.deleteMany({post: req.params.id});
        
                return res.json(200, {
                    message: "Post and associated comments deleted successfully!"
                });
            }
                else{
                    return res.json(401, {
                        messege:"You can not delete this post!!"
                    });
                }
    }catch(err){
        return res.json(500, {
            messege:"Internal Server Error"
        });
    }  
 };
