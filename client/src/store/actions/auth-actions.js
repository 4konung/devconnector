import setAuthToken from '../../utils/set-auth-token';
import axios from "axios";
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(() => history.push("/login"))
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

// Login User
export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(({data}) =>{
      
      const {token} = data;
      // Save to localStorage Token
      localStorage.setItem('jwtToken', token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
}

//Set logged user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}