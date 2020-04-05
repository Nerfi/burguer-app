import React from 'react';
import './Order.css';

const order = (props) => {
    {/* ingredinets here is an object inseide the array*/}
    //this is another way to convert object into an array key values pair, we have the
    //same in Burger component as well
  const convertIngredients  = [];

  for(let ingredient in props.ingredients){
    //[ingredient is the value]
    //name: ingredient is the key
    convertIngredients.push({name: ingredient, amout: props.ingredients[ingredient]})
  }

 const ingredientOutput = convertIngredients.map(amout =>{
    return <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border:'1px dotted #ccc', padding: '5px'}} key={amout.name}>{amout.name} {amout.amout}</span>
 } )
  return(
    <div className="Order">
      <p><strong>Ingredienst:</strong>{ingredientOutput} </p>

      <p>Price: <strong>${props.price.toFixed(2)}</strong></p>

  </div>
  );

};
export default order;
