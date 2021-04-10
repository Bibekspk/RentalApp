const db = require('../database');

function getUser(id){
    return new Promise((resolve,reject)=>{
        db.query('SELECT * from users where id=?',[id],(error,results)=>{
            if(results){
                resolve(results)
            }
            else{
                reject(error)
            }
        })
    })
}

module.exports={
    getUser
}