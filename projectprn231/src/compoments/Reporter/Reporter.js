import React, { Component } from "react";
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//abc
export class Reporter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Title: '',
            ErrorTitle: '',
            Description: '',
            ErrorDescription: '', 
            Content: '',
            ErrorContent: '',
            CreateBy: '',
            OrderBy: '',
            CreateDate: '',
            IsChecked: 0, 
            FileName: null
        }
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

    createAssignTask() {
        this.SubmitFile();
    }
 
    render() {
        const { Title, Description, Content, CreateDate, IsChecked } = this.state;

        console.log(CreateDate);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <section className="panel tasks-widget">
                            <header className="panel-heading">
                                <h2>Add ReportTask</h2>
                            </header>
                        </section>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="control-label">Title:</label>
                                <input name="Title" className="form-control" value={Title} onChange={(e) => this.onChangeTitleName(e)} />
                                {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                            </div>
                            <div className="form-group">
                                <label className="control-label">Topic Description:</label>
                                <div className="App">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={Content}
                                        onReady={editor => {
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ Content: data })
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Content:</label>
                                <div className="App">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={Description}
                                        onReady={editor => {
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ Description: data })
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="control-label">CreateBy:</label>
                                <input name="Title" className="form-control" value={Title} onChange={(e) => this.onChangeTitleName(e)} />
                                {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                            </div>
                            <div className="form-group">
                                 <label className="control-label">CreateDate:</label>
                                 <input type="datetime-local" className="form-control" value={CreateDate} onChange={(e) => this.setState({CreateDate: e.target.value})}/>
                            </div>
                            <div>
                                <label className="control-lable">Import File: </label>
                                <input className="form-control" type="file" onChange={(e) => this.handleFile(e)}></input>
                            </div><br/>
                            <div className="form-group">
                                <label className="control-label">IsChecked:</label>
                                {console.log(IsChecked)}
                                {IsChecked == 1 ? < ><input type="radio" checked/>Pass <input type="radio"/>Not Pass</> : < ><input type="radio"/>Pass <input type="radio" checked/>Not Pass</> }
                            </div> <br/>
                            <button type="button" className="btn btn-info" onClick={() => this.createAssignTask()}>Add Assign</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}