import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
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
    ingredients: null,
    totalPrice: 0,
   purchasable: false,
   purchasing: false,
   loading: false
  }


//retriving data from firebase

componentDidMount() {
   fetch('https://react-my-burger-ea4f7.firebaseio.com/ingredients.json')
   .then(response => response.json())
  .then(data => this.setState({ingredients: data}))
  .catch(err => console.log(err));


}
  //checking if we can purchase it or not , based on the items we have
  updatePurchaseState = (ingredients) => {

    const sum = Object.values(ingredients)
    .reduce((sum,item) => sum + item,0)

    this.setState({ purchasable : sum > 0 }); //0 in js is considered as FALSE that's why this works with the boolean I have as initial state
  //we are basically saying above , change my initial state(false) to true when we sum is greather than 0;
  }

  //checking when we click on purchase now to display the modal component
  handlePurchasing = () => {
    this.setState({ purchasing: true});

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

  //canceling the purcahase

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  //canceling the purchase

  purchaseCancellHanlder = () => {
    alert('you can\'t continue');

  }

  //continuing with the purhcase

  continuePurchaseHandler = async () => {
    //true because the request is just send

    //props.history.push are a specil props given to this component thanks the the routing wrapper we have on it
    const queryParams = [];

    for(let i in this.state.ingredients) {

      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));

    }
    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });


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

    //orderSummary is null at the beggining because we do not have any order summary to show, conditional rendering on line 158
    let orderSummary = null;

    //retriving data from firebase GET
    let burger = <Spinner/>;

    if(this.state.ingredients) {

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>

          <BuildControls
          ingredientAdded={this.handleAddIngredient}
          ingredientDeleted={this.removeIngredient}
          disable={disableInfo}
          purchaseable={this.state.purchasable}
          added={this.handlePurchasing}
          price={this.state.totalPrice}
          />
        </Aux>

        );

       orderSummary = <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchase={this.purchaseCancellHanlder}
          continuePurchase={this.continuePurchaseHandler}
          price={this.state.totalPrice}
          />;
    }



    if(this.state.loading){
      orderSummary = <Spinner/>;

    }


    return(
      <Aux>

        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
          {orderSummary}

        </Modal>
        {burger}

      </Aux>
    );

  }
}
export default BurguerBuilder;
