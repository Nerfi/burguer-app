import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
//importing and connecting this ro Redux to manage the ingredients
import {connect} from 'react-redux';

class Checkout extends Component {

  checkoutCancellHandler = () => {
    //special props from wrapper this compoentn with route
    this.props.history.goBack();

  }

  checkoutContinue = () => {
    //history is a method given by the react router
    this.props.history.replace('/checkout/contact-data');

  }



   render(){
    return(
      <div>

        <CheckoutSummary
        onCheckoutCancell={this.checkoutCancellHandler}
        onCheckoutContinue={this.checkoutContinue}
        ingredients={this.props.ings}
        />
        <Route
        path={this.props.match.path + '/contact-data' }
        component={ContactData}

         />

      </div>
    );
  }
}


//mapping state to proos, here we do not need dispatch , because we are not dispatching any action like in burgerBuilder component
const mapStateToProps = state => {
  return {
    ings: state.ingredients

  };
};

//in the case we just need to dispatch actions in any comoponent, just actions, the first argument will be null(null, maptDispatchToProps)
export default connect(mapStateToProps)(Checkout);
