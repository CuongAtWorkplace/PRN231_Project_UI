import React, { Component, useEffect } from "react";
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import Image from '@ckeditor/ckeditor5-image/src/image';
//import CKEditor from '../TestFile/CustomCKeditor';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from '../../EditorToolbar'
import "react-quill/dist/quill.snow.css";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import './Writer.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class Writer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TopicName: '',
            ErrorTopicName: null,
            Description: '',
            ErrorDescription: null,
            NewsDetail: '',
            ErrorNewsDetail: null,
            ImageCover: '',
            CreateDate: '',
            TaskId: 0,
            Comment: '',
            CreateBy: '',
            CreateDate: '',
            PhotoFileName: '',
            PhotoPath: 'https://localhost:7248/Photos/',
            IsChecked: false,
            Id: 0,

            AssignTaskRequire: {},
            DescriptionTask: '',
            LeaderName: '',
            ReporterName: '',
            GenreName: '',
            ReportTaskById: {},
            DocumentList: [],
            WritingTaskById: {},
            DescriptionReporter: '',
            ContentReporter: ''
        }
    }

    refreshList() {
        const { id } = this.props.match.params;
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/AssignTask/GetAssignTaskById?Id=" + id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ AssignTaskRequire: data, DescriptionTask: data.description, LeaderName: data.leader.fullName, ReporterName: data.reporter.fullName, GenreName: data.genre.genreName, ImageCover: data.ImageCover });
            });
        fetch("https://localhost:7248/api/ReportTask/GetReportTaskByTaskId?taskId=" + id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ReportTaskById: data, DescriptionReporter: data.description, ContentReporter: data.content });
            });

        fetch("https://localhost:7248/api/WritingTask/GetWritingTaskByTaskId?taskId=" + id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ WritingTaskById: data, Id: data.id, TopicName: data.title, Description: data.description, NewsDetail: data.content, Comment: data.comment, CreateBy: data.createBy, CreateDate: data.createDate, ImageCover: data.image, IsChecked: data.isChecked });
            });

        fetch("https://localhost:7248/api/Document/GetAllDocumentByTaskId?TaskId=" + id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ DocumentList: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    useEffect() {

    }

    onChangeTopicName = (e) => {
        if (e.target.value == '') {
            this.setState({ ErrorTopicName: 'Topic Name is not empty' });
        } else if (e.target.value.length < 5 || e.target.value.length > 50) {
            this.setState({ ErrorTopicName: 'Topic Name is between 5 to 50' });
        } else {
            this.setState({ ErrorTopicName: null });
        }
        this.setState({ TopicName: e.target.value })
    }

    onChangeCommnet = (e) => {
        this.setState({ Comment: e.target.value });
    }

    onChangeDescription = (e) => {
        if (e.target.value == '') {
            this.setState({ ErrorDescription: 'Description is not empty' });
        } else if (e.target.value.length < 5 || e.target.value.length > 50) {
            this.setState({ ErrorDescription: 'Description is between 5 to 2000' });
        } else {
            this.setState({ ErrorDescription: null });
        }
        this.setState({ Description: e.target.value })
    }


    UpdateWritingTask() {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/WritingTask/UpdateWritingTask", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                id: this.state.Id,
                title: this.state.TopicName,
                description: this.state.Description,
                content: this.state.NewsDetail,
                image: this.state.PhotoFileName,
                comment: this.state.Comment,
                isChecked: false,
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.refreshList();
                toast.success("Insert Successfull. Congratulation!!!")
            }, (error) => {
                toast.error("Insert failed. Try Again!!!");
            })
    }

    handleReturn = () => {
        this.props.history.goBack();
    }

    DownLoadFile(e) {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/ReportTask/DownLoadFile?id=" + e.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${jwt}`
            },
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

    imageUpload = (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('token');

        this.setState({
            ImageCover: e.target.files[0].name
        })
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch('https://localhost:7248/api/WritingTask/SaveFile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${jwt}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoFileName: data });
            })
    }

    handleEditorChange = (content, delta, source, editor) => {
        this.setState({ NewsDetail: content });
        console.log(this.state.NewsDetail);
    }

    render() {
        const { TopicName, ErrorTopicName, NewsDetail, Comment, Description, ErrorDescription,
            AssignTaskRequire, DescriptionTask, LeaderName, ReporterName, GenreName, ImageCover, CreateDate, CreateBy, PhotoFileName, PhotoPath,
            ReportTaskById, DescriptionReporter, ContentReporter, DocumentList, WritingTaskById, IsChecked } = this.state;

        //console.log(WritingTaskById);
        //console.log(PhotoFileName)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <section className="panel tasks-widget">
                            <header className="panel-heading">
                                <h2>WriteDetail</h2>
                            </header>
                        </section>
                        <div class="panel-body">
                            <form>
                                <div style={{ border: '2px solid black', backgroundColor: 'white', borderRadius: '15px', padding: '5px', marginBottom: '15px' }} className="shadow">
                                    <h4>RequireTask Writing</h4>
                                    <p><b>Title:</b> {AssignTaskRequire.title}</p>
                                    <p><b>Description:</b> {parse(DescriptionTask)}</p>
                                    <p><b>Genre: </b> {GenreName}</p>
                                    <p><b>Assgin by: </b>{LeaderName}</p>
                                    <p><b>Reporter: </b>{ReporterName}</p>
                                    <p><b>Start Date:</b> {AssignTaskRequire.startDate}</p>
                                    <p style={{ color: 'red' }}><b>End Date:</b> {AssignTaskRequire.endDate}</p>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">News Name:</label>
                                    <input name="ProductPrice" value={TopicName} class="form-control" onChange={(e) => this.onChangeTopicName(e)} />
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>

                                <div className="form-group">
                                    <label className="control-label">News Description:</label>
                                    <input name="ProductPrice" value={Description} class="form-control" onChange={(e) => this.onChangeDescription(e)} />
                                    {ErrorDescription == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorDescription}</p>}
                                </div>

                                <div className="form-group">
                                    <label class="control-label">News Detail: </label>
                                    <div >
                                        <EditorToolbar toolbarId={'t1'} />
                                        <ReactQuill
                                            theme="snow"
                                            value={NewsDetail == null ? "" : NewsDetail}
                                            onChange={this.handleEditorChange}
                                            placeholder={"Write something awesome..."}
                                            modules={modules('t1')}
                                            formats={formats}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label">Image Cover: </label>
                                    <input type="file" value={PhotoFileName} className="form-control" onChange={(e) => this.imageUpload(e)} /><br />
                                    {PhotoFileName != '' ? <div style={{ border: '1px solid black', width: 120, height: 130, backgroundImage: 'url(https://localhost:7248/Photos/' + PhotoFileName + ')' }} ><img src="" /></div> : null}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">CreateDate:</label>
                                    <input value={CreateDate} class="form-control" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">CreateBy:</label>
                                    <input value={CreateBy} class="form-control" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Comment:</label>
                                    <div className="App">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={Comment}
                                            onReady={editor => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ Comment: data })
                                            }}
                                        />
                                    </div>
                                </div> <br />
                                {IsChecked == false ? <>
                                    <button type="button" className="btn btn-info" onClick={() => this.UpdateWritingTask()}>Add Assign</button>
                                    <button type="button" className="btn btn-success" onClick={() => this.handleReturn()}>Return Page</button>
                                </> : <p style={{ color: 'green' }}><b>Status: Accepted</b></p>}


                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <section className="panel tasks-widget">
                            <header className="panel-heading" style={{ marginTop: 40 }}>
                                <h2></h2>
                            </header>
                        </section>
                        <div style={{ border: '2px solid black', backgroundColor: 'white', borderRadius: '15px', padding: '5px', marginBottom: '15px' }} className="shadow">
                            <h4>ReportTask From {ReporterName}</h4>
                            {ReportTaskById.isChecked &&
                                <>
                                    <p><b>Title: </b>{ReportTaskById.title}</p>
                                    <p><b>Description: </b>{parse(DescriptionReporter)}</p>
                                    <p><b>Content: </b>{parse(ContentReporter)}</p>
                                    <p><b>Source: </b>{DocumentList != [] && DocumentList.map(it => <a href="#" onClick={() => this.DownLoadFile(it)}>{it.fileName}</a>)}</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Writer)