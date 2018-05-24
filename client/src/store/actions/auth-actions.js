import setAuthToken from "../../utils/set-auth-token";
import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  RESET_ERRORS,
  SET_CURRENT_USER,
  RESET_CURRENT_USER
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res=> {
      dispatch({
        type: RESET_ERRORS
      });
    })
    .then(() => history.push("/login"))
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res=> {
      dispatch({
        type: RESET_ERRORS
      });
      return res
    })
    .then(({ data }) => {
      const { token } = data;
      // Save to localStorage Token
      localStorage.setItem("jwtToken", token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

//Set logged user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout User
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth from headers
  setAuthToken(false);
  // Set current user to {} wich set isAuthenticated to false
  dispatch({ type: RESET_CURRENT_USER });
};
