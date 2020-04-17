import * as actionTypes from '../actions/actionTypes';

//initial state for orders reducers

const orders = [];

//creating reducer

const reducer = (state = orders, action) => {

  switch(action.type){
    case actionTypes.CREATE_ORDER:
    return {
      ...state,
      orders: action.orders
    }
  }


};

//action.type === actionTypes.CREATE_ORDER ? {...state,orders: action.orders} : null
