import React, {Component} from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

  //props.children can be anything, we pass children becauuse the modal will not be a self closing tag
  // <Modal/> NOT!, it will be a component with some content in between <Modal>Children</Modal>

class Modal extends Component {

   shouldComponentUpdate(nextProps, nextState){
    //goona make sure if show(prop) change we update it, if not no, reason? performance
   return nextProps.show !== this.props.show;

  }

    componentDidUpdate () {
        console.log('[Modal] WillUpdate');
    }

  render(){
    return(
      <Aux>
      <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
        <div
        className="Modal"
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ?  '1' :  '0'
        }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}


export default Modal
