import React from 'react';
import './Input.css';

const input = (props) => {

  let inputElement = null

  const valid = props.invalid;

  const style = ["InputElement"];


  switch(props.elementType) {


    case('input'):
    inputElement = <input className={valid ? style : "Invalid" }  {...props.elementConfig} value={props.value} onChange={props.handleChange} />;
    break;

    case('textarea'):
    inputElement = <textarea className={valid ? style : "Invalid"} {...props.elementConfig} value={props.value}  onChange={props.handleChange} />;
    break;

    case('select'):
    inputElement = (<select className={valid ? style : "Invalid"} value={props.value} onChange={props.handleChange} >
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
