const db = require('../database');
const { deleteFavRoom } = require('../services/favRoomDao');
const { delImage } = require('../services/ImageDao');
const { getImageData, getRoom, searchRoom, getRoomByUserID, approveStatus } = require('../services/roomsDao.js');
const { delRequest } = require('../services/services');
const { getUser, delroomImgbyID, delroombyID } = require('../services/userDao');




exports.addRoom = (req, res) => {
    const id = req.params.userId
    const { roomTitle, roomno, description, address, price, parking, bathroom, latitude, longitude,approveStatus } = req.body;
    console.log(req.body) //storing all the value from form to varialbes
    try {
        db.query("INSERT INTO rooms SET ?",
            { userId: id, roomTitle: roomTitle, roomno: roomno, description: description, address: address, price: price, parking: parking, bathroom: bathroom, Latitude: latitude, Longitude: longitude,ApproveStatus: approveStatus }, (error, results) => {
                if (error) {
                    return res.send({
                        success: false,
                        message: "Error while registering room",
                        error: error
                    })
                }
                else {
                    // addImage(req,res);
                    res.send({
                        success: true,
                        message: "Room have been successfully added",
                        roomid: results.insertId.toString(),
                        data: results
                    })
                }
            })
    }
    catch (error) {
        console.log(error);
    }
}

exports.getRoom = (req, res) => {
    try {
        db.query('SELECT * from rooms', [], (error, results) => {
            if (error) {
                return res.send({
                    success: false,
                    message: "Error occured."
                })
            }
            if (results <= 0) {
                return res.send({
                    success: false,
                    message: "No data were found."
                })
            }
            else {
                res.send({
                    success: true,
                    data: results
                })
            }

        }

        )
    }
    catch (error) {
        console.log(error);
    }
}

exports.approveRoom = (req, res) => {
    const id = req.params.RoomID;
    try {
       const approve = approveStatus(id, function(error,done){
           if(error){
               console.log("Error occured")
           }
           else{
               res.send({
                   status: "Approved"
               })
           }
       })
       console.log(approve);
    }
    catch (error) {
        console.log(error);
    }
}

exports.getRoomById = (req, res) => {
    const id = req.params.roomID
    try {
        db.query('SELECT * from rooms where RoomId =?', [id], (error, results) => {
            if (error) {
                return res.send({
                    success: false,
                    message: "Error occured."
                })
            }
            if (results <= 0) {
                return res.send({
                    success: false,
                    message: "No data were found."
                })
            }
            else {
                res.send({
                    success: true,
                    data: results
                })
            }

        }

        )
    }
    catch (error) {
        console.log(error);
    }
}

exports.getRoomsByUserId = async (req, res) => {
    const id = req.params.userID
    const results = [];
    const rooms = await getRoomByUserID(id);
    if (rooms.length <= 0) {
        res.status(200).json({
            message: "There is no data in table"
        });
    }
    else {
        for (let index = 0; index < rooms.length; index++) {
            const room = rooms[index];
            const thumb_Img = 'http://10.0.2.2:5000/static/'+room.thumb_Img;
            room.thumb_Img =thumb_Img;
            const images = await getImageData(room.RoomId);
            const imageUrls = images.map(image => {
                return `http://10.0.2.2:5000/static/${image.image}`;
            });
            room.images = imageUrls;
            const user = await getUser(room.userId);
            room.userDetail = user[0];
            results.push(room);
        }
        res.send({
            data: results
        })
    }
}

exports.updateRoomById = (req, res) => {
    const roomid = parseInt(req.params.roomID);
    const userid = parseInt(req.params.userID);

    const { roomTitle, roomno, description, address, price, parking, bathroom, latitude, longitude } = req.body;
    try {
        db.query(`UPDATE rooms SET roomTitle = ?, roomno = ?, description = ?, address = ?, price = ?, parking = ?, bathroom = ?, Latitude = ?, Longitude = ? WHERE RoomId = ? AND userId=?`,
            [
                roomTitle,
                roomno,
                description,
                address,
                price,
                parking,
                bathroom,
                latitude, longitude,
                roomid,
                userid
            ], (error, results) => {
                if (error) {
                    return res.send({
                        error: error,
                        message: "Error occured"
                    })
                }
                else {
                    res.send({
                        message: "successfully updated",
                        success: true,
                        data: results,
                        roomid: results.insertId.toString(),
                    })
                }
            })

    }
    catch (error) {
        console.log(error);
    }
}

