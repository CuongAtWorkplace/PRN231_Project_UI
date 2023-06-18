import React, { Component } from "react";
import "./home.css"
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import jwtDecode from 'jwt-decode';
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./Header";
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
            page: 1, // Current page of data
            hasMore: true,
        }
    }
    fetchData = () => {
        const { page,data } = this.state;
        const apiUrl = `https://localhost:7248/api/News/GetData/data?pageSize=${page}`;
    
        // Make an API call to fetch data
        fetch(`https://localhost:7248/api/News/GetData/data?page=${page}`)
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

        
    refreshListByGenre() {
        const { Gid } = this.props.match.params;
        fetch(`https://localhost:7248/api/News/getNewByGenreId?id=${Gid}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ NewsByGenre: data });
            });
    }
    refreshListByDate() {
        fetch("https://localhost:7248/api/News/getNewsByDate")
            .then(response => response.json())
            .then(data => {
                this.setState({ NewsHomeByDate: data });
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
     
        this.refreshListByGenre();
        this.refreshListGenre();
      
    };
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
      };
    
      handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
      };
    handleLogin = () => {
        const { email, password } = this.state;
        try {
            const response = fetch('https://localhost:7248/api/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = response.json();
                const token = data.token;


                localStorage.setItem('token', token);
                const storedData = localStorage.getItem('token');

                const decodedToken = jwtDecode(token);

                // Lấy giá trị từ payload
                const userId = decodedToken.Role_Name;
                alert(userId);

                console.log('Đăng nhập thành công');


            } else {
                // Xử lý lỗi đăng nhập, hiển thị thông báo lỗi cho người dùng
                console.log('Đăng nhập thất bại');
            }
        } catch (error) {
            // Xử lý lỗi gọi API
            console.log('Lỗi gọi API', error);
        }

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
        const { NewsHome, ListGenre, NewsHomeByDate, NewsByGenre,data,hasMore } = this.state;
        console.log(data);
        return (
            <div className="App">
                 <Header/>

                <div id="content-wrapper">
                    <div id="content">
                       
                            {NewsByGenre.map(news =>
                            <div key={news.key}>
                                <div class="row p-2 bg-white border rounded">

                                    <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="https://i.imgur.com/QpjAiHq.jpg" /></div>
                                    <div class="col-md-9 mt-1">
                                        <h5> <a href={`/newsdetail/${news.id}`}>{news.title}</a> </h5>
                                        <div class="d-flex flex-row">
                                            <div class="ratings mr-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>
                                        </div>
                                        <p class="">{news.description}<br /><br /></p>
                                    </div>

                                </div>
                            </div>

                        )}
                      
                        


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
                <div id="extras">
                    <div id="recommended">
                        <h2 class="heading">Recommended Stories</h2>
                        <ul>

                            <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                            <li class="last"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                        </ul>
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
                <div id="footer">
                    <ul>
                        <li>&copy;2010 <a href="#">Name Here</a></li>
                        <li>|</li>
                        <li><a href="#">FAQ</a></li>
                        <li>|</li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li>|</li>
                        <li><a href="#">Careers</a></li>
                        <li>|</li>
                        <li><a href="#">Advertise</a></li>
                        <li>|</li>
                        <li><a href="#">Sitemap</a></li>
                        <li>|</li>
                        <li>Designed by <a href="http://www.skyrocketlabs.com/">Skyrocket Labs</a></li>
                    </ul>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">


                                <div class="login_wrapper">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
                                            <a href="#" class="btn btn-primary facebook"> <span>Login with Facebook</span> <i class="fa fa-facebook"></i> </a>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
                                            <a href="#" class="btn btn-primary google-plus"> Login  with Google <i class="fa fa-google-plus"></i> </a>
                                        </div>
                                    </div>
                                    <h2>or</h2>
                                    <div class="formsix-pos">
                                        <div class="form-group i-email">
                                            <input type="email" class="form-control" required="" id="email2" value={this.state.email}
                                                onChange={this.handleEmailChange} placeholder="Email Address *" />
                                        </div>
                                    </div>
                                    <div class="formsix-e">
                                        <div class="form-group i-password">
                                            <input type="password" class="form-control" required="" id="password2" value={this.state.password}
                                                onChange={this.handlePasswordChange} placeholder="Password *" />
                                        </div>
                                    </div>
                                    <div class="login_remember_box">
                                        <label class="control control--checkbox">Remember me
                                            <input type="checkbox" />
                                            <span class="control__indicator"></span>
                                        </label>
                                        <a href="#" class="forget_password">
                                            Forgot Password
                                        </a>
                                    </div>
                                    <div class="login_btn_wrapper">
                                        <a href="#" class="btn btn-primary login_btn"> Login </a>
                                        <button type="submit" onClick={this.handleLogin} class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                    </div>
                                    <div class="login_message">
                                        <p>Don&rsquo;t have an account ? <a href="#"> Sign up </a> </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(NewsByGenre);