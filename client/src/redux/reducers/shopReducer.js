import { 
    ADD_SHIPPING_DATE,
   } from '../types';
    
    const initialState = {
      shippingDate:'',
     
    };
   
    export default function(state = initialState, action) {
      switch (action.type) {
         case ADD_SHIPPING_DATE:
          return {
          ...state,
          shippingDate: action.payload
         }
        default:
          return state;
      }
    }
  
  