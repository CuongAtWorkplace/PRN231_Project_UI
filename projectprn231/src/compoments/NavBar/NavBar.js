import "./navbar.css"
import React, { Component } from "react";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: 'Search',
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
            console.log('Enter key pressed');
            alert(this.state.search);
        }

    }

    render() {
        return (

            <div className="navbar">
                <div className="wrapper">
                    <div className="search">
                        <input type="text" value={this.state.search} onChange={(e) => this.ChangeSearchValuee(e)} placeholder="Search  ... " onKeyDown={(event) => this.SearchAccount(event)}/>
                        <SearchIcon />
                    </div>

                    <div>
                        <input type="text" placeholder="New Input ..."/>
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
        )
    }

}