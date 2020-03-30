import React from 'react';
import './Burger.css';
//problem here importing this module
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
  // props ingredients here is an object and we are converting that object into an array of keys
  const transformIngredients = Object.keys(props.ingredients)
      .map(igKey => {
        //props.ingredients[igKey] is the number of the current ingredient (singular).
        //So 5 slices of cheese is 5.
          return [...Array(props.ingredients[igKey])].map((_,index) => {
           return <BurgerIngredient key={igKey + index} type={igKey}/>
          });
      });

  return(
    <div className="Burger">
      <BurgerIngredient type="bread-top"/>
      {transformIngredients}
      <BurgerIngredient type="bread-botton"/>
    </div>

  );

};

export default burger;
