const express = require("express");

//improting mysql
const mysql = require("mysql");

//creating main app or middle ware for project of express
const app= express();

//importing dotenv
const dotenv = require('dotenv');

dotenv.config({path: './.env'}); // providing path of .env file 

//creating connection with certain sql database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
//connecting  to database 
db.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('MYSQL Connected');
    }
});

app.use(express.json());//it recognizes the incoming json data 

// Using routes
app.use('/api', require('./routes/route'));





app.listen(5000, () =>{
    console.log('Server started');
})