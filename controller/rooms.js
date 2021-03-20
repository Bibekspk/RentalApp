const db = require('../database');


exports.addRoom = (req,res) => {
    const id = req.params.userId
const {roomtitle,roomno,description,address,price,parking,kitchen,water} = req.body;
console.log(req.body) //storing all the value from form to varialbes
try{
    db.query("INSERT INTO rooms SET ?", 
    {userId:id, roomTitle: roomtitle, roomno: roomno, description: description, address: address, price: price, parking: parking, kitchen: kitchen, water: water},(error,results) =>{
        if(error){
            res.send({
                success: false,
                message: "Error while registering room"
            })
        }
        else{
            // addImage(req,res);
            res.send({
                success: true,
                message: "Room have been successfully added",
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