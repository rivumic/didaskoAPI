const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')
//import controllers
const {getAllInstances,
    getInstancesSchedule,
    getSomeInstances,
    newInstance,
    updateInstance,
    deleteInstance
} = require('../controllers/instances')

//routes
router.route('/').get(auth.isAuth, getAllInstances).post(auth.isManager, newInstance)
router.route('/schedule').get(auth.isAuth, getInstancesSchedule)
router.route('/:startDate').get(auth.isAuth, getSomeInstances)
router.route('/:id').patch(auth.isManager, updateInstance).delete(auth.isManager, deleteInstance)


module.exports = router

