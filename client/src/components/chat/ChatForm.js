import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postMessage } from "../../store/actions/chat-actions";
import TextareaFieldGroup from "../common/TextareaFieldGroup";

const propTypes = {
  postMessage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export class ChatForm extends Component {
  initialState = {
    text: "",
    errors: {}
  };
  state = this.initialState;

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { text } = this.state;
    if (text.trim().length === 0) {
      this.setState({ errors: { text: "Message field required" } });
    } else {
      const { initialState } = this;
      const { postMessage, name } = this.props;
      const messageData = {
        text,
        name
      };
      this.setState(initialState, postMessage(messageData));
    }
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { text, errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 pt-2">
            <div className="post-form">
              <div className="card">
                <div className="card-header bg-info text-white">Message...</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <TextareaFieldGroup
                      className="form-control form-control-lg"
                      placeholder="Send to chat"
                      name="text"
                      value={text}
                      onChangeHandler={handleChange}
                      error={errors.text}
                    />
                    <button type="submit" className="btn btn-dark">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatForm.propTypes = propTypes;

export default connect(null, { postMessage })(ChatForm);
