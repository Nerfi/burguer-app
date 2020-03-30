import React from  'react';
import './BuildControl.css';

const buildControl = (props) => (
  <div className="BuildControl">
    <div className="Label">{props.label}</div>
    <button className="Less" onClick={props.delete}>Less</button>
    <button onClick={props.added} className="More">More</button>
  </div>
);


export default buildControl;
