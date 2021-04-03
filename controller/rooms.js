const db = require('../database');
const { getImageData,getProperty } = require('../services/services');



exports.addRoom = (req,res) => {
    const id = req.params.userId
const {roomTitle,roomno,description,address,price,parking,bathroom} = req.body;
console.log(req.body) //storing all the value from form to varialbes
try{
    db.query("INSERT INTO rooms SET ?", 
    {userId:id, roomTitle: roomTitle, roomno: roomno, description: description, address: address, price: price, parking: parking, bathroom: bathroom},(error,results) =>{
        if(error){
           return res.send({
                success: false,
                message: "Error while registering room",
                error: error
            })
        }
        else{
            // addImage(req,res);
            res.send({
                success: true,
                message: "Room have been successfully added",
                roomid : results.insertId.toString(),
                data: results
            })
        }
    })
}
catch(error){
    console.log(error);
}
}

exports.getRoom =(req,res) =>{
    try{
        db.query('SELECT * from rooms',[],(error,results)=>{
            if(error){
              return  res.send({
                    success: false,
                    message: "Error occured."
                })}
            if(results<=0){
               return  res.send({
                    success: false,
                    message: "No data were found."
                })
            }
            else{
                res.send({
                    success: true,
                    data : results
                })
            }

            }
            
        )
    }
    catch(error){
        console.log(error);
    }
}

exports.getRoomById =(req,res) =>{
    const id = req.params.roomID
    try{
        db.query('SELECT * from rooms where RoomId =?',[id],(error,results)=>{
            if(error){
              return  res.send({
                    success: false,
                    message: "Error occured."
                })}
            if(results<=0){
               return  res.send({
                    success: false,
                    message: "No data were found."
                })
            }
            else{
                res.send({
                    success: true,
                    data : results
                })
            }

            }
            
        )
    }
    catch(error){
        console.log(error);
    }
}

exports.updateRoomById =(req,res) =>{
    const roomid = req.params.roomID
    const userid = req.params.userID
    const {roomtitle,roomno,description,address,price,parking,kitchen,water} = req.body;
    try{
      db.query(`UPDATE rooms SET roomTitle = ?, roomno = ?, description = ?, address = ?, price = ?, parking = ?, kitchen = ?, water = ? WHERE RoomId = ? and userId=?`,
                [
                roomtitle,
                roomno,
                description,
                address,
                price,
                parking,
                kitchen,
                water,
                roomid,
                userid
                ],(error,results)=>{
                    if(error){
                        return res.send({
                            error: error,
                            message: "Error occured"
                        })
                    }
                    else{
                        res.send({
                            message: "successfully updated",
                            success: true,
                            data : results
                        })
                    }
                })
                    

                
                
}
 catch(error){
        console.log(error);
    }
}

exports.getPropertyDetail= (req, res) => {
    const body = req.body;
    const room_id = [];
  getProperty((error, results) => {
        if (error) {
            return console.log(error);
        }
        if (results.length <= 0) {
            res.status(200).json({
                message: "There is no data in table"
            });
        }
        var resData = results; //property detail
            console.log("PropertyDetail",resData[0])
            for (let index = 0; index < resData.length; index++) {
            
                            const element = resData[index];    
                            room_id.push(element);
                           
            }
            res.send({
                data: room_id
            })
            console.log(room_id);
       
    })
    
}


// exports.getPropertyDetail= (req, res) => {
//     const prop_id = [];
//     var imageData; 
//     var imagedata2; 
//     const fullData = [];
//     const body = req.body;
//   getProperty((error, results) => {
//         if (error) {
//             return console.log(error);
//         }
//         if (results.length <= 0) {
//             res.status(200).json({
//                 message: "There is no data in table"
//             });
//         }
//         var resData = results; //property detail
//             // console.log("PropertyDetail",resData[0])
//         // res.send({
//         //     data: result
//         // })
//         for (let index = 0; index < resData.length; index++) {
            
//             const element = resData[index]; 
//             // resData[index].image = imgdata       
//             prop_id.push(element.RoomId);
           
//            var imgdata = getImageData(element.RoomId, (error, results) => {
//                 if (error) {
//                     res.send({ success: false });
//                 }
//                 var resBody = results;
//                 // console.log(results);
//                 var imageData = [];
//                 // var imgdata;
//                 for (let index = 0; index < resBody.length; index++) { //images ko data
                   
//                     const element1 = resBody[index];
//                     imageData.push('http://10.0.2.2:3000/multipropertyimage/' + element1.image); //use path
                    
//                     // console.log("Element"+resData);
//                     // element.images = imageData
//                  //promise .all () reasearch 
//                 //  console.log("ImageData"+imageData)
                
//                 }
//                 console.log(imageData);
//                 return imageData
//             })
//             console.log("resData "+imgdata);
//             // console.log("Res data"+resData.image)
//         }
//     })
    
// }

//  //For getting detail of evry images with details :
//  exports.getPropertyDetail = (req, res)=> {
//     var resData;
//     function getInnerCore() {
//         return new Promise(function (resolve, reject) {
//             getProperty((error, results) => {
//                 if (error) {
//                     res.send({ message: "Ramro sita lekhj" });
//                     reject();
//                 }
//                 resData = results; //property detail
//                 // console.log("PropertyDetal", resData[1])
//                 resolve(resData);
//             });
//         })
//     }
//     //asdfasdfasdfasdfasdf
//     function getOuterCore() {

//         return new Promise((resolve, reject) => {

//             for (let j = 0; j < resData.length; j++) {
//                 const propId = resData[j].property_id;

//                 getImageData(propId, (error, results) => {

//                     if (error) {
//                         console.log("Error!!!!!!!");
//                         reject();
//                     }
//                     console.log('asdfasdfasdfsad', results);
//                     const arr = [];
//                     for (let i = 0; i < results.length; i++) {
//                         const element = results[i];
//                         console.log("This is Image details !", element.image_name);
//                         arr.push(element.image_name);
//                     }
//                     resData.image = arr
//                     var jpt = resData;
//                     console.log(resData);
//                     resolve(jpt);
//                 });


//             }
//         });
//     }
//     getInnerCore()
//         .then(function () {
//             // console.log("data", resData);
//             getOuterCore().then((data) => {
//                 // console.log("asdfasdfasd", data);
//                 res.send({
//                     data: data
//                 })
//             })
//         })
//         .catch()
//         Promise.all[getInnerCore,getOuterCore].then(values=>{
//             console.log("final data",values)
//         })

// }


// function getImageData('',[element.RoomId], (error, results) => {
//                     if (error) {
//                         res.send({ success: false });
//                     }
//                     var resBody = results;
//                     // console.log(results);
//                     var imageData = [];
//                     // var imgdata;
//                     for (let index = 0; index < resBody.length; index++) { //images ko data
                       
//                         const element1 = resBody[index];
//                         imageData.push('http://10.0.2.2:3000/multipropertyimage/' + element1.image); //use path
                        
//                         // console.log("Element"+resData);
//                         // element.images = imageData
//                      //promise .all () reasearch 
//                     //  console.log("ImageData"+imageData)
                    
//                     }
//                     console.log(imageData);
//                     return imageData
//                 })
             