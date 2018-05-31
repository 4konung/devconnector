import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ChatLayout from "./ChatLayout";
import ChatWindow from "./ChatWindow";
import ChatForm from "./ChatForm";

export class Chat extends Component {
  static propTypes = {};

  state = {
    messages: ['hello','bonjur', 'aloha']
  }

  componentDidMount(){
    const hostName = window.location.hostname;
    const port = window.location.port;
    console.log(`ws://${hostName}:${port}`)
  }

  render() {
    return (
      <ChatLayout>
        <Fragment>
          <ChatWindow messages={this.state.messages}/>
          <ChatForm />
        </Fragment>
      </ChatLayout>
    );
  }
}

export default Chat;
