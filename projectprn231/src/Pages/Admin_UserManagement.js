import React, { Component } from "react";

import { Table } from "./Table";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import './user.scss'


export class Admin_UserManagement extends Component {

    render() {
        return (
            <div className='user'>
                <SideBar />
                <div className='userContainer'>
                    <NavBar />
                    <div className="ListContainer">
                        <div className="tableHead"> User Management</div>
                        <Table />
                    </div>
                </div>
            </div>

        )
    }

}