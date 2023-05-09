import React from "react";
import { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Dependency from "./Dependency";
import FileUploadButton from "../FileUploadButton";
import Accordion from 'react-bootstrap/Accordion';
import { Context } from '../ContextFile';
import SyntaxHighlighter from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyToClipboard from 'react-copy-to-clipboard';
import './Dependency.css'
import './Optimiser.css'
import './DependencyFinder.css'
function DependencyFinder(){
  const defaultLanguage = 'java'
  const defaultTheme = 'agate'
  const [theme, setTheme] = useState(defaultTheme)
  const [codeToDisplay, setCodeToDisplay] = useState("");
  const { dependencyResponse, dependencyInputText } = useContext(Context);
  const [nodesInfo, setNodesInfo] = useState(null);

  useEffect(() => {
    setCodeToDisplay(dependencyInputText);
    setNodesInfo(dependencyResponse);
  }, [dependencyResponse]);

    return (
        <div>
            <h4 className="text-center mt-5 mb-5">Dependency Graph</h4>
            <div id = "file-upload-div" className="d-flex justify-content-center">
              <FileUploadButton performFunction="findDependency"/>
            </div>

            <div >
              {
                (nodesInfo !== null && nodesInfo !== undefined)
                  ?
                  <>
                    <Dependency nodesInfo={nodesInfo}></Dependency>
                  </>
                  :
                  <></>
              }
            </div>

        <div className="code-container rounded-4">
          
          <div className="inner-code-container-1 inner-code-2">
            <select
              id="select-theme"
              defaultValue={defaultTheme}
              name="themes"
              onChange={(e) => setTheme(e.target.value)}
              className="form-select-sm bg-dark text-light div-buttons"
            >
              {Object.keys(themes).map((theme, i) => (
                <option key={i}>{theme}</option>
              ))}
            </select>
            
            <CopyToClipboard text={codeToDisplay} onCopy={() => alert("Copied")} className="copy-btn div-buttons">
              <Button variant="dark">Copy to clipboard</Button>
            </CopyToClipboard>
          </div>
          <SyntaxHighlighter 
            language={defaultLanguage} 
            style={themes[theme]} 
            showLineNumbers 
            showInlineLineNumbers 
            className="syntax-highlighter"
          >
            {codeToDisplay}
          </SyntaxHighlighter>
        </div>
        </div>
    );
}

export default DependencyFinder;