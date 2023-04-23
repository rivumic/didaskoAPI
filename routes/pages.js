const express = require('express')
const passport = require('passport')
const auth = require('../auth/authMiddleware')
const router = express.Router();

//controllers
const {getLogin, logout, showSchedule, manageSubjects, manageAcademics, manageInstances, loginFailure, error401, error403
} = require('../controllers/pages')

//routes
router.route('/login').get(getLogin).post(passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login-failure'}));
router.get('/login-failure', loginFailure)
router.get('/logout', logout)
router.get('/401', error401)
router.get('/403', error403)
router.route('/').get(auth.isAuth, showSchedule)
router.route('/subjects').get(auth.isAdmin,manageSubjects)
router.route('/instances').get(auth.isManager,manageInstances)
router.route('/academics').get(auth.isManager,manageAcademics)

module.exports = router