import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burguer/Burguer';

class BurguerBuilder extends Component {
  //the new way of defined state
  state = {
    ingredients: {
      salad: 1,
      bacon: 3,
      cheese: 0,
      meat: 0
    }
  }

  render(){
    return(
      <Aux>
      <Burger ingredients={this.state.ingredients}/>

        <div>Build controll</div>
      </Aux>
    );

  }
}
export default BurguerBuilder;
