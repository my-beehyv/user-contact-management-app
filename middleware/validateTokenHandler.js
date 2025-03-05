const asyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    const auth = req.header("Authorization");
    if(auth && auth.startsWith("Bearer")) {
        token = auth.split(" ")[1];
        // console.log("token", token);
        jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            // console.log("user", decoded.user);
            req.user = decoded.user; // this is the user object that was encoded in the token
            next();
        });
    }
    else {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }    
});

module.exports = validateTokenHandler;