import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return  {
    type:actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};



export const removeIngredient = (name) => {
  return  {
    type:actionTypes.REMOVE_INGREDIENT,
    ingName: name
  };
};


// here we call the action type we define in actionTypes, this is the sync action creator
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };

};

//handling asyn code, this action allow us to return/dipatch  another action thanks to Redux thunk

 export const fetchingIngredients = () => {
  return dispatch => {
    //asyn code here
    fetch('https://react-my-burger-ea4f7.firebaseio.com/ingredients.json')
   .then(response => response.json())
  .then(data => dispatch(setIngredients(data)))
  .catch(err => console.log(err));


  };
};
