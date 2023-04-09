import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import {
  BrowserRouter as Router
} from "react-router-dom";


export const Header = () => {

  return (
 
    <>
    <Navbar className="navbar shadow-lg bg-dark">
      <Navbar.Brand href="#home" className="text-light navbar-logo ">WizzCode</Navbar.Brand>
    </Navbar>
  </>
   
  )
}

export default Header