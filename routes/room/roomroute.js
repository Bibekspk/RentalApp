const express = require('express');
const  authController  = require('../../controller/token');
const roomController = require('../../controller/rooms'); //providing path to the controller
const favouriteController = require('../../controller/favourites');
const router = express.Router(); //using express for making router

router.post('/:userId/room',authController.checkToken,roomController.addRoom);
router.put('/:userID/:roomID/editroom',authController.checkToken,roomController.updateRoomById); //checkingtoken and passing to controler addroom for romm adding.

router.get('/rooms',roomController.getRoom);
router.get("/:userID/rooms/:roomID", roomController.getRoomById);
router.get("/getRoomDetail", roomController.getRoomDetail);
// router.put("/:userID/rooms/:roomID", roomController.updateRoomById);

//fav room details
router.post("/favRoom/:roomId/:userId",favouriteController.favRooms);
router.get("/favRooms/:userID",favouriteController.getFavDetails);
router.delete("/delfavRoom/:roomId/:userId",favouriteController.removeFav);

//search room details 
router.get("/searchedRoom/:location/:start/:end",roomController.getSearchedRoom);

//listed propertires of users
router.get("/getRooms/:userID",roomController.getRoomsByUserId);





module.exports =router;