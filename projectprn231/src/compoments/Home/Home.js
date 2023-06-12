import React, { Component } from "react";
import "./home.css"


export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            NewsHome: [],
        }
    }

    refreshList(){
        fetch("https://localhost:7248/api/News/getAllNews")
        .then(response => response.json())
        .then(data => {
            this.setState({ NewsHome : data });
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render() {
        const{NewsHome} = this.state;
        return (
            <div className="App">
                <div id="top">
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Submit a Story</a></li>
                        <li><a href="#">Feedback</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
                <div id="header">
                    <div id="logo"> <a href="#"><img src="img/wireframe/logo.png" alt="" /></a> </div>
                    <div id="ad"> <img src="img/ad-blank.png" alt="" /> </div>
                </div>
                <div id="nav">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Archive</a></li>
                        <li><a href="#">Local</a></li>
                        <li><a href="#">World</a></li>
                        <li><a href="#">Politics</a></li>
                        <li><a href="#">Entertainment</a></li>
                        <li><a href="#">Sports</a></li>
                        <li><a href="#">Science &amp; Technology</a></li>
                        <li class="last"><a href="#">Contact</a></li>
                    </ul>
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
                    </ul>
                </div>

                <div id="content-wrapper">
                    <div id="main">
                        <div id="headlines">
                            <div id="main-headline">
                                {NewsHome.map(item =>
                                    <div>

                                    
                                <h2 class="heading">Featured Story</h2>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="" />
                                <h1><a href="#">{item.description}</a></h1>
                                <p class="author">Name Here | <span>09.18.09</span></p>
                                <p>{item.description}</p>
                                <p><a href="#">Full story &raquo;</a></p>
                                <h2 class="heading">Latest Video</h2>,
                                
                                <h2><a href="#">{item.description}</a></h2>
                                <p class="author"><span>09.18.09</span></p>
                                <p><a href="#">More video &raquo;</a></p>
                                </div>
                                )}
                            </div>
                            
                        </div>
                    </div>
                    <div id="sidebars">

                        <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad" /></a> <a href="#"><img src="img/side-ad.png" alt="" class="ad-right" /></a>

                        <h2 class="heading-blue">Sports Headlines</h2>
                        <img src="img/wayne.jpg" alt="" />
                        <h3><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit</a></h3>
                        <p>Ut sed arcu nulla. In eget lectus vitae purus volutpat consectetur suscipit ut justo.</p>
                        <p><a href="#">More headlines &raquo;</a></p>
                        <h2 class="heading">Celebrity Sightings</h2>
                        <img src="img/casey.jpg" alt="" class="ad" /> <img src="img/hobo.jpg" alt="" class="ad-right" />
                        <h2 class="heading">In the Community</h2>
                        <h4><a href="#">Lorem ipsum dolor sit amet eget, consectetur adipiscing elit</a></h4>
                        <h4><a href="#">Lorem ipsum dolor sit amet eget, consectetur adipiscing elit</a></h4>
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
            </div>
        )
    }
}