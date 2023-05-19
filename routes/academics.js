const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')

//import controllers
const {getAllAcademics,
    createAcademic,
    updateAcademic,
    deleteAcademic,
    getOneLoad,
    getQuals,
    getLoad
} = require('../controllers/academics')

//routes
router.route('/').get(auth.isAuth, getAllAcademics).post(auth.isManager, createAcademic)
router.route('/:id').patch(auth.isManager, updateAcademic).delete(auth.isManager, deleteAcademic)
router.route('/quals/:id').get(auth.isAuth, getQuals)
router.route('/quals/load/:subId/:year/:month').get(auth.isAuth, getLoad)
router.route('/load/:id/:year/:month').get(auth.isAuth, getOneLoad)




module.exports = router
