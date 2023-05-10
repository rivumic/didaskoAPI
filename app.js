//express
const express = require('express')
const session = require('express-session')
require('dotenv').config()
//sql-related
const sql = require('mssql')
const sqlConfig = require('./db/sqlConfig')
const sqlStore = require('connect-mssql-v2')
//passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

//routes
const pages = require('./routes/pages')
const subjects = require('./routes/subjects')
const instances = require('./routes/instances')
const academics = require('./routes/academics')
const assignments = require('./routes/assignments')
const subDev = require('./routes/subDev')
//
const app = express()
//session middleware
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    store: new sqlStore(sqlConfig),
    cookie: {
        maxAge: 1000*60*60*24
    }
}));

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//passport middleware
require('./auth/passport.js')
app.use(passport.initialize());
app.use(passport.session());
//routes
app.use(express.static('./public/static'));
app.use('/', pages)
app.use('/didasko/subjects', subjects)
app.use('/didasko/instances', instances)
app.use('/didasko/academics', academics)
app.use('/didasko/assignments', assignments)
app.use('/didasko/subDev', subDev)

//start
const port = process.env.PORT || 5000;

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