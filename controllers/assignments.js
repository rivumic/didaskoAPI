const sql = require('mssql')
const queries = require('../db/queries')

const getAllAssignments = async (req, res) => {
    queries.getAll('assignments', req, res)
}
const getSomeAssignments = async (req, res) =>{
    queries.conditionalGet('assignments', 'academicId', req, res)
}

const updateAssignments = async(req, res) =>{
    try{
        //delete existing assignments
        var deleteQuery = `delete assignments from assignments join instances on assignments.instanceId=instances.id
         where assignments.academicId='${req.params.id}'and startDate='${req.body.yearMonth}';`;
        const deleteData = sql.query(deleteQuery);
        const assignments = req.body.assignments
        var insert = '';
        //builds query to enter all desired assignments
        assignments.forEach((assignment)=>{
            insert+=`insert into assignments values('${assignment.instanceId}', '${req.params.id}', ${assignment.main});`
        })
        //if string has been built/array not empty, query is run
        if (insert.length>0){var insertData = await sql.query(insert)}
        const results = [{deleteData},{insertData}]
        res.status(200).json({results})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


module.exports = {
    getAllAssignments,
    getSomeAssignments,
    updateAssignments
}