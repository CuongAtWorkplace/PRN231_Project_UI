import React, { Component } from "react";

import { SideBar } from "../SideBar/SideBar";
import { NavBar } from "../NavBar/NavBar";
import { Widget } from "../widget/Widget";
import { Chart } from "../chart/Chart";
import { Feature } from "../features/Feature";
import '../../Pages/home.css'

export class Admin_Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ListNotifi: [],
        }
    }

    refreshList() {
        const jwt = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        fetch("https://localhost:7248/api/Notification/GetNotificationByUserId?id=1", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ListNotifi: data});
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    OnClickTaskNotification() {

    }

    OnClickTaskNewAssign() {

    }

    OnClickReject() {

    }

    OnClickAddNew() {
        
    }

    render() {

        const {ListNotifi} = this.state;

        return (
            <div className='home'>
                <div className='homeContainer'>
                    <div className='widgets'>
                        <Widget type="user" />
                        <Widget type="order" />
                        <Widget type="earning" />
                        <Widget type="balance" />
                    </div>

                    <div className="charts">
                        <div style={{ float: 'right', width: '70%', height: '250px' }}>
                            <div class="row">
                                <div class="col-lg-4">
                                    <section class="panel">
                                        <header class="panel-heading">
                                            <h4>Notifications</h4>
                                        </header>
                                        <div class="panel-body" id="noti-box" className="box">

                                        {ListNotifi.map(ak => 
                                            <div class="alert alert-block alert-danger">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Oh snap!</strong> Change a few things up and try submitting again.
                                            </div>
                                        )}
                                            
                                            <div class="alert alert-success">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Well done!</strong> You successfully read this important alert message.
                                            </div>
                                            <div class="alert alert-info">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                                            </div>
                                            <div class="alert alert-warning">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Warning!</strong> Best check yo self, you're not looking too good.
                                            </div>


                                            <div class="alert alert-block alert-danger">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Oh snap!</strong> Change a few things up and try submitting again.
                                            </div>
                                            <div class="alert alert-success">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Well done!</strong> You successfully read this important alert message.
                                            </div>
                                            <div class="alert alert-info">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                                            </div>
                                            <div class="alert alert-warning">
                                                <button data-dismiss="alert" class="close close-sm" type="button">
                                                    <i class="fa fa-times"></i>
                                                </button>
                                                <strong>Warning!</strong> Best check yo self, you're not looking too good.
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}