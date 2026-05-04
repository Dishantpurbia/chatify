const aj = require(`../utils/arcjet`);
const  { isSpoofedBot } = require("@arcjet/inspect");

const arcjetprotection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ success: false, message: "Too many request" });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ success: false, message: " No bot allowed" });
            } else {
                return res.status(403).json({ success: false, message: "Access denied by security policy." })
            }
        };


        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({success:false,error:"spoofed bot detected",message:"Malicious bot activity detected"});
        }
        
        next();

    } catch (error) {
        console.log(error);
        next();
    }

};

module.exports =  arcjetprotection;