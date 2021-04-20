const db = require('../database');
const bcrypt = require('bcryptjs');
const { delfavbyID, delImagesbyID, delReqbyID, delroombyID,delUser } = require('../services/userDao');

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

exports.getUsers = async(req,res) =>{
    const id = parseInt(req.params.userID)
    try{
        db.query('SELECT id,name,email,contact,address from users WHERE isAdmin = 0',[], async(error,users) => { //we are suing async due to password await code
             if(error){
                    console.log(error);
             }
             else{
                 res.send({
                    users
                 })
             }
        })
    }
    catch(error){
        console.log(error);
    }
}

exports.delUser = async (req,res) =>{
    const id = parseInt(req.params.userID);
    console.log(id);
    try{
        const favourites = await delfavbyID(id);
        const requests = await delReqbyID(id);
        const images = await delImagesbyID(id);
        const rooms = await delroombyID(id);
        const users = await delUser(id);
        res.send({
            message: "Successfully Deleted",
            
        })
        
    }
    catch(error){
        console.log(error);
    }
}