import React, { Component } from 'react';
import axios from "axios";

class FileUploadButton extends Component {

    // API Endpoints
    custom_file_upload_url = `http://localhost:8080/api/optimization`;
    
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }
    }

   
    handleFile = (e) => {
        let files = e.target.files[0];

        this.setState({
            file: files,
        })
    }

   
    handleSubmitFile = () => {

        if (this.state.file !== null){

            let formData = new FormData();
            formData.append('codeInput', this.state.file);
           

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
                <input
                    type="file"
                    onChange={this.handleFile}
                />
                <label>Upload file</label>
                <input type="submit" onClick={this.handleSubmitFile} value="Submit"/>
            </div>
        );
    }
}

export default FileUploadButton;