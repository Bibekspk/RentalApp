const db = require("../database");

exports.favRooms = (req, res) => {
    // console.log("Room");
    var roomid = req.params.roomId
    var userid = req.params.userId;
    try {
        db.query(
            `INSERT INTO favourites (RoomID, UserID)
        VALUES (?,?)`,
            [
                roomid, userid
            ]
            , (error, results) => {
                if (error) {
                    res.send({
                        error: error,
                        message: "Error occured"
                    })
                }
                else {
                    db.query('UPDATE rooms SET favStatus = ? WHERE RoomId = ? AND UserId=?', ["true", roomid, userid], (error, results) => {
                        if (error) {
                            res.send({
                                error: error,
                                message: "Error occured"
                            })
                        }
                        else {
                            res.send({
                                message: "Successfully Added to the Cart",
                                success: true,
                                data: results
                            })
                        }
                    })

                }
            })
    }
    catch (error) {
        console.log(error);
    }
}

exports.removeFav = (req, res) => {
    const userid = req.params.userId;
    const roomid = req.params.roomId;
    try {
        db.query("DELETE FROM favourites WHERE UserID=? AND RoomID=?", [userid, roomid], (error, results) => {
            if (error) {
                res.send({
                    error: error,
                    message: "Error occured"
                })
            }
            if (results) {
                db.query('UPDATE rooms SET favStatus = ? WHERE RoomId = ? AND UserId=?', ["false", roomid, userid], (error, results) => {
                    if (error) {
                        res.send({
                            error: error,
                            message: "Error occured"
                        })
                    }
                    else {
                        res.send({
                            message: "Successfully Removed from Cart",
                            success: true,
                            data: results
                        })
                    }
                })
            }

        })
    }
    catch (error) {
        console.log(error)
    }
}
