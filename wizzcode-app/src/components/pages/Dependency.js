import React from "react";
import { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
//import { Digraph } from 'react-digraph';
import Graph from 'react-graph-vis';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
function Dependency() { 
  const names = ["a","b","c"];
  const links = [[true,false,true],
  [false, false, true],
  [true,false,false]];
  const nodesGraph =[];
  const edgesGraph =[];
  for (let i = 0; i<names.length; i++) {
    nodesGraph.push({id: i, label: `${names[i]}`}); // id is just the integer which will be used to
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