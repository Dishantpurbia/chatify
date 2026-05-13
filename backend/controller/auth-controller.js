require("dotenv").config();
const User = require(`../model/User`);
const validator = require(`validator`);
const bcrypt = require("bcryptjs");
const { genneratetoken } = require(`../utils/util`);
const { sendwellcomemail } = require(`../emails//emailhandlers`);
const  cloudinary  = require(`../utils/cloudinary`);

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "user already exit" });
        }

        if (!validator.isEmail(email)) {
            return res.status(401).json({ message: "please inter valid email" });
        }

        if (password.length < 8) {
            return res.status(401).json({ message: "Password lenght much be more then 8" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newuser = new User({
            name: name,
            email: email,
            password: hashpassword
        });

        if (newuser) {
            await newuser.save();
            genneratetoken(newuser._id, res)

            try {
                await sendwellcomemail(newuser.name, newuser.email, process.env.CLIENT_URL);
            } catch (error) {
                console.log("failed to send wellcome email", error);
            }

            return res.status(201).json({
                _id: newuser._id,
                name: newuser.name,
                email: newuser.email,
                profilepic: newuser.profilepic
            })

        } else {
            return res.status(400).json({ message: "invalid user data" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "both email and password is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {
            return res.json({ success: false, message: "wrong password" });
        }

        genneratetoken(user._id, res);

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilepic: user.profilepic
        });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "internal server error" });
    }
};

const logout = (req, res) => {
    
    res.cookie("jwt", "", {
        maxAge: 0
    }).json({ success: true, message: "logout successfully" });

};

const profilupdate = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userid = req.user._id 

        if (!profilepic) {
            return res.json({ success: false, message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic);

        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { profilepic: uploadResponse.secure_url },
            { new: true }
        );

        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUser
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    register,
    login,
    logout,
    profilupdate
}