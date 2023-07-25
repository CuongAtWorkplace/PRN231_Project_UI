import React, { Component } from "react";
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
//import './Writer.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class ViewDetailReportProcess extends Component {

    constructor(props) {
        super(props);

        this.state = {
            AssignTaskRequire: {},
            Id: 0,
            Title: '',
            Description: '',
            Content: '',
            CreateBy: '',
            CreateDate: '',
            FileName: null,
            DocumentList: [],
            ImageCover: '',
            PhotoFileName: '',
            PhotoPath: 'https://localhost:7248/Photos/',
            IsChecked: false,


            GenreName: '', 
            LeaderName: '', 
            WriterName: '', 
            DescriptionTask: ''

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
                this.setState({ AssignTaskRequire: data, DescriptionTask: data.description, LeaderName: data.leader.fullName, WriterName: data.writer.fullName, GenreName: data.genre.genreName});//ImageCover: data.ImageCover
            });
        fetch("https://localhost:7248/api/ReportTask/GetReportTaskByTaskId?taskId=" + id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ReportTaskById: data, Title: data.title , Description: data.description, Content: data.content, CreateDate: data.createDate, CreateBy: data.createBy, Id: data.id, IsChecked: data.isChecked, ImageCover: data.image });
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

    FeedBackTask() {
        
    }

    AcceptTask() {
        //alert(this.state.Id)
        const jwt = localStorage.getItem('token');
        if (window.confirm("Do you want to accept?")) {

            fetch("https://localhost:7248/api/ReportTask/AcceptTask?Id=" + this.state.Id, {
                method: 'Put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${jwt}`
                },
            })
                .then(res => res.json())
                .then((result) => {
                    toast.success("Accept Task successfull. Congratulation!!!")
                    this.refreshList();
                    window.location.href="/manager/viewReportProcess"
                }, (error) => {
                    toast.error("Accept task failed. Try Again!!!")
                })
        }
    }

    handleReturn = () => {
        this.props.history.goBack();
    }

    render() {

        const { AssignTaskRequire,Title, Description, Content, ImageCover, CreateBy, CreateDate, 
            IsChecked, GenreName, LeaderName, WriterName, DescriptionTask, DocumentList} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <section className="panel tasks-widget">
                            <header className="panel-heading">
                                <h2>WriteDetail</h2>
                            </header>
                        </section>
                        <div className="panel-body">
                            <form>
                                <div style={{ border: '2px solid black', backgroundColor: 'white', borderRadius: '15px', padding: '5px', marginBottom: '15px' }} className="shadow">
                                    <h4>RequireTask Writing</h4>
                                    <p><b>Title:</b> {AssignTaskRequire.title}</p>
                                    <p><b>Description:</b> {parse(DescriptionTask)}</p>
                                    <p><b>Genre: </b> {GenreName}</p>
                                    <p><b>Assgin by: </b>{LeaderName}</p>
                                    <p><b>Reporter: </b>{WriterName}</p>
                                    <p><b>Start Date:</b> {AssignTaskRequire.startDate}</p>
                                    <p style={{ color: 'red' }}><b>End Date:</b> {AssignTaskRequire.endDate}</p>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Title:</label>
                                    <input nameName="ProductPrice" value={Title} className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Description:</label>
                                    <input nameName="ProductPrice" value={Description} className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Content: </label>
                                   
                                        <div className="App">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={Content != null ? Content : ""}
                                            />
                                        </div>
                                    
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Image Cover: </label>
                                    {ImageCover != '' ? <div style={{ border: '1px solid black', width: 120, height: 130, backgroundImage: 'url(https://localhost:7248/Photos/'+ImageCover+')' }} ></div> : null}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">CreateDate:</label>
                                    <input value={CreateDate} className="form-control" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">CreateBy:</label>
                                    <input value={CreateBy} className="form-control" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Source:</label>
                                    {
                                        DocumentList.map(it => <a href="" onClick={() => this.DownLoadFile(it)}>{it.fileName}</a>)
                                    }
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
                                    IsChecked == true ? <p style={{ color: 'green' }}><b>Status: Accepted</b></p> : <><button type="button" className="btn btn-info" onClick={() => this.AcceptTask()}>Accept Reporting Task</button>
                                        <button type="button" className="btn btn-danger" onClick={() => this.FeedBackTask()}>FeedBack Task</button>
                                        <button type="button" className="btn btn-success" onClick={() => this.handleReturn()}>Return Page</button></>
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ViewDetailReportProcess)