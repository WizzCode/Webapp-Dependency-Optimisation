import React from "react";
import { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
//import { Digraph } from 'react-digraph';
import Graph from 'react-graph-vis';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
function Dependency() { 
  
    const [graph, setGraph] = useState({
      nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
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