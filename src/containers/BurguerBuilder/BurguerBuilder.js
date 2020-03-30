import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';

//Global constant
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.25,
  bacon: 2.25,
  meat: 2.50
}

class BurguerBuilder extends Component {
  //the new way of defined state
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0
  }
  //adding new item to the burger
  handleAddIngredient = (type) => {
    //accessing the type we've choosen
    const oldCount = this.state.ingredients[type];
    //updating the count
    const updateCount = oldCount + 1;
    //copy of the state, is not a good practise to mutate the state directly

    const updateIngredients = {
      ...this.state.ingredients
    };
  //updating the ingredinets object with the one we've choosen
  updateIngredients[type] = updateCount;

  const priceAddition = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice + priceAddition
  //setting the new state totalPrice and ingredients
  this.setState({totalPrice: newPrice,ingredients: updateIngredients});

  }

  render(){
    return(
      <Aux>
      <Burger ingredients={this.state.ingredients}/>

      <BuildControls ingredientAdded={this.handleAddIngredient}/>


      </Aux>
    );

  }
}
export default BurguerBuilder;
