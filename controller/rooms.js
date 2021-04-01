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
                roomid : results.insertId,
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
    const prop_id = [];
    const imageData = [];
    const body = req.body;
    getProperty((error, results) => {
        // console.log(typeof getProperty);
        if (error) {
            return console.log(error);
        }
        if (results.length <= 0) {
            res.status(200).json({
                message: "There is no data in table"
            });
        }
        console.log('this is response data ! ==> ', results);
        var resData = results;
        for (let index = 0; index < resData.length; index++) {
            const element = resData[index];
            console.log("property id ==> ", element.RoomId);
            prop_id.push(element.RoomId);

            getImageData(element.RoomId, (error, results) => {
                if (error) {
                    res.send({ success: false });
                }
                var resBody = results;
                console.log("RES BODY ==> ", results);
                for (let index = 0; index < resBody.length; index++) {
                    const element = resBody[index];
                    imageData.push('http://10.0.2.2:3000/multipropertyimage/' + element.image);
                    console.log('This is concatinate', resData, element.image);
                }
                console.log("This is image data ==>", imageData);

            });
            // prop_id.push(ImageData)
            // res.status(200).json({
            //     data: resData
            // });
        }
        
        console.log(prop_id);
        console.log(imageData);
    });
}

