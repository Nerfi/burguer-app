import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
//maybe I'll not need this
import './Toolbar.css';

const toolbar = (props) => (
  <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Nav.Link href="#deets">Checkout</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  </div>

);


export default toolbar;
