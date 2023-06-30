// setting up the user schema for that we are importing the mongoose

const mongoose= require('mongoose');
// m1  setting up the multer fro file upload
// importing multer
const multer = require('multer');
const path = require('path');
//storing here all the avatar
const AVATAR_PATH = path.join('/uploads/users/avatar');


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
    name : {
        type: String,
        // required true means the user won't be able to create the data in DB without email and it need to be unique
        required:true,
    },
    //fieldname avatar
    avatar : {
        type : String
    }

},{
    //to keep the count of two things when the user created at and updated at
    timestamps: true
});

//storage for avatar
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb){
        //file.fieldname => the file that upload on this field for evry users tha t will be stored as => avatar-Date.now() 
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//defining the static function/method => it is the function which ca be called over all on the whole class
// .single means only on efile will be upload at a one instance for fieldname avatar 
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
// we need that the avatar path to be available  publilicaly for the user model 
userSchema.statics.avatarPath =AVATAR_PATH;  
//using the above storage


//telling mongoose that this is the model 
const User = mongoose.model('User', userSchema);

//finaly we need to exports that
module.exports = User;