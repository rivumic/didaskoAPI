//see documentation for expected request structure

const sql = require('mssql')
const queries = require('../db/queries')

//subject id validation regex
const subRegex = new RegExp("CSE[123][A-Z][A-Z]X")

//retrieves all subjects
const getAllSubjects = async (req, res) => {
    queries.getAll('subjects', req ,res)
    
}
// creates a new subject
const newSubject = async (req, res) => {
    try{
        if(!req.body.id || !req.body.yearLevel){
            return res.status(400).json({message: "incomplete information supplied, subject id and year level must be supplied"})    
        }
        if(subRegex.test(req.body.id)){
            if(req.body.id.substring(3, 4)===req.body.yearLevel){
                var query = await sql.query(`insert into subjects(id, yearLevel) values(\'${req.body.id}\', ${req.body.yearLevel})`);
                return res.status(201).json(query);
            }else{
                return res.status(400).json({message: "year level must match subject id"})
            }
        }else{
            return res.status(400).json({message: "incorrect subject id format"})    
        }
        
    }catch(err){
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        }        
        return res.status(500).json({message: err.message})
    }
}
//updates a subject
const updateSubject = async (req, res) => {
    try{
        if(!req.body.yearLevel || !req.body.id){
            return res.status(400).json({message: "incomplete information supplied, subject id and year level must be supplied"})
        }
        if(subRegex.test(req.body.id)){
            if(req.body.id.substring(3, 4)){
                var queryString = `update subjects set id=\'${req.body.id}\', yearLevel=${req.body.yearLevel} where id=\'${req.params.id}\'`
                var query = await sql.query(queryString)
                if(query.rowsAffected[0]===0){
                    return res.status(404).json({message:'No record found with that name'})
                }
            }else{
                return res.status(400).json({message: "year level must match subject id"})
            }
        }else{
            return res.status(400).json({message: "incorrect subject id format"})
        }
        return res.status(200).json(query)
    }
    catch(err){
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        }
        return res.status(500).json({message: err.message})
    }
}
//deletes a subject
const deleteSubject = async (req, res) =>{
    queries.deleteRow('subjects', 'id', req, res)
}


module.exports = {
    getAllSubjects,
    newSubject,
    updateSubject,
    deleteSubject
}