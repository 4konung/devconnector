import React, { Component } from "react";
import PropTypes from "prop-types";
import TextareaFieldGroup from "../common/TextareaFieldGroup";

//const propTypes = {};

export class ChatForm extends Component {
  state = {
    text: "",
    errors: {}
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { text } = this.state;
    console.log(text);
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

export default ChatForm;
