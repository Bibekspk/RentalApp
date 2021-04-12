const express = require('express');
const  authController  = require('../../controller/token');
const roomController = require('../../controller/rooms'); //providing path to the controller
const favouriteController = require('../../controller/favourites');
const { route } = require('../request/requestRoute');
const router = express.Router(); //using express for making router

router.post('/:userId/room',authController.checkToken,roomController.addRoom); //checkingtoken and passing to controler addroom for romm adding.
router.get('/rooms',roomController.getRoom);
router.get("/:userID/rooms/:roomID", roomController.getRoomById);
router.get("/getRoomDetail", roomController.getRoomDetail);
router.put("/:userID/rooms/:roomID", roomController.updateRoomById);

router.post("/favRoom/:roomId/:userId",favouriteController.favRooms);
router.delete("/delfavRoom/:roomId/:userId",favouriteController.removeFav);





module.exports =router;