import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from "./types";

// Profile loading
const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(({ data }) =>
      dispatch({
        type: GET_PROFILE,
        payload: data
      })
    )
    .catch(error => dispatch({ type: GET_PROFILE, payload: {} }));
};
