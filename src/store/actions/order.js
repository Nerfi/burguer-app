import * as actionTypes from './actionTypes';


//actions types for contact page, burger succes purchase and failure
export const purchaseSuccessBurger = (id,orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData
  };
};


//fail case
export const purchaseBurgerFail = (err) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err
  };
};

export const purchaseBurger = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

//async action for the contact page
export const purchaseBurgerStart = (orderData) => {

  return dispatch => {
    dispatch(purchaseBurger());
    const firebaseUrl = 'https://react-my-burger-ea4f7.firebaseio.com/orders.json';

    const postData =  fetch(firebaseUrl, orderData)
    .then(response => {
      //setting the loading to false once we have make the API call to that endpoint
      dispatch(purchaseSuccessBurger(response.name, orderData));
            //redirecting the user once the action is completed
      //this.props.history.push('/')
    })
    .catch(err => {
      dispatch(purchaseBurgerFail(err));
    });

  }
}


export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};





//sync code Orders actions, JUAn
export const makeOrder = (order) => {
  return {
    type: actionTypes.CREATE_ORDER,
    orders: order
  };
};


//handling API call, async code

const fetchingOrders = () =>  {
  return dispatch => {

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

        dispatch(makeOrder(res));
      })
    .catch(err => console.log(err));

  };
};
