import React from 'react';
import './Input.css';

const input = (props) => {

  let inputElement = null;

  switch(props.elementType) {

    case('input'):
    inputElement = <input className="InputElement" {...props.elementConfig} value={props.value}/>;
    break;

    case('textarea'):
    inputElement = <textarea className="InputElement" {...props.elementConfig} value={props.value}/>;
    break;

    case('select'):
    inputElement = (<select className="InputElement"  value={props.value}>
    {props.elementConfig.options.map(opt => (
        <option key={opt.value} value={opt.value}>
        {opt.displayValue}
        </option>
      ))}
    </select>
    );
    break;


    default:
    inputElement = <input className="InputElement"  value={props.value}/>;


  }


  return(
    <div className="Input">
    <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
}
export default input;
