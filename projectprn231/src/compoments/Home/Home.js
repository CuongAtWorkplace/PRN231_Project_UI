import React, { Component ,useState } from "react";
import "./home.css"
import { Link } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            NewsHome: [],
            ListGenre: [],
            NewsHomeByDate: [],
            NewsId: 0,
            email:'',
            password:'',
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/News/getAllNews")
            .then(response => response.json())
            .then(data => {
                this.setState({ NewsHome: data });
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

        
        this.refreshListGenre();
        this.refreshList();
        this.refreshListByDate();
    }
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
      };
    
      handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
      };
    
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const history = useHistory();
     handleLogin =  () => {
        const { email, password } = this.state;
      try {
        const response =  fetch('https://localhost:7248/api/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data =  response.json();
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
        const { NewsHome, ListGenre, NewsHomeByDate, NewsId } = this.state;
        return (
            <div className="App">
                <div id="top">
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Submit a Story</a></li>
                        <li><a href="#">Feedback</a></li>
                        <li><a onClick={this.handleClick}>Support</a></li>
                    </ul>
                </div>
                <div id="header">
                    <div id="logo"> <a href="#"><img src="img/wireframe/logo.png" alt="" /></a> </div>
                    <div id="ad"> <img src="img/ad-blank.png" alt="" /> </div>
                </div>
                <div id="nav">
                    {ListGenre.map(gen =>
                        <ul key={gen.id}>
                            <li><a href="#">{gen.genreName}</a></li>

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
                </div>

                <div id="content-wrapper">
                    <div id="content">

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

                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                                    </div>

                                </div>

                            )}

                        </div>
                        <div id="rightcol">
                            <div class="clearfloat">
                                <h3><a href="#">Gadgets</a></h3>
                                <a href="#"><img src="images/iphone.jpg" alt="" /></a> <a href="#" class="title">Hendrerit Sed Diam Ullamcorper&raquo;</a>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                            </div>
                            <div class="clearfloat">
                                <h3><a href="#">Music</a></h3>
                                <a href="#"><img src="images/mark.jpg" alt="" /></a> <a href="#" class="title">Diam nonummy nibh euismod&raquo;</a>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                            </div>
                            <div class="clearfloat">
                                <h3><a href="#">Style</a></h3>
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
                                <h2 class="heading">Celebrity Sightings</h2>
                                <img src="img/casey.jpg" alt="" class="ad" /> <img src="img/hobo.jpg" alt="" class="ad-right" />
                                <h2 class="heading">In the Community</h2>

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
									<input type="email" class="form-control" required="" id="email2"   value={this.state.email}
                              onChange={this.handleEmailChange} placeholder="Email Address *"/>
								</div>
							</div>
							<div class="formsix-e">
								<div class="form-group i-password">
									<input type="password" class="form-control" required="" id="password2" value={this.state.password}
                              onChange={this.handlePasswordChange} placeholder="Password *"/>
								</div>
							</div>
							<div class="login_remember_box">
								<label class="control control--checkbox">Remember me
									<input type="checkbox"/>
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
export default withRouter(Home);