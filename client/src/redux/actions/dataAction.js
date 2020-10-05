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

