const db = require("../database");

exports.siteVisitRequest=(res,req)=>{
    console.log("Room");
    const roomId = req.params.roomID
    const userId = req.params.userID;
    console.log(userId)
 
    const {siteVisit,roomPrice,inquiry,date} = req.body
    try{
        db.query(`INSERT INTO REQUEST (RoomID, UserID, SiteVisit, Priceinquiry, DateforVisit,VisitDetail)
        VALUES (?,?,?,?,?)`,
                  [
                  roomId,userId,siteVisit,roomPrice,date,inquiry
                  ],(error,results)=>{
                      if(error){
                           res.send({
                              error: error,
                              message: "Error occured"
                          })
                      }
                      else{
                          res.send({
                              message: "Request Successfully Made",
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