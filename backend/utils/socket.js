const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { socketauthmiddleware } = require('../midllware/socket-auth-middleware');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

io.use(socketauthmiddleware);

const usersocket = {};

io.on("connection", (socket) => {
    console.log("A user connection", socket.user.name);

    const userid = socket.userid;
    usersocket[userid] = socket.id

    io.emit("getonlineuer", Object.keys(usersocket));

    socket.on("disconnect", () => {
        console.log("A user disconnect", socket.user.name);
        delete usersocket[userid];
        io.emit("getonlineuer", Object.keys(usersocket));
    })
});

module.exports = {
    app,server,io
};