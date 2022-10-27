const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()
const route = require('./server/router/router')
const connectDB = require('./server/database/connection')

dotenv.config( { path : 'config.env'} )
const PORT = 3000;

// log requests
app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended : true}))
app.use(express.json()) // for parsing application/json

// view eninge 
app.set("view engine", "ejs")

// Connection datebase 
connectDB()

// load assets 
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

// router app setup 
app.use('/', route)


app.listen(PORT, () => {
    console.log(`server runing is a port : http://localhost:${PORT}`);
})
//




/**
 * No 1. all user and add user and update user request hanlder----completed!
 * No 2. mongoDB server contection ----- completed
 * No 3. create, update and delete request hanlder 
 * N0 4. finaly front end contection 
 * 
 *  */
