const jwt = require("jsonwebtoken");
const User =  require('../model/User');

const socketauthmiddleware = async(socket,next) => {
    try {
        const token = socket.handshake.headers.cookie?.split("; ")
        .find((row)=> row.startsWith("jwt="))
        .split("=")[1];

        if(!token){
            console.log("Socket connection rejected: No token provided")
            return next(new Error("Unauthorized: No token provided"))
        };

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            console.log("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized: Invalid token"))
        };

        const user = await User.findById(decoded.userid).select("-password");
        if(!user){
            console.log("Socket connection rejected: No user found");
            return next(new Error("Unauthorized: No user found"))
        };

        socket.user = user;
        socket.userid = user._id.toString();

        console.log(`Socket authenticated for user: ${user.name} (${user._id})`);

        next();

    } catch (error) {
        console.log("error in socket authentication:",error);
        next(new Error("Unauthorized - Authentcation failed"));
    }
};

module.exports = {
    socketauthmiddleware
}