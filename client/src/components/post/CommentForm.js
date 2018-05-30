import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addComment } from "../../store/actions/post-actions";

const propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export class CommentForm extends Component {
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
    const { addComment, postId } = this.props;
    const {
      user: { avatar, name }
    } = this.props.auth;
    const commentData = {
      name,
      avatar,
      text
    };
    this.setState({ text: "" }, addComment(postId, commentData));
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { text, errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make Coment...</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <TextareaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Reply to post"
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

CommentForm.propTypes = propTypes;

const mapStateToProps = ({ errors, auth }) => {
  return {
    errors,
    auth
  };
};

export default connect(mapStateToProps, { addComment })(CommentForm);
