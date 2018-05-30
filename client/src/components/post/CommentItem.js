import React from "react";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {removeComment} from '../../store/actions/post-actions';

const propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const CommentItem = ({ auth, postId, removeComment, comment: { avatar, name, text, user, _id } }) => {
  const postOwner = user === auth.user.id;
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={avatar}
              alt="user avatar"
            />
          <br />
          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{text}</p>
          {postOwner ? (
              <button
                onClick={removeComment.bind(null, postId, _id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                Delete Comment
              </button>
            ) : null}
        </div>
        
      </div>
    </div>
  );
};

CommentItem.propTypes = propTypes;

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, {removeComment})(CommentItem);
