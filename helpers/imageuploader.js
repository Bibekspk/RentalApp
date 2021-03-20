
const multer = require('multer');
const path = require('path');

//Certain configuration for the multer before call other functions:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); //Setting the destination for upload image
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));   // It will helps for the naming of the file
    }
});

//Filters for file format:

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported files'), false);
    }
}

//upload method for the multer:
const imgupload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30,
    },
    fileFilter: fileFilter,
});

module.exports = {
    imgupload: imgupload,
}