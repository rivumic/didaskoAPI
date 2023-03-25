const express = require('express')
const router = express.Router();
//controllers
const {getAllInstances,
    getInstancesSchedule,
    getSomeInstances,
    newInstance,
    updateInstance,
    deleteInstance} = require('../controllers/instances')
//routes
router.route('/').get(getAllInstances).post(newInstance)
router.route('/schedule').get(getInstancesSchedule)
router.route('/:startDate').get(getSomeInstances)
router.route('/:id').patch(updateInstance).delete(deleteInstance)


module.exports = router

