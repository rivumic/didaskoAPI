const path = require('node:path')
const getLogin = (req, res)=>{
    try{
        res.status(200).sendFile(path.join(process.cwd(), '/public/login.html'))
    }catch(err){
        res.status(500).sendFile(path.join(process.cwd(), '/public/500.html'))
    }
}
const logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            console.log(err)
            return next()}
    })
    res.redirect('/login')
}
const showSchedule = (req, res)=>{
    res.status(200).sendFile(path.join(process.cwd(), '/public/schedule.html'))
}
const manageSubjects = (req, res) =>{
    res.status(200).sendFile(path.join(process.cwd(), '/public/subjects.html'))
}

const manageAcademics = (req, res) =>{
    res.status(200).sendFile(path.join(process.cwd(), '/public/academics.html'))
}
const manageInstances = (req, res) =>{
    res.status(200).sendFile(path.join(process.cwd(), '/public/instances.html'))
}
const loginFailure = (req, res)=>{
    res.status(403).sendFile(path.join(process.cwd(), 'public/wrongPassword.html'))
}
const error401 = (req, res)=>{
    res.status(401).sendFile(path.join(process.cwd(), 'public/401.html'))
}
const error403 = (req, res)=>{
    res.status(403).sendFile(path.join(process.cwd(), 'public/403.html'))
}

module.exports = {getLogin, logout, showSchedule, manageSubjects, manageAcademics, manageInstances, loginFailure, error401, error403}
