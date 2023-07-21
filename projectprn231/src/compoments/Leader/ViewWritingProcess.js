import React, { Component } from "react";
import Pagination from 'react-js-pagination';

export class ViewWritingProcess extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ListWriting: [],

            activePage: 1,
            itemsCountPerPage: 5,
            totalItemsCount: 0
        }
    }

    refreshList() {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/WritingTask/GetAllWritingTask", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ListWriting: data, totalItemsCount: data.length });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    render() {

        const { ListWriting, activePage, itemsCountPerPage, totalItemsCount } = this.state;

        const indexOfLastCustomer = activePage * itemsCountPerPage;
        const indexOfFirstCustomer = indexOfLastCustomer - itemsCountPerPage;
        const currentCustomers = ListWriting.slice(indexOfFirstCustomer, indexOfLastCustomer);

        return (
            <div className="contanier">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List WritingProccess</h2>
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
                                    Title
                                </th>
                                <th>
                                    Genre
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
                                    <td>{gen.task.genre.genreName}</td>
                                    <td>{gen.task.startDate}</td>
                                    <td>{gen.task.endDate}</td>
                                    <td>{gen.createBy}</td>
                                    <td>{gen.isChecked == true ? <p style={{ color: 'green' }}><b>Accepted</b></p> : <p style={{ color: 'red' }}><b>Pending</b></p>}</td>
                                    <td>

                                        <a href={`/viewDetailWritingProcess/${gen.taskId}`}>
                                            {/* <button type="button"
                                                className="btn btn-light mr-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            > */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            {/* </button> */}
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