const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')
//controllers
const {getAllAssignments,
    getSomeAssignments,
    updateAssignments
} = require('../controllers/assignments')
//routes
router.route('/').get(auth.isAuth, getAllAssignments);
//below won't work with queries.js function unless param name changed to id
router.route('/:id').get(auth.isAuth, getSomeAssignments).patch(auth.isManager, updateAssignments);

module.exports = router
//app.get('didasko/assignments/') * from assignments
//app.get('didasko/assignments/:id') * from assignment where academicId = :id
//app.patch('didakso/assignments/') update assignments