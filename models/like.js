const mongoose =require('mongoose');

const likeSchema = new mongoose.Schema({
    // 1st what does like belongs to =. likes belongs to user ...it should not be anonynomou8s things
    user: {
        type:mongoose.Schema.ObjectId   
    },
    // need to do two things type=> on which the like has been placed (post or comment) ,and ObjectId=>id of th epost or the comments
    //the object on the like has been placed
   //this defines the object id of the liked object 
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
    // refPath means we are going to placed a path to some other field which is there and that field is going to decide on which type of object like has been placed 
        refPath:'onModel'
    },
    //onModel is the proprty is going on the On like itself
    //this field is used for the defining the type of the liked object since this is dynamic reference
    onModel: {
        type:String,
        require:true,
        // like can be on the post or the commennt
        enum:['Post','Comment']
    } 
},{
    // timestamsps to count the time of like
    timestamps:true
});

//telling mongoose that it the model 
const Like = mongoose.model('Like', likeSchema);
// exporting
module.exports = Like;