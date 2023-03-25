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
        const result = await sql.query(`insert into subDev values('${req.params.subId}','${req.params.academicId}','${req.body.startDate}','${req.body.endDate}')`)
        res.status(200).json({result})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
const deleteSubDev = async (req, res) =>{
    try{
        var deleteQuery = '';
        const deleteList = req.body
        deleteList.forEach((subDev)=>{
            deleteQuery+=`delete from subDev where academicId='${subDev.academicId}' and subId='${subDev.subId}'`
        })
        const result = await sql.query(deleteQuery)
        res.status(200).json({result})
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