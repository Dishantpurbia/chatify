const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protectrouth = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({success:false,message:"unauthorized - no token is provided"});
        
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({success:false,message:"unauthorized - invalid token"});

        const user = await User.findById(decoded.userid).select("-password");
        if(!user) return res.status(404).json({success:false,message:"user not found"});

        req.user = user;

        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"internal server error"});
    }
};

module.exports = {
    protectrouth
}