const sql = require('mssql')
const queries = require('../db/queries')

const getAllSubjects = async (req, res) => {
    queries.getAll('subjects', req ,res)
    
}
const newSubject = async (req, res) => {
    try{
        if(!req.body.id){
            throw new Error('No subject id supplied.')
        }
        var query = await sql.query(`insert into subjects(id, yearLevel) values(\'${req.body.id}\', ${req.body.yearLevel})`)
        res.status(201).json(query)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
const updateSubject = async (req, res) => {
    try{
        if(!req.body.yearLevel){
            return res.status(400).json({message: "No year level provided"})
        }
        var queryString = `update subjects set id=\'${req.body.id}\', yearLevel=${req.body.yearLevel} where id=\'${req.params.id}\'`
        var query = await sql.query(queryString)
        if(query.rowsAffected[0]===0){
            res.status(404).json({message:'No record found with that name'})
        }
        return res.status(200).json(query)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}
const deleteSubject = async (req, res) =>{
    queries.deleteRow('subjects', 'id', req, res)
}


module.exports = {
    getAllSubjects,
    newSubject,
    updateSubject,
    deleteSubject
}