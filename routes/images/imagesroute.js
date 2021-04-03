const express = require('express');
const  TokenController  = require('../../controller/token');
const imageController = require('../../controller/image');
const imageUploader = require('../../helpers/imageuploader');


const router = express.Router();

router.post('/singleupload/:roomId', TokenController.checkToken, imageUploader.imgupload.single('image'),imageController.singleupload);


router.post('/:userId/:roomId/multipleuploads', TokenController.checkToken, imageUploader.imgupload.array('image', 15),imageController.multipleupload);

router.get('/getMultipleimg/:roomId',imageController.getImage);

router.get('/getimg/:id',imageController.getImageID)
module.exports = router;