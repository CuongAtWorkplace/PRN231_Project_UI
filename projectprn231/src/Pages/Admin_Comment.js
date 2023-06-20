import React, { Component } from "react";
import { CommentBrowseTable } from "../compoments/table/CommentBrowseTable";
import { SideBar } from "../compoments/SideBar/SideBar";
import { NavBar } from "../compoments/NavBar/NavBar";
import './user.css'


export class Admin_Comment extends Component {

          
    render() {
        return (
            <div className='user'>
                <SideBar />
                <div className='userContainer'>
                    <NavBar />
                    <div className="ListContainer">
                        <div className="tableHead">Comment Browse</div>
                        <CommentBrowseTable />
                    </div>
                </div>
            </div>

        )
    }

}