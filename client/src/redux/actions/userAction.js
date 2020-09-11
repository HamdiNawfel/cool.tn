// import {
//     SET_USER,
//     SET_ERRORS,
//     CLEAR_ERRORS,
//     LOADING_UI,
//     SET_UNAUTHENTICATED,
//     LOADING_USER,
//     MARK_NOTIFICATIONS_READ
//   } from '../types';
//   import axios from 'axios';
//   import jwt_decode from "jwt-decode";
//   export const loginUser = (userData, history) => (dispatch) => {
//     axios
//       .post('http://localhost:8080/api/users/login', userData)
//       .then((res) => {
//           setAuthorizationHeader(res.data.token);
//           const decoded = jwt_decode(res.data.token);
//           dispatch(getUserData(decoded.id));
//         dispatch({ type: CLEAR_ERRORS });
//         history.push('/products');
    
//        })
   
//       .catch((err) => {
//         dispatch({
//           type: SET_ERRORS,
//           payload: err.response.data
//         });
//       });
     
//   };
//   export const signupUser = (newUserData, history) => dispatch => {
//     dispatch({ type: LOADING_UI });
//     axios
//       .post("http://localhost:8080/api/users/signup", newUserData)
//       .then(res => history.push("/login")) // re-direct to login on successful register
//       .catch(err =>
//         dispatch({
//           type: SET_ERRORS,
//           payload: err.response.data
//         })
       
//       );
//   };

//   export const logoutUser = () => (dispatch) => {
//     localStorage.removeItem('FBIdToken');
//     delete axios.defaults.headers.common['Authorization'];
//     dispatch({ type: SET_UNAUTHENTICATED });
//   };
  
//   export const getUserData = (userId) => (dispatch) => {
//     dispatch({ type: LOADING_USER });
//     axios
//       .get(`http://localhost:8080/api/users/${userId}`)
//       .then((res) => {
//         dispatch({
//           type: SET_USER,
//           payload: res.data
//         });
//       })
//       .catch((err) => console.log(err));
//   };

  
//   const setAuthorizationHeader = (token) => {
//     const apiToken = `Bearer ${token}`;
//     localStorage.setItem('apiToken', apiToken);
//     axios.defaults.headers.common['Authorization'] = apiToken;
//   };
