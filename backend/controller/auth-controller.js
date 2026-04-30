const User = require(`../model/User`);
const validator = require(`validator`);
const bcrypt = require("bcryptjs");
const { genneratetoken } = require(`../utils/util`);

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

const login = (req, res) => {

};

const logout = (req, res) => {

};

module.exports = {
    register,
    login,
    logout
}