import isEmpty from 'is-empty'
import {
    LOADING,
    SET_CURRENT_USER,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    GET_ORDER
  } from "../types";

  const initialState = {
    isAuthenticated: false,
    credentials: {},
    orders:[],
    loading: true
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          loading:false,
          credentials: action.payload
        };
      case LOADING:
        return {
          ...state,
          loading: false
        };
        case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        };
        case GET_ORDER:
        return {
          ...state,
          credentials:action.payload,
          loading:false,
           orders: action.payload.orders,
         
        };
        case SET_UNAUTHENTICATED:
        return initialState;
      default:
        return state;
    }
  }