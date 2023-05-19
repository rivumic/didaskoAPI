const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')
//import controllers
const {getAllAssignments,
    getSomeAssignments,
    updateAssignments
} = require('../controllers/assignments')

//routes
router.route('/').get(auth.isAuth, getAllAssignments);
router.route('/:id').get(auth.isAuth, getSomeAssignments).patch(auth.isManager, updateAssignments);

module.exports = router