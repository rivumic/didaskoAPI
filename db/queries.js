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
const getQuals = async (academicId)=>{
    quals = (await sql.query(`select * from qualifications where academicId='${academicId}'`)).recordset;
    return quals;
}
const getAcademicLoad = async (academicId, yearMonth)=>{
    const subDevCount = (await sql.query(`select * from subDev where academicId = '${academicId}' and ('${yearMonth}' BETWEEN startDate and endDate);`)).recordset
    var load = 0;
    if(subDevCount){
        load = subDevCount.length*3;
    }
    const instanceAssignCountQuery = `select instanceId, count(assignments.instanceId) as assignedAcademics 
        from assignments where instanceid IN(select id from instances 
        where (startDate between dateadd(month, -2, '${yearMonth}') and '${yearMonth}') 
        and id IN(select instanceId from assignments where academicId ='${academicId}')) group by instanceId;`
    const instanceInfoByAssignQuery = `select id, academicId, main, enrolments, startDate
    from assignments join instances on instanceId=id 
    where academicId='${academicId}' and (startDate between dateadd(month, -2, '${yearMonth}')and '${yearMonth}');`;

    const data = await Promise.all([await sql.query(instanceAssignCountQuery),await sql.query(instanceInfoByAssignQuery)])
    instanceAssignCount = data[0].recordset
    instanceInfoByAssign = data[1].recordset

    if(instanceAssignCount&&instanceInfoByAssign){
        instanceMap = new Map()
        instanceAssignCount.forEach((row)=>{
            instanceMap.set(row.instanceId, row.assignedAcademics);
        })

        instanceInfoByAssign.forEach((row)=>{
            var instanceLoad = (1+((parseInt(row.enrolments/20))*.2))/instanceMap.get(row.id);
            if (row.main<1){
                if(instanceLoad<1){
                instanceLoad=1
                }
            }else{
                if(instanceLoad<.2){instanceLoad=.3}
            }
        load+=instanceLoad;
        })
    }

    return load;
}
module.exports = {getAll, conditionalGet, deleteRow, getQuals, getAcademicLoad}