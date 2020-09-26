import { 
  GET_ERRORS,
  NEXT_STEP,
  SET_STEP,
  SET_ERROR,
  SET_SUCCESS
 } from '../types';
  
  const initialState = {
    errors:{},
    steps : ['shopping', 'shipping', 'payment'],
    uiStep:'',
    error:false,
    success:false
  };
 
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ERRORS:
        return {
        errors : action.payload
       }
       case SET_STEP:
        return {
        ...state,
        uiStep: action.payload
       }
       case NEXT_STEP:
        let index = state.steps.indexOf(state.uiStep);
        return {
        ...state,
        uiStep: state.steps[index +1]
       }
      default:
        return state;
    }
  }

