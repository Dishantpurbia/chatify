const jwt = require("jsonwebtoken");
const User = require("../model/User");

const socketauthmiddleware = async (socket, next) => {
    try {
        const cookies = socket.handshake.headers.cookie;

        let token;

        if (cookies) {
            const jwtCookie = cookies
                .split("; ")
                .find(row => row.startsWith("jwt="));

            if (jwtCookie) {
                token = jwtCookie.split("=")[1];
            }
        }

        if (!token) {
            return next(new Error("Unauthorized: No token provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userid).select("-password");

        if (!user) {
            return next(new Error("Unauthorized: No user found"));
        }

        socket.user = user;
        socket.userid = user._id.toString();

        console.log(`Socket authenticated for user: ${user.name} (${user._id})`);

        next();

    } catch (error) {
        console.log("socket auth error:", error.message);

        if (error.name === "JsonWebTokenError") {
            return next(new Error("Unauthorized: Invalid token"));
        }

        if (error.name === "TokenExpiredError") {
            return next(new Error("Unauthorized: Token expired"));
        }

        next(new Error("Unauthorized: Authentication failed"));
    }
};

module.exports = { socketauthmiddleware };