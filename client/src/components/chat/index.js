import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatLayout from "./ChatLayout";
import ChatWindow from "./ChatWindow";
import ChatForm from "./ChatForm";
import { getAllMessages, leaveChat } from "../../store/actions/chat-actions";

const propTypes = {
  getAllMessages: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export class Chat extends Component {
  chatWindowRef = null;

  componentDidMount() {
    this.props.getAllMessages();
  }
  componentDidUpdate(){
    this.chatWindowRef.scrollTop = this.chatWindowRef.scrollHeight;
  }
  componentWillUnmount() {
    this.props.leaveChat();
  }
  setChatWindowRef = node => (this.chatWindowRef = node);
  render() {
    const {
      auth: { user },
      chat: { messages }
    } = this.props;
    return (
      <ChatLayout>
        <Fragment>
          <ChatWindow messages={messages} setRef={this.setChatWindowRef}/>
          <ChatForm name={user.name} />
        </Fragment>
      </ChatLayout>
    );
  }
}

Chat.propTypes = propTypes;

const mapStateToProps = ({ chat, auth }) => {
  return {
    chat,
    auth
  };
};

export default connect(mapStateToProps, { getAllMessages, leaveChat })(Chat);
