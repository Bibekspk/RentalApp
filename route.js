const express = require('express');

const router = express.Router(); //using express for making router

// GET method
router.get('/', (req,res) =>{
    res.send({
        type: 'GET'
    });
});

//adding to db using post
router.post('/register',(req,res) =>{
    res.send({
        type : 'POST',
        name: req.body.name,
        age: req.body.age

    });
});

module.exports = router;