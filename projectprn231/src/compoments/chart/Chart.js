import './Chart.css';
import React, { Component } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export class Chart extends Component {
  state = {
    monthData: [],
    isDataLoaded: false,
  };

  componentDidMount() {
    if (!this.state.isDataLoaded) {
      this.getMonthUserData();
    }
  }

  getMonthUserData() {
    const months = [0, 30, 60, 90, 120, 150];
    const requests = months.map((begin) =>
      fetch(`https://localhost:7248/api/News/getNewsByDate2?begin=${begin}&end=${begin + 30}`)
    );

    Promise.all(requests)
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then((data) => {
        const monthData = data.map((item, index) => ({
          name: `Month ${months[index] / 30}`,
          uv: item.length, // Chỉ sử dụng độ dài của mảng để hiển thị số lượng tin tức trong tháng
        }));
        this.setState({ monthData, isDataLoaded: true });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      });
  }

  render() {
    const { monthData } = this.state;

    const dataWithApi = [
      {
        name: 'Month 1',
        uv: monthData.length >= 1 ? monthData[0].uv : 0,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Month 2',
        uv: monthData.length >= 2 ? monthData[1].uv : 0,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Month 3',
        uv: monthData.length >= 3 ? monthData[2].uv : 0,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Month 4',
        uv: monthData.length >= 4 ? monthData[3].uv : 0,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Month 5',
        uv: monthData.length >= 5 ? monthData[4].uv : 0,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Month 6',
        uv: monthData.length >= 6 ? monthData[5].uv : 0,
        pv: 3800,
        amt: 2500,
      },
    ];

    return (
      <div className='chart'>
        <div>
          <p>Last 6 Month Performance</p>
        </div>
        <ResponsiveContainer width="100%" aspect={2/1}>
          <AreaChart
            width={500}
            height={400}
            data={dataWithApi}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
