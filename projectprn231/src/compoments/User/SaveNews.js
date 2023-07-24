import React, { Component } from "react";
import Header from "../Home/Header";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import jwtDecode from "jwt-decode";
import Footer from "../Home/Footer";
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

                <div id="content-wrapper">
                    <div class="container rounded bg-white mt-5 mb-5">
                        <div class="row">
                            <div class="col-md-4 border-right">
                              
                                <ul class="list-group">
                                    <li class="list-group-item"><a href="/user">Thông tin tài khoản</a></li>
                                    <li class="list-group-item"><a href="/savenews/1">Tin Đã Xem</a></li>
                                    <li class="list-group-item"><a href="/savenews/2">Tin Đã Lưu</a></li>
                                    <li class="list-group-item"><a href="/listadvertisement" >Danh Sách Mua Hàng</a></li>
                                </ul>
                               

                            </div>
                          
                            <div class="col-md-6 border-right">
                                <h3>Tin đã lưu</h3>

                                {NewsSeen.map(item => 
                                    <div>
                                         <div class="row p-2 bg-white border rounded">

                                    <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="https://i.imgur.com/QpjAiHq.jpg" /></div>
                                    <div class="col-md-9 mt-1">
                                        <h5> <a href="#">{item.title}</a> </h5>
                                        <p class="">{item.description}<br /><br /></p>
                                    </div>

                                </div>
                                    </div>
                                    
                                    )}
                               
                            </div>

                        </div>
                    </div>
                </div>
                <Footer/>
            </div>

        );
    }

}
export default withRouter(SaveNews);