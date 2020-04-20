import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch(action.type){

    case actionTypes.PURCHASE_INIT:
    return {
      ...state,
      purchased: false
    }

    case actionTypes.PURCHASE_BURGER_START:
    return {
      ...state,
      loading: true
    }


    case actionTypes.PURCHASE_BURGER_SUCCESS:
      // in order to merge both action and concat it to the new state we should do this
    const newOrder = {
      ...action.orderData,
      id: action.id
    };

    return {
        ...state,
        loading: false,
        //our orders now should be our old orders plus the new ones, thats what we are doing here
        orders: state.orders.concat(newOrder),
        purchased: true
    };

    case actionTypes.PURCHASE_BURGER_FAIL:
    return {
      ...state,
      loading: false,

    };

    case actionTypes.FETCH_ORDERS:
    return {
      ...state,
      loading: true

    };

    case actionTypes.FETCH_ORDERS_SUCCESS:
    return {
      ...state,
      orders: action.orders,
      loading: false
    };

    case actionTypes.FETCH_ORDERS_FAIL:
    return {
      ...state,
      loading: false

    };

    default:
    return state;
  }
};

export default reducer;
