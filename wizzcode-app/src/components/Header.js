import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import {
  BrowserRouter as Router
} from "react-router-dom";


export const Header = () => {

  return (
 
      <Navbar expand="md" >
        <Container>
       
            <h1 class="navbar-logo">WizzCode</h1>
          

        </Container>
      </Navbar>
   
  )
}

export default Header