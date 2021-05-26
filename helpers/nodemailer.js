const mailer = require('nodemailer');

const sendMailfucntion=(object,cb)=>{

    var transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD
        }
    })

    var mailOptions = {
        from:  process.env.EMAIL,
        to: object.owner,
        subject: "About room visit",
        html: `<h1>THe mail is concerned for room visit</h1><br/>
         <p> Hello ${object.ownername}, You have an appointment for site visit.</p><br/>
         <p> Visitor name: ${object.requestorName} DateofVisit: ${object.DateforVisit} </p>   
        `
    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
            cb(error,null);
        }
        else{
            console.log("Email has been sent")
            cb(null,true);
        }
    })
}

module.exports = {
    sendMailfucntion
}