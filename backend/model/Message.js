const mongoose = require(`mongoose`);

const messageschema = new mongoose.Schema({
    senderid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    receiverid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    text:{
        type:String
    },

    image:{
        type:String
    }
},{timestamps:true}
);

module.exports = mongoose.models.Message || mongoose.model("Message",messageschema);