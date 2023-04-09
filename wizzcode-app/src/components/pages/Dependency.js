import React from "react";
import Graph from 'react-graph-vis';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Dependency() { 
  const dependencyInfoJson = {
    "primaryTypes": [
      "class",
      "classVariable",
      "privateMethod",
      "publicMethod",
      "protectedMethod",
      "defaultMethod",
      "variable",
    ],
    "nodesInfo": {
      0:{
        "name":"SampleProgram",
        "level":1,
        "primaryType":"class",
        "overriding":"y",
        "thread":"n",
        "depArray":[0,1,1,1],
      },
      1:{
        "name":"A.f1()",
        "level":2,
        "primaryType":"publicMethod",
        "overriding":"n",
        "thread":"y",
        "depArray":[0,0,1,0],
      },
      2:{
        "name":"A.f1().abc",
        "level":3,
        "primaryType":"variable",
        "overriding":"n",
        "thread":"n",
        "depArray":[0,0,0,0],
      },
      3:{
        "name":"A.f2()",
        "level":2,
        "primaryType":"publicMethod",
        "overriding":"y",
        "thread":"y",
        "depArray":[0,1,1,0],
      },
    }
  }

  const primaryTypes = dependencyInfoJson["primaryTypes"];
  const nodesInfo = dependencyInfoJson["nodesInfo"];
  const noNodes = Object.keys(nodesInfo).length;

  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#800080", "#FFA500", "#FFC0CB", "#40E0D0", "#E6E6FA", "#FF00FF"];
  const colorsForTypes = {};
  for(let i=0;i<primaryTypes.length;i++){
    colorsForTypes[primaryTypes[i]]=colors[i];
  }

  const graphEdges = [];
  for( let key in nodesInfo){
    for (let i=0;i<noNodes;i++){
      if(nodesInfo[key]["depArray"][i] === 1){
        graphEdges.push({
          to: i + 1,
          from: parseInt(key) + 1,
        });
      }
    }
  }

  const shapeScheme = (item) => {
    if(item["overriding"]==="y"){
      return "box"
    }
    else{
      return "circle"
    }
  }

  const borderwidthscheme ={
    "y":5,
    "n":0
  };

  const graphNodes = Object.entries(nodesInfo).map(([key, item]) => {
    return {
      id: parseInt(key) + 1,
      label: item["name"],
      value: 10,
      level: item["level"],
      borderColor: '#000000',
      borderWidth: borderwidthscheme[item["thread"]],
      color : {
        background:colorsForTypes[item["primaryType"]],
      },
      shape : shapeScheme(item),   
    };
  });

  const graph = {
    nodes: graphNodes,
    edges: graphEdges,
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
    height:'500px',
    autoResize: true,
  };

  return (
    <div id="graph-div" className="rounded-4">
      <Graph
      graph={graph}
      options={options}
    />
    </div>
  );
}
  
export default Dependency;