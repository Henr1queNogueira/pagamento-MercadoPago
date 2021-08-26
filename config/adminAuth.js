module.exports = function adminAuth(req, res, next){
    
    if(req.session.usuario != undefined){
        next();
    } else {
        res.status(401).redirect('/login');
    }

}
