import {
    LOADING_PRODUCTS,
    ADD_TO_CART,
    SET_ERRORS,
    SUB_QUANTITY,
    REMOVE_ITEM,
    CLEAR_ALL,
    SET_FILTER
  } from '../types';
  
  const initialState = {
    products: [],
    filtredProducts:[],
    addedItems: [],
    errors:[],
    loading: false,
    filter: false,
    total: 0,
    count: 0
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_PRODUCTS:
        return {
          ...state,
          products: action.payload,
          loading: true
        };
        case SET_ERRORS:
        return {
          ...state,
          errors: action.payload,
          loading: true
        };
      case ADD_TO_CART:
        let addedItem = state.products.find(item=> item._id === action.payload)
        let existedItem = state.addedItems.find(item => item._id ===  action.payload)
        if( existedItem ) {
          addedItem.quantity = addedItem.quantity +1;
          return{
            ...state,
             total: state.total + addedItem.price,
             count: state.count + 1
              }
        } else {
          addedItem.quantity = 1;
          return{
            ...state,
            addedItems: [...state.addedItems, addedItem],
            total: state.total+ addedItem.price,
            count: state.count + 1
          }
        }
      case SUB_QUANTITY:
        let item = state.products.find(item=> item._id === action.payload)
        if(item.quantity === 1 ){
            item.quantity = 0
            let newItems = state.addedItems.filter(item => item._id !== action.payload);
            return{
            ...state,
            addedItems: newItems,
            total: state.total - item.price,
            count: state.count - 1
          }
        }else {
          item.quantity = item.quantity - 1;
          return{
            ...state,
            total: state.total - item.price,
            count: state.count - 1
          }
        };
      case REMOVE_ITEM:
        let removed = state.addedItems.find(item => item._id === action.payload);
        let newTotal = state.total - removed.price*removed.quantity;
        let newCount = state.count - removed.quantity
        removed.quantity = 0
        return{
          ...state,
          addedItems: state.addedItems.filter(item => item._id !== action.payload),
          total: newTotal,
          count : newCount
        }
      case CLEAR_ALL:
        state.addedItems.map(item => item.quantity = 0)
        return{
          ...state,
          addedItems:[],
          total: 0,
          count : 0
        }
        case SET_FILTER:
          if(action.payload === ('Tout'||undefined)){
            return{
              ...state,
              filtredProducts: state.products
            }
          }else {
          let filtred = state.products.filter(item => item.categorie === action.payload)
          return{
            ...state,
            filtredProducts: filtred,
            filter: true
          }
          }
          // let filtred = state.products.filter(item => item.categorie === action.payload)
          // console.log(filtred)
          // console.log(action.payload)
      default:
        return state;
    }
  }