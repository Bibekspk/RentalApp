const jwt =require ('jsonwebtoken');

function checkToken(req, res,next){
    let token = req.get("Authorization");
    if (token) {
        //Removing the bearer from the token
        // token = token.slice(7); //actual token for use
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                res.json({
                    sucsess: false,
                    message: "Invalid Token",
                    error : error
                });
            }else{
                next();
            }
        });
    }else{
        res.json({
            sucsess: false,
            message: "Access is denied. Unauthorized user ",
        })
    }
}

module.exports={
    checkToken: checkToken
}