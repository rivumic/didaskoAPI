const sql = require('mssql')
const queries = require('../db/queries')

const getAllSubDev = async (req, res) =>{
    queries.getAll('subDev', req, res)
}
const getSomeSubDev = async (req, res)=>{
    queries.conditionalGet('subDev', 'academicId', req, res)
}
const createSubDev = async (req, res) =>{
    try{
        if(!req.body.startDate || !req.body.endDate){
            throw new Error('Incorrect date information supplied')
        }

        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        if(startDate>endDate){throw new Error('The start date cannot be before the end date')}

        const result = await sql.query(`insert into subDev values('${req.params.subId}','${req.params.academicId}','${req.body.startDate}','${req.body.endDate}')`)
        var dateCounter = startDate;
        var dateStrings = [];
        while (dateCounter<=endDate){
            dateStrings.push(dateCounter.toISOString());
            dateCounter.setMonth(dateCounter.getMonth()+1);
        }

        var overloadMonths = [];

        const loads = await Promise.all(dateStrings.map(async (date)=>{
            const load = await queries.getAcademicLoad(req.params.academicId, date);
            if(load>7){overloadMonths.push(date)}
            return load;
        }))

        if(overloadMonths.length>0){
            return res.status(201).json({result: result, overload: true, overloadMonths: overloadMonths, load: loads})
        }else{
            return res.status(201).json({result: result})
        }
        
    }catch(err){
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        }
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}
const deleteSubDev = async (req, res) =>{
    try{
        var deleteQuery = '';
        const deleteList = req.body
        deleteList.forEach((subDev)=>{
            deleteQuery+=`delete from subDev where academicId='${subDev.academicId}' and subId='${subDev.subId}';`
        })
        console.log(deleteQuery)
        const result = await sql.query(deleteQuery)
        res.status(204).json({result})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
module.exports = {
    getAllSubDev,
    getSomeSubDev,
    createSubDev,
    deleteSubDev
}