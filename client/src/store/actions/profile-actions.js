import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  RESET_CURRENT_USER,
  GET_ALL_PROFILES
} from "./types";

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

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

// Delete account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: RESET_CURRENT_USER
        })
      )
      .catch(({ response }) =>
        dispatch({ type: GET_ERRORS, payload: response.data })
      );
  }
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

// Add expereince
export const addExpereriance = (expereinceData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expereinceData)
    .then(res => history.push("/dashboard"))
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

//Delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(({ data }) => dispatch({ type: GET_PROFILE, payload: data }));
};

// Add education
export const addEducation = (educationData, history) => dispatch => {
  axios
    .post("/api/profile/education", educationData)
    .then(res => history.push("/dashboard"))
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

//Delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(({ data }) => dispatch({ type: GET_PROFILE, payload: data }));
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(({ data }) =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: data
      })
    )
    .catch(error => dispatch({ type: GET_ALL_PROFILES, payload: null }));
};

//Get profile by handle
export const getProfileByHandle = (handle) => dispatch=> {
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(({ data }) =>
      dispatch({
        type: GET_PROFILE,
        payload: data
      })
    )
    .catch(error => dispatch({ type: GET_PROFILE, payload: null }))
}
