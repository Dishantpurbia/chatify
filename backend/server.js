const express = require("express");
const dotenv = require("dotenv");
const connectdb = require(`./config/db`);
const cookieparser = require(`cookie-parser`);
const cors = require(`cors`);

const authroute = require(`./routes/authroutes`);
const messageroute = require(`./routes/messageroute`);
const {app,server} = require('./utils/socket');

dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({
     origin:"https://chatify-frontend1-exab.onrender.com",
     credentials: true
}));
app.use(cookieparser());

connectdb();

app.use(`/api/auth`, authroute);
app.use(`/api/message`, messageroute);

server.listen(port, () =>
     console.log("server is running on port : " + port)
);