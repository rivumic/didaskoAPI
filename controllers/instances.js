const sql = require('mssql')
const queries = require('../db/queries')

const subRegex = new RegExp("CSE[123][A-Z][A-Z]X")
const insRegex = new RegExp("CSE[123][A-Z][A-Z]X_20[0-9][0-9]_(January|February|March|April|May|June|July|August|September|October|November|December)")

const getAllInstances = async(req, res) =>{
    queries.getAll('instances', req, res)
}

const getInstancesSchedule = async(req,res)=>{
    try{
        var query = `select id, subId, enrolments, datepart(yyyy, startDate) as year, datepart(m, startDate) as month from instances order by year, month, subId;`;
        var data = await sql.query(query)
        res.status(200).json(data.recordset)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

const getSomeInstances = async(req, res) =>{
    try{
        var data = await sql.query(`select * from instances where startDate='${req.params.startDate}';`)
        res.status(200).json(data.recordset)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
const newInstance = async(req, res) =>{
    try{
        if(!req.body.id || !req.body.startDate || !req.body.subId){
            res.status(400).json({message: "incomplete data: id, startDate and subId required"})
        }
        if(!req.body.enrolments){
            var enrolments = 0
        }else{
            var enrolments = parseInt(req.body.enrolments, 10)
        }
        if(subRegex.test(req.body.subId) && insRegex.test(req.body.id)){
            if(req.body.subId === req.body.id.substring(0, 7)){
                
                try{
                    var startDate = new Date(req.body.startDate)
                }catch(err){
                    return req.status(400).json({message: 'date could not be resolved'})
                }

                    if(startDate){
                        var data = await sql.query(`insert into instances(id, subId, enrolments, startDate) values('${req.body.id}', '${req.body.subId}', ${enrolments}, '${startDate.toISOString().substring(0,8)}01');`)
                        return res.status(201).json(data)
                    }
            }else{
                return res.status(400).json({message: "instance id must match subject id"})
            }
        }else{
            return res.status(400).json({message: "subject id and instance id do not match the required format"})
        }
    }catch(err){
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        } 
        res.status(500).json({message: err.message})
    }
}
const updateInstance = async(req, res) =>{
    try{
        if(!req.body.subId || !req.body.id || !req.body.startDate){
            return res.status(400).json({message: "incomplete data: id, startDate and subId required"})
        }
        if(!req.body.enrolments){
            var enrolments = 0
        }else{
            var enrolments = parseInt(req.body.enrolments, 10)
            console.log(enrolments)
        }
        if(subRegex.test(req.body.subId) && insRegex.test(req.body.id)){
            if(req.body.subId === req.body.id.substring(0, 7)){
                try{
                    const startDate = new Date(req.body.startDate)
                }catch(err){
                    return req.status(400).json({message: 'date could not be resolved'})
                }                
                var fields = `id='${req.body.id}', subId='${req.body.subId}', startDate='${req.body.startDate}'`;
                if(enrolments)fields+=`, enrolments='${enrolments}'`;

                var query = `update instances set ${fields} where id='${req.params.id}';`
                var data = await sql.query(query)
            }else{
                return res.status(400).json({message: "instance id must match subject id"})
            }
        }else{
            return res.status(400).json({message: "subject id and instance id do not match the required format"})
        }
        
        //check if no record updated
        if(data.rowsAffected[0]===0){
            return res.status(404).json({message:'No record found with that name'})
        }
        return res.status(200).json(data)
    }catch(err){
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        } 
        return res.status(500).json({message: err.message})
    }
}
const deleteInstance = async(req, res) =>{
    queries.deleteRow('instances', 'id', req, res)    
}
const manageInstances = (req, res) =>{
    //if authenticated
    res.status(200).sendFile('C:\\Users\\Rama Nicholson\\Documents\\Units\\3.8 Project B\\didaskoAPICopy\\public\\instances.html')
}
module.exports = {
    getAllInstances,
    getInstancesSchedule,
    getSomeInstances,
    newInstance,
    updateInstance,
    deleteInstance,
    manageInstances
}