import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
class Footer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            NewsHome: [],
        }
    }
    refreshList() {
        fetch("https://localhost:7248/api/News/getAllNews")
          .then(response => response.json())
          .then(data => {
            this.setState({ NewsHome: data });
          });
      }
      componentDidMount() {
       this.refreshList(); 
    
      }
    
    render() {
        const {NewsHome} = this.state;
        return (

            <div>
                <div id="extras">
                    <div id="recommended">
                        <h2 class="heading">Recommended Stories</h2>
                        {NewsHome.slice(3, 8).map(news => (
                            <div>
                                <ul>
                                    <li><a href="#">{news.title}</a></li>
                                </ul>
                            </div>
                        ))}

                    </div>
                    <div id="programs">
                        <h2 class="heading">What's On Tonight</h2>
                        {NewsHome.slice(3, 8).map(news => (
                            <div>
                                <ul>
                                    <li><a href="#">{news.title}</a></li>
                                </ul>
                            </div>
                        ))}
                        {/* <img src="img/rick.jpg" alt="" /> <img src="img/cbc.png" alt="" /> */}
                    </div>
                    <div id="cartoon">
                        <h2 class="heading">Humour</h2>
                        {NewsHome.slice(3, 8).map(news => (
                            <div>
                                <ul>
                                    <li><a href="#">{news.title}</a></li>
                                </ul>
                            </div>
                        ))}
                        {/* <img src="img/cartoon.jpg" alt="" /> */}
                    </div>
                </div>
                <div class="d-flex flex-column h-100">
                    <footer class="w-100 py-4 flex-shrink-0">
                        <div class="container py-4">
                            <div class="row gy-4 gx-5">
                                <div class="col-lg-4 col-md-6">
                                    <h5 class="h1 text-white">FB.</h5>
                                    <p class="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                                    <p class="small text-muted mb-0">&copy; Copyrights. All rights reserved. <a class="text-primary" href="#">Bootstrapious.com</a></p>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <h5 class="text-white mb-3">Quick links</h5>
                                    <ul class="list-unstyled text-muted">
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Get started</a></li>
                                        <li><a href="#">FAQ</a></li>
                                    </ul>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <h5 class="text-white mb-3">Quick links</h5>
                                    <ul class="list-unstyled text-muted">
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Get started</a></li>
                                        <li><a href="#">FAQ</a></li>
                                    </ul>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <h5 class="text-white mb-3">Newsletter</h5>
                                    <p class="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                                    <form action="#">
                                        <div class="input-group mb-3">
                                            <input class="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                            <button class="btn btn-primary" id="button-addon2" type="button"><i class="fas fa-paper-plane"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}
export default withRouter(Footer);