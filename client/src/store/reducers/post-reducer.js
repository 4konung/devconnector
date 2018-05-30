import {
  GET_ALL_POSTS,
  GET_POST,
  POST_LOADING,
  ADD_POST,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(({ _id }) => _id !== action.payload)
      };
    }
    case GET_ALL_POSTS: {
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    }
    case GET_POST: {
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    }
    default:
      return state;
  }
};
