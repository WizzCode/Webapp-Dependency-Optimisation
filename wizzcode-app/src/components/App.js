import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import Header from "./Header"; 
import FileUploadButton from "./FileUploadButton";
import Optimiser from "./pages/Optimiser";
import { Link } from "react-router-dom";
import Button from "./Button";

import 'bootstrap/dist/css/bootstrap.min.css';

import { Banner } from "./Banner";
import { Context } from './ContextFile';

function App() {
  const [optimisationResponse, setOptimisationResponse] = useState(null);

return (
    
 <>
  <Context.Provider value={{ optimisationResponse, setOptimisationResponse }}>
    <Header />
  
    <Routes>
            <Route path="/" element={<Banner />} /> 
            <Route path="/optimiser" element={<Optimiser />} />
          
    </Routes>
   </Context.Provider>
   </>


     );}
    

export default App;