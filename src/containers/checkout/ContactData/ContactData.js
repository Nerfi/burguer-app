import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI//Input/Input';


class ContactData extends Component {
  state = {
    name:'',
    email: '',
    address: {
      street: '',
      postCode: ''
    },
    loading: false
  }

  orderHandler = async ( e) => {
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
        customer: {
          name: "Juan",
          address: {
            street:  "Murcia street",
            country: "Spain"
          },
          email: "test@test.com"
        }
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
  let form = (
       <form>

          <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
          <Input inputtype="input" type="email" name="email" placeholder="your email"/>
          <Input inputtype="input" type="text" name="street" placeholder="your street"/>
          <Input inputtype="input" type="text" name="name" placeholder="placeholder"/>

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

