import React, { Component } from "react";

export class ListOrderAdvertisment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ListOrder: [],
            activePage: 1,
            itemsCountPerPage: 5,
            totalItemsCount: 0,
        }
    }

    refreshList() {
        fetch('https://localhost:7248/api/AdertisementOrder/GetOrderAdvertisAccept')
            .then(response => response.json())
            .then(data => {
                this.setState({ ListOrder: data });
            })
            .catch(error => {
                console.error('Error fetching object:', error);
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {ListOrder} = this.state;
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
                                    Id
                                </th>
                                <th>
                                    User
                                </th>
                                <th>
                                    Title
                                </th>
                                <th>
                                    Image
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Total Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListOrder.map(gen =>
                                <tr key={gen.id}>
                                    <td>{gen.id}</td>
                                    <td>{gen.user.fullName}</td>
                                    <td>{gen.title}</td>
                                    <td></td>
                                    <td>{gen.advertisement.price}</td>
                                    <td>{gen.advertisement.totalDate}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}