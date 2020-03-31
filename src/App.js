import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurguerBuilder from  './containers/BurguerBuilder/BurguerBuilder';
import Toolbar from './components/Navigation/Toolbar';



class App extends Component{
  render() {
   return (
      <div>
      <Toolbar/>
      <Layout>

      <BurguerBuilder/>

      </Layout>

      </div>
    );
  }
}

export default App;
