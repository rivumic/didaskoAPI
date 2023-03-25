const express = require('express')
const router = express.Router();
//controllers
const {getAllAcademics,
    createAcademic,
    updateAcademic,
    deleteAcademic,
    getQuals,
    getLoad
} = require('../controllers/academics')

//routes
router.route('/').get(getAllAcademics).post(createAcademic)
router.route('/:id').patch(updateAcademic).delete(deleteAcademic)
router.route('/quals/:id').get(getQuals)
router.route('/load').get(getLoad)

module.exports = router
//app.get('didasko/academic/') * from academic
//app.post('didasko/academic/') new academic
//app.patch('didasko/academic/') update academic/qualifications
//app.delete('didasko/academic/')
//app.get('didasko/qualifications/:id') * from quals where academicId = :id
//app.get('didasko/availableAcademics/') get available academics for a given yearMonth + subjectQualification
