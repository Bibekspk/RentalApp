const express = require('express');
const authController = require('../controller/auth'); //providing path to the controller
const router = express.Router(); //using express for making router

router.post('/register', authController.register); // we are using register funtion which is inside auth.js

//router.post('/login', authController.login); // we are using login funtion which is inside auth.js

module.exports = router;