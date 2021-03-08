const db = require('../database');

exports.addRoom= async(req,res) =>{
try{
        const {userId,roomtitle,roomno,description,address,price,parking,kitchen} = req.body;
        var id = "SELECT * from users where id=" 
        db.query('INSERT INTO rooms SET ?', {userId:userId, roomtitle: roomtitle, roomno: hashedpassword, contact:phone}, (error,results) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                res.send({
                    message: 'Sucessfully registered.'
                });
            }
        })
}
catch(error){
    console.log(error);
}
}