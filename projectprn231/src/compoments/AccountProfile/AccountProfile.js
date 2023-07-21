import React, { Component } from "react";
import './Account.css';
import parse from 'html-react-parser';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Label } from "recharts";
//import { useForkRef } from "@mui/material";
//import { ThirtyFpsSelect } from "@mui/icons-material";

class AccountProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            User: {},
            RoleName: '',
            WritingTask: [], 
            ReportTask: [],
            Title: '', 
            Descrption: '',
            Rep: null,
            RepDes: '',
            RepCon: '',
            Wri: null,
            DocumentList: []
        }
    }

    refreshList() {
        const { id } = this.props.match.params;
        const jwt = localStorage.getItem('jwt');
        fetch("https://localhost:7248/api/User/GetUserById?id="+id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ User: data, RoleName: data.role.roleName });
            });

        fetch("https://localhost:7248/api/WritingTask/GetWritingByUserId?Id="+id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ WritingTask: data });
            });
        fetch("https://localhost:7248/api/ReportTask/GetReportTaskByUserId?Id="+id, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ ReportTask: data });
            });
    }

    ViewClick(e) {
        const jwt = localStorage.getItem('jwt');

        {this.state.RoleName == "Reporter" && 
        fetch("https://localhost:7248/api/ReportTask/GetReportTaskByTaskId?taskId=" + e, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ Rep: data, RepDes: data.description, RepCon: data.content });
            });
        }

        fetch("https://localhost:7248/api/WritingTask/GetWritingTaskByTaskId?taskId="+e, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ Wri: data });
            });

        fetch("https://localhost:7248/api/Document/GetAllDocumentByTaskId?taskId="+e, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ DocumentList: data });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {User, RoleName, WritingTask, ReportTask, Rep, DocumentList, Wri, RepCon, RepDes} = this.state;
        console.log(WritingTask)
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
                        <div className="card border-0 shadow">
                            <img src="https://www.bootdey.com/img/Content/avatar/avatar6.png" alt="..." />
                                <div className="card-body p-1-9 p-xl-5" style={{backgroundColor: 'white'}}>
                                    <div className="mb-4">
                                        <h3 className="h4 mb-0">{User.fullName}</h3>
                                        <span className="text-primary">{RoleName}</span>
                                    </div>
                                    <ul className="list-unstyled mb-4">
                                        <li className="mb-3"><a href="#!"><i className="far fa-envelope display-25 me-3 text-secondary"></i>{User.email}</a></li>
                                        <li className="mb-3"><a href="#!"><i className="fas fa-mobile-alt display-25 me-3 text-secondary"></i>{User.phone}</a></li>
                                        <li><a href="#!"><i className="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>{User.address}</a></li>
                                    </ul>
                                    <ul className="social-icon-style2 ps-0">
                                        <li><a href="#!" className="rounded-3"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#!" className="rounded-3"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#!" className="rounded-3"><i className="fab fa-youtube"></i></a></li>
                                        <li><a href="#!" className="rounded-3"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-lg-1-6 ps-xl-5">
                            <div className="mb-5 wow fadeIn">
                                <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className="h1 mb-0 text-primary">#About Me</h2>
                                </div>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                                <p className="mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                            </div>
                            <div className="mb-5 wow fadeIn">
                                <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className="mb-0 text-primary">#Education</h2>
                                </div>
                                <div className="row mt-n4">
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                        <div className="card text-center border-0 rounded-3">
                                            <div className="card-body">
                                                <i className="ti-bookmark-alt icon-box medium rounded-3 mb-4"></i>
                                                <h3 className="h5 mb-3">Achievement</h3>
                                                <p className="mb-0">University of defgtion, fecat complete ME of synage</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                        <div className="card text-center border-0 rounded-3">
                                            <div className="card-body">
                                                <i className="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
                                                <h3 className="h5 mb-3">Career Start</h3>
                                                <p className="mb-0">After complete engineer join HU Signage Ltd as a project manager</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                        <div className="card text-center border-0 rounded-3">
                                            <div className="card-body">
                                                <i className="ti-medall-alt icon-box medium rounded-3 mb-4"></i>
                                                <h3 className="h5 mb-3">Experience</h3>
                                                <p className="mb-0">About 20 years of experience and professional in signage</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wow fadeIn">
                                <div className="text-start mb-1-6 wow fadeIn">
                                    <h2 className="mb-0 text-primary">#Skills &amp; Experience</h2>
                                </div>
                                <p className="mb-4">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                                <div className="progress-style1">
                                    <div className="progress-text">
                                        <div className="row">
                                            {
                                                WritingTask != [] && WritingTask.map(ak =>
                                                    <>
                                                        <div className="col-6 fw-bold" style={{fontSize: '25px'}}>{ak.title}</div>
                                                        <div>{ak.description}</div>
                                                        {ak.isChecked == true && 
                                                            <button type="button"
                                                                className="btn btn-light mr-1"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                onClick={() => this.ViewClick(ak.taskId)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                </svg>
                                                            </button>
                                                        }
                                                    </>

                                                )
                                            }

                                            {
                                                ReportTask != [] && ReportTask.map(ak =>
                                                    <>
                                                        <div className="col-6 fw-bold" style={{fontSize: '25px'}}>{ak.title}</div>
                                                        <div>{parse(ak.description)} </div>
                                                        {ak.isChecked == true && 
                                                            <button type="button"
                                                                className="btn btn-light mr-1"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                onClick={() => this.ViewClick(ak.taskId)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                </svg>
                                                            </button>
                                                        }
                                                    </>

                                                )
                                            }
                                             
                                        </div>
                                    </div>
                                    {/* <div className="custom-progress progress rounded-3 mb-4">
                                        <div className="animated custom-bar progress-bar slideInLeft" style={{width: '70%'}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" role="progressbar"></div>
                                    </div>
                                    <div className="progress-text">
                                        <div className="row">
                                            <div className="col-6 fw-bold">Solar Panels</div>
                                            <div className="col-6 text-end">90%</div>
                                        </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3 mb-4">
                                        <div className="animated custom-bar progress-bar bg-secondary slideInLeft" style={{width: '90%'}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                                    </div>
                                    <div className="progress-text">
                                        <div className="row">
                                            <div className="col-6 fw-bold">Hybrid Energy</div>
                                            <div className="col-6 text-end">80%</div>
                                        </div>
                                    </div>
                                    <div className="custom-progress progress rounded-3">
                                        <div className="animated custom-bar progress-bar bg-dark slideInLeft" style={{width: '80%'}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Detail</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <div className="d-flex flex-row bd-highlight mb-3">

                                        <div className="p-2 bd-highlight" style={{ width: "100%" }}>
                                            {
                                                Rep != null && <>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Description</span>
                                                        <input type="text" className="form-control"
                                                            value={Rep.description}/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Content</span>
                                                        <input type="text" className="form-control"
                                                            value={Rep.content}/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <label className="control-lable"><b>Source:</b> </label> <br/>
                                                        <p>{DocumentList != [] && DocumentList.map(it => <a href="#" onClick={() => this.DownLoadFile(it)}>{it.fileName}</a>)}</p>
                                                    </div>
                                                </>
                                            }

                                            {
                                                Wri != null && <>
                                                    <div className="input-group mb-3">
                                                        <label className="control-lable"><b>Content:</b> </label> <br/> <br/>
                                                        <div>
                                                            {parse(Wri.content)}
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AccountProfile)