const db = require('../database');

function addMainImageName (roomId, imageName, callBack)  {
    db.query(`UPDATE rooms SET thumbImg = ? WHERE RoomId = ?`,
        [
            imageName,
            roomId
        ],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            console.log('Data succesfully stored');
            return callBack(null, results);
        });
}

function updateImages(roomid,userid,image){
    return new Promise((resolve,reject)=>{
        db.query('INSERT INTO IMAGE (roomId,userId,image) VALUES(?,?,?)',[roomid,userid,image],(error,results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

function delImage(userId,roomId){
    return new Promise((resolve,reject)=>{
        db.query('DELETE from image WHERE userId = ? AND roomId =?',[userId,roomId],(error,results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })
}

module.exports={
    updateImages,
    addMainImageName,delImage
}