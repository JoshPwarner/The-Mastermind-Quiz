const express = require('express')
const app = express();
const { scoreRouter } = require('./routes/index.js');
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors())
app.use(express.json());
const server = http.createServer(app);

const { Games } = require("./Game");

// Root route
app.get('/', (req, res) => res.send("Hello, world! Welcome to the masterminds\' API + SOCKETIO Server! "));


//Leaderboard routes
app.use('/scoreboard', scoreRouter)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const games = new Games();

let users = [];

io.on("connection", (socket) => {
    socket.emit("assign-id", { id: socket.id });

    socket.on("join server", (username) => {
        const user = {
            username,
            id: socket.id,
        };

        users.push(user);
        io.emit("new user", users);
    });

    let participantCount = io.engine.clientsCount;
    io.emit("users", participantCount);

    socket.on("check-room", (roomName, callback) => {
        console.log("CLIENT REQUEST TO CREATE ROOM WITH ", roomName);
        if (games.checkRoomName(roomName)) {
            callback({ code: "success", message: `SUCCESS: Created room with name ${roomName}` });
            console.log(`Room Created ${roomName}`);
        } else {
            callback({ code: "ERROR", message: `Room name ${roomName} is taken. Please try another name.` });
        }
    });

    socket.on("add-config", (config, cb) => {
        games.addGame(config.host, config.room, config.difficulty, config.count, config.subject);
        socket.join(config.host);
        console.log(
            `Config Log: ${config.room} ${config.host}, ${config.difficulty}, ${config.count}, ${config.subject}`
        );
        console.log("Config Log: " + JSON.stringify(config));
        games.addPlayer(config.username, config.room, config.host);

        cb({
            code: "success",
            message: `SUCCESS: configuration has been added`,
        });
    });

    socket.on("game-start", (roomName) => {
        console.log("game started");
        io.to(roomName).emit("game-start", true);
    });

    socket.on("join-room", (config, cb) => {
        console.log(config);
        let foundRoom = games.canRoomBeJoined(config.room);
        console.log("join-room", foundRoom);

        if (foundRoom == "ERROR") {
            console.log("no room found");
            const errorMsg = "Room does not exist";
            io.to(config.id).emit("no room", errorMsg);
        } else {
            console.log("adding player");
            games.addPlayer(config.username, config.room, socket.id);
            socket.join(config.room);
            socket.emit(`${config.username} has joined the room`);
            io.emit("new player", config.username);
            let game = games.getGameByRoom(config.room);

            cb({
                code: "success",
                player: config.username,
                score: 0,
            });

            io.to(game.host).emit("player-connected", {
                name: config.username,
                score: 0,
            });
        }
    });

    let gamePlayers;
    let roomNameVar;
    socket.on("game-players", (roomName, cb) => {
        const data = games.getPlayerData(roomName);
        gamePlayers = data;
        roomNameVar = roomName;
        io.in(roomName).emit(data);

        cb(data);
    });

    io.to(roomNameVar).emit("game-players");

    socket.on("game-start", (roomName) => {
        console.log("game started");
        io.to(roomName).emit("game-start", true);
    });

    socket.on("get-questions", (roomName, cb) => {
        const data = games.getGame(roomName);
        cb(data);
    });

    socket.on("score", (config, cb) => {
        console.log("SCORE TALLY");
        //get data
        let scores = games.addScore(config.room, config.username, config.score);
        io.to(config.room).emit("score", scores);
        cb({
            code: "success",
            scores: scores,
        });
    });

    socket.on("disconnect", () => {
        users = users.filter((u) => u.id !== socket.id);
        io.emit("new user", users);

        participantCount = io.engine.clientsCount;
        io.emit("users", participantCount);
    });
});

module.exports = app;