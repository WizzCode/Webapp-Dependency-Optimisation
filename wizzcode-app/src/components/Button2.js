import React from 'react';
import { useNavigate } from "react-router-dom";

function Button2() {
    const navigate = useNavigate();

    const navigateToDependency = () => {
    
      navigate('/dependency');
    };

    return (
        <div>
          
          <button style={{color: "red"}} onClick={navigateToDependency}>Dependency Graph Button</button>
        </div>
      );
}

export default Button2;