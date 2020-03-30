import React from 'react'
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buidlControls = (props) => (


  <div className="BuildControls">
  <p>current price <strong>${props.price.toFixed(2)}</strong></p>

    {controls.map(ctr => {

     return <BuildControl
     label={ctr.label}
      key={ctr.label}
      added={() => props.ingredientAdded(ctr.type)}
      delete={() => props.ingredientDeleted(ctr.type)}
      disable={props.disable[ctr.type]}

      />

    })}
    <button className="OrderButton"  disabled={!props.purchaseable}>ORDER NOW</button>

  </div>



);

export default buidlControls;
