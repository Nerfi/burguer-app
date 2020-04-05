import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurguerBuilder from  './containers/BurguerBuilder/BurguerBuilder';
import Toolbar from './components/Navigation/Toolbar';
import Checkout from './containers/checkout/Checkout';
//seting up rputing
import  {Route, Switch} from 'react-router-dom';


class App extends Component{
  render() {
   return (
      <div>
      <Toolbar/>
      <Layout>

      <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/" component={BurguerBuilder}/>
      </Switch>

      </Layout>

      </div>
    );
  }
}

export default App;
