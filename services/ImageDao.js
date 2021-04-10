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

module.exports={
   
    addMainImageName
}