// exports.getPropertyDetail= (req, res) => {
//     const results = []
//     getProperty((error, properties) => {
//         if (error) {
//             return console.log(error);
//         }
//         if (properties.length <= 0) {
//             res.status(200).json({
//                 message: "There is no data in table"
//             });
//         }
//         for (let index = 0; index < properties.length; index++) {
//             const property = properties[index];    
//             getImageData(property.RoomId, (error, images) => {
//                 let imageUrls = []
//                 if (!error) {
//                     imageUrls = images.map(image => {
//                         return `http://10.0.2.2:3000/multipropertyimage/${image.image}`;
//                     });
//                 }
//                 property.images = imageUrls;
//                 results.push(property);
//             });
//         }
//         res.send({
//           data: results
//         })
//     })
// }

exports.getRoomDetail = async (req, res) => {
    const results = [];
    const properties = await getRoom();
    if (properties.length <= 0) {
        res.status(200).json({
            message: "There is no data in table"
        });
    }
    else {

        for (let index = 0; index < properties.length; index++) {
            const property = properties[index];
            const thumb_Img = 'http://10.0.2.2:5000/static/'+property.thumb_Img;
            property.thumb_Img =thumb_Img;
            //multiple images 
            const images = await getImageData(property.RoomId);
            const imageUrls = images.map(image => {
                return `http://10.0.2.2:5000/static/${image.image}`;
            });
            property.images = imageUrls;
            const user = await getUser(property.userId);
            property.userDetail = user[0];
            results.push(property);
        }
        res.send({
            data: results
        })
        console.log(results);
    }
}


exports.delRoom = async (req, res) => {
    const userId = req.params.userID;
    const roomId = req.params.roomID;
    const img = await delroombyID(userId);
    const images = await delImage(userId, roomId);
    const request = await delRequest(userId, roomId);
    const favrooms = await deleteFavRoom(roomId);
    

    db.query("DELETE from rooms where userId = ? AND RoomId = ?", [userId, roomId], (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send({
                message: "Successfully Removed"
            })
        }
    })
    // db.query('DELETE from image WHERE userId = ? AND roomId =?',[userId,roomId],(error,results)=>{
    //     if(error){
    //         res.send({
    //         success: false,
    //         message : ""
    //         })
    //     }else{
    //         db.query("DELETE from rooms where userId = ? AND RoomId = ?",[userId,roomId],(error,results)=>{
    //             if(error){
    //                 console.log(error);
    //             }
    //             else{
    //                 res.send({
    //                     message: "Successfully Removed"
    //                 })
    //             }
    //         })
    //     }
    // })

    // const results = [];
    // const properties = await getRoom();
    // if (properties.length <= 0) {
    //     res.status(200).json({
    //         message: "There is no data in table"
    //     });
    // }
    // for (let index = 0; index < properties.length; index++) {
    //     const property = properties[index];
    //     const images = await getImageData(property.RoomId);
    //     const imageUrls = images.map(image => {
    //         return `http://10.0.2.2:5000/multipropertyimage/${image.image}`;
    //     });
    //     property.images = imageUrls;
    //     const user = await getUser(property.userId);
    //     property.userDetail = user[0];
    //     results.push(property);
    // }
    // res.send({
    //     data: results
    // })
}

exports.getSearchedRoom = async (req, res) => {
    const location = req.params.location;
    const start = req.params.start;
    const end = req.params.end;
    const results = [];
    const properties = await searchRoom(location, start, end);
    if (properties.length <= 0) {
        res.status(200).json({
            message: "There is no data in table"
        });
    }
    else {
        for (let index = 0; index < properties.length; index++) {
            const property = properties[index];
            const thumb_Img = 'http://10.0.2.2:5000/static/'+property.thumb_Img;
            property.thumb_Img =thumb_Img
            const images = await getImageData(property.RoomId);
            const imageUrls = images.map(image => {
                return `http://10.0.2.2:5000/static/${image.image}`;
            });
            property.images = imageUrls;
            const user = await getUser(property.userId);
            property.userDetail = user[0];
            results.push(property);
        }
        res.send({
            data: results
        })
    }

}



// exports.getPropertyDetail= (req, res) => {
//     const room_id = [];
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

//         for (let index = 0; index < resData.length; index++) { 
// //           
//                 var element = resData[index]; 

//                 room_id.push(element);

//         getImageData(element.RoomId, (error, results) => {
//                 if (error) {
//                     res.send({ success: false });
//                 }
//                 var resBody = results;
//                 // console.log("Image dta "+results);
//                 var imageData = [];

//                 for (let index = 0; index < resBody.length; index++) { //images ko data

//                     const element1 = resBody[index];
//                     imageData.push('http://10.0.2.2:3000/multipropertyimage/' + element1.image); //use path

//                     // console.log("Element"+resData);

//                  //promise .all () reasearch 
//                  element.images = imageData
//                 console.log("Data outside "+element);

//                 }


//             })

//             // console.log("Res data"+resData.image)
//         }
//         console.log("resData "+room_id);
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
