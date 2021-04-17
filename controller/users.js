const db = require('../database');
// const jwt =require ('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.updateUser = (req,res) => {
    const id = parseInt(req.params.userID);
    const {name, email, phone,address,isAdmin} = req.body; //storing all the value from form to varialbes

    db.query('SELECT email from users WHERE id = ?',[id], async(error,results) => { //we are suing async due to password await code
        if(error){
            console.log(error);
        }
       else{
       
        db.query(`UPDATE users SET name=?, email =?, contact =?, isAdmin=?, address=? WHERE id=?`, [
            name,
            email,
            phone,
            isAdmin,address,id

        ], (error,results) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                res.send({
                    message: 'Sucessfully Edited.',
                    // data: results
                });
            }
        })
    }
    });
}

exports.getUser= async(req,res) =>{
    const id = parseInt(req.params.userID)
    try{
        db.query('SELECT * from users WHERE id = ?',[id], async(error,users) => { //we are suing async due to password await code
             if(error){
                    console.log(error);
             }
             else{
                 res.send({
                     data : users
                 })
             }
        })
    }
    catch(error){
        console.log(error);
    }
    }