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

function delroombyID(userID){
    return new Promise((resolve,reject)=>{
        db.query('DELETE FROM rooms where userId =? ',[userID],(error,results)=>{
            if(results){
                resolve(results)
            }
            else{
                reject(error)
            }
        })
    })
}

function delReqbyID(userID){
    return new Promise((resolve,reject)=>{
        db.query('DELETE FROM request where userID =? ',[userID],(error,results)=>{
            if(results){
                resolve(results)
            }
            else{
                reject(error)
            }
        })
    })
}
function delfavbyID(userID){
    return new Promise((resolve,reject)=>{
        db.query('DELETE FROM favourites where userID =? ',[userID],(error,results)=>{
            if(results){
                resolve(results)
            }
            else{
                reject(error)
            }
        })
    })
}

function delImagesbyID(userID){
    return new Promise((resolve,reject)=>{
        db.query('DELETE FROM image where userID =? ',[userID],(error,results)=>{
            if(results){
                resolve(results)
            }
            else{
                reject(error)
            }
        })
    })
}
function delUser(userID){
    return new Promise((resolve,reject)=>{
        db.query('DELETE FROM users where id =? ',[userID],(error,results)=>{
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
    getUser,delImagesbyID,delReqbyID,delroombyID,delfavbyID,delUser
}