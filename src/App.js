import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurguerBuilder from  './containers/BurguerBuilder/BurguerBuilder';
import Toolbar from './components/Navigation/Toolbar';
import Checkout from './containers/checkout/Checkout';


class App extends Component{
  render() {
   return (
      <div>
      <Toolbar/>
      <Layout>

      <BurguerBuilder/>
      <Checkout/>

      </Layout>

      </div>
    );
  }
}

export default App;
