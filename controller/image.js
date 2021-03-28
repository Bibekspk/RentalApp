

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
    // var fileInfo = req.file;

    if (req.files) {
        res.status(201).json({
            message: "Image uploaded successfully",
            url: req.files
        });
        
    } else {
        res.status(500).json({
            message: "something went wrong ! ",
            url: req.file.filename
        });
    }
}

module.exports ={
    singleupload : singleImg,
    multipleupload: multipleImg
};

