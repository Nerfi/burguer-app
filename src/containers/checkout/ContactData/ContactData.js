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
            value: ''

          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'your street name'
            },
            value: ''

          },
          country:{
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'your country'

            },
            value: ''

          },
          email:{
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your Email'
            },
            value: ''
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

   // in firebase we have to added the endpoint and the .json method by ourself, like here 'orders.json'
    const firebaseUrl = 'https://react-my-burger-ea4f7.firebaseio.com/orders.json';

    const requestData = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ingredients: this.props.ingredients,
        price: this.props.price,

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
  console.log(formElementArray)

  let form = (
       <form>
           {formElementArray.map(element => (

              <Input
               key={element.id}
               elementType={element.config.elementType}
               elementConfig={element.config.elementConfig}
              value={element.config.value}/>

              ))}
          <Button clicked={this.orderHandler} btnType="Success"> Order </Button>

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

