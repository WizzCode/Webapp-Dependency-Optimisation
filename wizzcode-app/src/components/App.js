import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import Header from "./Header"; 
import FileUploadButton from "./FileUploadButton";
import Optimiser from "./pages/Optimiser";
import Dependency from "./pages/Dependency";
import DependencyFinder from "./pages/Dependencyfinder";
import { Link } from "react-router-dom";
import Button from "./Button";
import Button2 from "./Button2";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Banner } from "./Banner";
import { Context } from './ContextFile';

function App() {
  const [optimisationResponse, setOptimisationResponse] = useState(null);
  const [optimisationInputText, setOptimisationInputText] = useState(null);
  const [dependencyResponse, setDependencyResponse] = useState(null);
  const [dependencyInputText, setDependencyInputText] = useState(null);

return (
    
 <>
  <Context.Provider value={{optimisationInputText, setOptimisationInputText, optimisationResponse, setOptimisationResponse, dependencyInputText, setDependencyInputText, dependencyResponse, setDependencyResponse }}>
    <Header />
  
    <Routes>
            <Route path="/" element={<Banner />} /> 
            <Route path="/optimiser" element={<Optimiser />} />
            <Route path="/dependency" element={<DependencyFinder />} />
          
    </Routes>
   </Context.Provider>
   </>


     );}
    

export default App;