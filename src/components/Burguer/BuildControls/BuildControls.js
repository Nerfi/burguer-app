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

    {controls.map(ctr => {

     return <BuildControl
     label={ctr.label}
      key={ctr.label}
      added={() => props.ingredientAdded(ctr.type)}

      />

    })}


  </div>



);

export default buidlControls;
