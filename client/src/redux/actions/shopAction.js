import { ADD_SHIPPING_DATE } from '../types';

export const addShippingDate = (date)=> (dispatch) =>{
    dispatch({ type: ADD_SHIPPING_DATE,
               payload: date });
  }
