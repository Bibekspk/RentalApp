const db = require('../database');

function getFavRoombyUserID(userid){
    return new Promise((resolve,reject)=>{
        db.query('SELECT * from favourites WHERE UserID = ?',[userid],(error,results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

module.exports = {
    getFavRoombyUserID
}