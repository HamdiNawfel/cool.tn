import { ADD_SHIPPING_DATE,  SET_ERRORS, SET_SUCCESS, NEXT_STEP} from '../types';
import axios from 'axios';

export const addShippingDate = (date)=> (dispatch) =>{
    dispatch({ type: ADD_SHIPPING_DATE,
               payload: date });
  }

  export const paypal = (paymentData)=> (dispatch) =>{
    axios
        .post('http://localhost:8080/api/order/pay', paymentData)
        .then((res) => {
            if (res.status === 200) {
            window.location = res.data.forwardLink
            } else {
                dispatch({ type: SET_ERRORS });
            }
        })
        .catch((err) => {
            dispatch({ type: SET_ERRORS });
        })
  }

  export const checkout = (orderData)=> (dispatch) =>{
    axios
        .post('http://localhost:8080/api/order/checkout', orderData)
        .then((res) => {
             dispatch({ type: SET_SUCCESS });
            dispatch({ type: NEXT_STEP });
           
        })
        .catch((err) => {
            dispatch({ type: SET_ERRORS,
                payload: err.response.data });
        })
  }