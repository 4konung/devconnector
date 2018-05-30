import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addPost } from "../../store/actions/post-actions";

const propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export class PostForm extends Component {
  static getDerivedStateFromProps({ errors }) {
    return {errors};
  }
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
    const { addPost } = this.props;
    const {
      user: { avatar, name }
    } = this.props.auth;
    const postData = {
      name,
      avatar,
      text
    };
    this.setState({ text: "" }, addPost(postData));
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { text, errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <TextareaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Create a post"
                  name="text"
                  value={text}
                  onChangeHandler={handleChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = propTypes;

const mapStateToProps = ({ errors, auth }) => {
  return {
    errors,
    auth
  };
};

export default connect(mapStateToProps, { addPost })(PostForm);
