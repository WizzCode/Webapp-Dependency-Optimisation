import React from 'react';

// export const Context = React.createContext(null);

export const Context = React.createContext({
    optimisationResponse: null,
    setOptimisationResponse: () => {},
    inputFileText: null,
    setInputFileText: () => {},
    dependencyResponse: null,
    setDependencyResponse: () => {}, 
});