const Message = require(`../model/Message`);
const User = require(`../model/User`);
const  cloudinary  = require(`../utils/cloudinary`);
const { getreciverid, io } = require("../utils/socket");


const getallcontacts = async(req,res) => {
    try {
        const userid = req.user._id;
        const user = await User.find({_id :{$ne:userid}}).select("-password");
        return res.json({success:true,user});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"internal server error"});
    }
};

const getchatpartner = async (req,res) => {
    try {
        const userid = req.user._id;
        const message = await Message.find({
            $or:[
                {senderid:userid},{receiverid:userid}
            ]
        });

        const chatpartnerid = [...new Set(message.map(msg => 
             msg.senderid.toString()===userid.toString()? msg.receiverid.toString():msg.senderid.toString()
        ))];

        const user = await User.find({
            _id:{$in:chatpartnerid}
        }).select("-password");

        return res.json({success:true,user});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"internal several error"});
    }
};

const getmessageuserid = async(req,res) => {
    try {
        const userid = req.user._id;
        const {id:usertochatid} = req.params;

        const message = await Message.find({
            $or:[
                {senderid:userid,receiverid:usertochatid},
                {senderid:usertochatid,receiverid:userid}
            ]
        });

        return res.json({success:true,message});

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"internal server error"});
    }
};

const sendmessageuserid = async(req,res) => {
    try {
        const {text,image} = req.body;
        const{id:receiverid} = req.params;
        const senderid = req.user._id;

        let imageurl;
        if(image){
            const uploadimage = await cloudinary.uploader.upload(image);
            imageurl = uploadimage.secure_url;
        }

        const newmessage = new Message({
            senderid,
            text,
            image:imageurl,
            receiverid
        })

        await newmessage.save();

        const reciveruserid = await getreciverid(receiverid);
        if(reciveruserid){
            io.to(reciveruserid).emit("sendmessage",newmessage);
        }

        return res.json({success:true,newmessage});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"internal server error"});
    }
};

module.exports = {
    getallcontacts,
    getmessageuserid,
    sendmessageuserid,
    getchatpartner
}