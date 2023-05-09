import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import {
  BrowserRouter as Router, Link
} from "react-router-dom";


export const Header = () => {

  return (
 
    <>
    <Navbar className="navbar shadow-lg bg-dark" sticky="top" expand="lg" variant="dark">
      <Navbar.Brand href="#home" className="text-light navbar-logo me-4">WizzCode</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/optimiser" className="mx-3 py-2 text-light" style={{ textDecoration: 'none' }}>Optimiser</Link>
          <Link to="/dependency" className="mx-3 py-2 text-light" style={{ textDecoration: 'none' }}>Dependency Finder</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
   
  )
}

export default Header