import React from "react";
import { SocketContext } from "../context/socket";

class Game extends React.Component {
    static contextType = SocketContext;
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            gameFrame: 'Client Started'
        }
    }

    handleKeyDown(e) {
        const socket = this.context;
        let direction = -1;
        switch (e.key) {
            case "ArrowUp":
                direction = 0;
                break;
            case "ArrowDown":
                direction = 1;
                break;
            case "ArrowLeft":
                direction = 2;
                break;
            case "ArrowRight":
                direction = 3;
        }
        if (direction !== -1) {
            socket.emit('PLAYER COMMAND', direction);
        }
    }

    componentDidMount() {
        const socket = this.context;
        socket.on('GAME STATE', msg => {
            this.setState({
                gameFrame: msg
            });
        });

        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        let snakes = [];
        
        if (this.state.gameFrame.players) {
            for (let i = 0; i < this.state.gameFrame.players.length; i++) {
                let player = this.state.gameFrame.players[i];
                for (let j = 0; j < player.length; j++) {
                    let block = player[j];
                    let style = {left: `${block.x * 20}px`, top: `${block.y * 20}px`};
                    let key = `${i}-${j}`
                    snakes.push(<div key={key} className="snake-block game-block" style={style}></div>);
                }
            }
        }

        let foodStyle = {};
        if (this.state.gameFrame.foodLocation) {
            foodStyle = {left: `${this.state.gameFrame.foodLocation.x * 20}px`, top: `${this.state.gameFrame.foodLocation.y * 20}px`};
        }
        
        return (
            <div>
                <div className="game-block food-block" style={foodStyle}></div>
                {snakes}
            </div>
        )
    }
}

export default Game;