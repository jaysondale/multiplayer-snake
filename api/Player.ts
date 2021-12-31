import { Socket } from "socket.io";
import { Coordinate, Step, PlayerCommand, GameState, SocketCommand } from "./utils/GameTypes.js";

export default class Player {
    body: Array<Coordinate>;
    step: Coordinate;
    socket: Socket;
    xLimit: number;
    yLimit: number;
    constructor(socket: Socket, initialPosition: Array<Coordinate>, initialStep: Step, xLimit: number, yLimit: number) {
        this.socket = socket;
        this.body = initialPosition;
        this.step = initialStep;
        this.xLimit = xLimit;
        this.yLimit = yLimit;

        // Setup socket handlers
        this.socket.on(SocketCommand.PLAYER_COMMAND, msg => {
            switch (msg) {
                case PlayerCommand.UP:
                    this.step = {x: 0, y: -1}
                    break;
                case PlayerCommand.RIGHT:
                    this.step = {x: 1, y: 0}
                    break;
                case PlayerCommand.DOWN:
                    this.step = {x: 0, y: 1}
                    break;
                case PlayerCommand.LEFT:
                    this.step = {x: -1, y: 0}
                    break;
                default:
                    throw new Error("Invalid player action: " + msg);
            }
        });
    }

    /**
     * Ensures a given coordinate is within allowable game constraints
     * @param val Coordinate to be validated
     * @param limit Maximum allowable value of coordinate
     * @returns Next coordinate within allowable constraints
     */
    private _checkBounds(val:number, limit:number): number {
        var cleanVal = val;

        if (cleanVal < 0) {
            cleanVal = limit;
        } else if (cleanVal > limit) {
            cleanVal = 0;
        }

        return cleanVal;
    }

    /**
     * Generates the next state of the player
     * @returns Player's body coordinates
     */
    nextState(): Array<Coordinate> {
        var head = this.body[this.body.length - 1];
        var nextHead = {
            x: this._checkBounds(head.x + this.step.x, this.xLimit),
            y: this._checkBounds(head.y + this.step.y, this.yLimit)
        };
        this.body.push(nextHead);
        return this.body;
    }

    /**
     * Removes tail block from body (assuming no food has been encountered)
     */
    removeTail() {
        this.body.shift();
    }

    /**
     * Broadcasts current game state to client
     * @param currentState Current game state
     */
    broadcastState(currentState: GameState) {
        this.socket.emit(SocketCommand.GAME_STATE, currentState);
    }
}