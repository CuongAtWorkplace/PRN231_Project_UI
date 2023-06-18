import React, { Component } from "react";
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
//import './Writer.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class ViewDetailWritingProcess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: 0,
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
                this.setState({ WritingTaskById: data, Id: data.id, TopicName: data.title, Description: data.description, NewsDetail: data.content, Comment: data.comment, CreateBy: data.createBy, CreateDate: data.createDate, ImageCover: data.image, IsChecked: data.isChecked });
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

    FeedBackTask() {
        if (this.state.Comment == '') {
            toast.error("Comment is not empty");
            return;
        } else {
            if (window.confirm("Do you want to give feedback?")) {
                fetch("https://localhost:7248/api/WritingTask/FeedBackTask", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.state.Id,
                        comment: this.state.Comment
                    })
                })
                    .then(res => res.json())
                    .then((result) => {
                        toast.success("FeedBack successfull. Congratulation!!!")
                        this.refreshList();
                    }, (error) => {
                        toast.error("Give FeedBack failed. Try Again!!!")
                    })
            }
        }
    }

    AcceptTask() {
        if (window.confirm("Do you want to accept?")) {


            fetch("https://localhost:7248/api/WritingTask/AcceptToPublic?Id=" + this.state.Id, {
                method: 'Put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then((result) => {
                    toast.success("Accept Task successfull. Congratulation!!!")
                    this.refreshList();
                }, (error) => {
                    toast.error("Accept task failed. Try Again!!!")
                })
        }
    }

    handleReturn = () => {
        this.props.history.goBack();
    }

    render() {
        const { TopicName, ErrorTopicName, NewsDetail, Comment, Description, ErrorDescription,
            AssignTaskRequire, DescriptionTask, LeaderName, ReporterName, GenreName, ImageCover, CreateDate, CreateBy, PhotoFileName, PhotoPath,
            ReportTaskById, DescriptionReporter, ContentReporter, DocumentList, WritingTaskById, IsChecked } = this.state;

        console.log(WritingTaskById);
        console.log(PhotoFileName)
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
                                    <input name="ProductPrice" value={TopicName} class="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">News Description:</label>
                                    <input name="ProductPrice" value={Description} class="form-control" />
                                </div>

                                <div className="form-group">
                                    <label class="control-label">News Detail: </label>
                                    <div className="App">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={NewsDetail}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label">Image Cover: </label>
                                    {ImageCover != '' ? <div style={{ border: '1px solid black', width: 120, height: 130, backgroundImage: 'url(https://localhost:7248/Photos/' + ImageCover + ')' }} ></div> : null}
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
                                            data={Comment == null ? "" : Comment}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ Comment: data })
                                            }}
                                        />
                                    </div>
                                </div> <br />
                                {
                                    IsChecked == true ? <p style={{ color: 'green' }}><b>Status: Accepted</b></p> : <><button type="button" className="btn btn-info" onClick={() => this.AcceptTask()}>Accept Writing Task</button>
                                        <button type="button" className="btn btn-danger" onClick={() => this.FeedBackTask()}>FeedBack Task</button>
                                        <button type="button" className="btn btn-success" onClick={() => this.handleReturn()}>Return Page</button></>
                                }

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
export default withRouter(ViewDetailWritingProcess)