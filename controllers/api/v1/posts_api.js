module.exports.index  = function(req, res){
    return res.json(200,{
        messege:"List of posts",
        posts: []
    });
    
}