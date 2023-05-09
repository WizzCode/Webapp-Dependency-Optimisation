import React from 'react';

// export const Context = React.createContext(null);

export const Context = React.createContext({
    optimisationResponse: null,
    setOptimisationResponse: () => {},
    dependencyInputText: null,
    setDependencyInputText: () => {},
    optimisationInputText: null,
    setOptimisationInputText: () => {},
    dependencyResponse: null,
    setDependencyResponse: () => {}, 
});