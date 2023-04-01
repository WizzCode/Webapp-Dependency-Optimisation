import React from "react";
import { useState } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyToClipboard from 'react-copy-to-clipboard';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import './Optimiser.css'

function Optimiser() {
  const [text, setText] = useState('import com.wizzcode.server; \n\n@SpringBootApplication \nclass Application{ \npublic static void main(String args[]){');
  const defaultLanguage = 'java'
  const defaultTheme = 'agate'
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <Row className="main-container">
      <Col md={6}>
        <div className="optimisation-list-container rounded-4">
        </div>
      </Col>

      <Col md={6}>
        <div className="code-container rounded-4">
          <div className="inner-code-container-1">
            <select
              id="select-theme"
              defaultValue={defaultTheme}
              name="themes"
              onChange={(e) => setTheme(e.target.value)}
              className="form-select-sm bg-dark text-light"
            >
              {Object.keys(themes).map((theme, i) => (
                <option key={i}>{theme}</option>
              ))}
            </select>
            <CopyToClipboard text={text} onCopy={() => alert("Copied")} className="copy-btn">
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
            {text}
          </SyntaxHighlighter>
        </div>
      </Col>
    </Row>
  );
}

export default Optimiser;