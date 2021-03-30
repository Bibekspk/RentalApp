const express = require("express");
const route = require('./routes/auth/route');
const roomroute = require('./routes/room/roomroute')
const imgroute = require('./routes/images/imagesroute')
const path = require('path');

//improting mysql
const mysql = require("mysql");

//creating main app or middle ware for project of express
const app= express();

app.use(express.json());//it recognizes the incoming json data 

app.use('/static', express.static(path.join(__dirname, 'uploads'))) //1st chai route and 2nd one is path
// Using routes
app.use('/api', route);

app.use('/v1',roomroute);

app.use('/v2',imgroute);





app.listen(5000, () =>{
    console.log('Server started');
})