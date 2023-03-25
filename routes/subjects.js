const express = require('express')
const router = express.Router();

//controllers
const {
    getAllSubjects,
    newSubject,
    updateSubject,
    deleteSubject
} = require('../controllers/subjects')

//routes
router.route('/').get(getAllSubjects).post(newSubject)
router.route('/:id').patch(updateSubject).delete(deleteSubject)


//app.get('didasko/subject/') * from subject
//app.post('didakso/subject/') new subject
//app.patch('didasko/subject/') update subject
//app.delete('didasko/subject/')
module.exports = router