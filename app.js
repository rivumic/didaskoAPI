const express = require('express')
const sql = require('mssql')
const sqlConfig = require('./db/sqlConfig')
const subjects = require('./routes/subjects')
const instances = require('./routes/instances')
const academics = require('./routes/academics')
const assignments = require('./routes/assignments')
const subDev = require('./routes/subDev')
const app = express()

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/didasko/subjects', subjects)
app.use('/didasko/instances', instances)
app.use('/didasko/academics', academics)
app.use('/didasko/assignments', assignments)
app.use('/didasko/subDev', subDev)

//start
const port = 5000

const start = async()=>{
    try{
        await sql.connect(sqlConfig)
        app.listen(port, console.log('server listening on port 5000'))
    }
    catch(err){
        console.log(err)
    }
}
start()