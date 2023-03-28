import React, {useState} from "react";
import {Router, Routes, Route} from "react-router-dom";
import './App.css';


function Button() {
  const[active,setActive]=useState(false);
  const handleclick=() =>{
    setActive(!active);
  };
  return (
    
    <div className="App">
    
    <button className='ui button blue' style={{  marginLeft: '400px',padding: '20px' ,backgroundColor: active? "yellow": "white",color: "#333",fontSize:'19px'}}>Code Input</button>{"  "}
    <button className='ui button blue' style={{ padding: '20px' ,backgroundColor: "white",color: "#333",fontSize:'19px'}}>Dependency Graph </button>{"  "}
    <button className='ui button blue' style={{ marginRight: '400px',padding: '20px' ,backgroundColor: "white",color: "#333",fontSize:'19px'}}>Code Optimization</button>
     
    </div>
     );}

export default Button;