import { io } from "socket.io-client";
import store from "./store";

const socket = io(store.state.URLServer, { autoConnect: false });

socket.onAny((event, ...args) => {
  //console.log(event, args);
});

export default socket;
