import React, { Component } from "react";
import parse from 'html-react-parser';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Leader } from "./Leader";
//import ReactHtmlParser from 'react-html-parser';

export class ListAssignTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AssignTask: [],
            ListWritingTask: [], 
            ListReportTask: [],
            activePage: 1,
            itemsCountPerPage: 5,
            totalItemsCount: 0
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/AssignTask/GetAllAssignTask", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ AssignTask: data, totalItemsCount: data.length });
            });
        fetch("https://localhost:7248/api/WritingTask/GetAllWritingTask", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ListWritingTask: data });
            });
        fetch("https://localhost:7248/api/ReportTask/GetAllReportTask", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ListReportTask: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    addClick = () => {
    }

    deleteClick = (e) => {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/AssignTask/DeleteAssignTask?Id="+e, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.refreshList();
                toast.success("Delete Successfull. Congratulation!!!")
            }, (error) => {
                toast.error("Delete Failed. Try again!!!")
            })
        const { ListReportTask, ListWritingTask } = this.state;
        ListReportTask.map(task => {
            if (task.taskId == e) {
                fetch("https://localhost:7248/api/ReportTask/DeleteReportTask?Id="+e, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`
                    }
                })
            }
        })

        ListWritingTask.map(task => {
            if (task.taskId == e) {
                fetch("https://localhost:7248/api/WritingTask/DeleteWritingTask?Id=" + e, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${jwt}`
                    }
                })
            }
        })
    }

    render() {
        const { AssignTask, activePage, itemsCountPerPage, totalItemsCount } = this.state;

        const indexOfLastCustomer = activePage * itemsCountPerPage;
        const indexOfFirstCustomer = indexOfLastCustomer - itemsCountPerPage;
        const currentCustomers = AssignTask.slice(indexOfFirstCustomer, indexOfLastCustomer);

        return (
            <div className="container">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List AssignTask</h2>
                    </header>
                </section>
                <div>
                    <a href="/addAssignTask">
                        <button type="button" className="btn btn-primary">
                            Add New Assign
                        </button>
                    </a>
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
                                    Writer
                                </th>
                                <th>
                                    Reporter
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.map(ak =>
                            
                                <tr key={ak.id}>
                                    <td>{ak.id}</td>
                                    <td>{ak.title}</td>
                                    <td>{parse(ak.description)}</td>
                                    <td>{ak.startDate}</td>
                                    <td>{ak.endDate}</td>
                                    <td>
                                        {ak.isWriterAccept == true ? <b style={{ color: 'green' }}>Accepted</b> : <b style={{ color: 'red' }}>Pending</b>}
                                    </td>
                                    <td>
                                        {ak.isReportAccept == true ? <b style={{ color: 'green' }}>Accepted</b> : <b style={{ color: 'red' }}>Pending</b>}
                                    </td>
                                    <td>
                                        <a href={`/updateAssignTask/${ak.id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </a>

                                        <a href="#" onClick={() => this.deleteClick(ak.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </a>

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
                </div>
            </div>
        )
    }
}