const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create ChatMessage Schema
const ChatMessageSchema = new Schema({
  text: {
    type: String,
    require: true
  },
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ChatMessage = mongoose.model("chatmessage", ChatMessageSchema);
