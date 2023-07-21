import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination';

export class ListReject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            RejectTask: [],
            modalTitle: '',
            UserId: 0,
            Reason: '',
            RejectId: 0,
            Title: '',
            IsReject: true,
            RejectTaskAccept: [],
            activePage: 1,
            itemsCountPerPage: 5,
            totalItemsCount: 0, 


            activePage1: 1,
            itemsCountPerPage1: 5,
            totalItemsCount1: 0
        }
    }

    refreshList() {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/RejectTask/GetAllRejectTaskPending", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    RejectTask: data,
                    totalItemsCount: data.length
                });
            });

        fetch("https://localhost:7248/api/RejectTask/GetAllRejectTaskAccept", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ RejectTaskAccept: data, totalItemsCount1: data.length });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber});
    }

    handlePageChange1(pageNumber) {
        this.setState({ activePage1: pageNumber});
    }

    editClick = (e) => {
        this.setState({
            RejectId: e.id,
            Title: e.task.title,
            UserId: e.userId,
            Reason: e.reason,
            modalTitle: 'RejectTask'
        })
    }

    acceptRejectTask = () => {
        const jwt = localStorage.getItem('token');
        if (window.confirm("Do you want to accept?")) {
            fetch("https://localhost:7248/api/RejectTask/UpdateRejectTask", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    id: this.state.RejectId,
                    IsReject: true
                })
            })
                .then(res => res.json())
                .then((result) => {
                    toast.success("Accepted successfull. Congratulation!!!")
                    this.refreshList();
                }, (error) => {
                    toast.error("Accepted failed. Try Again!!!")
                })
        }
    }

    rejectTask = () => {
        const jwt = localStorage.getItem('token');
        if (window.confirm("Do you want to reject?")) {
            fetch("https://localhost:7248/api/RejectTask/DeleteRejectTask?Id=" + this.state.RejectId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${jwt}`
                }
            })
                .then(res => res.json())
                .then((result) => {
                    toast.success("Rejected successfull. Congratulation!!!")
                    this.refreshList();
                }, (error) => {
                    toast.error("Rejected failed. Try Again!!!")
                })
        }
    }

    render() {
        const { RejectTask, RejectId, UserId, Title, Reason, modalTitle, RejectTaskAccept,
            activePage, itemsCountPerPage, totalItemsCount, 
            activePage1, itemsCountPerPage1, totalItemsCount1 } = this.state;

        const indexOfLastCustomer = activePage * itemsCountPerPage;
        const indexOfFirstCustomer = indexOfLastCustomer - itemsCountPerPage;
        const currentCustomers = RejectTask.slice(indexOfFirstCustomer, indexOfLastCustomer);

        const indexOfLastCustomer1 = activePage1 * itemsCountPerPage1;
        const indexOfFirstCustomer1 = indexOfLastCustomer1 - itemsCountPerPage1;
        const currentCustomers1 = RejectTaskAccept.slice(indexOfFirstCustomer1, indexOfLastCustomer1);

        return (
            <div className="container">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List Reject Task Pending</h2>
                    </header>
                </section>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    RejectTaskId
                                </th>
                                <th>
                                    TaskTitle
                                </th>
                                <th>
                                    Reason
                                </th>
                                <th>
                                    User's Reject
                                </th>
                                <th>
                                    Status
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
                                    <td>{gen.reason}</td>
                                    <td>{gen.userId}</td>
                                    <td><b style={{color: 'red'}}>Pending</b></td>
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
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3">

                                        <div className="p-2 w-50 bd-highlight">

                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Task Title:</span>
                                                <input type="text" className="form-control"
                                                    value={Title} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Reason:</span>
                                                <input type="text" className="form-control"
                                                    value={Reason} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">User's Reason:</span>
                                                <input type="text" className="form-control"
                                                    value={UserId} />
                                            </div>
                                        </div>
                                    </div>

                                    {RejectId != 0 ?
                                        <>
                                            <button type="button"
                                                className="btn btn-primary float-start"
                                                onClick={() => this.acceptRejectTask()}
                                            >Accept</button>
                                            <button type="button"
                                                className="btn btn-danger float-start"
                                                onClick={() => this.rejectTask()}
                                            >Reject</button>
                                        </>
                                        : null}

                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List Reject Accept</h2>
                    </header>
                </section>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    RejectTaskId
                                </th>
                                <th>
                                    TaskTitle
                                </th>
                                <th>
                                    Reason
                                </th>
                                <th>
                                    User's Reject
                                </th>
                                <th>
                                    Result
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers1.map(gen =>
                                <tr key={gen.id}>
                                    <td>{gen.id}</td>
                                    <td>{gen.task.title}</td>
                                    <td>{gen.reason}</td>
                                    <td>{gen.userId}</td>
                                    <td style={{ color: 'green' }}><b>Accepted</b></td>
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
                        activePage={activePage1}
                        itemsCountPerPage={itemsCountPerPage1}
                        totalItemsCount={totalItemsCount1}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange1.bind(this)}
                    />
                </div>
            </div>

        )
    }
}