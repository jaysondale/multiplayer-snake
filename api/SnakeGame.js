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
        this._checkFoodCollision = this._checkFoodCollision.bind(this);
    }
    _generateFoodLocation() {
        var foodLocation = {
            x: Math.floor(Math.random() * this.xLimit),
            y: Math.floor(Math.random() * this.yLimit)
        };
        return foodLocation;
    }
    _checkFoodCollision(player) {
        let head = player.body[player.body.length - 1];
        if (head.x == this.gameState.foodLocation.x && head.y == this.gameState.foodLocation.y) {
            return true;
        }
        return false;
    }
    _gameLoop() {
        var newPlayers = [];
        for (let player of this.players) {
            let playerState = player.nextState();
            if (!this._checkFoodCollision(player)) {
                player.removeTail();
            }
            else {
                this.gameState.foodLocation = this._generateFoodLocation();
            }
            newPlayers.push(playerState);
        }
        this.gameState.players = newPlayers;
        for (let player of this.players) {
            player.broadcastState(this.gameState);
        }
    }
    addPlayer(playerSocket) {
        var newPlayer = new Player(playerSocket, [{ x: this.players.length, y: 0 }, { x: this.players.length, y: 1 }], { x: 0, y: 1 }, this.xLimit, this.yLimit);
        this.players.push(newPlayer);
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
            this.players = [];
            console.log('Game Stopped');
        }
    }
}
//# sourceMappingURL=SnakeGame.js.map