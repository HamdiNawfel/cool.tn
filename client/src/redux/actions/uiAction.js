import { 
  // GET_ERRORS,
  NEXT_STEP,
  SET_STEP,
  // SET_ERROR,
  // SET_SUCCESS
 } from '../types';

export const nextStep = ()=> (dispatch) =>{
    dispatch({ type: NEXT_STEP });
  }
  export const setStep = (step)=> (dispatch) =>{
    dispatch({ type: SET_STEP,
                payload : step });
  }