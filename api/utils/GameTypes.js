export var PlayerCommand;
(function (PlayerCommand) {
    PlayerCommand[PlayerCommand["UP"] = 0] = "UP";
    PlayerCommand[PlayerCommand["DOWN"] = 1] = "DOWN";
    PlayerCommand[PlayerCommand["LEFT"] = 2] = "LEFT";
    PlayerCommand[PlayerCommand["RIGHT"] = 3] = "RIGHT";
})(PlayerCommand || (PlayerCommand = {}));
export var SocketCommand;
(function (SocketCommand) {
    SocketCommand["GAME_STATE"] = "GAME STATE";
    SocketCommand["PLAYER_COMMAND"] = "PLAYER COMMAND";
})(SocketCommand || (SocketCommand = {}));
//# sourceMappingURL=GameTypes.js.map