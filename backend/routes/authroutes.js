const express = require("express");
const router = express.Router();

const arcjetprotection = require(`../midllware/aj-middleware`);
const {protectrouth} = require(`../midllware/auth-middleware`);
const {register,login,logout,profilupdate} = require(`../controller/auth-controller`);

router.post(`/register`,register);
router.post(`/login`,login);
router.get(`/logout`,logout);
router.patch(`profile-update`,protectrouth,profilupdate);


module.exports = router;