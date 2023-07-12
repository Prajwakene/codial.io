// setting up the controller for the likes
// importing likes ,post ,comments,
const Like = require('../models/like');
const Post = require('../models/post');
const comment = require('../models/comment');
const { json } = require('express');

// Action
//asynchronous code
module.exports.toggleLike = async function(req, res){
    try{
        //likes/toggle/?id=abdddf&type=Post
        // defining like
        let likeable;
        //its boolean that means it is the increament or decremaent of likes
        let deleted = false;

        // finding likeable
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        // else it become comment
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if the like is already exist
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        // if like is exist,then delete it else make a new like
        if(existingLike){
            // pulling the like out of the array
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            //make a new like or pushing the like
               let newLike = await Like.create({
                user: req.user._id,
                likeable : req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(like._id);
            likeable.save();
        }

        //returning json
        return res.json(200, {
            message: "Request Successfull",
            data: {
                deleted: deleted
            }
        });

    }catch(err){
        console.log(err);
        // seding JSON data as this like is the AJSX request
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
} 