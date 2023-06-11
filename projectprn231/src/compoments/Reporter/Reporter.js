import React, { Component, useEffect } from "react";
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PacmanLoader from "react-spinners/PacmanLoader";
import { Navigate} from 'react-router-dom';
import "../../../src/App.css"
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";

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
            FileName: null,
            ListDoc: [], 
            loading: true
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/Document/GetAllDocumentByTaskId?TaskId=13")
            .then(response => response.json())
            .then(data => {
                this.setState({ ListDoc: data });
            });
    }

    componentDidMount() {
        this.refreshList();
        setTimeout(() => {
            this.setState({ loading: false });
          }, 5000);
    }

    handleFile(event) {
        this.setState({
            FileName: event.target.files[0]
        })
        console.log(this.state.FileName);
    }

    onChangeTitleName = (e) => {
        this.setState({
            Title: e.target.value
        })
    }

    createReportTask() {
        this.setState({
            loading: true
        })
        fetch("https://localhost:7248/api/ReportTask/InsertReportTask", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.Title,
                description: this.state.Description,
                content: this.state.Content,
                "image": null,
                createBy: "Ho Ngoc Ha",
                createDate: "2023-06-08T18:26:45.494Z",
                updateBy: "string",
                updateDate: "2023-06-08T18:26:45.494Z",
                isChecked: false,
                userId: 6,
                taskId: 13, 
                isRedirect:false
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.refreshList();
                this.state.loading &&
                toast.success("Insert Successfull. Congratulation!!!")
            }, (error) => {
                toast.error("Insert failed. Try Again!!!");
            })
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
                setTimeout(() => {
                    this.setState({ loading: false });
                  }, 5000);
                {this.state.loading && toast.success("Import Successfull. Congratulation!!!")}
            }, (error) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                  }, 5000);
                  {this.state.loading && toast.error("Import failed. Try Again!!!");}
            })
    }

    DownLoadFile(e) {
        fetch("https://localhost:7248/api/ReportTask/DownLoadFile?id=" + e.id, {
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

    createAssignTask() {
        this.SubmitFile();
    }

    GotoHome() {
        this.setState({
            isRedirect: true
        })

        if (this.state.isRedirect) {
            this.setState({
                isRedirect: false
            })
            return <Navigate to="/home"/>
        }
    }

    render() {
        const { Title, Description, Content, CreateDate, IsChecked, ListDoc, loading } = this.state;

        console.log(CreateDate);
        return (
            <div className="container">
                {loading == true ? 
                <div className="center" style={{textAlign: "center", display: "flex", alignItems:"center", height: "100vh"}}>
                    <PacmanLoader
                color={"#36d7b7"}
                loading={loading}
                size={90}
                
                />
                </div>
                 :
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
                                <input name="Title" className="form-control"/>
                                {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                            </div>
                            <div className="form-group">
                                <label className="control-label">CreateDate:</label>
                                <input type="datetime-local" className="form-control" value={CreateDate} onChange={(e) => this.setState({ CreateDate: e.target.value })} />
                            </div>
                            <div>
                                <label className="control-lable">Import File: </label>
                                <input className="form-control" type="file" onChange={(e) => this.handleFile(e)}></input>
                            </div><br />
                            <div>
                                {ListDoc.map(doc =>
                                    <a href="" onClick={() => this.DownLoadFile(doc)}>{doc.fileName}</a>)}
                            </div> <br />
                            <div className="form-group">
                                <label className="control-label">IsChecked:</label>
                                {console.log(IsChecked)}
                                {IsChecked == 1 ? < ><input type="radio" checked />Pass <input type="radio" />Not Pass</> : < ><input type="radio" />Pass <input type="radio" checked />Not Pass</>}
                            </div> <br />
                            <button type="button" className="btn btn-info" onClick={() => this.createReportTask()}>Add Assign</button>
                            <button type="button" className="btn btn-success" onClick={() => this.GotoHome()}>Home</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}