import { PlayerCommand, SocketCommand } from "./utils/GameTypes.js";
export default class Player {
    constructor(socket, initialPosition, initialStep, xLimit, yLimit) {
        this.socket = socket;
        this.body = initialPosition;
        this.step = initialStep;
        this.xLimit = xLimit;
        this.yLimit = yLimit;
        this.socket.on(SocketCommand.PLAYER_COMMAND, msg => {
            switch (msg) {
                case PlayerCommand.UP:
                    this.step = { x: 0, y: -1 };
                    break;
                case PlayerCommand.RIGHT:
                    this.step = { x: 1, y: 0 };
                    break;
                case PlayerCommand.DOWN:
                    this.step = { x: 0, y: 1 };
                    break;
                case PlayerCommand.LEFT:
                    this.step = { x: -1, y: 0 };
                    break;
                default:
                    throw new Error("Invalid player action: " + msg);
            }
        });
    }
    _checkBounds(val, limit) {
        var cleanVal = val;
        if (cleanVal < 0) {
            cleanVal = limit;
        }
        else if (cleanVal > limit) {
            cleanVal = 0;
        }
        return cleanVal;
    }
    nextState() {
        var head = this.body[this.body.length - 1];
        var nextHead = {
            x: this._checkBounds(head.x + this.step.x, this.xLimit),
            y: this._checkBounds(head.y + this.step.y, this.yLimit)
        };
        this.body.push(nextHead);
        return this.body;
    }
    removeTail() {
        this.body.shift();
    }
    broadcastState(currentState) {
        this.socket.emit(SocketCommand.GAME_STATE, currentState);
    }
}
//# sourceMappingURL=Player.js.map