const express = require('express');
const  TokenController  = require('../../controller/token');
const imageController = require('../../controller/image');
const imageUploader = require('../../helpers/imageuploader');


const router = express.Router();

router.post('/singleupload', TokenController.checkToken, imageUploader.imgupload.single('image'),imageController.singleupload);


router.post('/multipleUploads', TokenController.checkToken, imageUploader.imgupload.array('image', 15),imageController.multipleupload);

module.exports = router;