const express = require("express");
const route = require('./routes/auth/route');
const roomroute = require('./routes/room/roomroute')
const imgroute = require('./routes/images/imagesroute')
const requestroute = require('./routes/request/requestRoute');
const path = require('path');
const cors = require('cors');

//improting mysql
const mysql = require("mysql");

//creating main app or middle ware for project of express
const app= express();
app.use(cors());
app.use(express.json());//it recognizes the incoming json data 

app.use('/static', express.static(path.join(__dirname, 'uploads'))) //1st chai route and 2nd one is path
// Using routes
app.use('/api', route);

app.use('/v1',roomroute);

app.use('/v2',imgroute);

app.use('/v3',requestroute);


app.listen(5000, () =>{
    console.log('Server started');
});