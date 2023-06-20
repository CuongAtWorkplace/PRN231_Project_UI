
import React, { Component, useState } from "react";
import "./home.css"
import { Link } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom';
import Header from "./Header";
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
        }
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



    refreshListByDate() {
        fetch("https://localhost:7248/api/News/getNewsByDate")
            .then(response => response.json())
            .then(data => {
                this.setState({ NewsHomeByDate: data });
            });
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.refreshDataWeather();
        this.refreshListGenre();
        this.refreshList();
        this.refreshListByDate();
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

        const { NewsHome, ListGenre, NewsHomeByDate, DataWeather,currentTime, NewsId } = this.state;

       

        return (
            <div className="App">
                {/* <div id="top">
                    <ul id="right">
                        <li><a href="#">{DataWeather.temp}</a></li>
                        <li><a href="#">Submit a Story</a></li>
                        <li><a href="#">Login</a></li>
                        <li><button onClick={this.handleClick}>Support</button></li>
                    </ul>
                    <ul id="left">
                        <li><a href="#">LOGO | </a></li>
                        <li><a href="#">Chủ Nhật |{currentTime.toLocaleDateString()} |{currentTime.toLocaleTimeString()}</a></li>
                        <li><a href="#"> Ha Noi   {DataWeather.temp} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud" viewBox="0 0 16 16">
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg></a></li>

                    </ul>
                </div>
                <div id="header">
                    <div id="logo"> <a href="#"><img src="img/wireframe/logo.png" alt="" /></a> </div>
                    <div id="ad"> <img src="img/ad-blank.png" alt="" /> </div>
                </div>
                <div id="nav">


                    <li><a href="/home">Home</a></li>
                    {ListGenre.map(gen =>
                        <ul key={gen.id}>

                            <li><a href={`/newsbygenre/${gen.id}`}>{gen.genreName}</a></li>
                        </ul>
                    )}

                </div>
                <div id="sub-nav">
                    <ul>
                        <li class="title">Stay in the know:</li>
                        <li><a href="#">Blogs</a></li>
                        <li>|</li>
                        <li><a href="#">Video Gallery</a></li>
                        <li>|</li>
                        <li><img src="img/icons/rss.png" alt="" /><a href="#">Subscribe</a></li>
                        <li>|</li>
                        <li><img src="img/icons/twitter.png" alt="" /><a href="#">Twitter</a></li>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Launch demo modal
                        </button>
                    </ul>
                </div> */}
                    <Header/>
                <div id="content-wrapper">
                    <div id="content">

                        {NewsHome.map

                        }

                        <div class="feature clearfloat" id="lead">
                            <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-zQfyRzI4bm_31zRRBKBPPjapxMgtc_YSYnnBHBI6iT7LLf4Prooy7t1w0Z2CFkef5z8&usqp=CAU" alt="" id="leadpic" /></a>
                            <h3>
                                <a href="#">Lead Story</a><br />
                            </h3>
                            <a href="#" class="title"> Aliquam euismod dolor in hendrerit in vulputate </a>
                            <p>You are viewing the demo for Mimbo v2.1, now <a href="#">available for download</a>. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.</p>
                            {<a href="#">More&raquo;</a>}
                        </div>
                        <div id="leftcol">
                            <h3>
                                <a href="#">Features</a><br />
                            </h3>
                            {NewsHome.map(item =>
                                <div key={item.id}>

                                    <div class="feature">
                                        <a href={`/newsdetail/${item.id}`} class="title"> {item.title}</a> <a href="#">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwh9idTcHa2phpbCAWTfpAYkqcx1vrnQnXMfN20YEKhLJgZjeF3PWWpc8c7HI1PGxF5cM&usqp=CAU" alt="" /></a>

                                        <p>{item.description}</p>
                                    </div>

                                </div>

                            )}

                        </div>
                        <div id="rightcol">
                            <div class="clearfloat">
                                <h3><a href="#">Thể Thao</a></h3>
                                <div class="clearfloatitem">
                                <a href="#"><img src="images/iphone.jpg" alt="" /></a> <a href="#" class="title">Hendrerit S</a>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                                </div>
                                <div class="clearfloatitem">
                                <a href="#"><img src="images/iphone.jpg" alt="" /></a> <a href="#" class="title">Hendrerit Sed </a>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                                </div>
                                <div class="clearfloatitem">
                                <a href="#"><img src="images/iphone.jpg" alt="" /></a> <a href="#" class="title">Hendrerit Sed Diam Ullamc</a>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                                </div>
                             </div>
                            <div class="clearfloat">
                                <h3><a href="#">Kinh Doanh</a></h3>
                                <a href="#"><img src="images/mark.jpg" alt="" /></a> <a href="#" class="title">Diam nonummy nibh euismod&raquo;</a>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                            </div>
                            <div class="clearfloat">
                                <h3><a href="#">Du Lịch</a></h3>
                                <a href="#"><img src="images/shoes.jpg" alt="" /></a> <a href="#" class="title">Erat volutpat ut wisi&raquo;</a>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidun. Adipiscing elit, sed diam nonummy nibh euismod tincidun. Sed diam nonummy nibh euismod tincidun.</p>
                            </div>
                        </div>
                    </div>
                    <div id="sidebars">
                        {NewsHomeByDate.map(date =>


                            <div key={date.key}>
                                <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a>

                                <h2 class="heading-blue"></h2>
                                <img src="img/wayne.jpg" alt="" />
                                <h3><a href="#">{date.title}</a></h3>
                                <p><a href="#">More headlines &raquo;</a></p>
                           
                                <img src="img/casey.jpg" alt="" class="ad" /> <img src="img/hobo.jpg" alt="" class="ad-right" />
                             

                            </div>
                        )}
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
                {/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                </div> */}
            </div>
        )
    }
}
export default withRouter(Home);