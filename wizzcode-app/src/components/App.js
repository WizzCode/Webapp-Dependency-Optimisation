import React from "react";
import {Router, Switch, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./Navbar";
import Header from "./Header"; 
import Button from "./Button";

import About from "./About";
import Description from "./Description";
function App() {
  /*let component
  switch (window.location.pathname)
{
  
  case "/description":
    component =<Description />
  break
    case "/about":
    component =<About />
  break}*/

 return (
    
    <div id="container" >
      
     <style>{'body { background-color: blue; display:"flex"}' }
      
     </style>
     
    <Navbar/> 
    <Header /> 
    <div style={{backgroundColor:"black"}}><h2 style={{ fontSize: 30,color:"white",textAlign: "center",padding:'20px'}}>Dependency Relationship</h2><p style={{ color:"white", fontSize: 20, textAlign: "center", padding:'50px'}}>Dependency relations help us to understand the logic behind how variables and other attributes in a code are related to one another. This thus, helps us to understand the code better, make correct changes and helps in software reusabiity as well.</p></div>
    <div style={{backgroundColor:"black"}}><h2 style={{ fontSize: 30, color:"white",textAlign: "center", padding:'20px'}}>Code Optimization</h2><p style={{ color:"white",fontSize: 20, textAlign: "center", padding:'50px'}}>Code optimization is a program modification strategy that endeavours to enhance the intermediate code, so a program utilises the least potential memory, minimises its CPU time and offers high speed.</p></div>

    
    <Button/> 
    
    <Description />
    <About />
    </div>


     );}

export default App;