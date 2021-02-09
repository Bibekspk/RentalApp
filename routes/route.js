const express = require('express');
const authController = require('../controller/auth'); //providing path to the controller
const router = express.Router(); //using express for making router

router.post('/register', authController.register); // we are using register funtion which is inside auth.js


//sending to website 
//router.get('/login',(req,res) => {
//     res.send({
//         message: 'I am the King'
//     });
// })
//router.post('/login', authController.login); // we are using login funtion which is inside auth.js

module.exports = router;