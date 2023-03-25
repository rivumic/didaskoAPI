const express = require('express')
const router = express.Router();
//controllers
const {getAllAssignments,
    getSomeAssignments,
    updateAssignments
} = require('../controllers/assignments')
//routes
router.route('/').get(getAllAssignments);
//below won't work with queries.js function unless param name changed to id
router.route('/:id').get(getSomeAssignments).patch(updateAssignments);

module.exports = router
//app.get('didasko/assignments/') * from assignments
//app.get('didasko/assignments/:id') * from assignment where academicId = :id
//app.patch('didakso/assignments/') update assignments