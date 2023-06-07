//import mongoose
const mongoose = require("mongoose");


//creatign a schema
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require:true
    },
    //comments be;ongs to user 
    user: {
        type:mongoose.Schema.Types.ObjectId,
        //referencing to user
        ref:User
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        //referencing to user
        ref:Post
    }

  },{
    timestamps:true
  });

  //exporting 
  const Comment = mongoose.model('Comments', commentSchema);
  module.exports = Comment;

