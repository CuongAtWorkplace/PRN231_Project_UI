import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Header from "./Header";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import jwtDecode from "jwt-decode";
import SaveNews from "../User/SaveNews";
import Footer from "./Footer";
export class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdetail: {},
            userid: null,

            addDate: null,
            newsId: null,
            cateId: null,
            email: '',
            phone: '',
            address: '',
            fullname: '',
            image: '',
            passwordU: '',
            notiU: true,
            id: 1,
            createDate: new Date().toISOString().slice(0, 16),
            isBan: false,
            roleId: 2,
            PhotoPath:'https://localhost:7248/Photos/',
            ImageCover: '',
        }
    }

    refreshUser() {
        const { userid } = this.state;
        fetch(`https://localhost:7248/api/User/GetUserById?id=${userid}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ userdetail: data });
            });
    }
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
    // handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     this.setState({ image: file, imageName: file.name, imageUrl: URL.createObjectURL(file) });
    //   };
   
    UpdateProfile = async () => {


        const { id, email, password, fullname, address, phone, isBan, roleId, createDate, image } = this.state;
        try {
            const response = await fetch(`https://localhost:7248/api/User/UpdateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, fullname, email, password, phone, address, roleId, createDate, isBan, image }),
            });

            if (response.ok) {
                this.setState({ notiU: true });
                window.location.href = "/user";
            } else {
                this.setState({ notiU: false });
            }
        } catch (error) {
            // Xử lý lỗi gọi API
            console.log('Lỗi gọi API', error);
        }

    };
    imageUpload = (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('token');

        this.setState({
            ImageCover: e.target.files[0].name,
            image: e.target.files[0].name,
        })
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch('https://localhost:7248/api/WritingTask/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ image: data });
            })
    }

    componentDidMount() {
        const token = localStorage.getItem("token");


        if (token != null) {

            const decodedToken = jwtDecode(token);

            const userid = decodedToken.id;
            this.setState({ id: userid });
            this.setState({ userid }, () => {
                this.refreshUser();
            });

            // this.setState({nameUser : decodedToken.FullName});
        }

    }

    render() {
        const { userdetail, notiU, fullname, address, checkEmail, email, phone, password,image, PhotoPath} = this.state;

        return (
            <div>
                <Header />
                <div id="content-wrapper">
                    <div class="container rounded bg-white mt-5 mb-5 ">
                        <div class="row ">
                            <div class="col-md-4 ">
                                <ul class="list-group">
                                    <li class="list-group-item"><a href="/user">Thông tin tài khoản</a></li>
                                    <li class="list-group-item"><a href="/savenews/1">Tin Đã Xem</a></li>
                                    <li class="list-group-item"><a href="/savenews/2">Tin Đã Lưu</a></li>
                                    <li class="list-group-item" ><a href="/listadvertisement">Danh Sách Mua Hàng</a></li>
                                </ul>


                            </div>
                            <div class="col-md-6 ">
                                <form >
                                    <div class="col-md-4 ">
                                        <div class=" flex-column align-items-center text-center ">
                                            {userdetail.image != '' &&
                                            <img style={{borderRadius: "50%"}} width="250px" height="250px"
                                                src={PhotoPath + userdetail.image} />
                                        } <input className="m-2" type="file" onChange={this.imageUpload} /> <a class="font-weight-bold">Thay đổi ảnh</a><span> </span></div>
                                    </div>
                                    <div class="col-md-8 ">
                                        <div class="">
                                            {notiU == false &&
                                                <h3>Thông tin tài khoản chưa chính sác</h3>
                                            }
                                            <div class="d-flex justify-content-between align-items-center mb-3">
                                                <h4 class="text-right">Thông Tin Tài Khoản</h4>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-12"><label class="labels">Tên</label><input type="text" class="form-control" required="" placeholder="Họ và tên" onChange={this.handleFullNameChange} value={fullname} /></div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder=" Địa chỉ email" required="" onChange={this.handleEmailChange} value={userdetail.email} /></div>
                                                <div class="col-md-12"><label class="labels">Số Điện Thoại</label><input type="text" class="form-control" placeholder=" Số điện thoại" required="" onChange={this.handlePhoneChange} value={phone} /></div>
                                                <div class="col-md-12"><label class="labels">Địa Chỉ</label><input type="text" class="form-control" placeholder=" Địa chỉ " required="" onChange={this.handleAddressChange} value={address} /></div>
                                                <div class="col-md-12"><label class="labels">Mật Khẩu </label><input type="password" class="form-control" placeholder=" Mật khẩu " required="" onChange={this.handlePasswordChange} value={password} /></div>
                                            </div>
                                            {/* <div class="row mt-3">
                                        <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value="" /></div>
                                        <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state" /></div>
                                    </div> */}
                                            <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onClick={this.UpdateProfile} type="button">Thay đổi thông tin</button></div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }

}
export default withRouter(UserDetail);