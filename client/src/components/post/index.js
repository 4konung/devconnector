import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PostLayout from "./PostLayout";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from './CommentFeed'
import { getPost } from "../../store/actions/post-actions";

const propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export class Post extends Component {
  componentWillMount() {
    const { match, getPost } = this.props;
    getPost(match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;

    return (
      <PostLayout>
        {post === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments}/>
          </Fragment>
        )}
      </PostLayout>
    );
  }
}

Post.propTypes = propTypes;

const mapStateToProps = ({ post }) => {
  return {
    post
  };
};

export default connect(mapStateToProps, { getPost })(Post);
