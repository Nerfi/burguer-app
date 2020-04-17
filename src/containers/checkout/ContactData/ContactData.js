import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI//Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
          name: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'your name'
            },
            value: '',
            validation: {
              required: true

            },
            valid: false,
            touched: false

          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'your street name'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false


          },
          country:{
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'your country'

            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false


          },
          email:{
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your Email'
            },
            value: '',
            validation: {
              required: true,
              isEmail: true
            },
            valid: false,
            touched: false

          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [{value: 'fastest', displayValue: 'Fastest'},{value: 'cheapest', displayValue: 'Cheapest'}]
            },
            value:'',
            valid: true
          }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = async (e) => {
    e.preventDefault();

      //passing userdata to the order
    const userData = this.state.orderForm;
    const user = {};
  //iterating between the keys and values of the state
    for(let key in userData) {
      //assignningthe value typed in the form to our new user object
        user[key] = userData[key].value;
    }
   // in firebase we have to added the endpoint and the .json method by ourself, like here 'orders.json'
   // const firebaseUrl = 'https://react-my-burger-ea4f7.firebaseio.com/orders.json';
    const requestData = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ingredients: this.props.ings,
        price: this.props.price,
        userInfo: user

      })
    };
    this.props.onPurchaseBurger(requestData);

  }

  //validations

  checkValidity = (value,rules) => {

    let isValid = true;

    if(!rules) {
      return true;
    }

      if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }


    //validation email
    if(rules.isEmail) {
       const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid

    }



    return isValid;


  }

   //create a method to handle the changes in the users input
  handleChange = (event, inputIdentifier) => {
    //dont touch the state directly, copying the original object
    const formDataCopy = {...this.state.orderForm};

    //here we copy the state object an we are accesing the keys on it [inputIndetifier]
    //we are basically copying the keys in this line of code
   const deeplyCopy = {...formDataCopy[inputIdentifier]};


   //here we are assigning to the value property of that object(copy) the value of what the user haved typed in
   //pd: calling the value property of the deeplyCopy object that we cipy an assigning the value typed by the user
   deeplyCopy.value = event.target.value;

   //adding validation
    deeplyCopy.valid = this.checkValidity(deeplyCopy.value, deeplyCopy.validation);

    deeplyCopy.touched = true;

  //not sure what are we are doing here
   formDataCopy[inputIdentifier] = deeplyCopy;

   let formIsValid = true;

   for(let inputIdentifier in deeplyCopy) {
    formIsValid = deeplyCopy[inputIdentifier].valid && formIsValid;
   }

   //setting the state, the value property to what the user has typed in
  this.setState({orderForm: formDataCopy, formIsValid: formIsValid});


  }


  render(){
    //converting the state object into an array of objects
    const formElementArray = [];

    for(let keys in this.state.orderForm) {

      formElementArray.push({
        //we store the id to not lose it, and have one ID
        id: keys,
        config: this.state.orderForm[keys]
      });
    }


  let form = (
       <form onSubmit={this.orderHandler}>

           {formElementArray.map(element => (

              <Input
               key={element.id}
               elementType={element.config.elementType}
               elementConfig={element.config.elementConfig}
               invalid={!element.config.valid}
               shouldValidate={element.config.validation}
              value={element.config.value}
              touched={element.config.touched}
              handleChange={(event) => this.handleChange(event,element.id)} //the id is just the key name of our object, that's is what we are gonna use to identifier which input type has been wrotten on
              />

              ))}
          <Button  btnType="Success" disabled={this.state.formIsValid}> Order </Button>

        </form>
        );

  if(this.state.loading) {
    form = <Spinner/>;
  }
    return(
      <div className="ContactData">
        <h4> Entry your data</h4>
        {form}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings: state.ingredients,
    price: state.totalPrice
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (orderData) => dispatch(actions.purchaseBurgerStart(orderData)
  }
};
export default connect(mapStateToProps)(ContactData);

