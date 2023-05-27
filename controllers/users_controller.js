// this controller is going to control the many controller

//export an action
module.exports.profile = function(req, res){
    return res.end('<h1>User profile</h1>');
}