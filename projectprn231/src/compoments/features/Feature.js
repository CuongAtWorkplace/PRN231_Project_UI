import React, { Component } from "react";
import './Feature.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthAmount: null,
      yearAmount: null
    };
  }

  componentDidMount() {
    this.getMonthUserData();
    this.getYearUserData();
  }

  getMonthUserData() {
    fetch("https://localhost:7248/api/User/GetUserData?numberOfDays=30")
      .then((response) => response.json())
      .then((data) => {
        const amount = data.length;
        this.setState({ monthAmount: data });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      });
  }

  getYearUserData() {
    fetch("https://localhost:7248/api/User/GetUserData?numberOfDays=365")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ yearAmount: data });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      });
  }

  render() {
    const { monthAmount, yearAmount } = this.state;
    const ratio = Math.floor((monthAmount / yearAmount) * 100);


    return (
      <div className='Feature'>
        <div className='top'>
          <h1 className='title'>Total User</h1>
          <MoreVertIcon fontSize='small' />
        </div>
        <div className='bottom'>
          
          <div className='featureChart'>
            <CircularProgressbar value={ratio} text={ ratio+"%"} strokeWidth={5} />
          </div>
          <p className='Title'>Monthly User</p>
          {monthAmount && yearAmount && (
            <p className='amount'>{(ratio).toFixed(2)} %</p>
          )}
          <div className='summary'>
            <div className='item'>
              <div className='itemTitle'>Last Month</div>
              <div className='itemResult positive'>
                <KeyboardArrowDownIcon fontSize='small' />
                <div className='resultAmount'>{monthAmount} User</div>
              </div>
            </div>
            <div className='item'>
              <div className='itemTitle'>Last Year</div>
              <div className='itemResult negative'>
                <KeyboardArrowDownIcon fontSize='small' />
                <div className='resultAmount'>{yearAmount} User</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
