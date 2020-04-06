import React ,{Component} from 'react';
import Order from '../../components/Order/Order';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {

    // what I get back from fairebase is an object , I have a state as an array[], I have to convert that object into
    //an array, done, down below

   fetch('https://react-my-burger-ea4f7.firebaseio.com/orders.json')
      .then(response => response.json())
      .then(res => {

        const fetchedOrders = [];

        for(let key in res) {

          fetchedOrders.push({
            //here we use the spread operator because we want to copy the data that we have on the orignal object that I get back from fairebase
            //that's why we use the spread operator '...' unlike in ConcatData, we we dont have nothing given back neither store ,look at that for a better understood
            ...res[key],
            id: key
          });
        }

        this.setState({orders: fetchedOrders});
        console.log(this.state.orders)
      })
    .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        {this.state.orders.map(order => {
          return <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price} //to convert a string into an number that why we put the +

          />

        })}

      </div>
      );
  }

}

export default Orders;
