const express = require("express");
const router = express.Router();

const {register} = require(`../controller/auth-controller`);

router.get(`/register`,register);

module.exports = router;