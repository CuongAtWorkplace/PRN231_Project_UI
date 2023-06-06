import React, {Component, useEffect} from "react";
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//abc

export class Writer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TopicName: '',
            ErrorTopicName: null,
            Description: '',
            ErrorDescription: null,
            NewsDetail: '',
            ErrorNewsDetail: null,
            ImageCover: '', 
            CreateDate: '',
            TaskId: 0, 
            Comment: '', 
            AssignTaskRequire: {}, 
            DescriptionTask:'', 
            LeaderName: '', 
            ReporterName: '', 
            GenreName: ''
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/AssignTask/GetAssignTaskById?Id=13")
            .then(response => response.json())
            .then(data => {
                this.setState({ AssignTaskRequire: data, DescriptionTask: data.description, LeaderName: data.leader.fullName, ReporterName: data.reporter.fullName, GenreName: data.genre.genreName });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    useEffect() {
        
    }

    onChangeTopicName = (e) => {
        if (e.target.value == '') {
            this.setState({ ErrorTopicName: 'Topic Name is not empty' });
        } else if (e.target.value.length < 5 || e.target.value.length > 50) {
            this.setState({ ErrorTopicName: 'Topic Name is between 5 to 50' });
        } else {
            this.setState({ ErrorTopicName: null });
        }
        this.setState({ TopicName: e.target.value })
    }

    onChangeCommnet = (e) => {
        this.setState({ Comment: e.target.value });
    }

    onChangeDescription = (e) => {
        if (e.target.value == '') {
            this.setState({ ErrorDescription: 'Topic Name is not empty' });
        } else if (e.target.value.length < 5 || e.target.value.length > 50) {
            this.setState({ ErrorDescription: 'Topic Name is between 5 to 50' });
        } else {
            this.setState({ ErrorDescription: null });
        }
        this.setState({ Description: e.target.value })
    }

    render() {
        const { TopicName, ErrorTopicName, NewsDetail, Comment, Description, ErrorDescription, AssignTaskRequire, DescriptionTask, LeaderName, ReporterName, GenreName, ImageCover} = this.state;

        console.log(AssignTaskRequire);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <section className="panel tasks-widget">
                            <header className="panel-heading">
                                <h2>Add Write</h2>
                            </header>
                        </section>
                        <div class="panel-body">
                            <form>
                                <h3>News Requirement</h3>
                                <div style={{ border: '1px solid black', backgroundColor: 'white' }}>
                                   <p><b>Title:</b> {AssignTaskRequire.title}</p>
                                   <p><b>Description:</b> {parse(DescriptionTask)}</p>
                                   <p><b>Genre: </b> {GenreName}</p>
                                   <p><b>Assgin by: </b>{LeaderName}</p>
                                   <p><b>Reporter: </b>{ReporterName}</p>
                                   <p><b>Start Date:</b> {AssignTaskRequire.startDate}</p>
                                   <p style={{color:'red'}}><b>End Date:</b> {AssignTaskRequire.endDate}</p>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">News Name:</label>
                                    <input name="ProductPrice" value={TopicName} class="form-control" onChange={(e) => this.onChangeTopicName(e)} />
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>

                                <div className="form-group">
                                    <label className="control-label">News Description:</label>
                                    <input name="ProductPrice" value={Description} class="form-control" onChange={(e) => this.onChangeDescription(e)} />
                                    {ErrorDescription == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorDescription}</p>}
                                </div>

                                <div className="form-group">
                                    <label class="control-label">News Detail: </label>
                                    <div className="App">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={NewsDetail}
                                            onReady={editor => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ NewsDetail: data })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label class="control-label">Image Cover: </label>
                                    <input class="form-control" type="file"/>
                                    {ImageCover != '' ? <div style={{border: '1px solid black', width: 120, height: 130}} ></div> : null } 
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Comment:</label>
                                    <input name="ProductPrice" value={Comment} class="form-control" onChange={(e) => this.onChangeCommnet(e)} />
                                </div> <br />

                                <button type="button" className="btn btn-info" onclick="alert(confirm('Do you want to submit to leader?'))">Add Assign</button>
                                
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <section className="panel tasks-widget">
                            <header className="panel-heading" style={{marginTop: 40}}>
                                <h2>Report from Reporter</h2>
                            </header>
                        </section>
                        <div style={{ border: '1px solid black', backgroundColor: 'white' }}>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}