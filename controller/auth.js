const db = require('../database');
const jwt =require ('jsonwebtoken');


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
exports.login= async (req,res) => {
    try{
        
        const {email,password} = req.body;

        if(!email || !password) {
            return res.status(400).send({
                message: "Please provide an email and password"
            }
            )
        }

        db.query('SELECT * from users WHERE email = ?', [email], async(error, results)=>{
            console.log(results);
            if(!results || !(await bcrypt.compare(password,results[0].password))){
                res.status(401).send({
                    message: "Incorrect email or password"
                })
            }
            else{
                const id= results[0].id
                const username= results[0].name

                // // const token = jwt.sign({id},process.env.JWT_SECRET, {
                // //     expiresIn: process.env.JWT_EXPIRES_IN //expiry time of token
                // })
                res.send({
                    id: id,
                    name: username
                    // token: token 
                })

                

            }
        })
    }
    catch(error){
        console.log(error);
    }

    }
    

