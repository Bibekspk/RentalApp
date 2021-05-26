const db = require("../database");
const { sendMailfucntion } = require("../helpers/nodemailer");
const { getUserInfo, getRoomInfo } = require("../services/visitRequest");

exports.siteVisitRequest = (req, res) => {
    console.log("Room");
    var id1 = req.params.roomId
    var id2 = req.params.userId;
    // console.log(userId)

    const { siteVisit, roomPrice, inquiry, date } = req.body
    try {
        db.query(

            "INSERT INTO request SET ?",
            { UserID: id2, RoomID: id1, SiteVisit: siteVisit, Priceinquiry: roomPrice, DateforVisit: date, VisitDetail: inquiry }

            , (error, results) => {
                if (error) {
                    res.send({
                        error: error,
                        message: "Error occured"
                    })
                }
                else {
                    res.send({
                        message: "Request Successfully Made",
                        success: true,
                        data: results
                    })
                }
            })
    }
    catch (error) {
        console.log(error);
    }
}

exports.getRequests =  (req, res) => {
    try {
        db.query("SELECT * from request", [], async (error, results) => {
            if (error) {
                res.send({
                    error: error,
                    message: "Error occured"
                })
            }
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    const request = results[i];
                    console.log("Inside reuslt", request)
                    const requesteruser = await getUserInfo(request.UserID)
                    const room = await getRoomInfo(request.RoomID)
                    request.roominfo = room;
                    request.requestor = requesteruser;


                }
                res.send({
                    message: "Request Successfully Made",
                    success: true,
                    data: results
                })
            }
            if (results.length <= 0) {
                res.send({
                    message: "Request were extracted but no data was found"
                })
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.approveVisit = (req, res) => {

    const visitInfo = req.body
    try {
        db.query(
            "UPDATE request SET ApprovedStatus = ? WHERE RequestID=?", ['true',visitInfo.RequestID]
            , (error, results) => {
                if (error) {
                    res.send({
                        error: error,
                        message: "Error occured"
                    })
                }
                else {
                    sendMailfucntion(visitInfo,(error,done)=>{
                        if(error){
                            return res.send({
                                message: "Mail couldnot be sent",
                                error: error
                            })
                        }
                        else{
                            res.send({
                                message: "Successfully Approved and Mail have been send to Owner and RoomSeeker.",
                                success: true,
                            })
                        }
                    })
                  
                }
            })
    }
    catch (error) {
        console.log(error);
    }
}