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
  module.exports = {
    getRoom,
    getImageData
  }