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

//prices
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.25,
  bacon: 2.25,
  meat: 2.55
}



const reducer = (state = burgerState, action ) => {

  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        //this is a payload we expect from our action
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1

      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]


    };

    case actionTypes.REMOVE_INGREDIENT:
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingName]: state.ingredients[action.ingName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName]

    };

    default:
    return state;
  }


};


export default reducer;
