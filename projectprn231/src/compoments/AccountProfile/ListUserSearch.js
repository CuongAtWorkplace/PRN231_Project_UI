import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class ListUserSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ListUser: [],
        }
    }

    refreshList() {
        const { search } = this.props.match.params;
        const jwt = localStorage.getItem('jwt');
        fetch("https://localhost:7248/api/User/GetUserByEmail?email=" + search, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ListUser: data });//ImageCover: data.ImageCover
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {

        const {ListUser} = this.state
        return (
            <div className="contanier">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>List Search</h2>
                    </header>
                </section>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    Email
                                </th>
                                <th>
                                    FullName
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th>
                                    Role
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListUser.map(gen =>
                                <tr key={gen.id}>
                                    <td>{gen.email}</td>
                                    <td>{gen.fullName}</td>
                                    <td>{gen.phone}</td>
                                    <td>{gen.role.roleName}</td>
                                    <td>
                                        <a href={`/account/${gen.id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(ListUserSearch);