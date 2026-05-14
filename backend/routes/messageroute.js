const express = require("express");
const router = express.Router();

const {getallcontacts,getchatpartner,getmessageuserid,sendmessageuserid} = require(`../controller/message-controller`);
const {protectrouth} = require(`../midllware/auth-middleware`);


router.get(`/contacts`,protectrouth,getallcontacts);// to get all the contacts
router.get(`/chats`,protectrouth,getchatpartner);//all the contacts from which chats were happan
router.get(`/:id`,protectrouth,getmessageuserid);//all the message between users
router.post(`/send/:id`,protectrouth,sendmessageuserid);//use to send message and text

module.exports = router;