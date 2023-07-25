
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
import { Route, Redirect } from "react-router-dom";
import { CommentBrowseTable } from "../table/CommentBrowseTable";
import { ListReportTask } from "../Reporter/ListReportTask";

import { ToDoReportTask } from "../Reporter/ToDoReportTask";
import { ListGenre } from '../Leader/ListGenre';
import { ListReject } from "../Leader/ListReject"
import { ListWritingTask } from "../Writer/ListWritingTask";
import { ToDoWritingTask } from "../Writer/ToDoWritingTask";
import Writer from "../Writer/Writer";

import ViewDetailReportProcess from "../Leader/ViewDetailReportProcess";
import ViewDetailWritingProcess from "../Leader/ViewDetailWritingProcess";
import UpdateAssigTask from "../Leader/UpdateAssigTask";
import AccountProfile from "../AccountProfile/AccountProfile";
import ListUserSearch from "../AccountProfile/ListUserSearch";
import { Leader } from "../Leader/Leader";
import { ListAssignTask } from "../Leader/ListAssignTask";
import { ViewReportProcess } from '../Leader/ViewReportProcess';
import { ViewWritingProcess } from '../Leader/ViewWritingProcess';
import { AdvertisementTable } from "../table/AdvertisementTable";
import { Dashboard } from "../table/DashBoard";

export class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            role: '',
            roleid: 1,
        }
    }

    ChangeSearchValue(e) {
        this.setState({
            search: e.target.value
        })
    }

    SearchAccount(event) {
        if (this.state.search == "") {
            return;
        }

        if (event.key === 'Enter') {
            //<Route to={`/listUserSearch/${this.state.search}`} />;

            window.location.href = `/manager/listUserSearch/${this.state.search}`;
        }
    }
    componentDidMount() {

        const roleid = localStorage.getItem('roleid');
        // if (roleid == 1 ) {
        //     window.location.href ="/manager";
        //  } else {
        //     window.location.href ="/";
        //   }
        this.setState({
            roleid: roleid
        })
        this.setState({
            role: localStorage.getItem('roleid')
        })
    }
    handleClick = () => {
        window.location.href = "/";
        localStorage.removeItem('token');
        localStorage.removeItem('roleid');
        localStorage.removeItem('id');

    };
    render() {
        const { role, roleid } = this.state;

        if (roleid == 2) {
            // Nếu không có quyền truy cập, chuyển hướng đến trang không cho phép truy cập hoặc trang login
            return <Redirect to="/" />;
        } return (
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
                            {
                                this.state.role == '1' &&
                                <a href="/manager/AdminHome">
                                    <li>
                                        <DashboardIcon className="icon" />
                                        <span>Dashboard</span>
                                    </li>
                                </a>
                            }

                            {/* <p className="Title">Lists</p> */}

                            {/* Leader */}
                            {
                                this.state.role == '3' && <>
                                    <a href="/manager/listGenre">
                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>List Genre</span>
                                        </li>
                                    </a>

                                    <a href="/manager/listAssign">
                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>AssignTask</span>
                                        </li>
                                    </a>

                                    <a href="/manager/viewReportProcess">

                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>Report Process</span>
                                        </li>
                                    </a>

                                    <a href="/manager/viewWritingProcess">

                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>Writing Process</span>
                                        </li>
                                    </a>
                                    <a href="/manager/listReject">

                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>List Reject</span>
                                        </li>
                                    </a>
                                </>

                            }
                            {/* Reporter */}
                            {
                                this.state.role == '5' && <> <a href="/manager/listReportTask">
                                    <li>
                                        <InsertEmoticonIcon className="icon" />
                                        <span>List AssignReportTask</span>
                                    </li>
                                </a>
                                    <a href="/manager/listTodoTask">
                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>List ToDoReportTask</span>
                                        </li>
                                    </a>
                                </>
                            }




                            {/* Writer */}
                            {
                                this.state.role == '4' && <>

                                    <a href="/manager/listWritingTask">
                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>List WritingTask</span>
                                        </li>
                                    </a>

                                    <a href="/manager/listTodoWriting">
                                        <li>
                                            <InsertEmoticonIcon className="icon" />
                                            <span>List ToDoWritingTask</span>
                                        </li>
                                    </a>

                                </>
                            }

                            {/* Admin */}

                            {
                                this.state.role == '1' && <>
                                    <a href="/manager/table">
                                        <li>
                                            <ProductionQuantityLimitsIcon className="icon" />
                                            <span>List User</span>
                                        </li>
                                    </a>

                                    <a href="/manager/comment">

                                        <li>
                                            <NewspaperIcon className="icon" />
                                            <span>List Comment</span>
                                        </li>
                                    </a>

                                    <a href="/manager/AdvertisementTable">

                                        <li>
                                            <NewspaperIcon className="icon" />
                                            <span>Advertisement Management</span>
                                        </li>
                                    </a>
                                </>
                            }
                            <p className="Title">Name</p>

                            <li>
                                <LogoutIcon className="icon" />
                                <a href="#" onClick={this.handleClick}>Log out</a>
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
                                <input type="text" value={this.state.search} onChange={(e) => this.ChangeSearchValue(e)} placeholder="Search  ... " onKeyDown={(event) => this.SearchAccount(event)} />
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
                        <Route path="/manager/table" component={Table} />
                        <Route path="/manager/comment" component={CommentBrowseTable} />
                        <Route path="/manager/AdvertisementTable" component={AdvertisementTable} /> 
                        <Route path="/manager/AdminHome" component={Dashboard} />
                        {/* <Route path="/AdminDashBoard" component={Admin_Home} /> */}
                        {/* <Route path="/Advertisement" component={Advertisement} /> */}
                        {/* <Route path="/Ok" component={Ok}/>   */}


                        {/* Leader */}
                        <Route path="/manager/addAssignTask" component={Leader} />
                        <Route path="/manager/listGenre" component={ListGenre} />
                        <Route path="/manager/listReject" component={ListReject} />
                        <Route path="/manager/listAssign" component={ListAssignTask} />
                        <Route path="/manager/updateAssignTask/:id" component={UpdateAssigTask} />
                        <Route path="/manager/viewReportProcess" component={ViewReportProcess} />
                        <Route path="/manager/viewWritingProcess" component={ViewWritingProcess} />
                        <Route path="/manager/viewDetailReportProcess/:id" component={ViewDetailReportProcess} />
                        <Route path="/manager/viewDetailWritingProcess/:id" component={ViewDetailWritingProcess} />

                        {/* Reporter */}

                        <Route path="/manager/listReportTask" component={ListReportTask} />
                        <Route path="/manager/listTodoTask" component={ToDoReportTask} />


                        {/* Writer */}
                        <Route path="/manager/listWritingTask" component={ListWritingTask} />
                        <Route path="/manager/listTodoWriting" component={ToDoWritingTask} />
                        <Route path="/manager/listReport" component={ListReportTask} />
                        <Route path="/manager/writer/:id" component={Writer} />

                        {/* AccountProfile */}
                        <Route path='/manager/account/:id' component={AccountProfile} />
                        <Route path='/manager/listUserSearch/:search' component={ListUserSearch} />
                    </div>
                </div>
            </div>
        )
    }
}