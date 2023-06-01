// setting up the user schema for that we are importing the mongoose

const mongoose= require('mongoose');

//schema of user
const userSchema = new mongoose.Schema({
    email : {
        type: String,
        // required true means the user won't be able to create the data in DB without email and it need to be unique
        required:true,
        unique: true

    },
    password : {
        type: String,
        // required true means the user won't be able to create the data in DB without Password and it need to be unique
        required:true,
    },
    password : {
        type: String,
        // required true means the user won't be able to create the data in DB without email and it need to be unique
        required:true,
    }

},{
    //to keep the count of two things when the user created at and updated at
    timestamps: true
});

//telling mongoose that this is the model 
const User = mongoose.model('user', userSchema);

//finaly we need to exports that
module.exports = User;