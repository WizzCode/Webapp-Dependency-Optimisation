import React from "react";
import Graph from 'react-graph-vis';
import { useState, useEffect} from 'react'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Legend = () => {
  const shapeOptions = [
    { name: "Attribute", shape: "box", color: "white"},
    { name: "Overrides Super Class Method", shape: "circle", color: "white" },
  ];

  const colorOptions = [
    { name: "Class Variable", shape:"square", color: "#AFE1AF" },
    { name: "Private Method", shape: "square", color: "#FFFF8F" },
    { name: "Public Method", shape: "square", color: "#CBC3E3" },
    { name: "Protected Method", shape: "square", color: "#F88379" },
    { name: "Default Method", shape: "square", color: "#F28C28" },
    { name: "Variable", shape: "square", color: "#6495ED" },
  ];

  const threadOptions = [
    { name: "Thread", shape: "squre", color: "#686868"},
  ];

  return (
    <div class="legend-div bg-dark">
    <div>
      Shapes
      {shapeOptions.map((option) => (
        <div key={option.shape}>
          <span
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              backgroundColor: option.color,
              marginRight: "4px",
              borderRadius: option.shape === "circle" ? "50%" : "",
              border: `2px solid ${option.color}`,
            }}
          ></span>
          {option.name}
        </div>
      ))}
    
    </div>
    <div>
    <div>
      Colors
      {colorOptions.map((option) => (
        <div key={option.shape}>
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "5px",
              backgroundColor: option.color,
              marginRight: "4px",
              borderRadius: option.shape === "circle" ? "50%" : "",
              border: `2px solid ${option.color}`,
            }}
          ></span>
          {option.name}
        </div>
      ))}
    </div>
    </div>
    <div>
      Outline
      {threadOptions.map((option) => (
        <div key={option.shape}>
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "5px",
              backgroundColor: option.color,
              marginRight: "4px",
              borderRadius: option.shape === "circle" ? "50%" : "",
              border: `2px solid ${option.color}`,
            }}
          ></span>
          {option.name}
        </div>
      ))}
    </div>
    </div>
  );
};

function Dependency(nodesInfoJSON) { 
  const nodesInfo = nodesInfoJSON["nodesInfo"];
  const [heightStr, setHeightStr] = useState('100%');

  useEffect(() => {
    setHeightStr("500")
  }, []);

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

  
  const colors = ["#AFE1AF", "#FFFF8F", "#CBC3E3", "#F88379", "#F28C28", "#6495ED"];
  const colorsForTypes = {};
  for (let i = 0; i < primaryTypes.length; i++) {
    colorsForTypes[primaryTypes[i]] = colors[i];
  }

  const createGraphEdges = (jsonKey) => {
    const edges = [];
    for (let key in nodesInfo) {
      let array = JSON.parse(nodesInfo[key][jsonKey]);
      let k = parseInt(key);
      for (let i = 0; i < noNodes; i++) {
        if (array[i] === 1) {
          edges.push({
            to: i + 1,
            from: k + 1,
          });
        }
      }
    }
    return edges
  } 

  const graphEdges = createGraphEdges("depArray");
  //for top level graph which does not display variables, the trans dep wrt to variables must be taken
  const graphEdgesTopLevel = createGraphEdges("transDepWrtVariablesArray"); 
  
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
      label: item["displayName"],
      // value: 10,
      title: item["name"],
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

  const hideNode = (item) => {
    if(item["primaryType"] === "variable"){
      return true
    }
    else{
      return false
    }
  }

  //for top level graph, hide the variable nodes
  const graphNodesTopLevel = Object.entries(nodesInfo).map(([key, item]) => {
    let k = parseInt(key);
    let node = graphNodes[k];
    // node["hidden"]=hideNode(item);
    let hidden = {"hidden": hideNode(item)};
    return {
      ...node,
      ...hidden
    };
  });

  const graph = {
    nodes: graphNodes,
    edges: graphEdges,
  };

  const graphTopLevel = {
    nodes: graphNodesTopLevel,
    edges: graphEdgesTopLevel,
  }

  const options = {
    layout: {
      hierarchical: {
        direction: 'UD',
        sortMethod: 'directed',
        // levelSeparation: 150,
        // nodeSpacing: 500,
        avoidOverlap: true,
      },
    },
    edges: {
      color: 'white',
    },
    height: heightStr,
    width: '100%',
    // autoResize: true,
    interaction:{
      hover:true,
      zoomSpeed: 0.4,
      tooltipDelay: 100,
    }
  };

  const events = {
    selectNode: function(event) {
      let id = event.nodes[0]
      let key = parseInt(id)-1
      // console.log(graph.nodes[key])
    },
  };

  return (
    <div id="graph-container" className="rounded-4">
      <Tabs defaultActiveKey="graphComplete" className="text-light">
        <Tab eventKey="graphComplete" title="Complete Graph">
          <div className="graph-legend">
            {
              (nodesInfo !== null)
                ?
                <>
                  <Graph
                    graph={graph}
                    options={options}
                    className="graph-div"
                    events={events}
                  />
                  <Legend className="legend-container"/>
                </>
                :
                <p className="p-3">Please upload input code to view dependency graph</p>
            }
          </div>
        </Tab>
        <Tab eventKey="graphTopLevel" title="Top Level Graph">
          <div className="graph-legend">
            {
              (nodesInfo !== null)
                ?
                <>
                  <Graph
                    graph={graphTopLevel}
                    options={options}
                    className="graph-div"
                    events={events}
                  />
                  <Legend className="legend-container rounded-4"/>
                </>
                :
                <p className="p-3">Please upload input code to view dependency graph</p>
            }
          </div>
        </Tab>
      </Tabs>
    </div>
  );
  
}
  
export default Dependency;