import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import "./home.css"
import Header from "./Header";
import { Route } from "react-router-dom";
import SaveNews from "../User/SaveNews";
import jwtDecode from "jwt-decode";
import { BsSuitHeartFill , BsBookmarkPlusFill } from "react-icons/bs";
class NewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ListGenre: [],
            ListComment:[],
            news: null, // Sản phẩm được chọn
            loading: true,
            object: {},
            NewsSeenid: 1,
            addDate: null,
            newsId: null,
            cateId: null,
            contentComment: '',
            isActive: false,
            likeAmount: 0,
            comments: [],
            id:1,
        };
    }

    addNewsSeen() {
        const { NewsSeenid, addDate, cateId, NewsId, userid } = this.state;

        const url = 'https://localhost:7248/api/News/AddNewsSeen';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NewsSeenid, addDate, userid, NewsId, cateId })
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData); // Xử lý dữ liệu phản hồi từ API (nếu cần thiết)
            })
            .catch(error => {
                console.error(error);
            });

    }

    addCommentNews() {
        const { id, userId, newsId, content, createDate, likeAmount, isActive } = this.state;
        const url = 'https://localhost:7248/api/News/AddComment';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, newsId, content, createDate, likeAmount, isActive })
        })
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => ({
                    comments: [...prevState.comments, data],
                    newComment: '',
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleCommentSubmit = (e) => {
        e.preventDefault();
        // const { NewsSeenid, userid, NewsId, contentC, addDate, likeAmount, isActive } = this.state;
        const token = localStorage.getItem("token");
   
        if (token != null) { 
            const { id } = this.props.match.params;
            const decodedToken = jwtDecode(token); 
            const userId = decodedToken.id;
        const newsId = id;
        const createDate = new Date().toISOString().slice(0, 16);
        const content = this.state.contentComment;
        const isActive = false;
        const likeAmount = 0;
        // const { id, userId, newsId, content, createDate, likeAmount, isActive } = this.state;
        const url = 'https://localhost:7248/api/News/AddComment';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, newsId, content, createDate, likeAmount, isActive })
        })
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => ({
                    comments: [...prevState.comments, data],
                    newComment: '',
                }));
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    addNewsSave() {
        const { NewsSeenid, addDate, cateId, NewsId, userid } = this.state;
        const url = 'https://localhost:7248/api/News/AddNewsSave';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NewsSeenid, addDate, userid, NewsId, cateId })
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData); // Xử lý dữ liệu phản hồi từ API (nếu cần thiết)
            })
            .catch(error => {
                console.error(error);
            });

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
    refeshCommentById() {
        const { id } = this.props.match.params;
        fetch(`https://localhost:7248/api/News/GetListComment?id=${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ ListComment : data });
            })
            .catch(error => {
                console.error('Error fetching object:', error);
            });
    }




    handleClick = () => {
        this.setState({ cateId: 2 });
        const token = localStorage.getItem("token");
        if (token != null) {
            const { id } = this.props.match.params;
            const decodedToken = jwtDecode(token);
            const NewsId = id;
            const userid = decodedToken.id;
            const NewsSeenid = this.state;
            const addDate = new Date().toISOString().slice(0, 16);
            const cateId = 2;
            this.setState({ userid, NewsSeenid, addDate, NewsId, cateId }, () => {
                this.addNewsSave();
            });
            // this.setState({nameUser : decodedToken.FullName});
        }
    };
    handleInputChange = (event) => {
        this.setState({ contentComment: event.target.value });
    };

    handleCommentClick= () => {
        const token = localStorage.getItem("token");
   
            if (token != null) { 
                const { id } = this.props.match.params;
                const decodedToken = jwtDecode(token); 
                const userId = decodedToken.id;
            const newsId = id;
            const cid = 1;
            const createDate = new Date().toISOString().slice(0, 16);
            const content = this.state.contentComment;
            const isActive = false;
            const likeAmount = 0;
            this.setState({ userId, newsId, content, createDate, likeAmount, isActive }, () => {
                this.handleCommentSubmit();
            });
        }
      
    }
    componentDidMount() {
        this. refeshCommentById();
        this.refreshListGenre();
        this.refeshListDataById();
        const token = localStorage.getItem("token");

        if (token != null) {
            const { id } = this.props.match.params;
            const decodedToken = jwtDecode(token);
            const NewsId = id;
            const userid = decodedToken.id;
            const NewsSeenid = this.state;
            const addDate = new Date().toISOString().slice(0, 16);
            const cateId = 1;
            this.setState({ userid, NewsSeenid, addDate, NewsId, cateId }, () => {
                this.addNewsSeen();
            });



            // this.setState({nameUser : decodedToken.FullName});
        }
    }

    render() {
        const { object, ListGenre, cateId, contentComment,comments ,ListComment} = this.state;
        console.log(cateId);
        return (
            <div>
                <div className="App">
                    <Header />

                    <div id="content-wrapper">

                        <div id="main">
                            <div id="">
                                <div id="new-detail">
                                    {/* <h2 class="heading">Featured Story</h2>  */}
                                         <h1 class="title-detail">{object.title}</h1>
                                    <p class="author">{object.description} | <span>{object.createDate}</span></p>
                              
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="" />
                                    <p>{object.content}</p>
                                    <a> <i class="bi bi-save-fill"></i></a>
                                    {/* <button onClick={this.handleClick}>Save</button> */}
                                    <BsBookmarkPlusFill size={20} color="red" onClick={this.handleClick} />
                                </div>
                            </div>
                            <div>
                                <section class="content-item" id="comments">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-12">
                                               <form onSubmit={this.handleCommentSubmit}>
                                                    <h3 class="pull-left">New Comment</h3>
                                                    <fieldset>
                                                        <div class="row">
                                                            <div class="col-sm-3 col-lg-2 hidden-xs">
                                                                {/* <img class="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /> */}
                                                            </div>
                                                            <div class="form-group col-xs-12 col-sm-9 col-lg-10">
                                                                <textarea class="form-control" id="message" placeholder="Your message" required="" value={contentComment} onChange={this.handleInputChange} ></textarea>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <button type="submit"  class="btn btn-normal pull-right">Submit</button>
                                                </form>

                                                <h3>Comments</h3>

                                                {ListComment.map(comment => (
                                                    <div key={comment.id}>
                                                        {/* <p>{comment.userId}</p>
                                                        <p>{comment.content}</p>
                                                        <p>{comment.createDate}</p> */}
                                                        <div class="media">
                                                            <a class="pull-left" href="#"><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                                                            <div class="media-body">
                                                                <p >{comment.userName}</p>
                                                                <p>{comment.content}</p>
                                                                <ul class="list-unstyled list-inline media-detail pull-left">
                                                                    <li><i class="fa fa-calendar"></i>{comment.createDate } <BsSuitHeartFill size={20} color="red" onClick={() => console.log('Icon was clicked!')} /> </li>
                                                                    
                                                                </ul>
                                                                <ul class="list-unstyled list-inline media-detail pull-right">
                                                                    {/* <li class=""><a href="">Like</a></li>
                                                        <li class=""><a href="">Reply</a></li> */}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

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
                <div className="Content">
                    <Route path="/savenews" component={SaveNews} />
                </div>
            </div>


        )
    }
}
export default withRouter(NewsDetail);