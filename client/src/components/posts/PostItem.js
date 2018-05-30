import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike
} from "../../store/actions/post-actions";

const propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool.isRequired
};

const defaultProps = {
  showActions: true
};

const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  auth,
  post: { avatar, name, text, likes, _id, user, comments },
  showActions
}) => {
  const likesCount = likes.length;
  const commentsCount = comments.length;
  const isLiked = likes.filter(({ user }) => user === auth.user.id).length > 0;
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
          <div className={showActions ? "d-block" : "d-none"}>
            <button
              onClick={addLike.bind(null, _id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={classnames("fas fa-thumbs-up", {
                  "text-info": isLiked
                })}
              />
              <span className="badge badge-light">{likesCount}</span>
            </button>
            <button
              onClick={removeLike.bind(null, _id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${_id}`} className="btn btn-info mr-1">
              Comments
              <span className="badge badge-info">{commentsCount}</span>
            </Link>
            {postOwner ? (
              <button
                onClick={deletePost.bind(null, _id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = propTypes;
PostItem.defaultProps = defaultProps;

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
