import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
//importing and connecting this ro Redux to manage the ingredients
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

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
    let summary = <Redirect to="/" />

    if(this.props.ings) {

      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
      summary = (
        <div>
        {purchasedRedirect}
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

    return summary;

  }
}


//mapping state to proos, here we do not need dispatch , because we are not dispatching any action like in burgerBuilder component
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased

  };
};

//in the case we just need to dispatch actions in any comoponent, just actions, the first argument will be null(null, maptDispatchToProps)
export default connect(mapStateToProps)(Checkout);
