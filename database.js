const mysql = require('mysql');
const dotenv = require('dotenv');//dotenv for securing information 

dotenv.config(); // providing path of .env file 

//creating connection with certain sql database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,


});
//connecting  to database 
console.log(process.env.DATABASE);
db.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('MYSQL Connected');
    }
});

module.exports = db;