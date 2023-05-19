const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')

//import controllers
const {getAllSubDev, getSomeSubDev, createSubDev, deleteSubDev} = require('../controllers/subDev')

//routes
router.route('/').get(auth.isAuth, getAllSubDev).patch(auth.isManager, deleteSubDev)
router.route('/:id').get(auth.isAuth, getSomeSubDev)
router.route('/:academicId/:subId').post(auth.isManager, createSubDev)

module.exports = router