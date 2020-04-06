import React from 'react';
import './Input.css';

const input = (props) => {

  let inputElement = null;

  switch(props.elementType) {

    case('input'):
    inputElement = <input className="InputElement" {...props.elementConfig} value={props.value} onChange={props.handleChange} />;
    break;

    case('textarea'):
    inputElement = <textarea className="InputElement" {...props.elementConfig} value={props.value}  onChange={props.handleChange} />;
    break;

    case('select'):
    inputElement = (<select className="InputElement"  value={props.value} onChange={props.handleChange} >
    {props.elementConfig.options.map(opt => (
        <option key={opt.value} value={opt.value} onChange={props.handleChange} >
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
