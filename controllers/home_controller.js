const Post = require('../models/post')

//impoeting User...1st time using user
const user = require('../models/user')
// exporting a functon which is publically acess to my routes
module.exports.home = async function(req, res){
//    handling the error
try{
    //  finding all the posts ..and populating the user of each posts...then callback
//till .exec this is query too populate ...checkout in mongoose library
let posts = await Post.find({})
.populate('user')
//pre-loading the comments and the user of the comments
.populate({
    path:'comments',
    populate: {
        path:'user'
    }
});
//executimg
// .exec(function(err, posts){
 //finding all the user
 let users = await User.find({})
    // , function(err, users){
    //bolow code send to the browser
    return res.render('home', {
        title : "Codial | Home",
        posts: posts,
        //with this all th euser will hbe avialble to us
        all_users:users
        })

}catch(err){
    console.log('Error',err);
    return;
    }
};
//there ar three to wtrite th code  1st way is th at the we written the code th code in the above manner
// 2nd is the .then function here is the code ..ie promises
// post.find({}).populate('comments').then(function());

// let posts = post.find({}).populate('comments').then(function());
// 3rd is the async Await