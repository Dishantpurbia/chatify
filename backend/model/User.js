const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email:{
        type: String,
        unique:true,
        required: true 
    },

    password:{
        type:String,
        required:true,
        minlength:8
    },

    profilepic:{
        type:String,
        default:""
    },

},{timestamps:true}
);

module.exports =  mongoose.models.User || mongoose.model("User",userschema);