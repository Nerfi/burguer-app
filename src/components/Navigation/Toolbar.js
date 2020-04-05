import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
//maybe I'll not need this
import './Toolbar.css';

const toolbar = (props) => (
  <div className="toolbar">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
       <NavLink style={{color: 'white'}} to="/">BuildBurger</NavLink>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
         <NavLink exact style={{color: 'white', marginRight: '50px'}} to="/orders">Something</NavLink>
        <NavLink  style={{color: 'white'}} to="/orders">Orders</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  </div>

);


export default toolbar;
