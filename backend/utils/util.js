require("dotenv").config();
const jwt = require('jsonwebtoken');
const {Resend} = require(`resend`);

//token gennerater

const genneratetoken = (userid, res) => {
    const token = jwt.sign({ userid },
        process.env.JWT_SECRET, {
        expiresIn: "7d"
    }
    );

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"strict",
        secure : process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
};

//resend 

const resendclient = new Resend(process.env.RESEND_API_KEY);

const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME
}


module.exports = {
    genneratetoken,
    resendclient,
    sender
}