import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';

//Global constant
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.25,
  bacon: 2.25,
  meat: 2.55
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
    totalPrice: 0,
   purchasable: false
  }
  //checking if we can purchase it or not , based on the items we have
  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients)
    .reduce((sum,item) => sum+item,0)
    console.log(sum);

    this.setState({ purchasable : sum > 0 });

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
  this.updatePurchaseState(updateIngredients);
  }

  //removeIngredient
  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    //we do this to not delete and ingredient which is not there, otherwise we get an array of length -1, we make sure not to have this problem
    if(oldCount <= 0) {
      return;
    }

    //updating the count
    const updateCount = oldCount - 1;
    //copy of the state, is not a good practise to mutate the state directly

    const updateIngredients = {
      ...this.state.ingredients
    };

    updateIngredients[type] = updateCount;

  const priceDeduction = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceDeduction;
  //setting the new state totalPrice and ingredients
  this.setState({totalPrice: newPrice,ingredients: updateIngredients});
  this.updatePurchaseState(updateIngredients);
  }

  render(){

    const disableInfo = {
      ...this.state.ingredients
    };

    for(let key in disableInfo) {
      //disableInfo[key] this is the value of the values of the ingredients state
      disableInfo[key] = disableInfo[key] <= 0 // this object will retunr true or false, so when it gets to 1 will be true
      //that's why we can use this in BuildControl componenent as a property on the button html button

    }

    return(
      <Aux>
      <Burger ingredients={this.state.ingredients}/>

      <BuildControls
      ingredientAdded={this.handleAddIngredient}
      ingredientDeleted={this.removeIngredient}
      disable={disableInfo}
      purchaseable={this.state.purchasable}
      price={this.state.totalPrice}
      />


      </Aux>
    );

  }
}
export default BurguerBuilder;
