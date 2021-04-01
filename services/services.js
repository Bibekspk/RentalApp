const db = require('../database');

function getProperty (callBack)  {
    db.query(`SELECT * FROM ROOMS`,
        [],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
}

function getImageData(id, callBack) {
    db.query(
        `SELECT * FROM IMAGE WHERE roomId = ?`,
        [id],
        (error, results) => {
            if (error) {
                return callBack(error);
            }
            console.log('Sucessfully Get');
            return callBack(null, results);
        });
}

module.exports={
    getProperty,
    getImageData
}