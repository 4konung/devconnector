import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ChatLayout from "./ChatLayout";
import ChatWindow from "./ChatWindow";
import ChatForm from "./ChatForm";
const WebSocket = require("ws");

export class Chat extends Component {
  static propTypes = {};

  state = {
    messages: ["hello", "bonjur", "aloha"]
  };

  componentDidMount() {
    const hostName = window.location.origin.replace(/^http/, "ws")
    const ws = new WebSocket(`${hostName}/chat`);
    ws.on('connection', (ws)=> ws.send('hi!'))
  }

  render() {
    return (
      <ChatLayout>
        <Fragment>
          <ChatWindow messages={this.state.messages} />
          <ChatForm />
        </Fragment>
      </ChatLayout>
    );
  }
}

export default Chat;
