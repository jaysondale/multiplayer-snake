import Player from "./Player.js";
export default class SnakeGame {
    constructor(gameDelay, xLimit, yLimit) {
        this.xLimit = xLimit;
        this.yLimit = yLimit;
        this.players = [];
        this.gameState = {
            players: [],
            foodLocation: this._generateFoodLocation()
        };
        this.gameDelay = gameDelay;
        this._gameLoop = this._gameLoop.bind(this);
    }
    _generateFoodLocation() {
        var foodLocation = {
            x: Math.floor(Math.random() * this.xLimit),
            y: Math.floor(Math.random() * this.yLimit)
        };
        return foodLocation;
    }
    _gameLoop() {
        var gameState;
        for (let player of this.players) {
            let playerState = player.nextState();
            player.removeTail();
            this.gameState.players.push(playerState);
        }
        for (let player of this.players) {
            player.broadcastState(gameState);
        }
    }
    addPlayer(playerSocket) {
        var newPlayer = new Player(playerSocket, [{ x: 0, y: 0 }, { x: 0, y: 1 }], { x: 0, y: 1 }, this.xLimit, this.yLimit);
        this.players.push(newPlayer);
        this.gameState.players.push(newPlayer.body);
    }
    start() {
        if (this.gameInterval == undefined) {
            this.gameInterval = setInterval(this._gameLoop, this.gameDelay);
        }
    }
    stop() {
        console.log(this.gameInterval);
        if (this.gameInterval !== undefined) {
            clearInterval(this.gameInterval);
            this.gameInterval = undefined;
            console.log('Game Stopped');
        }
    }
}
//# sourceMappingURL=SnakeGame.js.map