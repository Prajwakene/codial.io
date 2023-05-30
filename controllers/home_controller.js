// exporting a functon which is publically acess to my routes
module.exports.home = function(req, res){
    //rendering home.ejs
    return res.render('home', {
        title : "Home"
    });
}
// return res.end('<h1>Expres is up for codial</h1>')
// }

// module.express.actionName = function(req, res){

// }