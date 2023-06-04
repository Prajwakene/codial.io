// imorting mongoose 
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    //it will have feilds 
    content:{
        type:String,
        //with requierd true tha data won't be saved 
        required:true
    },
    user: {
        //postSchema linking to user
        //type is reference
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    //adding TINMESTAMP ...it is which automatically  interoduces two fields ,,,created at and updated at 
    timestamps:true
});


//exortting
const Post = mongoose.model('Post', postSchema);
module.exports = Post;