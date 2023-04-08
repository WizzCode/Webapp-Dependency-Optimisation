import React from "react";
import { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
//import { Digraph } from 'react-digraph';
import Graph from 'react-graph-vis';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
function Dependency() { 
  const names = ["a","b","c","d","e","f"];
  const types = [1,2,1,1,3,7];
  const nodeTypes = {
    1: '#FF0000', // red
    2: '#00FF00', // green
    3: '#0000FF',
    4:'#FFFF00',
    5:'#800080',
    6:'#FFA500',
    7:'#FFC0CB',
    8: '#40E0D0',
    9: '#E6E6FA',
    10: '#FF00FF'// blue
    // blue
  };
  
  const links = [[true,false,true],
  [false, false, true],
  [true,false,false]];
  const nodesGraph =[];
  const edgesGraph =[];
  for (let i = 0; i<names.length; i++) {
    nodesGraph.push({id: i, label: `${names[i]}`, color: nodeTypes[types[i]]}); // id is just the integer which will be used to
    // identify the nodes and will not be displayed on the graph
  }
  for(let i=0;i<links.length;i++)
  {
  for(let j=0; j<links[i].length;j++)
  {
  if(links[i][j]==true)
  {
  edgesGraph.push({from: i, to: j});
  }
  }
  }

    const [graph, setGraph] = useState({
      nodes: nodesGraph,
      edges: edgesGraph
    });
  
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: 'white'
      }
     
    };
  
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
        console.log('Selected nodes:');
        console.log(nodes);
        console.log('Selected edges:');
        console.log(edges);
      }
    };
  
    return (
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: '400px' }}
      />
    );
  }
  
export default Dependency;