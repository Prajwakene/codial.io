const Post = require('../models/post')

// exporting a functon which is publically acess to my routes
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',25)

    //finding all the post from user
    // Post.find({}, function(err, posts){
    //      //rendering home.ejs
    //     return res.render('home', {
    //         title : "Codial | Home",
    //         posts: posts
    //     });

    // });

//  finding all the posts ..and populating the user of each posts...then callback
//till .exec this is query too populate ...checkout in mongoose library
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title : "Codial | Home",
            posts: posts
        });
    });
};
// return res.end('<h1>Expres is up for codial</h1>')
// }

// module.express.actionName = function(req, res){

// }