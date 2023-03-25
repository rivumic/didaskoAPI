const sql = require('mssql')
const getAll = async (table, req, res) =>{
    try{
        var query = `select * from ${table}`;
        var data = await sql.query(query)
        res.status(200).json(data.recordset)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
const conditionalGet = async (table, field, req, res)=>{
    try{
        var query = `select * from ${table} where ${field}='${req.params.id}'`
        var data = await sql.query(query)
        res.status(200).json(data.recordset)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
const deleteRow = async (table, field, req, res) =>{
    try{
        var query = await sql.query(`delete from ${table} where ${field}='${req.params.id}'`)
        if(query.rowsAffected[0]===0){
            return res.status(404).json({message:'No record found with that name'})
        }
        return res.status(200).json(query)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}
module.exports = {getAll, conditionalGet, deleteRow}