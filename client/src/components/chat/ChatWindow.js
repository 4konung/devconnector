import React from "react";
import ChatWindowLayout from "./ChatWindowLayout";
import MessageItem from "./MessageItem";

export default ({ messages, setRef }) => {
  return (
    <ChatWindowLayout setRef={setRef}>
      {messages.map(message => (
        <MessageItem key={message._id} message={message} />
      ))}
    </ChatWindowLayout>
  );
};
