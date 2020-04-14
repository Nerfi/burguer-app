import * as actionTypes from './actions';

const burgerState = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 0

};


const reducer = (state = burgerState, action ) => {

  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        //this is a payload we expect from our action
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1

      }

    };

    case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      }
    };

    default:
    return state;
  }


};


export default reducer;
