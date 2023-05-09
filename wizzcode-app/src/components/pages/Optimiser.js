import React from "react";
import { useState, useEffect, useContext } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyToClipboard from 'react-copy-to-clipboard';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import FileUploadButton from "../FileUploadButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import OptimiserInfo from "./OptimiserInfo";
import './Optimiser.css'

import { Context } from '../ContextFile';

function Optimiser() {
  // const [text, setText] = useState('import com.wizzcode.server; \n\n@SpringBootApplication \nclass Application{ \npublic static void main(String args[]){');
  const defaultLanguage = 'java'
  const defaultTheme = 'agate'
  const [theme, setTheme] = useState(defaultTheme)
  const [optimisations, setOptimisations] = useState(null);
  const [codeToDisplay, setCodeToDisplay] = useState("");
  const { optimisationResponse, optimisationInputText } = useContext(Context);

  let myMap = new Map();
  myMap.set("string_concat_loop", "Avoid string concatenation in loop");
  myMap.set("method_call_loop", "Avoid method calls inside loops");
  myMap.set("empty_if", "Avoid if statements with no body");
  myMap.set("boolean_if_compare", "Avoid using '==' operator while comparing boolean variable");
  myMap.set("primitive_constructor", "Avoid initializing primitive variables in constructorr");
  myMap.set("synch_loop", "Avoid using synchronized statements inside loops");
  myMap.set("string_token", "Avoid using string tokenizer method");
  myMap.set("new_string", "Avoid initializing string with new Keyword.");
  myMap.set("charAt", "Avoid using charAt method with strings");
  myMap.set("cascading_if", "Avoid multiple cascading if-else statements");
  
  useEffect(() => {
    console.log(`Opt Resp updated`);
    setOptimisations(optimisationResponse);
    setCodeToDisplay(optimisationInputText);
  }, [optimisationResponse]);

  const accordionItem = (key, item) => {
    return(
      <>
        <Accordion.Item eventKey={key}>
          <Accordion.Header>{item.lineNo}</Accordion.Header>
          <Accordion.Body>
            <p>{myMap.get(item.justificationKey)}</p>
            <p>{item.snippet}</p>
          </Accordion.Body>
        </Accordion.Item>
      </>
    )
  };

  return (
    <div>
      <div className="general-container">
        <div className="upload-file">
          <FileUploadButton performFunction="optimise"/>
        </div>
        <div className="optimiser-info">
          <OptimiserInfo />
        </div>
      </div>
    <Row className="main-container">
      <Col md={6}>
        <div className="optimisation-list-container rounded-4">
          <Accordion className="accordion">
            {
              (optimisations !== null) 
              ?
              <>
                {
                  Object.entries(optimisations).map(([key, item]) => {
                    return(
                    accordionItem(key, item)
                    );
                  })
                }
              </> 
              :
              <p className="p-3">No Optimisations to display!</p>
            }
          </Accordion>
        </div>
      </Col>

      <Col md={6}>
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
      </Col>
    </Row>
    </div>
  );
}

export default Optimiser;