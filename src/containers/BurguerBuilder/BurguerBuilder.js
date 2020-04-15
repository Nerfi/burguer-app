import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
//importing connect from redux to connect out component to the store
import {connect} from 'react-redux';
//importing actions types
import * as  actionTypes from '../../store/actions';

class BurguerBuilder extends Component {
  //the new way of defined state
  //leaving purchasing and loading as local UI state, no need to store this in Redux store
  state = {
   purchasing: false,
   loading: false
  }


//retriving data from firebase

componentDidMount() {
   //fetch('https://react-my-burger-ea4f7.firebaseio.com/ingredients.json')
   //.then(response => response.json())
  //.then(data => this.setState({ingredients: data}))
  //.catch(err => console.log(err));


}
  //checking if we can purchase it or not , based on the items we have
  updatePurchaseState = (ingredients) => {

    const sum = Object.values(ingredients)
    .reduce((sum,item) => sum + item,0)// el 0 aqui es el valor inicial del reducer, aqui vamos a empezar desde 0 y solo vamos a hacer el btn able cuando
    //sea mayor que > 0

      return  sum > 0; //0 in js is considered as FALSE that's why this works with the boolean I have as initial state
  //we are basically saying above , change my initial state(false) to true when we sum is greather than 0;
  }

  //checking when we click on purchase now to display the modal component
  handlePurchasing = () => {
    this.setState({ purchasing: true});

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
    this.props.history.push('/checkout');


  }

  render(){

    const disableInfo = {
      ...this.props.ings
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

    if(this.props.ings) {

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>

          <BuildControls
          ingredientAdded={this.props.onAddIngredient}
          ingredientDeleted={this.props.onDeleteIngredient}
          disable={disableInfo}
          purchaseable={this.updatePurchaseState(this.props.ings)}
          added={this.handlePurchasing}
          price={this.props.price}
          />
        </Aux>

        );

       orderSummary = <OrderSummary
          ingredients={this.props.ings}
          cancelPurchase={this.purchaseCancellHanlder}
          continuePurchase={this.continuePurchaseHandler}
          price={this.props.price}
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

//mappint the state to props
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice

  };
};


//mapping the action and dispatching then

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onDeleteIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingName: ingName})

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurguerBuilder);
