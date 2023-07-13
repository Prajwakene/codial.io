const mongoose = require('mongoose');


// making friendshipSchema
const friendshipSchema = new mongoose.Schema({
    //the user who sent this request 
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the USer who accept this request , naming is just to understand ,otherwise , the user dont wont see a difference
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});


const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;