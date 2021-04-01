const db = require("../database");
const path  = require('path');



function singleImg (req,res) {
    // var fileInfo = req.file;

    // console.log(fileInfo);
    if (req.file.filename) {
        res.status(201).json({
            message: "Image uploaded successfully",
            url: req.file.filename
        });
    } else {
        res.status(500).json({
            message: "something went wrong ! ",
            url: req.file.filename
        });
    }
}

function multipleImg (req,res) {
    var fileInfo = req.files;
    var userId = req.params.userId;
    var roomId = req.params.roomId;
    if(fileInfo.length > 0){
        for(i=0;i<fileInfo.length;i++){
            const element = fileInfo[i];
            db.query(`INSERT INTO IMAGE (roomId,userId,image) VALUES(?,?,?)`,[
                roomId,userId,element.filename
            ],(error,results)=>{
                if(error){
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
    else{
        res.send({
            message: "Please selec images",
            success: false
        })
    }
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

            for ( let i = 0; i<resBody.length; i++) {
                const element = resBody[i];
                //
                // imagenames.push(element.image)
                imagenames.push(`http://10.0.2.2:5000/static/${element.image}`)

                // console.log(element);
                // console.log("Images name" + imagenames);

              
            }
            res.json({
                name: imagenames});
        
        })
    }

function getImageID(req, res) {
    res.sendFile('F:/fyp project/Rentalapp/backend/uploads/' + req.params.id);
}
module.exports ={
    singleupload : singleImg,
    multipleupload: multipleImg,
    getImageID,
    getImage,
};

//express static and path 
