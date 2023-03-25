const express = require('express')
const router = express.Router();
//controllers
const {getAllSubDev, getSomeSubDev, createSubDev, deleteSubDev} = require('../controllers/subDev')
//routes
router.route('/').get(getAllSubDev).delete(deleteSubDev)
router.route('/:id').get(getSomeSubDev)
router.route('/:academicId/:subId').post(createSubDev)

module.exports = router