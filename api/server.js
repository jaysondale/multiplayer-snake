import express from "express";
import SnakeGame from "./SnakeGame.js";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server, {cors: {
    origin: "http://localhost:3000",
}});

var connectedSockets = 0;

var gameInstance = new SnakeGame(50, 50, 10);

app.get('/', (req, res) => {
    res.send('Homepage');
});

io.on('connection', socket => {
    connectedSockets++;
    gameInstance.addPlayer(socket);
    socket.on('disconnect', _ => {
        console.log('Client disconnected. Stopping game');
        gameInstance.stop();
        connectedSockets--;
    })
    if (connectedSockets == 2) {
        console.log('Starting game');
        gameInstance.start();
    }
});

server.listen(2000, _ => {
    console.log('Server listening on port 2000');
});