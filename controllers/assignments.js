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
        //load in qualifications
        const quals = await queries.getQuals(req.params.id);
        var qualsMap = new Map();
        quals.forEach((qual)=>{
            qualsMap.set(qual.subId)
        })
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
        
        const deleteData = await sql.query(deleteQuery);

        const assignments = req.body.assignments
        var unQualAssignments = [];
        var insert = '';
        //builds query to enter all desired assignments
        if(assignments.length>0){
            console.log(assignments)
            assignments.forEach((assignment)=>{
                if(qualsMap.has(assignment.instanceId.substring(0,7))){
                    if(assignment.main){
                        var isMain = 1;
                    }else{
                        var isMain = 0;
                    }
                    insert+=`insert into assignments values('${assignment.instanceId}', '${req.params.id}', ${isMain});`
                }else{
                    unQualAssignments.push(assignment.instanceId);
                }
            })
        }
        
        
        //if string has been built/array not empty, query is run
        if (insert.length>0){var insertData = await sql.query(insert)}
        
        var load = await queries.getAcademicLoad(req.params.id, req.body.startDate);
        const results = [{deleteData},{insertData}]

        if(unQualAssignments.length>0){
            console.log(unQualAssignments)
            res.status(200).json({results: results, unqualified: unQualAssignments, load: load})
        }else{
            res.status(200).json({results: results, load: load})
        }
        
    }catch(err){
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        }
        res.status(500).json({message: err.message})
    }
}


module.exports = {
    getAllAssignments,
    getSomeAssignments,
    updateAssignments
}