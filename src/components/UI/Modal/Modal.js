import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  //props.children can be anything, we pass children becauuse the modal will not be a self closing tag
  // <Modal/> NOT!, it will be a component with some content in between <Modal>Children</Modal>
  <Aux>
  <Backdrop show={props.show} clicked={props.modalClose}/>
    <div
    className="Modal"
    style={{
      transform: props.show ? "translateY(0)" : "translateY(-100vh)",
      opacity: props.show ?  '1' :  '0'
    }}
    >
      {props.children}
    </div>
  </Aux>
);


export default modal;
