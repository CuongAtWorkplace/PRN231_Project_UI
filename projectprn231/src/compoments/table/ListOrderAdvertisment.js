import React, { Component } from "react";
import moment from "moment/moment";
import { toast } from 'react-toastify';

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
        this.intervalId = setInterval(() => {
            const { ListOrder } = this.state;
            const updatedTasks = ListOrder.map(task => {
                if (task.isDelete != false || task.isDelete == null) {
                    const isExpired = moment().isAfter(task.endDate);
                    if (isExpired) {
                        this.checkDeadLine(task);
                    }
                } else {
                    
                }   
            });
            this.setState({
                ListOrder: updatedTasks,
            });
        }, 86400000);
    }

    checkDeadLine(task) {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/AdertisementOrder/CheckDeadLine?taskId="+task.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((result) => {
                this.refreshList();
                toast.success("Delete Successfull. Congratulation!!!")
            }, (error) => {
                toast.success("Delete Failed. Congratulation!!!")
            })
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
                                <th>
                                    Status
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
                                    <td>
                                        {gen.isDelete == true && <p style={{color: 'green'}}><b>Done</b></p>}
                                        {gen.isDelete == false && <p style={{color: 'gray'}}><b>Show</b></p>}
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