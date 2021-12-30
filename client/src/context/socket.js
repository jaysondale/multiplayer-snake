/**
 * socket.js
 * 
 * Defines hook to enable socket object usage throughout the app.
 * Adapted from: https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
 */

import React from "react";
import io from "socket.io-client";

export const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
export const SocketContext = React.createContext();