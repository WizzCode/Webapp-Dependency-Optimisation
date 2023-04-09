import React from "react";
import Graph from 'react-graph-vis';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Dependency(nodesInfoJSON) { 
  const nodesInfo = nodesInfoJSON["nodesInfo"];

  //static input for testing purposes
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
      0: {
        "name": "SampleProgram",
        "level": 1,
        "primaryType": "class",
        "overriding": "y",
        "thread": "n",
        "depArray": [0, 1, 1, 1],
      },
      1: {
        "name": "A.f1()",
        "level": 2,
        "primaryType": "publicMethod",
        "overriding": "n",
        "thread": "y",
        "depArray": [0, 0, 1, 0],
      },
      2: {
        "name": "A.f1().abc",
        "level": 3,
        "primaryType": "variable",
        "overriding": "n",
        "thread": "n",
        "depArray": [0, 0, 0, 0],
      },
      3: {
        "name": "A.f2()",
        "level": 2,
        "primaryType": "publicMethod",
        "overriding": "y",
        "thread": "y",
        "depArray": [0, 1, 1, 0],
      },
    }
  }

  const primaryTypes = dependencyInfoJson["primaryTypes"];
  // const nodesInfo = dependencyInfoJson["nodesInfo"];
  const noNodes = Object.keys(nodesInfo).length;

  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#800080", "#FFA500", "#FFC0CB", "#40E0D0", "#E6E6FA", "#FF00FF"];
  const colorsForTypes = {};
  for (let i = 0; i < primaryTypes.length; i++) {
    colorsForTypes[primaryTypes[i]] = colors[i];
  }

  const graphEdges = [];
  for (let key in nodesInfo) {
    let depArray = JSON.parse(nodesInfo[key]["depArray"]);
    let k = parseInt(key);
    for (let i = 0; i < noNodes; i++) {
      if (depArray[i] === 1) {
        graphEdges.push({
          to: i + 1,
          from: k + 1,
        });
      }
    }
  }

  const shapeScheme = (item) => {
    if (item["overriding"] === "y") {
      return "circle"
    }
    else {
      return "box"
    }
  }

  const borderwidthscheme = {
    "y": 5,
    "n": 0
  };

  const graphNodes = Object.entries(nodesInfo).map(([key, item]) => {
    let k = parseInt(key);
    let l = parseInt(item["level"])
    return {
      id: k + 1,
      label: item["name"],
      value: 10,
      level: l,
      borderColor: '#000000',
      borderWidth: borderwidthscheme[item["thread"]],
      color: {
        background: colorsForTypes[item["primaryType"]],
        border: "#686868",
      },
      shape: shapeScheme(item),
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
        nodeSpacing: 500,
        avoidOverlap: true,
      },
    },
    edges: {
      color: 'white',
    },
    height: '800px',
    autoResize: true,
  };

  return (
    <div id="graph-div" className="rounded-4">
      {
        (nodesInfo !== null)
          ?
          <>
            <Graph
              graph={graph}
              options={options}
            />
          </>
          :
          <p className="p-3">Please upload input code to view dependency graph</p>
      }
    </div>
  );
}
  
export default Dependency;