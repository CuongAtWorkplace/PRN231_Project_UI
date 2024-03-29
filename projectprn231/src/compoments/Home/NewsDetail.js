import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import "./home.css"
import Header from "./Header";
import { Route } from "react-router-dom";
import SaveNews from "../User/SaveNews";
import jwtDecode from "jwt-decode";
import { BsSuitHeartFill, BsBookmarkPlusFill } from "react-icons/bs";
import parse from 'html-react-parser';
import Footer from "./Footer";
import moment from "moment/moment";
import { toast } from 'react-toastify';


class NewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ListGenre: [],
            ListComment: [],
            news: null, // Sản phẩm được chọn
            loading: true,
            object: {},
            NewsSeenid: 1,
            addDate: null,
            cateId: null,
            contentComment: '',
            isActive: false,
            likeAmount: 0,
            comments: [],
            id: 1,
            contentDetail: '',
            liked: 0,
            countLike: 0,
            NewsId: 0,
        };
    }

    addNewsSeen(e) {
        var userid = localStorage.getItem('id');
        if (userid != null && userid != '') {
            const url = 'https://localhost:7248/api/NewsSeen/AddNewsSeen';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    addDate: new Date().toISOString().slice(0, 16),
                    userId: userid,
                    newsId: e,
                    cateId: 1
                })
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData); // Xử lý dữ liệu phản hồi từ API (nếu cần thiết)
                })
                .catch(error => {
                    console.error(error);
                });
        }
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

    addNewsSave(e) {
        var userId = localStorage.getItem('id');
        if (userId == null || userId == '') {
            alert("you need login first!!!")
            return;
        }
        const url = 'https://localhost:7248/api/NewsSeen/AddNewsSave';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                addDate: new Date().toISOString().slice(0, 16),
                userId: userId,
                newsId: e,
                cateId: 2
            })
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData); // Xử lý dữ liệu phản hồi từ API (nếu cần thiết)
                toast.success("Add Successfull!!!")
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
        //this.setState({NewsId: id});
        fetch(`https://localhost:7248/api/News/getNewsById?id=${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ object: data, contentDetail: data.content, NewsId:data.id });
            })
            .catch(error => {
                console.error('Error fetching object:', error);
            });
        this.addNewsSeen(id);
    }

    refeshCommentById() {
        const { id } = this.props.match.params;
        fetch('https://localhost:7248/api/News/GetListComment?id='+id)
            .then(response => response.json())
            .then(data => {
                this.setState({ ListComment: data });
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
        }
    };
    handleInputChange = (event) => {
        this.setState({ contentComment: event.target.value });
    };

    handleCommentClick = () => {
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
        this.refeshCommentById();
        this.refreshListGenre();
        this.refeshListDataById();
        const token = localStorage.getItem("token");  
        const { id } = this.props.match.params;
        this.setState({
            NewsId: id
        })

        if (token != null) {
            
            const decodedToken = jwtDecode(token);
            const NewsId = id;
            const userid = decodedToken.id;
            const NewsSeenid = this.state;
            const addDate = new Date().toISOString().slice(0, 16);
            const cateId = 1;
        }
    }
    handleLikeClick = (id) => {
        fetch(`https://localhost:7248/api/Comment/LikeComment?Id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ liked: 1 });
                //alert(this.state.liked);
                this.refeshCommentById();
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleUnLikeClick = (id) => {
        fetch(`https://localhost:7248/api/Comment/UnLikeComment?Id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ liked: 0 });
                //alert(this.state.liked);
                this.refeshCommentById();
            })
            .catch(error => {
                console.error(error);
            });
    }

    refeshCountLike() {
        fetch('https://localhost:7248/api/News/CountLike?id')
            .then(response => response.json())
            .then(data => {
                this.setState({ liked: 1 });
                alert(this.state.liked);
                this.refeshCommentById();
            })
            .catch(error => {
                console.error('Error fetching object:', error);
            });
    }

    CreateComment(e) {
        var userId = localStorage.getItem('id');
        var Newsid  = this.state.NewsId
        if (userId == null || userId == '') {
            window.location.href=`/newsdetail/${Newsid}`;
            return;
        }

        fetch("https://localhost:7248/api/Comment/AddComment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId, 
                newsId: e, 
                content: this.state.contentComment, 
                createDate: new Date().toISOString().slice(0, 16), 
                likeAmount: 0, 
                isActive: false
            })
        })
            .then(res => res.json())
            .then((result) => {
                toast.success("Comment Successfull. Congratulation!!!")
            }, (error) => {
                toast.error("Comment failed. Try Again!!!");
            })

        window.location.href=`/newsdetail/${Newsid}`;   
    }
    
    render() {
        const { object, ListGenre, liked, cateId, countLike, contentComment, comments, ListComment, contentDetail } = this.state;
        console.log(cateId);
        return (
            <div>
                <div className="">
                    <Header />

                    <div id="content-wrapper">

                        <div id="">
                            <div id="">
                                <div>
                                    <h1 class="title-detail">{object.title}</h1>
                                    <span> Public Date : {object.createDate}</span>
                                    <p>{object.description} </p>
                                    <div>{parse(contentDetail)}</div>
                                    <a> <i class="bi bi-save-fill"></i></a>
                                    <p style={{ float: 'right' }}>
                                        <b>{object.createBy}</b>
                                    </p>
                                    <BsBookmarkPlusFill size={20} color="red" onClick={() => this.addNewsSave(object.id)} />

                                </div>
                            </div>
                            <div>
                                <section class="content-item" id="comments">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                {/* <form onSubmit={this.handleCommentSubmit}> */}
                                                <form>
                                                    <h3 class="pull-left">New Comment</h3>
                                                    <fieldset>
                                                        <div class="row">
                                                            <div class="col-sm-3 col-lg-2 hidden-xs">
                                                            </div>
                                                            <div class="form-group col-xs-12 col-sm-9 col-lg-10">
                                                                <textarea class="form-control" id="message" placeholder="Your message" required="" value={contentComment} onChange={this.handleInputChange} ></textarea>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    {contentComment != '' && <button type="button" class="btn  pull-right" onClick={() => this.CreateComment(object.id)}>Gửi</button> }
                                                </form>

                                                <h3>Comments</h3>

                                                {ListComment.map(comment => 
                                                    // {comment.isActive == true && 
                                                    <div key={comment.id}>
                                                        <div class="media">
                                                            <a class="pull-left" href="#"><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                                                            <div class="media-body">
                                                                <p >{comment.userName}</p>
                                                                <p>{comment.content}</p>
                                                                <ul class="list-unstyled list-inline media-detail pull-left">
                                                                    <li ><i class="fa fa-calendar"></i>{comment.createDate}

                                                                        {liked == 1 &&
                                                                            <i>
                                                                                <BsSuitHeartFill size={20} color="red" style={{ marginLeft: "10px" }} onClick={() => this.handleUnLikeClick(comment.id)} />
                                                                                {comment.likeAmount}
                                                                            </i>
                                                                        }
                                                                        {liked == 0 &&
                                                                            <i>
                                                                                <BsSuitHeartFill size={20} color="gray" style={{ marginLeft: "10px" }} onClick={() => this.handleLikeClick(comment.id)} />
                                                                                {comment.likeAmount}
                                                                            </i>
                                                                        }
                                                                    </li>
                                                                </ul>
                                                                <ul class="list-unstyled list-inline media-detail pull-right">
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    //}
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>

                    </div>


                </div>

                <Footer />
            </div>


        )
    }
}
export default withRouter(NewsDetail);