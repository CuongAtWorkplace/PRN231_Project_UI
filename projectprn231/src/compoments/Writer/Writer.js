import React, { Component, useEffect } from "react";
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
            CreateBy:'', 
            CreateDate:'',

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
        fetch("https://localhost:7248/api/AssignTask/GetAssignTaskById?Id=" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ AssignTaskRequire: data, DescriptionTask: data.description, LeaderName: data.leader.fullName, ReporterName: data.reporter.fullName, GenreName: data.genre.genreName, ImageCover: data.ImageCover });
            });
        fetch("https://localhost:7248/api/ReportTask/GetReportTaskByTaskId?taskId=" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ ReportTaskById: data, DescriptionReporter: data.description, ContentReporter: data.content });
            });

        fetch("https://localhost:7248/api/WritingTask/GetWritingTaskByTaskId?taskId=" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ WritingTaskById: data, TopicName: data.title, Description: data.description, NewsDetail: data.content, Comment: data.comment, CreateBy: data.user.fullName, CreateDate: data.createDate });
            });

        fetch("https://localhost:7248/api/Document/GetAllDocumentByTaskId?TaskId=" + id)
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

    handleFile(event) {
        this.setState({
            ImageCover: event.target.files[0]
        })
        alert(this.state.ImageCover);
    }

    handleReturn = () => {
        this.props.history.goBack();
        //toast.success("Go Back Successfull!!!")
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

    render() {
        const { TopicName, ErrorTopicName, NewsDetail, Comment, Description, ErrorDescription, 
            AssignTaskRequire, DescriptionTask, LeaderName, ReporterName, GenreName, ImageCover, CreateDate, CreateBy,
            ReportTaskById, DescriptionReporter, ContentReporter, DocumentList } = this.state;

        console.log(AssignTaskRequire);
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
                                    <div className="App">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={NewsDetail}
                                            // onReady={editor => {
                                            //     console.log('Editor is ready to use!', editor);
                                            // }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ NewsDetail: data })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label">Image Cover: </label>
                                    <input class="form-control" value={ImageCover == null ? "": ImageCover} type="file" onClick={(e) => this.handleFile(e)}/><br/>
                                    {ImageCover != null ? <div style={{ border: '2px solid black', backgroundColor: 'white', borderRadius: '15px', padding: '5px', marginBottom: '15px', width: 120, height: 130 }} className="Shadow"></div> : null}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">CreateDate:</label>
                                    <input value={CreateDate} class="form-control" disabled/>
                                    {/* {ErrorDescription == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorDescription}</p>} */}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">CreateBy:</label>
                                    <input value={CreateBy} class="form-control" disabled/>
                                    {/* {ErrorDescription == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorDescription}</p>} */}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Comment:</label>
                                    {/* <input name="ProductPrice" value={Comment} class="form-control" onChange={(e) => this.onChangeCommnet(e)} /> */}
                                    <div className="App">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={Comment == null ? "": Comment}
                                            // onReady={editor => {
                                            //     console.log('Editor is ready to use!', editor);
                                            // }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ Comment: data })
                                            }}
                                        />
                                    </div>
                                </div> <br />

                                <button type="button" className="btn btn-info">Add Assign</button>
                                <button type="button" className="btn btn-success" onClick={() => this.handleReturn()}>Return Page</button>
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
                                    <p><b>Source: </b>{DocumentList != [] && DocumentList.map(it => <a href="" onClick={() => this.DownLoadFile(it)}>{it.fileName}</a>)}</p>
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