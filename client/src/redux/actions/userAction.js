import jwt_decode from "jwt-decode";
import axios from 'axios';
import {
    LOADING,
    SET_CURRENT_USER,
    GET_ERRORS,
    SET_UNAUTHENTICATED,
    GET_ORDER
  } from '../types';
//Sign up user
  export const signupUser = (userData) => dispatch => {
    axios
      .post("http://localhost:8080/api/signup", userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  // Login - get user token
export const loginUser = userData => dispatch => {
    axios
      .post("http://localhost:8080/api/login", userData)
      .then(res => {
        // Save to localStorage
  // Set token to localStorage
       
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
 // Login with GOOGLE - get user token
 export const authUser = userData => dispatch => {
  axios
    .post("http://localhost:8080/api/auth", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
};
  const setAuthToken = token => {
    if (token) {
      
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Set logged in user
export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUser = () => dispatch => {
  dispatch({ type: LOADING });
  const token = localStorage.getItem('jwtToken');
  const decoded = jwt_decode(token);
  dispatch(setCurrentUser(decoded));
  const userId = decoded.userId;
  axios
    .get(`http://localhost:8080/api/user/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_ORDER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
}
