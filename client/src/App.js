import './App.css';
import Game from './components/Game';
import { SocketContext, socket } from './context/socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Game />
    </SocketContext.Provider>
  );
}

export default App;
