import {
    LOADING_PRODUCTS,
    ADD_TO_CART,
    SET_ERRORS,
    SUB_QUANTITY, 
    REMOVE_ITEM,
    CLEAR_ALL,
    SET_FILTER
  } from '../types';
import axios from 'axios';

  
  // LOADING PRODUCTS
export const getAllProducts = () => (dispatch) => { 
  axios
    .get('/api/products')
    .then((res) => {
      dispatch({
        type: LOADING_PRODUCTS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: []
      });
    });
  };
// ADD TO CART

export const addToCart = (id) =>{
  return{
    type: ADD_TO_CART,
    payload: id
  }
}
// SUB QUANTITY
export const subQuantity = (id) =>{
  return{
    type: SUB_QUANTITY,
    payload: id
  }
}
// REMOVE ITEM
export const removeItem = (id) =>{
  return{
    type: REMOVE_ITEM,
    payload: id
  }
}
// Clear all
export const clearAll = () =>{
  return{
    type: CLEAR_ALL,
  }
}
// Filter
export const setFilter = (categorie) =>{
  return{
    type: SET_FILTER,
    payload: categorie
  }
}



























  // get one product
  // export const getProduct = (screamId) => (dispatch) => {
  //   dispatch({ type: LOADING_UI });
  //   axios
  //     .get(`/scream/${screamId}`)
  //     .then((res) => {
  //       dispatch({
  //         type: SET_SCREAM,
  //         payload: res.data
  //       });
  //       dispatch({ type: STOP_LOADING_UI });
  //     })
  //     .catch((err) => console.log(err));
  // };
//   // Post a scream
//   export const postScream = (newScream) => (dispatch) => {
//     dispatch({ type: LOADING_UI });
//     axios
//       .post('/scream', newScream)
//       .then((res) => {
//         dispatch({
//           type: POST_SCREAM,
//           payload: res.data
//         });
      
//       })
//       .catch((err) => {
//         dispatch({
//           type: SET_ERRORS,
//           payload: err.response.data
//         });
//       });
//   };
  
//   // Like a scream
//   export const likeScream = (screamId) => (dispatch) => {
//     axios
//       .get(`/scream/${screamId}/like`)
//       .then((res) => {
//         dispatch({
//           type: LIKE_SCREAM,
//           payload: res.data
//         });
//       })
//       .catch((err) => console.log(err));
//   };
//   // Unlike a scream
//   export const unlikeScream = (screamId) => (dispatch) => {
//     axios
//       .get(`/scream/${screamId}/unlike`)
//       .then((res) => {
//         dispatch({
//           type: UNLIKE_SCREAM,
//           payload: res.data
//         });
//       })
//       .catch((err) => console.log(err));
//   };
//   // Submit a comment
//   export const submitComment = (screamId, commentData) => (dispatch) => {
//     axios
//       .post(`/scream/${screamId}/comment`, commentData)
//       .then((res) => {
//         dispatch({
//           type: SUBMIT_COMMENT,
//           payload: res.data
//         });
//         dispatch(clearErrors());
//       })
//       .catch((err) => {
//         dispatch({
//           type: SET_ERRORS,
//           payload: err
//         });
//       });
//   };
//   export const deleteScream = (screamId) => (dispatch) => {
//     axios
//       .delete(`/scream/${screamId}`)
//       .then(() => {
//         dispatch({ type: DELETE_SCREAM, payload: screamId });
//       })
//       .catch((err) => console.log(err));
//   };
 
//   export const getUserData = (userHandle) => (dispatch) => {
//     dispatch({ type: LOADING_DATA });
//     axios
//       .get(`/user/${userHandle}`)
//       .then((res) => {
//         dispatch({
//           type: SET_SCREAMS,
//           payload: res.data.screams
//         });
//       })
//       .catch(() => {
//         dispatch({
//           type: SET_SCREAMS,
//           payload: null
//         });
//       });
//   };
  
//   export const clearErrors = () => (dispatch) => {
//     dispatch({ type: CLEAR_ERRORS });
//   };
// // Upload image for scream
//    export const uploadImage = (screamId, formData) =>(dispatch) => {
//     dispatch({ type : LOADING_DATA});
//     axios
//          .post(`/scream/${screamId}/image`, formData)
//          .then( () => {
//           dispatch(getScream(screamId));
//          })
//          .catch(err => console.log(err))
//   }
//   // Edite scream details
//   export const updateScreamDetails = (screamId, detailsData) => dispatch => {
//     axios
//          .post(`/scream/${screamId}`, detailsData)
//          .then(()=>{
//           dispatch(getScream(screamId));
//          })
//          .catch(err => console.log(err))
//   }