
import "./sidebar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, { Component } from "react";
import { Table } from "../table/Table";
import { Route } from "react-router-dom";
import { CommentBrowseTable } from "../table/CommentBrowseTable";
import { ListReportTask } from "../Reporter/ListReportTask";

import { ToDoReportTask } from "../Reporter/ToDoReportTask";
import { ListGenre } from '../Leader/ListGenre';
import { ListReject } from "../Leader/ListReject"
import { ListWritingTask } from "../Writer/ListWritingTask";
import { ToDoWritingTask } from "../Writer/ToDoWritingTask";
//import { ListAssignTask } from "../Leader/ListAssignTask";
import { NewTest } from "../TestFile/NewTest";
import Test from "../TestFile/Test";
import Writer from "../Writer/Writer";

import ViewDetailReportProcess from "../Leader/ViewDetailReportProcess";
import ViewDetailWritingProcess from "../Leader/ViewDetailWritingProcess";
import UpdateAssigTask from "../Leader/UpdateAssigTask";
import { Leader } from "../Leader/Leader";
import { ListAssignTask } from "../Leader/ListAssignTask";
import {ViewReportProcess} from '../Leader/ViewReportProcess';
import {ViewWritingProcess} from '../Leader/ViewWritingProcess';






export class SideBar extends Component {

    render() {
        return (
            <div className="layout">

                <div className="sidebar">
                    <div className="top">
                        <span className="logo">
                            Sbotop
                        </span>
                    </div>
                    <hr />
                    <div className="center">
                        <ul>
                            <p className="Title">Main</p>
                            <a href="/AdminDashBoard">
                                <li>
                                    <DashboardIcon className="icon" />
                                    <span>Dashboard</span>
                                </li>
                            </a>
                            <p className="Title">Lists</p>

                            {/* Leader */}
                            <a href="/listGenre">
                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>List Genre</span>
                                </li>
                            </a>

                            <a href="/listAssign">
                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>AssignTask</span>
                                </li>
                            </a>

                            <a href="/viewReportProcess">

                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>Report Process</span>
                                </li>
                            </a>

                            <a href="/viewWritingProcess">

                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>Writing Process</span>
                                </li>
                            </a>




                            <a href="/listReject">

                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>List Reject</span>
                                </li>
                            </a>


                            {/* Reporter */}
                            <a href="/listReportTask">


                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>List AssignReportTask</span>
                                </li>
                            </a>

                            <a href="/listTodoTask">
                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>List ToDoReportTask</span>
                                </li>
                            </a>

                            {/* Writer */}
                            <a href="/listTodoWriting">
                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>List ToDoWritingTask</span>
                                </li>
                            </a>

                            <a href="/listWritingTask">
                                <li>
                                    <InsertEmoticonIcon className="icon" />
                                    <span>List WritingTask</span>
                                </li>
                            </a>

                            {/* Admin */}
                            <a href="/table">
                                <li>
                                    <ProductionQuantityLimitsIcon className="icon" />
                                    <span>Product</span>
                                </li>

                            </a>





                         

                            <a href="/comment">

                                <li>
                                    <NewspaperIcon className="icon" />
                                    <span>News</span>
                                </li>
                            </a>
                            {/* <a href="/newTest">

                                 <li>
                                     <NewspaperIcon className="icon" />
                                     <span>News</span>
                                 </li>
                             </a> */}
                            <p className="Title">Name</p>

                            <li>
                                <LogoutIcon className="icon" />
                                <span>Log out</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom">

                        <div className="colorOption"></div>
                        <div className="colorOption"></div>
                        <div className="colorOption"></div>

                    </div>

                </div>

                <div className="layout_sidebar">
                    <div className="navbar">
                        <div className="wrapper">
                            <div className="search">
                                <input type="text" placeholder="Search  ... " />
                                <SearchIcon />
                            </div>

                            <div className="items">
                                <div className="items">
                                    <LanguageIcon className="icon" />
                                    English
                                </div>
                                <div className="item">
                                    <DarkModeIcon className="icon" />
                                </div>

                                <div className="item">
                                    <OpenWithIcon className="icon" />
                                </div>
                                <div className="item">
                                    <NotificationsNoneIcon className="icon" />
                                    <div className="counter">1</div>
                                </div>
                                <div className="item">
                                    <FormatListBulletedIcon className="icon" />
                                </div>
                                <div className="item">
                                </div>
                                <img src="https://th.bing.com/th/id/R.e900afd2d9b0b93857b0ffa8310f5247?rik=e6eWtgl4bA%2bbGg&pid=ImgRaw&r=0"
                                    alt=""
                                    className="userAvantar"
                                />
                            </div>


                        </div>
                    </div>

                    <div className="Content">
                         {/* Admin */}
                        <Route path="/table" component={Table} />
                        <Route path="/comment" component={CommentBrowseTable} />
                        {/* <Route path="/Advertisement" component={Advertisement} /> 
                        {/* <Route path="/Ok" component={Ok}/>   
                        

                        {/* Leader */}
                        <Route path="/addAssignTask" component={Leader}/>
                        <Route path="/listGenre" component={ListGenre} />
                        <Route path="/listReject" component={ListReject} />
                        <Route path="/listAssign" component={ListAssignTask}/>
                        <Route path="/updateAssignTask/:id" component={UpdateAssigTask}/>
                        <Route path="/viewReportProcess" component={ViewReportProcess} />
                        <Route path="/viewWritingProcess" component={ViewWritingProcess} />
                        <Route path="/viewDetailReportProcess/:id" component={ViewDetailReportProcess} />
                        <Route path="/viewDetailWritingProcess/:id" component={ViewDetailWritingProcess} />

                        {/* Reporter */}

                        <Route path="/listReportTask" component={ListReportTask} />
                        <Route path="/listTodoTask" component={ToDoReportTask} />
                        

                        {/* Writer */}
                        <Route path="/listWritingTask" component={ListWritingTask} />
                        <Route path="/listTodoWriting" component={ToDoWritingTask} />


                        <Route path="/listReport" component={ListReportTask} />
                        {/* <Route path="/dashboard" component={Dashboard} /> */}
                        {/* <Route path="/Reporter" component={Test} /> */}
                        {/* <Route path="/test/:id" component={Test}/> */}
                        <Route path="/writer/:id" component={Writer} />
                    </div>
                </div>
            </div>
        )
    }
}