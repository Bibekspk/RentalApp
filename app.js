const express = require("express");
const route = require('./routes/auth/route');
const roomroute = require('./routes/room/roomroute')
const imgroute = require('./routes/images/imagesroute')

//improting mysql
const mysql = require("mysql");

//creating main app or middle ware for project of express
const app= express();

app.use(express.json());//it recognizes the incoming json data 

// Using routes
app.use('/api', route);

app.use('/v1',roomroute);

app.use('/v2',imgroute);





app.listen(5000, () =>{
    console.log('Server started');
})