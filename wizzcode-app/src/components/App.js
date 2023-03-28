import React from "react";
import {Router, Switch, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./Header"; 
import FileUploadButton from "./FileUploadButton";
import { Link } from "react-router-dom";

import { Banner } from "./Banner";


function App() {
  
return (
    
  <main className="text-gray-400 bg-gray-900 body-font">
  <Header />
  <Banner />
  <FileUploadButton/>
</main>


     );}

export default App;