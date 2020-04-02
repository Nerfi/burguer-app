import React,{Component} from 'react';
//in this case we are using {} because we are gonna manage the state
//() is just when you want to give back some JSX code
import Aux from '../../../hoc/Aux'; // importing our HOC component
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
  componentDidUpdate(){
    console.log('willUpdate');

  }


  render() {
    //this is how we can see/print the key values of an object
  const ingredinetSummary = Object.keys(this.props.ingredients)
  .map(igkey => {
    return(<li key={igkey}>
            <span style={{textTransform: 'capitlize'}}>{igkey}</span>: and the cuantity is {this.props.ingredients[igkey]}
      </li>);
  });

    return(
      <Aux>

      <h3>Your oder:</h3>
      <p>your burger with ingredinets:</p>

      <ul>
      {ingredinetSummary}

      </ul>
      <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={this.props.cancelPurchase}> Cancel </Button>
      <Button btnType="Success" clicked={this.props.continuePurchase}> Continue</Button>

    </Aux>
    );
  }
}


export default OrderSummary;
