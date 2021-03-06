const db = require('../database');

function getRoom ()  {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ROOMS`,
        [],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      )
    })
  }
  function getRoomByUserID (id)  {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ROOMS WHERE userId = ?`,
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      )
    })
  }

  function getRoombyID (roomid)  {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ROOMS WHERE RoomID = ?`,[roomid],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      )
    })
  }

  
  function getImageData(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM IMAGE WHERE roomId = ?`,
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  }

  function searchRoom(location,start,end){
    if(start == null || end== null){
      console.log("Provide values");
    }
    else{
      var startprice = parseInt(start);
     var endprice = parseInt(end);
      return new Promise((resolve,reject)=>{
        db.query(`SELECT * from rooms WHERE (address LIKE "${location + "%"}") AND (price BETWEEN ? AND ?)`,[startprice,endprice],(error,results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results);
            }
        })
    })}
}

  module.exports = {
    getRoom,
    getImageData,
    getRoombyID,
    searchRoom,
    getRoomByUserID
  }