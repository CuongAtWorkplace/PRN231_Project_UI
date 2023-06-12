import React, { Component } from "react";

import { Table } from "../compoments/table/Table";
import { NavBar } from "../compoments/NavBar/NavBar";
import { SideBar } from "../compoments/SideBar/SideBar";
import './user.css'


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