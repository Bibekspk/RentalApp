const db = require('../database');
const jwt =require ('jsonwebtoken');


const bcrypt = require('bcryptjs'); //bcrypt for hashing the password for preotection

exports.register = (req,res) => {
    const {name, email,password, passwordconfirm, phone,address,isAdmin} = req.body; //storing all the value from form to varialbes

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
        db.query('INSERT INTO users SET ?', {name:name , email: email, password: hashedpassword, contact:phone,isAdmin:isAdmin,address:address}, (error,results) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                res.send({
                    message: 'Sucessfully registered.',
                    data: results
                });
            }
        })
    });
}
exports.login= async (req,res) => {
    try{
        
        const {email,password} = req.body;
        db.query('SELECT * from users WHERE email = ?', [email], async(error, results)=>{
            if(results==0){
             return res.send({
                    message: "Acocunt doesnot exists."
                })
            }

            if(!results || !(await bcrypt.compare(password,results[0].password))){
              return  res.send({
                    message: "Incorrect email or password"
                })
            }
            else{
                const id= results[0].id.toString();
                const username= results[0].name

                const token = jwt.sign({id},process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN //expiry time of token
                })
                res.send({
                    id: id,
                    name: username,
                    token: token 
                })

                

            }
        })
    }
    catch(error){
        console.log(error);
    }

    }

    exports.adminlogin= async (req,res) => {
        try{
            
            const {email,password} = req.body;
            db.query('SELECT * from users WHERE email = ? and isAdmin=true', [email], async(error, results)=>{
                if(results==0){
                 return res.status(500).send({
                        message: "Account doesnot exists."
                    })
                }
    
                if(!results || !(await bcrypt.compare(password,results[0].password))){
                  return  res.status(500).send({
                        message: "Incorrect email or password"
                    })
                }
                else{
                    const id= results[0].id.toString();
                    const username= results[0].name
    
                    const token = jwt.sign({id},process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN //expiry time of token
                    })
                    res.send({
                        id: id,
                        name: username,
                        token: token 
                    })
    
                    
    
                }
            })
        }
        catch(error){
            console.log(error);
        }
    
        }

exports.getUsers=(req,res)=>{
    try{
        db.query('SELECT * from users',
         [],
          (error,results)=>{
              if(error){
               return  res.send({
                    message: "Some error occured"
                })
              }
              if(results<=0){
                  return res.send({
                      message: "No data in the database"
                  })
              }
              else{
                  return res.send({
                      success: true,
                      data : results
                  })
              }
              
          })
    }
    catch(error){
        console.log(error);
    }

}

exports.updateUser = (req,res) => {
    const id = req.params.userID;
    const {name, email, phone,address,isAdmin} = req.body; //storing all the value from form to varialbes

    db.query('SELECT email from users WHERE UserID = ?',[id], async(error,results) => { //we are suing async due to password await code
        if(error){
            console.log(error);
        }
        if(results.length <= 0){ //result is an array so when an array have 2 same email then return is used ot terminate 
            return res.send({ //here return is to end code if 2 same user are found
                message : 'User not registered!!!'
            });
            
        }else{
        //inserting into db  // contact: phone here contact is of db and phone is from forntend or form
        db.query('UPDATE INTO users SET ?', {name:name , email: email,  contact:phone,isAdmin:isAdmin,address:address}, (error,results) =>{
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
