import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { RedirectPage } from "../TestFile/RedirectPage";
import { Reporter } from "./Reporter";

export class ToDoReportTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ToDoReportTask: [],
            GenreId: 0,
            GenreName: '',
            ErrorGenreName: '',
            Description: '',
            modalTitle: ''
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/ReportTask/GetAllReportTask")
            .then(response => response.json())
            .then(data => {
                this.setState({ ToDoReportTask: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const { ToDoReportTask, GenreId, GenreName, ErrorGenreName, Description, modalTitle, Router, Switch } = this.state;
        return (
            <>
                <div className="container">
                    <section className="panel tasks-widget">
                        <header className="panel-heading">
                            <h2>ToDos</h2>
                        </header>
                    </section>
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        WriterId
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
                                {ToDoReportTask.map(gen =>
                                    <tr key={gen.id}>
                                        <td>{gen.id}</td>
                                        <td>{gen.task.title}</td>
                                        <td>{gen.task.startDate}</td>
                                        <td>{gen.task.endDate}</td>

                                        <td>
                                            {/* <NavLink to={`/re/${gen.id}`}> */}
                                            <a href={`/re/${gen.id}`}>
                                                <button type="button"
                                                // className="btn btn-light mr-1"
                                                // data-bs-toggle="modal"
                                                // data-bs-target="#exampleModal">
                                                >
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg> */}
                                                    Detail
                                                </button>
                                            </a>

                                            {/* </NavLink> */}


                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* <Route path='/re/:id' element={<Reporter />} /> */}
                </div>
            </>

        )
    }
}