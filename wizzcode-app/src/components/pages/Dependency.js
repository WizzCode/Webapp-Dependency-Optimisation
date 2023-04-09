import React from "react";
import Graph from 'react-graph-vis';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Dependency() { 
  const matrix = [
    [0, 0, 1,1],
    [1, 0, 1,0],
    [1, 1, 0,1],
    [1, 1, 0,0],
  ];
  
  //Level 1 denotes highest level
  const levels =[1,2,3,3];
  const access = [1,2,1,3];
  const type = ["normal","overriding","overriding","normal"];
  const thread = ["no","yes","no","yes"];

  const colorscheme = {
    1: '#FF0000', // red
    2: '#00FF00', // green
    3: '#0000FF',
    4:'#FFFF00',
  };

  const shapescheme = {
    "normal" : "circle",
    "overriding": "box"
  };

  const borderwidthscheme ={
    "yes":5,
    "no":0
  };

  const nodes = matrix.map((row, index) => {
    return {
      id: index + 1,
      label: `Node ${index + 1}`,
      value: 10,
      level: levels[index],
      borderColor: '#000000',
      borderWidth: borderwidthscheme [thread[index]],
      color : colorscheme[access[index]],
      shape : shapescheme[type[index]],
      
    };
  });
  
  const edges = [];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === 1) {
      edges.push({
        to: i + 1,
        from: j + 1,
      });
    }
  }
}

const graph = {
  nodes: nodes,
  edges: edges,
};

const options = {
  layout: {
    hierarchical: {
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 150,
      nodeSpacing: 350,
      avoidOverlap: true,
    },
  },
  edges: {
    color: 'white',
  },
  height: '500px',
 
};


return (
  <Graph
    graph={graph}
    options={options}
    
  />
);
  
  }
  
export default Dependency;