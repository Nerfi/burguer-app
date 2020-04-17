import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';

//adding createSore Redux
import {createStore} from 'redux';
//importing the provider, this will wrap our app and allow us to have acces to the parts of the state we want/need to
import {Provider} from 'react-redux';

//importing the state , in order to distrubuted in the app
import burgerBuilderReducer from './store/reducers/burgerBuilder';

//creating the store, here we will store our state and we will serve it to the rest of the app
const store = createStore(burgerBuilderReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>

);

ReactDOM.render(app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
