import React from 'react';
import Burger from '../../Burguer/Burguer';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {

  return(

    <div className="checkoutSummary">
      <h1>Hope you like it </h1>

      <div style={{with: '100px', height: '300px', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>

      <Button clicked btnType="Danger">Cancel</Button>
      <Button clicked btnType="Success">Continue</Button>

    </div>
  );

}

export default checkoutSummary;
