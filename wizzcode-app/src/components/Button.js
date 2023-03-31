import React from 'react';
import { useNavigate } from "react-router-dom";

function Button() {
    const navigate = useNavigate();

    const navigateToOptimiser = () => {
    
      navigate('/optimiser');
    };

    return (
        <div>
          
          <button style={{color: "red"}} onClick={navigateToOptimiser}>Optimisation Button</button>
        </div>
      );
}

export default Button;