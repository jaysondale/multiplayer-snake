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
            console.log(msg.players);
            this.setState({
                gameFrame: msg
            });
        });
    }

    render() {
        return (
            <h1>Client</h1>
        )
    }
}

export default Game;