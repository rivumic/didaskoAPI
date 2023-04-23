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
const getOneLoad = async (req, res) =>{
    try{
        const yearMonth = `${req.params.year}-${req.params.month}-01`
        //subDev
        const subDevCountQuery = `select * from subDev where academicId = '${req.params.id}' and ('${yearMonth}' BETWEEN startDate and endDate)`
        const subDevCount = (await sql.query(subDevCountQuery)).recordset
        var load = 0;
        if(subDevCount){
            subDevCount.forEach(()=>{
                load++
            }) 
        }
        
        //instance Load
        const instanceAssignCountQuery = `select instanceId, count(assignments.instanceId) as assignedAcademics 
        from assignments where instanceid IN(select id from instances 
        where (startDate between dateadd(month, -2, '${yearMonth}') and '${yearMonth}') 
        and id IN(select instanceId from assignments where academicId ='${req.params.id}')) group by instanceId;`
        const instanceInfoByAssignQuery = `select id, academicId, main, enrolments, startDate
        from assignments join instances on instanceId=id 
        where academicId='${req.params.id}' and (startDate between dateadd(month, -2, '${yearMonth}')and '${yearMonth}');`;
        instanceAssignCount = (await sql.query(instanceAssignCountQuery)).recordset
        instanceInfoByAssign = (await sql.query(instanceInfoByAssignQuery)).recordset
        // console.log(instanceAssignCount)
        // console.log(instanceInfoByAssign)
        if(instanceAssignCount&&instanceInfoByAssign){
            instanceMap = new Map()
            instanceAssignCount.forEach((row)=>{
                instanceMap.set(row.instanceId, row.assignedAcademics);
            })
    
            instanceInfoByAssign.forEach((row)=>{
                var instanceLoad = (1+((parseInt(row.enrolments/20))*.2))/instanceMap.get(row.id);
                if (instanceLoad<1){
                    if(row.main){
                        instanceLoad=1
                    }else{
                        instanceLoad=0.5
                    }
                }
                load+=instanceLoad
                console.log('load for:', row.academicId, 'teaching', row.id, 'is:', instanceLoad)
                console.log('load totals are currently:', load)
            })
        }
        
        var result = {result: load}
        return res.status(200).json(result)
        
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}
const getQuals = async(req, res) =>{
    queries.conditionalGet('qualifications', 'academicId', req, res)
}
const getLoad = async(req, res) =>{
    try{
        const yearMonth = `${req.body.year}-${req.body.month}-01`;
        //subDev Load
        const subDevCountQuery = `select qualifications.academicId, subDev.subId as dev 
            from qualifications full outer join subDev on qualifications.academicId=subDev.academicId 
            where qualifications.subId='${req.body.subId}' and ('${yearMonth}' BETWEEN startDate and endDate or subDev.subId is null);`
        const subDevCount = (await sql.query(subDevCountQuery)).recordset
        
        var load = new Map()
        subDevCount.forEach((row)=>{
            if(row.dev){var dev=1}else{var dev=0};

            if (load.has(row.academicId)){
                load.set(row.academicId, load.get(row.academicId)+dev)
            }else{
                load.set(row.academicId, dev)
            }
        })
        //instance load
        const instanceAssignCountQuery = `select instanceId, count(assignments.instanceId) as assignedAcademics 
        from assignments where instanceid IN(select id from instances 
        where (startDate between dateadd(month, -2, '${yearMonth}') and '${yearMonth}') 
        and id IN(select instanceId from assignments where academicId IN(
        select academicId from qualifications where subId='${req.body.subId}'))) group by instanceId;`;
        
        const instanceInfoByAssignQuery = `select id, academicId, main, enrolments, startDate
        from assignments join instances on instanceId=id 
        where academicId IN (select academicId from qualifications where subid='${req.body.subId}') 
        and (startDate between dateadd(month, -2, '${yearMonth}') and '${yearMonth}');`;
        
        const instanceAssignCount = (await sql.query(instanceAssignCountQuery)).recordset
        const instanceInfoByAssign = (await sql.query(instanceInfoByAssignQuery)).recordset

        var instanceMap = new Map()
        instanceAssignCount.forEach((row)=>{
            instanceMap.set(row.instanceId, row.assignedAcademics);
        })
        instanceInfoByAssign.forEach((row)=>{
            var instanceLoad = (1+((parseInt(row.enrolments/20))*.2))/instanceMap.get(row.id);
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
    getOneLoad,
    getQuals,
    getLoad
}