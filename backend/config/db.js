const mongoose = require("mongoose");

const connectdb = async() => {
    try {
         await mongoose.connect(process.env.MONGO_ATLAS_URL)
         console.log("MongoDB is connect");
    } catch (error) {
        console.log("Failed to connect mongodb")
        process.exit(1);
    }
}

module.exports = connectdb;