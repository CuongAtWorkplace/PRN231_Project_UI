import React, {Component} from "react";

export class ListReportTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Genre: [],
            GenreId: 0,
            GenreName: '',
            ErrorGenreName: '',
            Description: '',
            modalTitle: ''
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/Genre/GetAllGenre")
            .then(response => response.json())
            .then(data => {
                this.setState({ Genre: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        return(
            <div className="container">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List Task Assign</h2>
                    </header>
                </section>
                <div>
                    {/* <button type="button"
                        className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.addClick()}>
                        Add Genre
                    </button> */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    GenreId
                                </th>
                                <th>
                                    GenreName
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Genre.map(gen => */}
                                <tr >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    {/* <td></td> */}
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => this.editClick()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>

                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            onClick={() => this.deleteClick()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            {/* )} */}
                        </tbody>
                    </table>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{"modalTitle"}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3">

                                        <div className="p-2 w-50 bd-highlight">

                                            <div className="input-group mb-3">
                                                <span className="input-group-text">GenreName</span>
                                                <input type="text" className="form-control"
                                                    value={"GenreName"}
                                                    onChange={(e) => this.changeGenreName(e)} />
                                                {/* {ErrorGenreName == null ? <p style={{ color: 'red' }}>{ErrorGenreName}</p> : <></>} */}
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Description</span>
                                                <input type="text" className="form-control"
                                                    value={"Description"}
                                                    onChange={(e) => this.changeDescription(e)} />
                                            </div>
                                        </div>
                                    </div>

{/* 
                                    {GenreId == 0 ? <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                        : null}

                                    {console.log({GenreId})}
                                    {GenreId != 0 ? <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                        : null} */}

                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}