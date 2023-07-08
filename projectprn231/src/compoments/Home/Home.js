
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
      page: 1, // Current page of data
      hasMore: true,
      NewsFirst: {},

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
    const { page } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreFirst?page=${page}`)
      .then(response => response.json())
      .then(newdata => {

        if (newdata.length === 0) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState(prevState => ({
          data: [...prevState.data, ...newdata], // Appending new items to the existing array
          page: prevState.page + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  fetchData1 = () => {
    const { page } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreSecond?page=${page}`)
      .then(response => response.json())
      .then(newdata1 => {

        if (newdata1.length === 0) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState(prevState => ({
          data1: [...prevState.data1, ...newdata1], // Appending new items to the existing array
          page: prevState.page + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  fetchData2 = () => {
    const { page } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreFirst?page=${page}`)
      .then(response => response.json())
      .then(newdata => {

        if (newdata.length === 0) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState(prevState => ({
          data2: [...prevState.data2, ...newdata], // Appending new items to the existing array
          page: prevState.page + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  fetchData3 = () => {
    const { page } = this.state;

    // Make an API call to fetch data
    fetch(`https://localhost:7248/api/News/getNewByGenreThree?page=${page}`)
      .then(response => response.json())
      .then(newdata => {

        if (newdata.length === 0) {
          this.setState({ hasMore: false });
          return;
        }
        this.setState(prevState => ({
          data3: [...prevState.data3, ...newdata], // Appending new items to the existing array
          page: prevState.page + 1, // Incrementing the page number
          // Checking if there are more items to load
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  fetchDataFirst() {
    fetch("https://localhost:7248/api/News/getNewsFirst")
      .then(response => response.json())
      .then(data => {
        this.setState({ NewsFirst: data });
      })
      .catch(error => {
        console.error('Error fetching object:', error);
      });
  }


  refreshList() {
    fetch("https://localhost:7248/api/News/getAllNews")
      .then(response => response.json())
      .then(data => {
        this.setState({ NewsHome: data });
      });
  }

  refreshDataWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=eb16d064d3816182670320b527544012&units=metric`)
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



  // refreshListByDate() {
  //     fetch("https://localhost:7248/api/News/getNewsByDate")
  //         .then(response => response.json())
  //         .then(data => {
  //             this.setState({ NewsHomeByDate: data });
  //         });
  // }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.refreshDataWeather();
    this.fetchDataFirst();
    this.refreshListGenre();
    this.refreshList();

  }

  handleClick = () => {
    const token = localStorage.getItem("token");

    // localStorage.getItem('token', token);
    //  const storedData = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);


    const userId = decodedToken.Role_Name;
    console.log(token);
    console.log(userId);
    localStorage.removeItem('token');
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

    const { NewsFirst, hasMore, data, data1, data2, data3, dataall, NewsHome, ListGenre, NewsHomeByDate, DataWeather, currentTime, NewsId } = this.state;


    return (
      <div className="App">

        <Header />
        <div id="content-wrapper">
          <div id="content">

            {NewsHome.map

            }

            <div class="feature clearfloat" id="lead">
              <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-zQfyRzI4bm_31zRRBKBPPjapxMgtc_YSYnnBHBI6iT7LLf4Prooy7t1w0Z2CFkef5z8&usqp=CAU" alt="" id="leadpic" /></a>
              <h3>
                <a href="#">Lead Sto {NewsFirst.title}</a><br />
              </h3>
              <a href="#" class="title"> {NewsFirst.title} </a>
              <a> {NewsFirst.description}</a><br />
              {<a href="#">More&raquo;</a>}
            </div>
            <div id="leftcol">
              <h3>
                <a href="#">Features</a><br />
              </h3>
              <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={this.fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more data to load.</p>}
              >
                {data.map(item =>
                  <div key={item.id}>

                    <div class="feature">
                      <a href={`/newsdetail/${item.id}`} class="title"> {item.title}</a> <a href="#">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwh9idTcHa2phpbCAWTfpAYkqcx1vrnQnXMfN20YEKhLJgZjeF3PWWpc8c7HI1PGxF5cM&usqp=CAU" alt="" /></a>

                      <p>{item.description}</p>
                    </div>

                  </div>

                )}
              </InfiniteScroll>


            </div>
            <div id="rightcol">
              <div class="clearfloat">
                <h3><a href="#">Thể Thao</a></h3>
                <InfiniteScroll
                  dataLength={data1.length} //This is important field to render the next data
                  next={this.fetchData1}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p>No more data to load.</p>}>
                  {data1.map(item1 => (
                    <div key={item1.id} class="clearfloatitem">
                      <a href="#"><img src="images/iphone.jpg" alt="" /></a> <a href="#" class="title">{item1.title}</a>
                      <p>{item1.description}</p>
                    </div>
                  ))}



                </InfiniteScroll>

              </div>
              <div class="clearfloat">
                <h3><a href="#">Kinh Doanh</a></h3>
                <InfiniteScroll
                  dataLength={data1.length} //This is important field to render the next data
                  next={this.fetchData2}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p>No more data to load.</p>}>
                  {data2.map(item2 => (
                    <div key={item2.id} class="clearfloatitem">
                      <a href="#"><img src="images/iphone.jpg" alt="" /></a> <a href="#" class="title">{item2.title}</a>
                      <p>{item2.description}</p>
                    </div>
                  ))}



                </InfiniteScroll>
              </div>
              <div class="clearfloat">
                <h3><a href="#">Du Lịch</a></h3>
                <InfiniteScroll
                  dataLength={data1.length} //This is important field to render the next data
                  next={this.fetchData3}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p>No more data to load.</p>}>
                  {data3.map(item3 => (
                    <div key={item3.id} class="clearfloatitem">
                      <a href="#"><img src="images/iphone.jpg" alt="" /></a> <a href="#" class="title">{item3.title}</a>
                      <p>{item3.description}</p>
                    </div>
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
              endMessage={<p>No more data to load.</p>}
            >

              {dataall.map(d => (


                <div key={d.id}>
                  <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a>

                  <h2 class="heading-blue"></h2>
                  <img src="img/wayne.jpg" alt="" />
                  <h3><a href="#">{d.title}</a></h3>
                  <p><a href="#">More headlines &raquo;</a></p>
                  <h2 class="heading">Celebrity Sightings</h2>
                  <img src="img/casey.jpg" alt="" class="ad" /> <img src="img/hobo.jpg" alt="" class="ad-right" />
                  <h2 class="heading">In the Community</h2>

                </div>
              ))}

            </InfiniteScroll>
          </div>

        </div>
        <div id="extras">
          <div id="recommended">
            <h2 class="heading">Recommended Stories</h2>
            {NewsHome.slice(0, 5).map(news => (
              <div>
                <ul>
                  <li><a href="#">{news.title}</a></li>
                </ul>
              </div>
            ))}

          </div>
          <div id="programs">
            <h2 class="heading">What's On Tonight</h2>
            <img src="img/rick.jpg" alt="" /> <img src="img/cbc.png" alt="" />
          </div>
          <div id="cartoon">
            <h2 class="heading">Humour</h2>
            <img src="img/cartoon.jpg" alt="" />
          </div>
        </div>
        <Footer />

      </div>
    )
  }
}
export default withRouter(Home);