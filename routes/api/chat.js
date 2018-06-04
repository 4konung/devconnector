const mongoose = require("mongoose");

// Load Chat model
const ChatMessage = require("../../models/Chat");

//api
const getAllMessages = () => {
  return ChatMessage.find({})
    .select({ __v: 0 })
    .limit(20);
};
const postMessage = message => {
  const newMessage = new ChatMessage(message);
  return newMessage.save();
};

// io.emmit - controls all connections, socket.emmit - only connected user
const chat = io => {
  // connect
  io.on("connection", socket => {
    console.log("Client connected");
    // Get and push all messages to client
    socket.on("get-all-messages", () => {
      getAllMessages().then(res => socket.emit("push-all-messages", res));
    });
    // Post message to db, then push to all clients
    socket.on("post-message", msg => {
      postMessage(msg).then(res => io.emit("get-message", res));
    });
    // disconnect
    socket.on("disconnect", () => console.log("Client disconnected"));
  });
};

module.exports = chat;
