import React from 'react';
import { useNavigate } from "react-router-dom";

function Button() {
    const navigate = useNavigate();

    const navigateToOptimiser = () => {
    
      navigate('/optimiser');
    };

    return (
        <div>
          
          <button class = "cardbutton" onClick={navigateToOptimiser}>View Optimisations</button>
        </div>
      );
}

export default Button;