const db = require("../database");
const path = require('path');
const { updateImages } = require("../services/ImageDao");


function singleImg(req, res) {
    var fileInfo = req.file;
    var roomId = req.params.roomId;
    // console.log("Roomid"+roomId)
    // console.log("Single File",fileInfo);
    if (req.file.filename) {
        var imgUrl = 'http://10.0.2.2:5000/static/' + fileInfo.filename;
        db.query(`UPDATE rooms SET thumb_Img = ? WHERE RoomId = ?`, [imgUrl, roomId], (error, results) => {
            if (error) {
                res.status(500).json({
                    message: "Error during insertion of thumbnail image"
                })
            }
            res.status(200).json({
                message: "successfully thumbnail image inserted",
                success: true,
                data: results
            })
        })
    } else {
        res.status(500).json({
            message: "something went wrong in the Server ! ",
            url: req.file.filename
        });
    }
}

function multipleImg(req, res) {
    var fileInfo = req.files;
    var userId = req.params.userId;
    var roomId = req.params.roomId;
    if (fileInfo.length > 0) {
        for (i = 0; i < fileInfo.length; i++) {
            const element = fileInfo[i];
            var imgUrl = 'http://10.0.2.2:5000/static/' + element.filename;
            db.query(`INSERT INTO IMAGE (roomId,userId,image) VALUES(?,?,?)`, [
                roomId, userId, imgUrl
            ], (error, results) => {
                if (error) {
                    res.send({
                        success: false,
                        message: "Error occured"
                    })
                }
                res.send({
                    success: true,
                    message: "Successfully Added"
                })
            })
        }
    }
    else {
        res.send({
            message: "Please selec images",
            success: false
        })
    }
}

 function updatemultipleImage (req, res) {
    var fileInfo = req.files;
    var userId = req.params.userId;
    var roomId = req.params.roomId;
    console.log("userID"+userId);
    console.log("roomID  "+userId);
    
    db.query('DELETE FROM IMAGE WHERE userId = ? AND roomId =?', [userId,roomId], (error, results) => {
        if (error) {
            res.send({
                success: false,
                message: "Image not deleted"
            })
        }
        else {
            if (fileInfo.length > 0) {
                for (i = 0; i < fileInfo.length; i++) {
                    const element = fileInfo[i];
                    var imgUrl = 'http://10.0.2.2:5000/static/' + element.filename;
                    const images = updateImages(roomId,userId,imgUrl);
                    // db.query(`INSERT INTO IMAGE (roomId,userId,image) VALUES(?,?,?)`, [
                    //     roomId, userId, imgUrl
                    // ], (error, results) => {
                    //     if (error) {
                    //         res.send({
                    //             success: false,
                    //             message: "Error occured"
                    //         })
                    //     }
                    //     res.send({
                    //         success: true,
                    //         message: "Successfully Added"
                    //     })
                    // })
                    res.send({
                                success: true,
                                message: "Successfully Added"
                            })
                }
            }
            else {
                res.send({
                    message: "Please select images",
                    success: false
                })
            }
        }
    } )
 }    


function getImage(req, res) {
    const roomid = req.params.roomId;
    const imagenames = [];
    console.log(roomid);
    db.query(
        `SELECT * FROM IMAGE WHERE roomId = ?`,
        [roomid],
        (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length <= 0) {
                return res.status(400).json({
                    success: 0,
                    message: "Selected property does not contains any images!"
                });
            }
            var resBody = results
            console.log(resBody);

            for (let i = 0; i < resBody.length; i++) {
                const element = resBody[i];
                //
                // imagenames.push(element.image)
                imagenames.push(`http://10.0.2.2:5000/static/${element.image}`)

                // console.log(element);
                // console.log("Images name" + imagenames);


            }
            res.json({
                name: imagenames
            });

        })
}

function getImageID(req, res) {
    res.sendFile('F:/fyp project/Rentalapp/backend/uploads/' + req.params.id);
}
module.exports = {
    singleupload: singleImg,
    multipleupload: multipleImg,
    getImageID,
    getImage,
    updatemultipleImage
};

//express static and path 
