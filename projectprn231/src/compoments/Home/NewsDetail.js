import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import "./home.css"
import Header from "./Header";
class NewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ListGenre: [],
            news: null, // Sản phẩm được chọn
            
            loading: true,
            object: {},
        };
    }
    refreshListGenre() {
        fetch("https://localhost:7248/api/News/getAllGenres")
            .then(response => response.json())
            .then(data => {
                this.setState({ ListGenre: data });
            });
    }
    refeshListDataById() {
        const { id } = this.props.match.params;
        fetch(`https://localhost:7248/api/News/getNewsById?id=${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ object: data });
            })
            .catch(error => {
                console.error('Error fetching object:', error);
            });
    }

    componentDidMount() {
        this.refreshListGenre();
        this.refeshListDataById();

    }
    
    render() {
        const { object, ListGenre } = this.state;

        return (
            <div>
                <div className="App">
                <Header/>

                    <div id="content-wrapper">
                        <div id="main">
                            <div id="headlines">
                                <div id="">


                                    <h2 class="heading">Featured Story</h2>
                                    <p class="author">{object.content} | <span>{object.createDate}</span></p>
                                    <h1> <a>{object.title}</a>  </h1>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="" />
                                    <h1> <a>{object.description}</a>  </h1>

                                  
                                </div>

                            </div>
                            <form >

                                <textarea id="w3review" name="w3review" rows="4" cols="100" placeholder="Y kien cua ban"></textarea>
                                <br />
                                <button type="submit" value="Submit"> gui</button>
                            </form>

                        </div>

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
export default withRouter(NewsDetail);