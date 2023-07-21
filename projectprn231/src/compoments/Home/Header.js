import React, { Component } from "react";
import "./home.css"
import { withRouter,Route } from "react-router-dom/cjs/react-router-dom";
import jwtDecode from 'jwt-decode'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import SaveNews from "../User/SaveNews";

class Header extends Component {
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
            nameUser: '',
            showModal: false,
            Profile: null, 
            tokenFromSocial: '',
            IsLogin : false,
            PhotoFileName: '',
        }
    }
    imageUpload = (e) => {
        e.preventDefault();

        this.setState({
            ImageCover: e.target.files[0].name
        })
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch('https://localhost:7248/api/WritingTask/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoFileName: data });
            })
    }
    refreshListGenre() {
        fetch("https://localhost:7248/api/News/getAllGenres")
            .then(response => response.json())
            .then(data => {
                this.setState({ ListGenre: data });
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
    tick() {
        this.setState({
            currentTime: new Date(),
        });
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.refreshDataWeather();
        this.refreshListGenre();
       
    }

    handleClick = () => {
       
        localStorage.removeItem('token');
    };
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const history = useHistory();
    handleLogin = async () => {
        const { email, password } = this.state;
        try {
            const response = await fetch(`https://localhost:7248/api/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {

                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);

                const decodedToken = jwtDecode(token);
                console.log(token);

                this.setState({ nameUser: decodedToken.FullName });
                this.setState({ showModal: false , IsLogin : true})

                console.log('Đăng nhập thành công');
                console.log(token);

                // this.setState({ nameUser: decodedToken.FullName });
                // this.setState({ showModal: false })
                
              
                alert("ok");
              


            } else {
                // Xử lý lỗi đăng nhập, hiển thị thông báo lỗi cho người dùng
                console.log(email);
                console.log(password);
                console.log('Đăng nhập thất bại');

            }
        } catch (error) {
            // Xử lý lỗi gọi API
            console.log('Lỗi gọi API', error);
        }

    };
    handleShow = () => {
        this.setState({ showModal: true })
    }
    handleClose = () => {
        this.setState({ showModal: false })
    }
    render() {
      
        const { PhotoFileName , IsLogin, NewsHome, ListGenre, NewsHomeByDate, DataWeather, currentTime, NewsId, nameUser, email, password, showModal } = this.state;
        
        return (
            <div>
                <div id="top">
                    <ul id="right">
                        <li><a href="#">Hello {nameUser}</a></li>
                        {/* <li> <button onClick={this.handleClickName} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Login
                        </button></li> */}

                         <Button variant="secondary" onClick={this.handleShow} />
                      
                        <li><a href="#">Hello { nameUser}</a></li>
                        {/* <li> <button onClick={this.handleClickName} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Login
                        </button></li> */}
                      
                     
                        {/* <li> <button onClick={this.handleClickName} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Login
                        </button></li> */}
                        { IsLogin == false  &&
                            <Button type="button" variant="secondary" onClick={this.handleShow}>
                            Login
                        </Button>
                        }
                         { IsLogin == true  &&
                             <Button variant="secondary" onClick={this.handleClick}>
                             Logout
                         </Button>
                        }
                        {/* <li><button onClick={this.handleClick}>Logout</button></li> */}
                       
                    </ul>
                    <ul id="left">
                        <li><a href="/">LOGO  </a></li>
                        <li><a href="#">Chủ Nhật |{currentTime.toLocaleDateString()} |{currentTime.toLocaleTimeString()}</a></li>
                        <li><a href="#"> Ha Noi :  {DataWeather.temp} °C <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud" viewBox="0 0 16 16">
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg></a></li>

                    </ul>
                </div>
                <div id="header">
                    <div id="logo"> <a href="#"><img src="img/wireframe/logo.png" alt="" /></a> </div>
                    <div id="ad"> <img src="img/ad-blank.png" alt="" /> </div>
                </div>
                <div id="nav">
                    {ListGenre.slice(0, 5).map(gen =>
                        <ul key={gen.id}>

                            <li><a href={`/newsbygenre/${gen.id}`}>{gen.genreName}</a></li>
                        </ul>
                    )}

                </div>
               


                <Modal
                    show={showModal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                       
                    </Modal.Header>
                    <Modal.Body>

                        <div class="modal-body">


                            <div class="login_wrapper">
                                <div class="row">
                                    <div>
                                        {/* <a href="#" class="btn btn-primary facebook"> <span>Login with Facebook</span> <i class="fa fa-facebook"></i> </a> */}
                                        <GoogleOAuthProvider clientId="186729364333-sfd6o0oe4ud91dllo9t4s2p834kjj53e.apps.googleusercontent.com">
                                            <GoogleLogin
                                                onSuccess={credentialResponse => {
                                                    console.log(credentialResponse);
                                                    this.setState({
                                                        Profile: credentialResponse,
                                                        tokenFromSocial: credentialResponse.credential
                                                    })
                                                    //localStorage.setItem('token', tokenFromSocial);
                                                }}
                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}
                                            />
                                        </GoogleOAuthProvider>
                                    </div>
                                    <div>
                                        {/* <a href="#" class="btn btn-primary google-plus"> Login  with Google <i class="fa fa-google-plus"></i> </a> */}
                                        <LoginSocialFacebook
                                            appId="233542922769686"
                                            onResolve={(response) => {
                                                console.log(response)
                                                this.setState({ Profile: response.data, tokenFromSocial: response.data.accessToken });
                                                //localStorage.setItem('token', tokenFromSocial);
                                            }}
                                            
                                            onReject={(error) => {
                                                console.log(error)
                                            }}
                                        >
                                            <FacebookLoginButton />
                                        </LoginSocialFacebook>
                                    </div>
                                </div>
                                <h2>or</h2>
                                <form >


                                    <div class="formsix-pos">
                                        <div class="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" value={email}
                                                onChange={this.handleEmailChange} placeholder="Email Address *" />
                                        </div>
                                    </div>
                                    <div class="formsix-e">
                                        <div class="form-group i-password">
                                            <input type="password" class="form-control" required="" id="password2" value={password}
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
                                       
                                        <button type="button" onClick={this.handleLogin} class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                    </div>
                                </form>
                                <div class="login_message">
                                    <p>Don&rsquo;t have an account ? <a href="#"> Sign up </a> </p>
                                </div>

                            </div>
                        </div>


                    </Modal.Body>
                   
                </Modal>

            </div>
        )
    }
}


export default withRouter(Header);