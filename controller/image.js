const db = require("../database");


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

module.exports ={
    singleupload : singleImg,
    multipleupload: multipleImg
};

