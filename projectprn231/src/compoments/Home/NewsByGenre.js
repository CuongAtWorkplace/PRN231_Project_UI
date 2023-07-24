import React, { Component } from "react";
import "./home.css"
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import jwtDecode from 'jwt-decode';
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./Header";
import Footer from "./Footer";
class NewsByGenre extends Component {
    constructor(props) {
        super(props);

        this.state = {
            NewsByGenre: [],
            NewsHome: [],
            ListGenre: [],
            NewsHomeByDate: [],
            NewsId: 0,
            email: '',
            password: '',
            data: [], // Array to hold the data
            dataList:[],
            page: 1, // Current page of data
            page1:1,
            hasMore: true,
            hasMore1:true,
        }
    }

    fetchData = () => {
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
              data: [...prevState.data, ...newdata], // Appending new items to the existing array
              page: prevState.page + 1, // Incrementing the page number
              // Checking if there are more items to load
            }));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }

        fetchDataList = () =>{
            const { page1 } = this.state;
            const { Gid } = this.props.match.params;
        // Make an API call to fetch data
        fetch(`https://localhost:7248/api/News/getNewByGenreId?page=${page1}&id=${Gid}`)
          .then(response => response.json())
          .then(newdata => {
           
            if (newdata.length === 0) {
                this.setState({ hasMore1: false });
                return;
              }
            this.setState(prevState => ({
                dataList : [...prevState.dataList, ...newdata], // Appending new items to the existing array
                page1: prevState.page1 + 1, // Incrementing the page number
              // Checking if there are more items to load
            }));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }
    refreshListByGenre() {
        const { Gid } = this.props.match.params;
        fetch(`https://localhost:7248/api/News/getNewByGenreId?id=${Gid}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ NewsByGenre: data });
            });
    }
   
   
    componentDidMount() {  
     
        this.refreshListByGenre();
      
      
    };
   
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
    render() {
        const { NewsHome, ListGenre, NewsHomeByDate, dataList,NewsByGenre,data,hasMore ,hasMore1} = this.state;
      
        return (
            <div className="App">
                 <Header/>
                <div id="content-wrapper"style={{marginTop:"20px"}}>
                    <div id="content">
                    <InfiniteScroll
                     dataLength={dataList.length} //This is important field to render the next data
                     next={this.fetchDataList}
                     hasMore={hasMore1}
                     loader={<h4>Loading...</h4>}
                     endMessage={<p>No more data to load.</p>}
                    >
                            {dataList.map(news =>
                            <div key={news.key}>
                                <div class="row p-2 bg-white border rounded">
                                    <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="https://i.imgur.com/QpjAiHq.jpg" /></div>
                                    <div class="col-md-9 mt-1">
                                        <h5> <a href={`/newsdetail/${news.id}`}>{news.title}</a> </h5>
                                        <p class="">{news.description}<br /><br /></p>
                                    </div>

                                </div>
                            </div>

                        )}
                             </InfiniteScroll>
                    </div>
                     <div id="sidebars">
                    <InfiniteScroll
                     dataLength={data.length} //This is important field to render the next data
                     next={this.fetchData}
                     hasMore={hasMore}
                     loader={<h4>Loading...</h4>}
                     endMessage={<p>No more data to load.</p>}
                    >
                       
                        {data.map(date=>(


                            <div key={date.id}>
                                <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a>

                                <h2 class="heading-blue"></h2>
                                <img src="img/wayne.jpg" alt="" />
                                <h3><a href="#">{date.title}</a></h3>
                                <p><a href="#">More headlines &raquo;</a></p>
                                <h2 class="heading">Celebrity Sightings</h2>
                                <img src="img/casey.jpg" alt="" class="ad" /> <img src="img/hobo.jpg" alt="" class="ad-right" />
                                <h2 class="heading">In the Community</h2>

                            </div>
                       ) )}
                  
                    </InfiniteScroll>
                      </div>

                </div>
                
                <Footer/>
            </div>
        )
    }
}
export default withRouter(NewsByGenre);