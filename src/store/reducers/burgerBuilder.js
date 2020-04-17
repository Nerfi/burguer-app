import * as actionTypes from '../actions/actionTypes';
//initial state
const burgerState = {
    ingredients: null,
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

    case actionTypes.SET_INGREDIENTS:

    return {
      //we will have a new state, that why we copy the old state
      ...state,
      ingredients: action.ingredients // we know we will get the ingredients thanks to the action type 'Ingredients' defined in actions, the payload in other words
    };

    default:
    return state;
  }


};


export default reducer;
