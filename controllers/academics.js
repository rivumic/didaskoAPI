//see documentation for expected request structure
const sql = require('mssql')
const queries = require('../db/queries')

//retrieves all academic info
const getAllAcademics = async(req, res) =>{
    queries.getAll('academics', req, res)
}
//creates an academic
const createAcademic = async(req, res) =>{
    try{
        
        if(!req.body.id){
            throw new Error('no id supplied')
        }else{
            var name=req.body.id.trim().replace(/\s+/g, ' ');
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
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        }
        return res.status(500).json({message: err.message})
    }
}
//updates academic id and qualifications
const updateAcademic = async(req, res) =>{
    try{
        var results= [];
        var name=req.params.id
        if(req.body.id){
            var updateName = `update academics set id='${req.body.id}' where id='${req.params.id}';`
            var data = await sql.query(updateName)
            results.push({data})
            name=req.body.id;
        }
        if(req.body.quals){
            var assignedSubjects = (await sql.query(`select subId from assignments join instances on instanceId = instances.id where academicId = '${req.params.id}' group by subId;`)).recordset
            var quals=req.body.quals;
            var isUnqualInstance = false;
            assignedSubjects.forEach((subject)=>{

                if(!quals.includes(subject.subId)){
                    isUnqualInstance = true;
                }
            })
            if(isUnqualInstance){
                return res.status(400).json({message: "Cannot remove qualification if instance is currently assigned for that subject."})
            }
            var deleteQuals = `delete from qualifications where academicId='${name}';`
            var query = await sql.query(deleteQuals)

            
            var insert = '';
            quals.forEach((subId)=>{
                insert+=`insert into qualifications values('${subId}', '${name}');`
            })
            
            if (insert.length>0){var query = await sql.query(insert); results.push({query})}
        }
        return res.status(200).json({results})
    }catch(err){
        if(err.message.substring(0, 35)=='Violation of PRIMARY KEY constraint'){
            return res.status(400).json({message: err.message})
        }
        return res.status(500).json({message: err.message})
    }
}
//deletes an academic
const deleteAcademic = async(req, res) =>{
    queries.deleteRow('academics', 'id', req, res)    
}

//retrieves academic load for given year month
const getOneLoad = async (req, res) =>{
    try{
        const yearMonth = `${req.params.year}-${req.params.month}-01`
        const load = await queries.getAcademicLoad(req.params.id, yearMonth);

        var result = {result: load}
        return res.status(200).json(result)
        
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
}
//retrieves qualifications for a given academic
const getQuals = async(req, res) =>{
    queries.conditionalGet('qualifications', 'academicId', req, res)
}
//retrieves load for academics of a given qualification in a given month
const getLoad = async(req, res) =>{
    try{
        const yearMonth = `${req.params.year}-${req.params.month}-01`;
        var load = new Map()
        const qualifiedAcademics = (await sql.query(`select * from qualifications where subId='${req.params.subId}'`)).recordset
        qualifiedAcademics.forEach((qualification)=>{
            load.set(qualification.academicId, 0)
        })
        //subDev Load
        const subDevCountQuery = `select * from subDev where '${yearMonth}' BETWEEN startDate and endDate;`
        const subDevCount = (await sql.query(subDevCountQuery)).recordset
        if(subDevCount){
            subDevCount.forEach((subDev)=>{
                if(load.has(subDev.academicId)){
                    load.set(subDev.academicId, load.get(subDev.academicId)+3)
                }
            })
        }

        //instance load
        const instanceAssignCountQuery = `select instanceId, count(assignments.instanceId) as assignedAcademics 
        from assignments where instanceid IN(select id from instances 
        where (startDate between dateadd(month, -2, '${yearMonth}') and '${yearMonth}') 
        and id IN(select instanceId from assignments where academicId IN(
        select academicId from qualifications where subId='${req.params.subId}'))) group by instanceId;`;        
        const instanceInfoByAssignQuery = `select id, academicId, main, enrolments, startDate
        from assignments join instances on instanceId=id 
        where academicId IN (select academicId from qualifications where subid='${req.params.subId}') 
        and (startDate between dateadd(month, -2, '${yearMonth}') and '${yearMonth}');`;

        const data = await Promise.all([await sql.query(instanceAssignCountQuery), await sql.query(instanceInfoByAssignQuery)])
        const instanceAssignCount = data[0].recordset
        const instanceInfoByAssign = data[1].recordset

        var instanceMap = new Map()
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
            load.set(row.academicId, load.get(row.academicId)+instanceLoad)
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