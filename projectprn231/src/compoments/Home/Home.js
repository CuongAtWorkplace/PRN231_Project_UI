
import React, { Component, useState } from "react";
import "./home.css"
import { Link } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom';
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "./Footer";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NewsHome: [],
      DataWeather: {},
      ListGenre: [],
      NewsHomeByDate: [],
      NewsId: 0,
      email: '',
      password: '',
      currentTime: new Date(),
      dataall: [], // 
      data: [], // 
      data1: [], // the thao
      data2: [], // kinh doanh
      data3: [], // du lich
      page: 1,
      page1: 1,
      page2: 1, // Current page of data
      page3: 1,
      page4: 1,
      hasMore: true,
      hasMore1: true,
      hasMore2: true,
      hasMore3: true,
      hasMore4: true,
      NewsFirst: {},
      Advertis: {},
      PhotoFileName: '',
      PhotoPath: 'https://localhost:7248/Photos/',
    }
  }

  fetchDataAll = () => {
    const { page } = this.state;
    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/GetData?page=${page}`)
      .then(response => response.json())
      .then(newdata => {

        if (newdata.length === 0) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState(prevState => ({
          dataall: [...prevState.dataall, ...newdata], // Appending new items to the existing array
          page: prevState.page + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  fetchData = () => {
    const { page1 } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreFirst?page=${page1}`)
      .then(response => response.json())
      .then(newdata => {

        if (newdata.length === 0) {
          this.setState({ hasMore1: false });
          return;
        }
        this.setState(prevState => ({
          data: [...prevState.data, ...newdata], // Appending new items to the existing array
          page1: prevState.page1 + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  fetchData1 = () => {
    const { page2 } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreSecond?page=${page2}`)
      .then(response => response.json())
      .then(newdata1 => {

        if (newdata1.length === 0) {
          this.setState({ hasMore2: false });
          return;
        }
        this.setState(prevState => ({
          data1: [...prevState.data1, ...newdata1], // Appending new items to the existing array
          page2: prevState.page2 + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  fetchData2 = () => {
    const { page3 } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreFirst?page=${page3}`)
      .then(response => response.json())
      .then(newdata => {

        if (newdata.length === 0) {
          this.setState({ hasMore3: false });
          return;
        }
        this.setState(prevState => ({
          data2: [...prevState.data2, ...newdata], // Appending new items to the existing array
          page3: prevState.page3 + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  fetchData3 = () => {
    const { page4 } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreThree?page=${page4}`)
      .then(response => response.json())
      .then(newdata => {

        if (newdata.length === 0) {
          this.setState({ hasMore4: false });
          return;
        }
        this.setState(prevState => ({
          data3: [...prevState.data3, ...newdata], // Appending new items to the existing array
          page4: prevState.page4 + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  fetchDataFirst() {
    fetch('https://localhost:7248/api/News/getNewsFirst')
      .then(response => response.json())
      .then(data => {
        this.setState({ NewsFirst: data });
      })
      .catch(error => {
        console.error('Error fetching object:', error);
      });

    fetch('https://localhost:7248/api/AdertisementOrder/AdvertisRandom')
      .then(response => response.json())
      .then(data => {
        this.setState({ Advertis: data });
      })
      .catch(error => {
        console.error('Error fetching object:', error);
      });

  }


  refreshList() {
    fetch('https://localhost:7248/api/News/getAllNews')
      .then(response => response.json())
      .then(data => {
        this.setState({ NewsHome: data });
      });
  }

  refreshDataWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=eb16d064d3816182670320b527544012&units=metric')
      .then(response => response.json())
      .then(data => {
        if (data != null) {
          this.setState({ DataWeather: data.main });
        }

      });

  }



  refreshListGenre() {
    fetch("https://localhost:7248/api/News/getAllGenres")
      .then(response => response.json())
      .then(data => {
        this.setState({ ListGenre: data });
      });
  }



  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.refreshDataWeather();
    this.fetchDataFirst();
    this.refreshListGenre();
    this.refreshList();

  }

  handleClick = () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.Role_Name;
      console.log(token);
      console.log(userId);
      localStorage.removeItem('token');
    }


  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      currentTime: new Date(),
    });
  }
  render() {

    const { NewsFirst, hasMore, hasMore1, hasMore2, hasMore3, hasMore4, data, data1, data2, data3, dataall, NewsHome, ListGenre, NewsHomeByDate, DataWeather, currentTime, NewsId, PhotoPath, Advertis } = this.state;


    return (
      <div >
        <Header />
        
        <div id="content-wrapper" style={{ marginTop: "20px" }}>
          <div id="content">
            <a href={`/newsdetail/${NewsFirst.id}`}>
              <div className="feature clearfloat" id="lead">
                <img src={PhotoPath + NewsFirst.image} alt="" id="leadpic" />
                <h3>
                  <b>Mới Nhất</b><br />
                </h3>
                {NewsFirst.title}
                {NewsFirst.description}<br />
                More&raquo;
              </div>
            </a>
            <div id="leftcol">
              <h3>
                <a href="#">Features</a><br />
              </h3>
              <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={this.fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p></p>}
              >
                {data.map(item =>
                  <div key={item.id}>

                    <div className="feature">
                      <a href={`/newsdetail/${item.id}`} className="title"> {item.title}</a> <a href="#">
                        <img src={PhotoPath + item.image} alt="" /></a>

                      <p>{item.description}</p>
                    </div>

                  </div>

                )}
              </InfiniteScroll>


            </div>
            <div id="rightcol">
              <div className="clearfloat">
                {/* <h2><a href="#">Thể Thao</a></h2> */}
                <InfiniteScroll
                  dataLength={data1.length} //This is important field to render the next data
                  next={this.fetchData1}
                  hasMore={hasMore1}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p></p>}>
                  {data1.map(item1 => (

                    <a href={`/newsdetail/${item1.id}`}>
                      <div key={item1.id} className="clearfloatitem">
                        <img src={PhotoPath + item1.image} alt="" />{item1.title}
                        <p>{item1.description}</p>
                      </div>
                    </a>

                  ))}



                </InfiniteScroll>

              </div>
              <div className="clearfloat">
                {/* <h3><a href="#">Kinh Doanh</a></h3> */}
                <InfiniteScroll
                  dataLength={data1.length} //This is important field to render the next data
                  next={this.fetchData2}
                  hasMore={hasMore1}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p></p>}>
                  {data2.map(item2 => (

                    <a href={`/newsdetail/${item2.id}`}>
                      <div key={item2.id} className="clearfloatitem">
                        <img src={PhotoPath + item2.image} alt="" /> {item2.title}
                        <p>{item2.description}</p>
                      </div>
                    </a>


                  ))}



                </InfiniteScroll>
              </div>
              <div className="clearfloat">
                {/* <h3><a href="#">Du Lịch</a></h3> */}
                <InfiniteScroll
                  dataLength={data1.length} //This is important field to render the next data
                  next={this.fetchData3}
                  hasMore={hasMore2}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p></p>}>
                  {data3.map(item3 => (

                    <a href={`/newsdetail/${item3.id}`}>
                      <div key={item3.id} className="clearfloatitem">
                        <img src={PhotoPath + item3.image} alt="" />{item3.title}
                        <p>{item3.description}</p>
                      </div>
                    </a>

                  ))}



                </InfiniteScroll>   </div>
            </div>
          </div>
          <div id="sidebars">
            <InfiniteScroll
              dataLength={dataall.length} //This is important field to render the next data
              next={this.fetchDataAll}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p></p>}
            >
              {dataall.map(d => (

                <a href={`/newsdetail/${d.id}`}>
                  <div key={d.id}>
                    <a href="#"><img src="img/side-ad.png" alt="" className="ad" /></a>
                    <a href="#"><img src="img/side-ad.png" alt="" className="ad-right" /></a>
                    <a href="#"><img src="img/side-ad.png" alt="" className="ad" /></a>
                    <a href="#"><img src="img/side-ad.png" alt="" className="ad-right" /></a>

                    <h2 className="heading-blue"></h2>
                    <img width={255} height={150} src={PhotoPath + d.image} alt="" />
                    <h3>{d.title}</h3>
                    <p>Read More &raquo;</p>
                    <img src="img/casey.jpg" alt="" className="ad" /> <img src="img/hobo.jpg" alt="" className="ad-right" />
                  </div>
                </a>
              ))}
            </InfiniteScroll>
          </div>

        </div>

        <Footer />

      </div>
    )
  }
}
export default withRouter(Home);