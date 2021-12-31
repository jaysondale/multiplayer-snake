export type Coordinate = {
    x: number,
    y: number
}

export type Step = {
    x: 0 | 1 | -1,
    y: 0 | 1 | -1
}

export type GameState = {
    players: Array<Array<Coordinate>>,
    foodLocation: Coordinate
}

export enum PlayerCommand {
    UP = 0,
    DOWN,
    LEFT,
    RIGHT
}

export enum SocketCommand {
    GAME_STATE = "GAME STATE",
    PLAYER_COMMAND = "PLAYER COMMAND"
}