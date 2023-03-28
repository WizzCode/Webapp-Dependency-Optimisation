import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import {
  BrowserRouter as Router
} from "react-router-dom";


export const Header = () => {

  return (
 
      <Navbar expand="md" >
        <Container>
          <Navbar.Brand href="/">
            <h1>WizzCode</h1>
          </Navbar.Brand>

        </Container>
      </Navbar>
   
  )
}

export default Header