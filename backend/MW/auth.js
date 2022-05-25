const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
// var ls = require('local-storage');

module.exports = (request, response, next) => {
    let token, decode;
    try {
        // token = ls("token");
        // console.log("authMW: Token", token);
        // token = req.headers.token
        token=request.get("Authorization").split(" ")[1];
        decode = jwt.verify(token, process.env.SECRET_KEY)

    } catch (error) {
        error.message = "No Authorized";
        error.status = 403;
        next(error);
    }

    if (decode !== undefined) {
        request.role = decode.role;
        request.id = decode.id;
        request.email = decode.email;

        next();
    }
}

//If he is a user of any type > Token is valid
// const isAuth = (request, response, next) => {
//     let token;

//     try {
//         token = request.get("Authorization").split(" ")[1];
//     }
//     catch {
//         next("You're not authorized (No token)");
//     }


//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) res.status(403).json("Token is not valid");
//         request.role = decoded.role;
//         next()
//     })

// }
// module.exports = { isAuth }