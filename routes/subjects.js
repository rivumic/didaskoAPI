const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')
//controllers
const {
    getAllSubjects,
    newSubject,
    updateSubject,
    deleteSubject
} = require('../controllers/subjects')

//routes
router.route('/').get(auth.isAuth, getAllSubjects).post(auth.isAdmin, newSubject)
router.route('/:id').patch(updateSubject).delete(auth.isAdmin, deleteSubject)

//app.get('didasko/subject/') * from subject
//app.post('didakso/subject/') new subject
//app.patch('didasko/subject/') update subject
//app.delete('didasko/subject/')
module.exports = router