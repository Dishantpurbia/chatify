const express = require("express");
const router = express.Router();

const arcjetprotection = require(`../midllware/aj-middleware`);
const {protectrouth} = require(`../midllware/auth-middleware`);
const {register,login,logout,profilupdate} = require(`../controller/auth-controller`);

router.use(arcjetprotection);

router.post(`/signup`,register);
router.post(`/login`,login);
router.post(`/logout`,logout);

router.put(`/profile-update`,protectrouth,profilupdate);

router.get(`/check`,protectrouth,(req,res) => {
    return res.status(200).json(req.user);
});

module.exports = router;