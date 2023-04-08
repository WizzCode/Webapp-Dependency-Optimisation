import React, { Component } from 'react';
import axios from "axios";
import  { useState } from 'react';
import { Context } from './ContextFile';

class FileUploadButton extends Component {

    static contextType = Context;

    // API Endpoints
    custom_file_upload_url = `http://127.0.0.1:8080/api/optimisation`;
    
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileText: null,
        }
    }

   
    handleFile = (e) => {
        let files = e.target.files[0];

        this.setState({
            file: files,
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
   
    handleSubmitFile = () => {
        

        if (this.state.file !== null){
            let formData = new FormData();
            formData.append('codeInput', this.state.file);

            let promiseObj = this.resolveTextFromFile(this.state.file);
            promiseObj.then((value) => {
                this.setState({
                    fileText:value,
                });
            })
            
            axios.post(
                this.custom_file_upload_url,
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
                this.context.setOptimisationResponse(result);
            })
            .catch(err => {
                console.log(err);
            })
        }
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
                
            </div>
        );
    }
}

export default FileUploadButton;