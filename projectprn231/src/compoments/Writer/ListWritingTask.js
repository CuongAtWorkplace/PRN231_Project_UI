import React, { Component } from "react";
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export class ListWritingTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AssignTask: [],
            Title: '',
            GenreName: '',
            Description: '',
            LeaderName: '',
            ReportName: '',
            modalTitle: '',
            UserId: 0,
            TaskId: 0,
            Reason: ''
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch("https://localhost:7248/api/AssignTask/GetAllAssignTaskByWriterId?writerId=5")
            .then(response => response.json())
            .then(data => {
                this.setState({ AssignTask: data });
            });
    }

    seeDetailTask(e) {
        this.setState({
            modalTitle: 'See Detail Task',
            TaskId: e.id,
            UserId: e.writer.id,
            WriterId: e.writer.id,
            LeaderName: e.leader.fullName,
            ReportName: e.reporter.fullName,
            Title: e.title,
            Description: e.description,
            GenreName: e.genre.genreName
        })
    }

    changeReasonReject = (e) => {
        this.setState({
            Reason: e.target.value
        })
    }

    acceptTask() {
        fetch("https://localhost:7248/api/WritingTask/InsertWritingTask", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isChecked: false,
                userId: this.state.UserId,
                taskId: this.state.TaskId
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.refreshList();

            }, (error) => {
            })

        fetch("https://localhost:7248/api/AssignTask/AcceptTask", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.TaskId,
                userStatus: 'Writer',
                isStatus: true
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.refreshList();
                toast.success("Reject Task Pending. Congratulation!!!")
            }, (error) => {
                toast.error("Reject failed. Try Again!!!");
            })
        //
        
    }

    rejectTask() {
        if (this.state.Reason == '') {
            toast.error("Reason is not empty");
            return;
        } else {
            fetch("https://localhost:7248/api/RejectTask/AddRejectTask", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rejectId: 1,
                    reason: this.state.Reason,
                    taskId: this.state.TaskId,
                    UserId: this.state.WriterId,
                    isReject: false,

                })
            })
                .then(res => res.json())
                .then((result) => {
                    this.refreshList();
                    toast.success("Reject Task Pending. Congratulation!!!")
                }, (error) => {
                    toast.error("Reject failed. Try Again!!!");
                })
        }
    }

    render() {
        const { AssignTask, TaskId, Reason, modalTitle, LeaderName, Title, Description, GenreName, ReportName } = this.state;
        console.log(AssignTask);
        return (
            <div className="container">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List Task Pending</h2>
                    </header>
                </section>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>
                                    Title
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    StartDate
                                </th>
                                <th>
                                    EndDate
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {AssignTask.map(ak =>
                                <tr key={ak.id}>
                                    <td>{ak.id}</td>
                                    <td>{ak.title}</td>
                                    <td>{parse(ak.description)}</td>
                                    <td>{ak.startDate}</td>
                                    <td>{ak.endDate}</td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.seeDetailTask(ak)}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3">

                                        <div className="p-2 bd-highlight" style={{ width: "100%" }}>

                                            <div className="form-group mb-3">
                                                <label className="control-label">Title:</label>
                                                <input name="Title" className="form-control" value={Title} />
                                            </div>

                                            <div className="form-group mb-3">
                                                <label className="control-label">Description:</label>
                                                <div className="App">
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={Description}
                                                    />
                                                </div>
                                            </div>

                                            <div className="input-group mb-3">
                                                <span className="input-group-text">GenreName</span>
                                                <input type="text" className="form-control"
                                                    value={GenreName} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Leader:</span>
                                                <input type="text" className="form-control"
                                                    value={LeaderName} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <span className="input-group-text">ReportName:</span>
                                                <input type="text" className="form-control"
                                                    value={ReportName} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Reason</span>
                                                <input type="text" className="form-control"
                                                    value={Reason}
                                                    onChange={(e) => this.changeReasonReject(e)} />
                                            </div>
                                        </div>
                                    </div>


                                    {TaskId != 0 ? <>
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.acceptTask()}
                                        >Accept</button>
                                        <button type="button"
                                            className="btn btn-danger float-start"
                                            onClick={() => this.rejectTask()}
                                        >Reject</button> </>
                                        : null}

                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}