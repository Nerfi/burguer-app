import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI//Input/Input';


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
            valid: false

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
            valid: false


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
            valid: false


          },
          email:{
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your Email'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false

          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [{value: 'fastest', displayValue: 'Fastest'},{value: 'cheapest', displayValue: 'Cheapest'}]
            },
            value:'select on the way'
          }
    },
    loading: false
  }

  orderHandler = async (e) => {
    e.preventDefault();

    this.setState({loading: true});

      //passing userdata to the order
    const userData = this.state.orderForm;
    const user = {};
  //iterating between the keys and values of the state
    for(let key in userData) {
      //assignningthe value typed in the form to our new user object
        user[key] = userData[key].value;
    }

   // in firebase we have to added the endpoint and the .json method by ourself, like here 'orders.json'
    const firebaseUrl = 'https://react-my-burger-ea4f7.firebaseio.com/orders.json';

    const requestData = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ingredients: this.props.ingredients,
        price: this.props.price,
        userInfo: user

      })
    };

    const postData = await  fetch(firebaseUrl, requestData)
    .then(response => {
      //setting the loading to false once we have make the API call to that endpoint
      this.setState({loading: false});
      //redirecting the user once the action is completed
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({loading: false});
    });

  }

  //validations

  checkValidaty = (value,rules) => {
    let isValid = false;

    if (rules.required) {

        //trim() method to delete whitespaces at beggining or end
        isValid = value.trim() !== '' && isValid;

    }
    //maybe i'll not use it,zip code
    if(rules.mingLength){

      isValid = value.length >= rules.mingLength

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
   deeplyCopy.valid = this.checkValidaty(deeplyCopy.value, deeplyCopy.validation);


  //not sure what are we are doing here
   formDataCopy[inputIdentifier] = deeplyCopy;

   //setting the state, the value property to what the user has typed in
  this.setState({orderForm: formDataCopy});


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
               invalid={element.config.value.valid}
              value={element.config.keys}
              handleChange={(event) => this.handleChange(event,element.id)} //the id is just the key name of our object, that's is what we are gonna use to identifier which input type has been wrotten on
              />

              ))}
          <Button  btnType="Success"> Order </Button>

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


export default ContactData;

