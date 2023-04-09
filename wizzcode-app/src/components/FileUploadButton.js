import React, { Component } from 'react';
import axios from "axios";
import {useState} from 'react';
import { Context } from './ContextFile';
import { Modal, Button } from 'react-bootstrap';
class FileUploadButton extends Component {

    static contextType = Context;

    // API Endpoints
    base_url = `http://127.0.0.1:8080/api/`;
    
    //constructor(props) {
        //super(props);
        //this.state = {
            //file: null,
           //fileText: null,
        
    
    state = {
        file: null,
        fileText: null,
        success: false, // define success as a class property
        showModal: false,
        request_url: this.base_url,
    }
        

    handleFile = (e) => {
        
        
        let files = e.target.files[0];

        this.setState({
            file: files,
            success: false,
        })
        
    }

    resolveTextFromFile = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            let data;
            reader.readAsText(file);
            reader.onloadend = function () {
                data = reader.result;
                resolve(data);
            };
        });
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
    handleSubmitFile = () => {
        
        if (this.state.file === null) {
            this.setState({
                showModal: true,
                success: false
            });
            return;
        }

        let formData = new FormData();
        formData.append('codeInput', this.state.file);

        let promiseObj = this.resolveTextFromFile(this.state.file);
        promiseObj.then((value) => {
            this.setState({
                fileText:value,
            });
        })

        let newUrl;
        if(this.props.performFunction==="findDependency"){
            newUrl = this.base_url + "dependency";
        }
        else if(this.props.performFunction==="optimise"){
            newUrl = this.base_url + "optimisation";
        }

        this.setState({
                request_url: newUrl,
            },
            () => {
                axios.post(
                    // this.custom_file_upload_url,
                    this.state.request_url,
                    formData,
                    {
                        headers: {
                            "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                            "Content-type": "multipart/form-data",
                        },
                    }
                )
                .then(res => {
                    console.log(`Success` + res.data);
                    const result = JSON.parse(JSON.stringify(res.data));
                    this.context.setInputFileText(this.state.fileText);
                    if (this.props.performFunction === "findDependency") {

                    }
                    else if (this.props.performFunction === "optimise") {
                        this.context.setOptimisationResponse(result);
                    }
                    this.setState({
                        success: true,
                        showModal: true,
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        showModal: true,
                    });
                })
            }
        );            
        
        }
    

    
    // render from here
    render() { 
        return (
            <div>
            
                {/*input field */}
                <input class="choosefile"
                    type="file"
                    onChange={this.handleFile}
                />
                {/* <label>Upload file</label> */}
                <input class="uploadbutton" type="submit" onClick={this.handleSubmitFile} value="Upload"/>
                {this.state.success ? <p style={{ color: "blue" }}>File uploaded successfully!</p> : null}
                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    {this.state.success ? <Modal.Title style={{ color: "black" }}>Success!</Modal.Title> : <Modal.Title style={{ color: "black" }}>Error!</Modal.Title>}
                </Modal.Header>
                <Modal.Body style={{ color: "black" }}>
                    {this.state.success ? <p>Your file has been uploaded successfully.</p> : <p>{this.state.file === null ? 'Please select a file to upload.' : 'There was an error uploading your file. Please try again later.'}</p>}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
           </Modal>

            </div>
        );
    }
}
export default FileUploadButton;