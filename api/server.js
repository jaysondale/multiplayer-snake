const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: {
    origin: "http://localhost:3000",
}});

class Player {
    constructor(name, body) {
        this.name = name;
        this.body = body;
    }
}

// Game variables

var players = new Map();

app.get('/', (req, res) => {
    res.send('Homepage');
});

io.on('connection', socket => {
    var newPlayer = new Player(socket.id, [{x: 0, y: 0}]);
    players.set(socket.id, newPlayer);
    console.log(players);
    socket.on('disconnect', _ => {
        console.log('Client disconnected!');
        players.delete(socket.id);
    });

    socket.on('MSG', msg => {
        console.log('message received');
        socket.emit('GAME STATE', msg);
    });
});

server.listen(2000, _ => {
    console.log('Server listening on port 2000');
});