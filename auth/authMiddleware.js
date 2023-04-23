const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).redirect('/401');
    }
}

//checks if manager or admin
const isManager = (req, res, next) => {
    if (req.isAuthenticated()) {
        if((req.user.username==='admin'||req.user.username==='manager')){
            next();
        }else{
            return res.status(403).redirect('/403');
        }        
    } else {
        return res.status(401).redirect('/401');
    }
}

//checks if admin exlusively
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if((req.user.username==='admin')){
            next();
        }else{
            return res.status(403).redirect('/403');
        }        
    } else {
        return res.status(401).redirect('/401');
    }
}

module.exports = {isAuth, isManager, isAdmin};