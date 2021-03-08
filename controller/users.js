const db = require('../database');
const jwt =require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.updateuser= async(req,res) =>{
try{
        const {name,password, passwordconfirm, phone} = req.body;
    db.query('SELECT email from users WHERE email = ?',[email], async(error,results) => { //we are suing async due to password await code
         if(error){
                console.log(error);
         }
    })
}
catch(error){
    console.log(error);
}
}