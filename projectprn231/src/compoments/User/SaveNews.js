import React, { Component } from "react";
import Header from "../Home/Header";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import jwtDecode from "jwt-decode";

export class SaveNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdetail: {},
            userid: null,
            NewsSeen:[],
        }
    }

    
    refreshNewsSeen() {
        const { userid } = this.state;
        const { Nid } = this.props.match.params;
        fetch(`https://localhost:7248/api/News/getNewsUserSeen?userId=${userid}&rateId=${Nid}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ NewsSeen: data });
            });
    }

    componentDidMount() {
        const token = localStorage.getItem("token");


        if (token != null) {

            const decodedToken = jwtDecode(token);

            const userid = decodedToken.id;
            this.setState({ userid }, () => {
          
                this. refreshNewsSeen();
            });

            // this.setState({nameUser : decodedToken.FullName});
        }

    }

    render() {
        const { userdetail,NewsSeen } = this.state;

        return (
            <div>
              <Header/>
                <div>
                    <div class="container rounded bg-white mt-5 mb-5">
                        <div class="row">
                            <div class="col-md-4 border-right">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <ul class="p-3 py-5">
                                        <li><a href="/user">Thông tin tài khoản</a></li>
                                        <li><a href="/savenews/1">Tin Đã Xem</a></li>
                                        <li><a href="/savenews/2">Tin Đã Lưu</a></li>
                                        <li><a>Chat</a></li>
                                    </ul>
                                </div>

                            </div>
                            {/* <div class="col-md-2 border-right">
                                <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">{userdetail.fullName}</span><span> </span></div>
                            </div> */}
                            <div class="col-md-6 border-right">
                                {/* <div class="p-3 py-5">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h4 class="text-right">Profile Settings</h4>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" placeholder="first name" value={userdetail.fullName} /></div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder="enter email" value={userdetail.email} /></div>
                                        <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" value={userdetail.phone} /></div>
                                        <div class="col-md-12"><label class="labels">Address </label><input type="text" class="form-control" placeholder="enter address " value={userdetail.address} /></div>
                                    </div>
                                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                                </div> */}
                                {NewsSeen.map(item => 
                                    <div>
                                         <div class="row p-2 bg-white border rounded">

                                    <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="https://i.imgur.com/QpjAiHq.jpg" /></div>
                                    <div class="col-md-9 mt-1">
                                        <h5> <a href="#">{item.title}</a> </h5>
                                        <p class="">news.description<br /><br /></p>
                                    </div>

                                </div>
                                    </div>
                                    
                                    )}
                               
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }

}
export default withRouter(SaveNews);