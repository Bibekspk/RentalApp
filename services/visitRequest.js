const db = require('../database')

function getUserInfo(userId){
   
    return new Promise((resolve,reject)=>{
        db.query("SELECT name,email,contact from users where id=?",[userId],(err,user)=>{
            if(user){
                 resolve(user[0])
            }
            else{
               return  reject(err)
            }
        })
    })
       
    
}

function getRoomInfo(RoomId){
    return new Promise((resolve,reject)=>{
        db.query("SELECT RoomId,userId,address,ApproveStatus,price from rooms where RoomId=?",[RoomId],async(err,room)=>{
            if(room){
                console.log("Room");
                console.log(room)
                db.query("SELECT name,email,contact from users where id=?",[room[0].userId],(err,user)=>{
                    if(user){
                        room[0].hostUser = user[0]
                         resolve(room[0])
                    }
                    else{
                       return  reject(err)
                    }
                })
            }
            else{
                reject(err)
            }
        })
    })
       
    
}

module.exports= {
    getUserInfo,
    getRoomInfo,

}