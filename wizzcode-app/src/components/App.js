import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import Header from "./Header"; 
import FileUploadButton from "./FileUploadButton";
import Optimiser from "./pages/Optimiser";
import { Link } from "react-router-dom";
import Button from "./Button";

import 'bootstrap/dist/css/bootstrap.min.css';


import { Banner } from "./Banner";


function App() {
 
return (
    
 <>
  <Header />
 
  <Routes>
          <Route path="/" element={<Banner />} /> 
          <Route path="/optimiser" element={<Optimiser />} />
         
   </Routes>
   </>


     );}
    

export default App;