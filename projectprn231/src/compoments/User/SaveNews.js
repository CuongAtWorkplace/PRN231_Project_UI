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
            NewsSeen: [],
            check:false,
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
        const { Nid } = this.props.match.params;
        if(Nid == 2){
            this.setState({check:true});
        }
        if (token != null) {

            const decodedToken = jwtDecode(token);

            const userid = decodedToken.id;
            this.setState({ userid }, () => {

                this.refreshNewsSeen();
            });

          
        }

    }

    render() {
        const { userdetail, NewsSeen,check } = this.state;

        return (
            <div>
                <Header />

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
                                {
                                    check == false && <h3>Tin Đã Xem</h3>

                                }
                                 {
                                    check == true && <h3>Tin Đã Lưu</h3>

                                }
                                
                                {NewsSeen.map(item =>
                                    <a href={`/newsdetail/${item.id}`}>
                                        <div>
                                            <div class="row p-2 bg-white border rounded">
                                                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="https://i.imgur.com/QpjAiHq.jpg" /></div>
                                                <div class="col-md-9 mt-1">
                                                    <h5> <a href="#">{item.title}</a> </h5>
                                                    <p class="">{item.description}<br /><br /></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>


                                )}

                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }

}
export default withRouter(SaveNews);