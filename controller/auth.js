const db = require('../database');

const bcrypt = require('bcryptjs'); //bcrypt for hashing the password for preotection

exports.register = (req,res) => {
    const {name, email,password, passwordconfirm, phone} = req.body; //storing all the value from form to varialbes

    db.query('SELECT email from users WHERE email = ?',[email], async(error,results) => { //we are suing async due to password await code
        if(error){
            console.log(error);
        }
        if(results.length > 0){ //result is an array so when an array have 2 same email then return is used ot terminate 
            return res.send({ //here return is to end code if 2 same user are found
                message : 'User alreadgy registered!!!'
            });
            
        }
        else if(passwordconfirm != password){
            return res.send({
                message: 'Password donot match'
            });
        }
        //await can be used only in async fun
        let hashedpassword = await bcrypt.hash(password,8); //encrypting passowrd with 8 round hashing
        console.log(hashedpassword);

        //inserting into db  // contact: phone here contact is of db and phone is from forntend or form
        db.query('INSERT INTO users SET ?', {name:name , email: email, password: hashedpassword, contact:phone}, (error,results) =>{
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
    });
}
exports.login=(req,res)=>{
    const {username,password} = req.body;
}
