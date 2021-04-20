const express = require('express');
const authController= require('../../controller/auth'); //providing path to the controller
const userController= require('../../controller/users'); //providing path to the controller
const router = express.Router(); //using express for making router


//authorization 
router.post('/register', authController.register); // we are using register funtion which is inside auth.js

router.post('/login', authController.login); // we are using login funtion which is inside auth.js
router.post('/adminlogin', authController.adminlogin); // we are using login funtion which is inside auth.js

// router.get("/getUsers", authController.getUsers);
router.get("/getUserInfo/:userID", userController.getUser);
router.get("/getUsersInfo", userController.getUsers);
router.delete("/delUser/:userID", userController.delUser);
router.post("/editProfile/:userID", userController.updateUser);

module.exports = router;
