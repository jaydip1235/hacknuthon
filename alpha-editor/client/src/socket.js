import { io } from "socket.io-client";

const socket =io('/',{
  reconnection:false
});

export default socket;