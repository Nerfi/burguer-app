import  React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burguer/Burguer';

class BurguerBuilder extends Component {
  render(){
    return(
      <Aux>
      <Burger/>

        <div>Build controll</div>
      </Aux>
    );

  }
}
export default BurguerBuilder;
