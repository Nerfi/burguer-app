import React from 'react';
import './Modal.css';

const modal = (props) => (
  //props.children can be anything, we pass children becauuse the modal will not be a self closing tag
  // <Modal/> NOT!, it will be a component with some content in between <Modal>Children</Modal>
  <div className="Modal">
    {props.children}
  </div>
);


export default modal;
