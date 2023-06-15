import React, { Component } from "react";
import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      amount: 100,
      diff: 20,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    switch (type) {
      case "user":
        this.getMonthUserData("user");
        break;
      case "order":
        this.getMonthUserData("order");
        break;
      case "earning":
        this.getMonthUserData("earning");
        break;
      case "balance":
        this.getMonthUserData("balance");
        break;
      default:
        break;
    }
  }

  getMonthUserData(userType) {
    let url;
    switch (userType) {
      case "user":
        url = "https://localhost:7248/api/User/GetUserData?numberOfDays=30";
        break;
      case "order":
        url = "https://localhost:7248/api/Reporter/GetReporterData?numberOfDays=30";
        break;
      case "earning":
        url = "https://localhost:7248/api/News/getNewsByDate?begin=0&end=30";
        break;
      case "balance":
        url = "https://localhost:7248/api/News/getNewsByDate?begin=0&end=30";
        break;
      default:
        return;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userData: data });
        const amount = data.length;
        this.setState({ amount: amount });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      });
  }

  render() {
    const { type } = this.props;
    const { userData, amount, diff } = this.state;

    let data;

    switch (type) {
      case "user":
        data = {
          title: "User In Month",
          link: "See all User",
          icon: (
            <PersonOutlineIcon
              className="icon"
              style={{ backgroundColor: "rgba(0,128,0,0.2)", color: "green" }}
            />
          ),
        };
        break;

      case "order":
        data = {
          title: "Reporter In Month",
          link: "View all orders",
          icon: (
            <ShoppingCartIcon
              className="icon"
              style={{ backgroundColor: "rgba(218,165,32,0.2)", color: "goldenrod" }}
            />
          ),
        };
        break;

      case "earning":
        data = {
          title: "Writer In Month",
          link: "View Writer",
          icon: (
            <AttachMoneyIcon
              className="icon"
              style={{ backgroundColor: "rgba(0,128,0,0.2)", color: "green" }}
            />
          ),
        };
        break;

      case "balance":
        data = {
          title: "News",
          isMoney: true,
          link: "See details",
          icon: (
            <PersonOutlineIcon
              className="icon"
              style={{ backgroundColor: "rgba(0,128,0,0.2)", color: "purple" }}
            />
          ),
        };
        break;

      default:
        data = {
          title: "Unknown Widget",
          isMoney: false,
          link: "Unknown link",
          icon: <div>Unknown icon</div>,
        };
        break;
    }

    return (
      <div className="widget">
        <div className="left">
          <span>{data.title}</span>
          <span className="counter">{userData}</span>
          <span className="link">{data.link}</span>
        </div>

        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
            {diff}%
          </div>
          {data.icon}
        </div>
      </div>
    );
  }
}
