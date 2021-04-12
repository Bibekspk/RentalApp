const db = require("../database");

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
