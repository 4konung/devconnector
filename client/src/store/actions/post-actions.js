import axios from "axios";
import {
  GET_ERRORS,
  RESET_ERRORS,
  ADD_POST,
  DELETE_POST,
  GET_ALL_POSTS,
  POST_LOADING,
  GET_POST
} from "./types";

// Set Loading state
const setLoadingState = () => {
  return {
    type: POST_LOADING
  };
};

//Add Post
export const addPost = postData => dispatch => {
  dispatch({
    type: RESET_ERRORS
  });
  axios
    .post("/api/posts", postData)
    .then(({ data }) =>
      dispatch({
        type: ADD_POST,
        payload: data
      })
    )
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

//Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

//Get all Posts
export const getPosts = () => dispatch => {
  dispatch(setLoadingState());
  axios
    .get("/api/posts")
    .then(({ data }) =>
      dispatch({
        type: GET_ALL_POSTS,
        payload: data
      })
    )
    .catch(err => dispatch({ type: GET_ALL_POSTS, payload: null }));
};

//Get Post
export const getPost = id => dispatch => {
  dispatch(setLoadingState());
  axios
    .get(`/api/posts/${id}`)
    .then(({ data }) =>
      dispatch({
        type: GET_POST,
        payload: data
      })
    )
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};

//Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

//Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

//Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch({
    type: RESET_ERRORS
  });
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(({ data }) =>
      dispatch({
        type: GET_POST,
        payload: data
      })
    )
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

//Remove comment
export const removeComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(({ data }) =>
      dispatch({
        type: GET_POST,
        payload: data
      })
    )
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};
