const sql = require('mssql')
const queries = require('../db/queries')

const getAllAcademics = async(req, res) =>{
    queries.getAll('academics', req, res)
}
const createAcademic = async(req, res) =>{
    try{
        
        if(!req.body.id){
            throw new Error('no id supplied')
        }else{
            var name=req.body.id
            var data= await sql.query(`insert into academics values ('${name}')`)
            if(req.body.quals.length){
            var quals=req.body.quals;
            var insert = '';
            quals.forEach((subId)=>{
                insert+=`insert into qualifications values('${subId}', '${name}');`
            })            
            var query = await sql.query(insert);
            }
        }
        return res.status(200).json({query})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const updateAcademic = async(req, res) =>{
    try{
        var results= [];
        var name=req.params.id
        if(req.body.id){
            var updateName = `update academics set id='${req.body.id}' where id='${req.params.id}';`
            var data = await sql.query(updateName)
            results.push({data})
            name=req.body.id;
            console.log('name is now changed to:', name)
        }
        if(req.body.quals){
            var deleteQuals = `delete from qualifications where academicId='${name}';`
            console.log(deleteQuals)
            var query = await sql.query(deleteQuals)
            var quals=req.body.quals;
            var insert = '';
            quals.forEach((subId)=>{
                insert+=`insert into qualifications values('${subId}', '${name}');`
            })
            
            if (insert.length>0){var query = await sql.query(insert); results.push({query})}
        }
        return res.status(200).json({results})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const deleteAcademic = async(req, res) =>{
    queries.deleteRow('academics', 'id', req, res)    
}
const getQuals = async(req, res) =>{
    queries.conditionalGet('qualifications', 'academicId', req, res)
}
const getLoad = async(req, res) =>{
    try{
        const yearMonth = `${req.body.year}-${req.body.month}-01`;
        const countQuery = `select qualifications.academicId, subDev.subId as dev 
            from qualifications full outer join subDev on qualifications.academicId=subDev.academicId 
            where qualifications.subId='${req.body.subId}' and ('${yearMonth}' BETWEEN startDate and endDate or subDev.subId is null);`
        const countLoad = (await sql.query(countQuery)).recordset
        var load = new Map()
        countLoad.forEach((row)=>{
            if(row.dev){var dev=1}else{var dev=0};

            if (load.has(row.academicId)){
                load.set(row.academicId, load.get(row.academicId)+dev)
            }else{
                load.set(row.academicId, dev)
            }
        })
        //instance load
        const instanceListQuery = `select instanceId, count(assignments.instanceId) as assignedAcademics 
        from assignments where instanceid IN(select id from instances 
        where ('${yearMonth}' between startDate and dateadd(month, 3, startDate)) 
        and id IN(select instanceId from assignments where academicId IN(
        select academicId from qualifications where subId='${req.body.subId}'))) group by instanceId;`;
        const assignmentsListQuery = `select id, academicId, main, enrolments, startDate
        from assignments join instances on instanceId=id 
        where academicId IN (select academicId from qualifications where subid='${req.body.subId}') 
        and ('${yearMonth}' between startDate and dateadd(month, 2, startDate)) order by enrolments;`;
        const instanceList = (await sql.query(instanceListQuery)).recordset
        const assignmentsList = (await sql.query(assignmentsListQuery)).recordset
        var instanceMap = new Map()
        instanceList.forEach((row)=>{
            instanceMap.set(row.instanceId, row.assignedAcademics);
        })
        //id(instance), academicId, main, enrolments
        assignmentsList.forEach((row)=>{
            var instanceLoad = (1+(row.enrolments/20)+(+row.main))/instanceMap.get(row.id);
            if (instanceLoad<1){
                if(row.main){
                    instanceLoad=1
                }else{
                    instanceLoad=0.5
                }
            }
            load.set(row.academicId, load.get(row.academicId)+instanceLoad)
            // console.log('load for:', row.academicId, 'teaching', row.id, 'is:', instanceLoad)
            // console.log('load totals are currently:', load)
        })
        const result = Object.fromEntries(load)
        return res.status(200).json({result})
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    
}
module.exports = {
    getAllAcademics,
    createAcademic,
    updateAcademic,
    deleteAcademic,
    getQuals,
    getLoad
}