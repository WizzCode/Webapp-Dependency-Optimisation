import React from 'react';
import { useNavigate } from "react-router-dom";

function Button2() {
    const navigate = useNavigate();

    const navigateToDependency = () => {
    
      navigate('/dependency');
    };

    return (
        <div>
          
          <button class = "cardbutton" onClick={navigateToDependency}>Generate Dependency Graph</button>
        </div>
      );
}

export default Button2;