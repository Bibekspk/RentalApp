const mysql = require('mysql');

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

module.exports = db;