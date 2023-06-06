import React, { Component, useState } from "react";

import { toast } from 'react-toastify';

export class ImportFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FileName: null, 
            ListFile: []
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/ReportTask/getDocumentById?Id=3")
            .then(response => response.json())
            .then(data => {
                this.setState({ ListFile: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    handleFile(event) {
        this.setState({
            FileName: event.target.files[0]
        })
        console.log(this.state.FileName);
    }

    SubmitFile() {
        const formData = new FormData();
        formData.append('files', this.state.FileName);
        fetch("https://localhost:7248/api/ReportTask/UploadFile?TaskId=3", {
            method: 'POST',
            body: formData

        }).then(res => res.json())
        .then((result) => {
            this.refreshList();
            toast.success("Import Successfull. Congratulation!!!")  
        }, (error) => {
            toast.error("Import failed. Try Again!!!");
        })
    }

    DownLoadFile(e) {
        fetch("https://localhost:7248/api/ReportTask/DownLoadFile?id="+e.id, {
            method: 'POST',
        }).then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', e.fileName);
          document.body.appendChild(link);
          link.click();
        });
    }

    render() {
        const {ListFile} = this.state;
        console.log({ListFile})
        return (
            <div className="container">
                <div className="form-group">
                    <label className="control-lable">Import File: </label>
                    <input className="form-control" type="file" onChange={(e) => this.handleFile(e)}></input>
                    <button type="button" onClick={() => this.SubmitFile()}>Submit</button>
                </div>
                <div>
                    {ListFile.map(fi => 
                        <p key={fi.id} onClick={() =>this.DownLoadFile(fi)}>{fi.fileName}</p>
                    )}
                </div>
            </div>
        )
    }
}