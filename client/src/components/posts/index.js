import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostsLayout from "./PostsLayout";
import PostFeed from './PostFeed'
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../store/actions/post-actions";

const propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

export class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const {loading, posts} = this.props.post
    return (
      <PostsLayout>
        <Fragment>
        <PostForm />
        {
          loading ? <Spinner />: <PostFeed posts={posts}/>
        }
        </Fragment>
      </PostsLayout>
    );
  }
}

Posts.propTypes = propTypes;

const mapStateToPRops = ({ post }) => {
  return {
    post
  };
};

export default connect(mapStateToPRops, { getPosts })(Posts);
