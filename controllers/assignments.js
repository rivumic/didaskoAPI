//see documentation for expected request structure
const sql = require('mssql')
const queries = require('../db/queries')

//retrieves all academic-instance assignments
const getAllAssignments = async (req, res) => {
    queries.getAll('assignments', req, res)
}
//retrieves assignments for a given academic
const getSomeAssignments = async (req, res) =>{
    queries.conditionalGet('assignments', 'academicId', req, res)
}

//updates assignments for a given academic
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
        //builds query to enter all desired assignments and checks whether the academic is qualified for all stipulated subjects
        if(assignments.length>0){
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
        
        const startDate = new Date(req.body.startDate)
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth()+2);

        //load validation
        var dateCounter = startDate;
        var dateStrings = [];
        while (dateCounter<=endDate){
            dateStrings.push(dateCounter.toISOString())
            dateCounter.setMonth(dateCounter.getMonth()+1);
        }

        var overloadMonths = [];

        const loads = await Promise.all(dateStrings.map(async (date)=>{
            const load = await queries.getAcademicLoad(req.params.id, date);
            if(load>7){overloadMonths.push(date)}
            return load;
        }))
        overloadMonths.sort();

        const results = [{deleteData},{insertData}]

        var response = {results: results}

        //if unqualified for any instances or over load in relevant months, returns relevant data
        if(unQualAssignments.length>0){
            response.unqualified = unQualAssignments;
        }
        if(overloadMonths.length>0){
            response.overloadMonths = overloadMonths;
            response.load = loads;
        }
        return res.status(200).json(response)
        
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