import { Socket } from "socket.io";
import Player from "./Player.js";
import { Coordinate, GameState } from "./utils/GameTypes.js";

export default class SnakeGame {
    players: Array<Player>;
    gameDelay: number;
    xLimit: number;
    yLimit: number;
    gameInterval: NodeJS.Timer;
    gameState: GameState; // Stores all relevant info for clients
    constructor(gameDelay: number, xLimit: number, yLimit: number) {
        this.xLimit = xLimit;
        this.yLimit = yLimit;
        this.players = [];

        // Build initial game state
        this.gameState = {
            players: [],
            foodLocation: this._generateFoodLocation()
        }
        this.gameDelay = gameDelay;

        this._gameLoop = this._gameLoop.bind(this);
    }

    private _generateFoodLocation(): Coordinate {
        var foodLocation = {
            x: Math.floor(Math.random() * this.xLimit),
            y: Math.floor(Math.random() * this.yLimit)
        }

        // TODO: Ensure food coordinates do not exist in any player's body

        return foodLocation;
    }

    private _gameLoop() {
        var gameState: GameState;
        for (let player of this.players) {
            let playerState = player.nextState();

            // TODO: Check food collision
            player.removeTail();
            this.gameState.players.push(playerState);
        }

        // TODO: Check collision with other player

        // Update clients with latest game state
        for (let player of this.players) {
            player.broadcastState(gameState);
        }
    }

    addPlayer(playerSocket: Socket) {
        var newPlayer = new Player(playerSocket, [{x: 0, y: 0}, {x: 0, y: 1}], {x: 0, y: 1}, this.xLimit, this.yLimit);
        this.players.push(newPlayer);
        this.gameState.players.push(newPlayer.body);
    }

    start() {
        if (this.gameInterval == undefined) {
            this.gameInterval = setInterval(this._gameLoop, this.gameDelay);
        }
    }

    stop() {
        if (this.gameInterval !== undefined) {
            clearInterval(this.gameInterval);
            this.gameInterval = undefined;
            console.log('Game Stopped');
        }
    }
}