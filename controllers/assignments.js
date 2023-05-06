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
        if(req.body.isMainUpdate){
            var isMainUpdate = 1
        }else{
            var isMainUpdate = 0;
        }
        var changedInstancesQuery = '';
        req.body.assignments.forEach((assignment)=>{
            changedInstancesQuery+=`or assignments.instanceId='${assignment.instanceId}'`
        })
        var deleteQuery = `delete assignments from assignments join instances on assignments.instanceId=instances.id where assignments.academicId='${req.params.id}'and startDate='${req.body.startDate}' and (main=${isMainUpdate} ${changedInstancesQuery});`;
        
        console.log(deleteQuery)
        const deleteData = await sql.query(deleteQuery);
        const assignments = req.body.assignments
        var insert = '';
        //builds query to enter all desired assignments
        assignments.forEach((assignment)=>{
            if(assignment.main){
                var isMain = 1;
            }else{
                var isMain = 0;
            }
            insert+=`insert into assignments values('${assignment.instanceId}', '${req.params.id}', ${isMain});`
        })
        //if string has been built/array not empty, query is run
        console.log(insert)
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