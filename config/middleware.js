// 1st time creating the middleware in this PromiseRejectionEvent

module.exports.setFlash = function(req, res, next){
    //in locals setting the flash messegee
    res.locals.flash = {
        'success':req.flash('success'),
        'error': req.flash('error')
    }
    next();
}