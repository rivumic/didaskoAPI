const sql = require('mssql')
const queries = require('../db/queries')

const getAllInstances = async(req, res) =>{
    queries.getAll('instances', req, res)
}

const getInstancesSchedule = async(req,res)=>{
    try{
        var query = `select id, subId, enrolments, datepart(yyyy, startDate) as year, datepart(m, startDate) as month from instances order by year, subId, month;`;
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
        if(!req.body.enrolments){
            req.body.enrolments = 0
        }        
        var data = await sql.query(`insert into instances(id, subId, enrolments, startDate)
            values('${req.body.id}', '${req.body.subId}',
            ${req.body.enrolments}, '${req.body.startDate}');`)
        res.status(201).json(data)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
const updateInstance = async(req, res) =>{
    try{
        var fields = `id='${req.body.id}', subId='${req.body.subId}', startDate='${req.body.startDate}'`;
        if(req.body.enrolments)fields+=`, enrolments='${req.body.enrolments}'`;
        var query = `update instances set ${fields} where id='${req.params.id}';`
        console.log(query)
        var data = await sql.query(query)
        //check if no record updated
        if(data.rowsAffected[0]===0){
            return res.status(404).json({message:'No record found with that name'})
        }
        return res.status(200).json(data)
    }catch(err){
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