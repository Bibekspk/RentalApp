const express = require("express");

//improting mysql
const mysql = require("mysql");

//creating main app or middle ware for project of express
const app= express();

//importing dotenv
const dotenv = require('dotenv');//dotenv for securing information 

dotenv.config({path: './.env'}); // providing path of .env file 


app.use(express.json());//it recognizes the incoming json data 

// Using routes
app.use('/api', require('./routes/auth/route'));

app.use('/v1',require('./routes/room/roomroute'));





app.listen(5000, () =>{
    console.log('Server started');
})