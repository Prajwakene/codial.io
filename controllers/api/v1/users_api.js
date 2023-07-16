// importing 
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//importing environment
const env = require('../../../config/environment')

module.exports.createSession = async function (req, res){
    try{
          //whenever the username and password is recieve we need to find tha t suer and generate the json web token related to that user
     let user = await User.findOne({email: req.body.email});
        // if we dont found the user
        if(!user || user.password != req.body.password){
            return res.json(422, {
                messege:"Invalid Username or Password"
            });
        }
        // else
        return res.json(200,{
            messege:"Sign in Successfullly,Here is your token please keep it safe!",
            data: {
                // codial; is the decrypt the token which expires in the 10000 miliseconds
                // codial secreat key was there now it in the environment.js
                token:jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '100000'})
            }
        });

    }catch(err){
        return res.json(500, {
            messege:"Internal Server Error"
        });
    }
    
};
           