import { GET_ALL_MESSAGES, GET_MESSAGE, RESET_MESSAGES } from "./types";
import io from "socket.io-client";
const socket = io();

export const getAllMessages = () => dispatch => {
  socket.emit("get-all-messages");
  socket.on('push-all-messages', data=> dispatch({type:GET_ALL_MESSAGES, payload: data}))
  socket.on('get-message', data=> dispatch({type:GET_MESSAGE, payload: data}))
};

export const postMessage = message => dispatch => {
  socket.emit('post-message', message)
};

export const leaveChat = () => dispatch => {
  socket.off('push-all-messages');
  socket.off('get-message');
  dispatch({type: RESET_MESSAGES})
}
