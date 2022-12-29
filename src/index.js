const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');
const mongoose = require ('mongoose');
import { connectDB } from "./db";
connectDB();

app.use(express.static(__dirname + '/public'));
app.use(cors());


io.on('connection', (socket) => {
    console.log("Un usuario se ha conectado");

    socket.on('chat message', (msg) =>  {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log("El usuario  se desconectó")
    });
});

server.listen(3000, () => {
    console.log("Escuchando en algun puerto");
});

