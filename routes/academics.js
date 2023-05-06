const express = require('express')
const router = express.Router();
const auth = require('../auth/authMiddleware')
//controllers
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
router.route('/quals/load/:subId/:year/:month').get(auth.isAuth, getLoad)
router.route('/load/:id/:year/:month').get(auth.isAuth, getOneLoad)
router.route('/quals/:id').get(auth.isAuth, getQuals)




module.exports = router
//app.get('didasko/academic/') * from academic
//app.post('didasko/academic/') new academic
//app.patch('didasko/academic/') update academic/qualifications
//app.delete('didasko/academic/')
//app.get('didasko/qualifications/:id') * from quals where academicId = :id
//app.get('didasko/availableAcademics/') get available academics for a given yearMonth + subjectQualification
