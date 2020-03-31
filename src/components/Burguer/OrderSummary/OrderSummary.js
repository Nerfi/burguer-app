import React from 'react';
//in this case we are using {} because we are gonna manage the state
//() is just when you want to give back some JSX code
import Aux from '../../../hoc/Aux'; // importing our HOC component

const orderSummary = (props) => {
  //this is how we can see/print the key values of an object
  const ingredinetSummary = Object.keys(props.ingredients)
  .map(igkey => {
    return(<li key={igkey}>
            <span style={{textTransform: 'capitlize'}}>{igkey}</span>: and the cuantity is {props.ingredients[igkey]}
      </li>);
  });

  return (
    <Aux>
      <h3>Your oder:</h3>
      <p>your burger with ingredinets:</p>

      <ul>
      {ingredinetSummary}

      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );

};


export default orderSummary;
