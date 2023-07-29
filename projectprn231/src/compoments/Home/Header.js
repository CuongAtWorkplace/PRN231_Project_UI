import React, { Component } from "react";
import "./home.css"
import { withRouter, Route } from "react-router-dom/cjs/react-router-dom";
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
            IsLogin: false,
            PhotoFileName: '',
            search: '',
            count: 0,
            Advertis: {},
            PhotoPath: 'https://localhost:7248/Photos/',


            showModalSignUp: false,
            phone: '',
            address: '',
            fullname: '',
            noti: false,
            checkEmail: false,
            checkLogin: true,
            count: 0
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
        fetch('https://localhost:7248/api/News/getAllGenres')
            .then(response => response.json())
            .then(data => {
                this.setState({ ListGenre: data });
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

    refreshDataWeather() {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=eb16d064d3816182670320b527544012&units=metric')
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

        try {
            const token = localStorage.getItem('token');
            if (token != null && token != '') {
                const decodedToken = jwtDecode(token);
                this.setState({ nameUser: decodedToken.name });
                this.setState({ showModal: false, IsLogin: true });
                this.CheckExist(token);
            }
        } catch (error) {

        }
    }

    CheckExist() {
        try {
            const token = localStorage.getItem('token');
            if (token != null && token != '') {
                const decodedToken = jwtDecode(token);
                fetch("https://localhost:7248/api/User/GetUserByEmail?email=" + decodedToken.email + "&fullname=" + decodedToken.name, {
                    method: 'POST',
                    headers: {

                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem('id', data);
                    });
            }
        } catch (error) {

        }

        // try {
        //     const name = localStorage.getItem('nameFb');
        //     const email =localStorage.getItem('emailFb');
        //     fetch("https://localhost:7248/api/User/GetUserByEmail?email="+email+"&fullname="+name, {
        //             method: 'POST',
        //             headers: {

        //             },
        //         })
        //             .then(response => response.json())
        //             .then(data => {

        //             });
        // } catch(error) {

        // }
    }

    handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roleid');
        localStorage.removeItem('id');

        this.setState({ showModalSignUp: false })

        this.setState({ IsLogin: false })
        window.location.href = "/";

    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };
    handleFullNameChange = (e) => {
        this.setState({ fullname: e.target.value });
    };
    handleAddressChange = (e) => {
        this.setState({ address: e.target.value });
    };
    handlePhoneChange = (e) => {
        this.setState({ phone: e.target.value });
    };

    handleLogin = async () => {
        const { email, password, } = this.state;
        try {
            const response = await fetch('https://localhost:7248/api/Login', {
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
                localStorage.setItem('id', decodedToken.id);
                localStorage.setItem('roleid', decodedToken.roleid);

                this.setState({ nameUser: decodedToken.fullname });
                this.setState({ showModal: false, IsLogin: true })
                this.setState({ checkLogin: true });

                if (decodedToken.roleid == 2) {
                    window.location.href = "/";
                }
                if (decodedToken.roleid == 1 || decodedToken.roleid == 3 || decodedToken.roleid == 4 || decodedToken.roleid == 5) {
                    window.location.href = "/manager";
                }
            } else {
                console.log('Đăng nhập thất bại');
                this.setState({ checkLogin: false });
            }
        } catch (error) {
            console.log('Lỗi gọi API', error);
        }

    };

    checkEmailExist = () => {
        const { email } = this.state;

        fetch(`https://localhost:7248/api/User/GetUserByEmail?email=${email}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ checkEmail: true });
            })
            .catch(error => {
                console.error('Error fetching object:', error);
            });

    }
    handleSignUp = async () => {
        this.checkEmailExist();

        if (this.state.checkEmail == false) {
            const { email, password, fullname, address, phone } = this.state;
            try {
                const response = await fetch(`https://localhost:7248/api/User/InsertUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, fullname, address, phone }),
                });

                if (response.ok) {

                    this.setState({ showModalSignUp: false });
                    this.setState({ showModal: true });
                    this.setState({ noti: true });

                }
            } catch (error) {
                // Xử lý lỗi gọi API
                console.log('Lỗi gọi API', error);
                // this.handleSignUp2();
            }
        } else {
            this.setState({ showModalSignUp: true });

        }
    };
    handleCall = () => {
        this.handleSignUp();
    };

    handleSignUp2 = async () => {
        this.checkEmailExist();

        if (this.state.checkEmail == false) {
            const { email, password, fullname, address, phone } = this.state;
            try {
                const response = await fetch(`https://localhost:7248/api/User/InsertUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, fullname, address, phone }),
                });

                if (response.ok) {

                    this.setState({ showModalSignUp: false });
                    this.setState({ showModal: true });
                    this.setState({ noti: true });

                }
            } catch (error) {
                // Xử lý lỗi gọi API
                console.log('Lỗi gọi API', error);
            }
        } else {
            this.setState({ showModalSignUp: true, checkEmail: false });

        }
    };

    handleShow = () => {
        this.setState({ showModal: true })
    }
    handleShoSignUp = () => {
        this.setState({ showModalSignUp: true, showModal: false })
    }
    handleClose = () => {
        this.setState({ showModal: false });
        this.setState({ showModalSignUp: false })
    }
    ChangeSearchValue(e) {
        this.setState({
            search: e.target.value
        })
    }
    SearchAccount(event) {
        if (this.state.search == "") {
            return;
        }

        if (event.key === 'Enter') {
            window.location.href = `/search/${this.state.search}`;
        }
    }
    render() {
        const { checkLogin, fullname, address, checkEmail, phone, PhotoFileName, noti, showModalSignUp, IsLogin, NewsHome, ListGenre, NewsHomeByDate, DataWeather, currentTime, NewsId, nameUser, email, password, showModal, Advertis, PhotoPath } = this.state;


        return (
            <div>
                <div id="top" >
                    <ul id="right" style={{ display: 'flex' }}>
                        <div>
                            <input type="text" value={this.state.search} onChange={(e) => this.ChangeSearchValue(e)} placeholder="Search  ... " onKeyDown={(event) => this.SearchAccount(event)} />

                            {IsLogin == true &&

                                <li><a href="/user">Hello  {nameUser}| </a></li>
                            }
                            {IsLogin == false &&
                                <a type="button" variant="secondary" onClick={this.handleShow}>
                                    Login
                                </a>
                            }

                            {IsLogin == true &&

                                <a variant="secondary" onClick={this.handleClick}>
                                    Logout
                                </a>
                            }
                        </div>

                    </ul>
                    <ul id="left">
                        <li><a href="/">LOGO  </a></li>
                        <li><a href="#">Chủ Nhật |{currentTime.toLocaleDateString()} |{currentTime.toLocaleTimeString()}</a></li>
                        <li><a href="#"> Ha Noi :  {DataWeather.temp} °C <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud" viewBox="0 0 16 16">
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg></a></li>

                    </ul>
                </div>
                <div id="header">
                    <div id="logo"> <a href="#"><img src="img/wireframe/logo.png" alt="" /></a> </div>
                    <div id="ad"> <img src="img/ad-blank.png" alt="" /> </div>
                </div>

                <a href="https://daihoc.fpt.edu.vn/">
                    <div className="container" style={{ marginLeft: '300px' }}>
                        <img width={900} height={100} src={PhotoPath + Advertis.image}></img>
                    </div>
                </a>
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

                        <div className="modal-body">


                            <div className="login_wrapper">
                                <div className="row">
                                    <div>

                                        <GoogleOAuthProvider clientId="186729364333-sfd6o0oe4ud91dllo9t4s2p834kjj53e.apps.googleusercontent.com">
                                            <GoogleLogin
                                                onSuccess={credentialResponse => {
                                                    console.log(credentialResponse);
                                                    this.setState({
                                                        Profile: credentialResponse,
                                                        tokenFromSocial: credentialResponse.credential
                                                    })
                                                    localStorage.setItem('token', credentialResponse.credential);
                                                    window.location.href = "/";
                                                }}
                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}
                                            />
                                        </GoogleOAuthProvider>
                                    </div>
                                    <div className="form-group">
                                        {/* <LoginSocialFacebook
                                            appId="1230730321091573"
                                            onResolve={(response) => {
                                                console.log(response)
                                                this.setState({ Profile: response.data, tokenFromSocial: response.data.accessToken });
                                               
                                                localStorage.setItem('token', response.data.accessToken);
                                                localStorage.setItem('nameFb', response.data.name);
                                                localStorage.setItem('emailFb', response.data.email);
                                                window.location.href="/";
                                            }}

                                            onReject={(error) => {
                                                console.log(error)
                                            }}
                                        >
                                            <FacebookLoginButton />
                                        </LoginSocialFacebook> */}
                                    </div>
                                </div>
                                <h2>or</h2>
                                <form >

                                    {noti == true &&
                                        <b>Đăng Kí Thành Công</b>
                                    }
                                    {checkLogin == false &&
                                        <b>Email Hoặc Mật Khẩu Không Chính Xác</b>
                                    }
                                    <div class="formsix-pos">
                                        <div class="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" value={email}

                                                onChange={this.handleEmailChange} placeholder="Email Address *" />
                                        </div>
                                    </div>
                                    <div className="formsix-e">
                                        <div className="form-group i-password">
                                            <input type="password" className="form-control" required="" id="password2" value={password}
                                                onChange={this.handlePasswordChange} placeholder="Password *" />
                                        </div>
                                    </div>

                                    <div class="login_btn_wrapper">

                                        <button style={{ width: "100%" }} type="button" onClick={this.handleLogin} class=" btn btn-block mybtn btn-primary tx-tfm">Đăng Nhập</button>
                                    </div>
                                </form>
                                <div class="login_message">
                                    <p> <a href="#" onClick={this.handleShoSignUp}> Đăng Ký</a> </p>
                                </div>

                            </div>
                        </div>


                    </Modal.Body>

                </Modal>

                <Modal
                    show={showModalSignUp}
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
                                                    localStorage.setItem('token', this.state.tokenFromSocial);
                                                }}
                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}
                                            />
                                        </GoogleOAuthProvider>
                                    </div>
                                    <div>
                                        {/* <a href="#" class="btn btn-primary google-plus"> Login  with Google <i class="fa fa-google-plus"></i> </a> */}
                                        {/* <LoginSocialFacebook
                                            appId="1230730321091573"
                                            onResolve={(response) => {
                                                console.log(response)
                                                this.setState({ Profile: response.data, tokenFromSocial: response.data.accessToken });
                                                localStorage.setItem('token', this.state.tokenFromSocial);
                                            }}

                                            onReject={(error) => {
                                                console.log(error)
                                            }}
                                        >
                                            <FacebookLoginButton />
                                        </LoginSocialFacebook> */}
                                    </div>

                                </div>
                                <h2>or</h2>
                                <form >
                                    {checkEmail == true &&
                                        <b>Email đã tồn tại</b>
                                    }
                                    <div class="formsix-pos">
                                        <div class="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" value={fullname}
                                                onChange={this.handleFullNameChange} placeholder="Họ Và Tên *" />
                                        </div>
                                    </div>
                                    <div class="formsix-pos">
                                        <div class="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" value={email}
                                                onChange={this.handleEmailChange} placeholder="Email *" />
                                        </div>
                                    </div>
                                    <div class="formsix-e">
                                        <div class="form-group i-password">
                                            <input type="password" class="form-control" required="" id="password2" value={password}
                                                onChange={this.handlePasswordChange} placeholder="Mật Khẩu *" />
                                        </div>
                                    </div>
                                    <div class="formsix-pos">
                                        <div class="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" value={phone}
                                                onChange={this.handlePhoneChange} placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div class="formsix-e">
                                        <div class="form-group i-password">
                                            <input type="text" class="form-control" required="" id="password2" value={address}
                                                onChange={this.handleAddressChange} placeholder="Địa Chỉ" />
                                        </div>
                                    </div>
                                    <div class="login_btn_wrapper">
                                        <button style={{ width: "100%" }} type="button" onClick={this.handleSignUp} class=" btn btn-block mybtn btn-primary tx-tfm">Đăng Ký</button>
                                    </div>
                                </form>

                            </div>
                        </div>


                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}


export default withRouter(Header);


