import { 
  NEXT_STEP,
  SET_STEP,
  SET_ERRORS,
  SET_SUCCESS,
  CLEAR_ERRORS
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
      case SET_ERRORS:
        return {
        ...state,
        errors : action.payload
       }
       case SET_STEP:
        return {
        ...state,
        uiStep: action.payload
       }
       case NEXT_STEP:
        let index = state.steps.indexOf(state.uiStep);
        let step;
        if(index ===2){
          step = 0;
        }else{
           step = index+1
        }
        return {
        ...state,
        uiStep: state.steps[step]
       }
       case SET_SUCCESS:
        return {
        ...state,
        success:true
       }
       case CLEAR_ERRORS:
        return {
        ...state,
        errors:{}
       }
      default:
        return state;
    }
  }

