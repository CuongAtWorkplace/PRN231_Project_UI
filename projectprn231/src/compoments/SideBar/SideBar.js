import "./sidebar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
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
import { Link, Route } from "react-router-dom";
import { CommentBrowseTable } from "../table/CommentBrowseTable";
import { ListReportTask } from "../Reporter/ListReportTask";


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
                            <li>
                                <DashboardIcon className="icon" />
                                <span>Dashboard</span>
                            </li>
                            <p className="Title">Lists</p>

                            <a href="/listReport">

                            <li>
                                <InsertEmoticonIcon className="icon" />
                                <span>User</span>
                            </li>
                            </a>
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
                        <Route path="/table" component={Table} />
                        <Route path="/comment" component={CommentBrowseTable} />
                        <Route path="/listReport" component={ListReportTask} />

                    </div>
                </div>
            </div>
        )
    }
}