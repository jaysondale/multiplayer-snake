import React from "react";
import { SocketContext } from "../context/socket";

class Game extends React.Component {
    static contextType = SocketContext;
    constructor(props) {
        super(props);
        this.state = {
            gameFrame: 'Client Started'
        }
    }

    componentDidMount() {
        const socket = this.context;
        socket.on('GAME STATE', msg => {
            console.log(msg);
            this.setState({
                gameFrame: msg
            });
        });
        socket.emit('MSG', "It's working!");
    }

    render() {
        return (
            <h1>{this.state.gameFrame}</h1>
        )
    }
}

export default Game;