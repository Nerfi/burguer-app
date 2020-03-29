import React from 'react';
import './Burger.css';
//problem here importing this module
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
  return(
    <div className="Burger">
      <BurgerIngredient type="bread-top"/>
      <BurgerIngredient type="cheese"/>
      <BurgerIngredient type="meat"/>
      <BurgerIngredient type="bread-botton"/>
    </div>

  );

};

export default burger;