const db = require("../database");
const { getFavRoombyUserID } = require('../services/favRoomDao');
const { getRoombyID } = require('../services/roomsDao');
const { getUser } = require("../services/userDao");


exports.favRooms = (req, res) => {
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
                    // db.query('UPDATE rooms SET favStatus = ? WHERE RoomId = ? AND UserId=?', ["true", roomid, userid], (error, results) => {
                    //     if (error) {
                    //         res.send({
                    //             error: error,
                    //             message: "Error occured"
                    //         })
                    //     }
                    //     else {
                    //         res.send({
                    //             message: "Successfully Added to the Cart",
                    //             success: true,
                    //             data: results
                    //         })
                    //     }
                    // })
                    res.send({
                        message: "Successfully Added to the Cart",
                        success: true,
                        data: results
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
                
                res.send({
                    message: "Successfully Removed from Cart",
                    success: true,
                    data: results
                })
               
            }

        })
    }
    catch (error) {
        console.log(error)
    }
}

exports.getFavDetails = async (req, res) => {
    var userid = req.params.userID
    const results = [];
    var rooms = await getFavRoombyUserID(userid);
    if(rooms.length==0){
        res.send({
            success: false,
            message: "No data found"
        })
    }
    else{
    for (let index = 0; index < rooms.length; index++) {
        var roomdetails = await getRoombyID(rooms[index].RoomID)
        var user = await getUser(roomdetails[0].userId) // using userId of room to get user
        var roomdetail = roomdetails[0]; //storing in var
        const thumb_Img = 'http://10.0.2.2:5000/static/'+roomdetails[0].thumb_Img;
        roomdetail.thumb_Img =thumb_Img;
        roomdetail.userDetails = user[0]
        results.push(roomdetail);

       
    }
    res.send ({
        // success: true,
        data: results 
    })
    console.log(results);
}
    
}