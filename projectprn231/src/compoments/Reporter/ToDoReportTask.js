import React, { Component } from "react";
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../Writer/Writer.css';
import Pagination from 'react-js-pagination';


export class ToDoReportTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ToDoWritingTask: [],
            DocumentList: [],
            AssignTaskRequire: {},
            ErrorDescription: '',
            LeaderName: '',
            WriterName: '',
            GenreName: '',
            CreateBy: '',
            Id: '',
            TaskId: '',
            CreateDate: '',
            DescriptionTask: '',
            modalTitle: '',
            FileName: '',


            ReportTaskById: {},
            TopicName: '',
            ErrorTopicName: '',
            TodoDescription: '',
            Content: '',
            ImageCover: '',
            ReporterId: 0,
            UserId: 0,
            IsChecked: 0,

            activePage: 1,
            itemsCountPerPage: 5,
            totalItemsCount: 0
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/ReportTask/GetAllReportTask")
            .then(response => response.json())
            .then(data => {
                this.setState({ ToDoWritingTask: data, totalItemsCount: data.length });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
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

    handleFile(event) {
        this.setState({
            FileName: event.target.files[0]
        })
        console.log(this.state.FileName);
    }

    SubmitFile() {
        if (this.state.FileName == '') {
            return;
        }
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
                { this.state.loading && toast.success("Import Successfull. Congratulation!!!") }
            }, (error) => {
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 5000);
                { this.state.loading && toast.error("Import failed. Try Again!!!"); }
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


    editClick = (e) => {
        fetch("https://localhost:7248/api/AssignTask/GetAssignTaskById?Id=" + e.taskId)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    AssignTaskRequire: data, DescriptionTask: data.description,
                    LeaderName: data.leader.fullName, WriterName: data.writer.fullName,
                    GenreName: data.genre.genreName, CreateBy: data.writer.fullName, TaskId: data.taskId,
                    WriterId: data.userId, CreateDate: data.createDate, UserId: data.reporter.id
                });
            });

        fetch("https://localhost:7248/api/ReportTask/GetReportTaskByTaskId?taskId=" + e.taskId)
            .then(response => response.json())
            .then(data => {
                this.setState({ ReportTaskById: data, TopicName: data.title, TodoDescription: data.description, Content: data.content, ImageCover: data.image });
            });

        fetch("https://localhost:7248/api/Document/GetAllDocumentByTaskId?TaskId=" + e.taskId)
            .then(response => response.json())
            .then(data => {
                this.setState({ DocumentList: data });
            });

        this.setState({
            modalTitle: "ReportTask",
            Id: e.id
        })
    }

    CancelFile(e) {
        if (window.confirm("Do you want to delete?")) {
            fetch("https://localhost:7248/api/Document/DeleteDocument?id=" + e, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                // .then(res => res.json())
                .then((result) => {
                    this.refreshList();
                    toast.success("Delete successfull. Congratulation!!!")

                }, (error) => {
                    toast.error("Delete failed. Try Again!!!")
                })
        }
    }

    onAddAssign() {
        this.SubmitFile();
        fetch("https://localhost:7248/api/ReportTask/UpdateReportTask", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.Id,
                title: this.state.TopicName,
                description: this.state.TodoDescription,
                content: this.state.Content,
                image: "1.png",
                isChecked: false,
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


    render() {
        const { DocumentList, ToDoWritingTask, DescriptionTask, LeaderName, GenreName, AssignTaskRequire, WriterName, IsChecked,
            TopicName, ErrorTopicName, ImageCover, modalTitle, DescriptionWriting, ErrorDescription, Content,
            CreateDate, CreateBy, TodoDescription, activePage, itemsCountPerPage, totalItemsCount } = this.state;

        const indexOfLastCustomer = activePage * itemsCountPerPage;
        const indexOfFirstCustomer = indexOfLastCustomer - itemsCountPerPage;
        const currentCustomers = ToDoWritingTask.slice(indexOfFirstCustomer, indexOfLastCustomer);

        return (
            <div className="container">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List ToDoWritingTask</h2>
                    </header>
                </section>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    TaskName
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
                            {currentCustomers.map(gen =>
                                <tr key={gen.id}>
                                    <td>{gen.id}</td>
                                    <td>{gen.task.title}</td>
                                    <td>{gen.task.startDate}</td>
                                    <td>{gen.task.endDate}</td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.editClick(gen)}>
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

                    <Pagination
                        prevPageText='Previous'
                        nextPageText='Next'
                        firstPageText='First'
                        lastPageText='Last'
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='active'
                        disabledClass='disabled'
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" style={{ width: '90%' }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3">

                                        <div className="p-2 bd-highlight" style={{ width: "100%" }}>
                                            {/* <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6"> */}
                                            <div style={{ border: '2px solid black', backgroundColor: 'white', borderRadius: '15px', padding: '5px', marginBottom: '15px' }} className="shadow">
                                                <h4>Requirement by Leader</h4>
                                                <p><b>Title:</b> {AssignTaskRequire.title}</p>
                                                <p><b>Description:</b> {parse(DescriptionTask)}</p>
                                                <p><b>Genre: </b> {GenreName}</p>
                                                <p><b>Assgin by: </b>{LeaderName}</p>
                                                <p><b>Reporter: </b>{WriterName}</p>
                                                <p><b>Start Date:</b> {AssignTaskRequire.startDate}</p>
                                                <p style={{ color: 'red' }}><b>End Date:</b> {AssignTaskRequire.endDate}</p>
                                            </div>

                                            <div className="form-group mb-3">
                                                <label className="control-label">Title:</label>
                                                <input name="ProductPrice" value={TopicName} class="form-control" onChange={(e) => this.onChangeTopicName(e)} />
                                                {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                            </div>

                                            {/* <div className="form-group mb-3">
                                                <label className="control-label">Description:</label>
                                                <input name="ProductPrice" value={DescriptionWriting} class="form-control" onChange={(e) => this.onChangeDescription(e)} />
                                                {ErrorDescription == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorDescription}</p>}
                                            </div> */}

                                            <div className="form-group mb-3">
                                                <label class="control-label">Description: </label>
                                                <div className="App">
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={TodoDescription}
                                                        onReady={editor => {
                                                            console.log('Editor is ready to use!', editor);
                                                        }}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ TodoDescription: data })
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group mb-3">
                                                <label class="control-label">Content: </label>
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

                                            <div className="input-group mb-3">
                                                <div className="form-group">
                                                    <label className="control-label">Image Cover: </label>
                                                    <input type="file" className="form-control" onChange={(e) => this.setState({ ImageCover: e.target.value })} /><br />
                                                    {ImageCover != '' ? <div style={{ border: '1px solid black', width: 120, height: 130 }} ><img src="" /></div> : null}
                                                </div>
                                            </div>

                                            {/* <div className="form-group mb-3">
                                                <label className="control-label">CreateDate:</label>
                                                <input type="date" name="ProductPrice" value={CreateDate} class="form-control" onChange={(e) => this.setState({ CreateDate: e.target.value })} />
                                            </div> */}

                                            <div className="form-group mb-3">
                                                <label className="control-label">CreateBy:</label>
                                                <input name="ProductPrice" value={CreateBy} class="form-control" onChange={(e) => this.setState({ CreateBy: e.target.value })} />
                                            </div>

                                            <div className="form-group mb-3">
                                                <label className="control-lable">Import File: </label>
                                                <input className="form-control" type="file" onChange={(e) => this.handleFile(e)}></input>
                                            </div>

                                            <div>
                                                {DocumentList.map(doc =>
                                                    <><a href="" onClick={() => this.DownLoadFile(doc)}>{doc.fileName}</a>  <span onClick={() => this.CancelFile(doc.id)}>x</span></>)}
                                            </div> <br />

                                            <div className="form-group">
                                                <label className="control-label">IsChecked:</label> <b>{IsChecked == true ? "Accepted" : "Not Yet"}</b>
                                                {/* {IsChecked == 1 ? < ><input type="radio" checked />Pass <input type="radio" />Not Pass</> : < ><input type="radio" />Pass <input type="radio" checked />Not Pass</>} */}
                                            </div> <br />
                                            <br />
                                            <button type="button" className="btn btn-info" onClick={() => this.onAddAssign()}>Add</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}