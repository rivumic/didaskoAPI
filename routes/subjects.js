const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')
//import controllers
const {
    getAllSubjects,
    newSubject,
    updateSubject,
    deleteSubject
} = require('../controllers/subjects')

//routes
router.route('/').get(auth.isAuth, getAllSubjects).post(auth.isAdmin, newSubject)
router.route('/:id').patch(updateSubject).delete(auth.isAdmin, deleteSubject)

module.exports = router