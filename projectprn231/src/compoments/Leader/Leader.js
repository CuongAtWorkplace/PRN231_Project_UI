import React, { Component } from "react";
import { toast} from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export class Leader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TopicName: '',
            ErrorTopicName: null,
            Description: '',
            LeaderName: '',
            GenreName: '',
            WriterName: '',
            ReporterName: '',
            LeaderId: 0,
            GenreId: 0,
            ErrorGenre: null,
            WriterId: 0,
            ErrorWriter: null,
            ReporterId: 0,
            ErrorReporter: null,
            StartDate: '',
            ErrorStartDate: null,
            EndDate: '',
            ErrorEndDate: null,
            Genre: [],
            User: [],
        }
    }

    refreshList() {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/Genre/GetAllGenre", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ Genre: data });
            });

        fetch("https://localhost:7248/api/User/GetAllUser", {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ User: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }


    createAssignTask() {
        const jwt = localStorage.getItem('token');
        fetch("https://localhost:7248/api/AssignTask/AddAssignTask", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                title: this.state.TopicName,
                description: this.state.Description,
                leaderId: 2,
                writerId: this.state.WriterId,
                reporterId: this.state.ReporterId,
                genreId: this.state.GenreId,
                startDate: this.state.StartDate,
                endDate: this.state.EndDate
            })
        })
            .then(res => res.json())
            .then((result) => {
                toast.success("Insert successfull. Congratulation!!!")
                this.refreshList();
            }, (error) => {
                toast.error("Insert failed. Try Again!!!")
            })
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
    };

    render() {
        const { Genre, User, TopicName, ErrorTopicName, Description, GenreId, WriterId, ReporterId, StartDate, EndDate } = this.state;
        console.log(User)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <section className="panel tasks-widget">
                            <header className="panel-heading">
                                <h2>Add Topic</h2>
                            </header>
                        </section>
                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label className="control-label">Topic Name:</label>
                                    <input name="ProductPrice" className="form-control" value={TopicName} onChange={(e) => this.onChangeTopicName(e)} />
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Topic Description:</label>
                                    <div className="App">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={Description}
                                            onReady={editor => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ Description: data })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Topic Genre:</label> <br></br>
                                    <select className="form-select"
                                        onChange={(e) => this.setState({GenreId: e.target.value})
                                        } 
                                        value={GenreId}
                                    >
                                        {Genre.map(gen => <option value={gen.id} key={gen.id}>
                                            {gen.genreName}
                                        </option>)}
                                    </select>
                                    {/* {GenreId == 0 ? <p style={{ color: 'red' }}>Genre is not empty</p> : <></>} */}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Assign To Writer:</label>
                                    <select className="form-select"
                                        onChange={(e) => this.setState({WriterId: e.target.value})}
                                        value={WriterId}
                                    >
                                        {User.map(u => u.roleId == 4 &&
                                            <option value={u.id} key={u.id} >
                                                {u.fullName}
                                            </option>
                                        )}
                                    </select>
                                    {/* {WriterId == 0 ? <p style={{ color: 'red' }}>Writer have no assign</p> : <></>} */}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Assign To Reporter:</label>
                                    <select className="form-select"
                                        onChange={(e) => this.setState({ReporterId: e.target.value})}
                                        value={ReporterId}
                                    >
                                        {User.map(u => u.roleId == 5 &&
                                            <option value={u.id} key={u.id} >
                                                {u.fullName}
                                            </option>
                                        )}
                                    </select>
                                    {/* {ReporterId == 0 ? <p style={{ color: 'red' }}>Reporter have no assign</p> : <></>} */}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Create Date:</label>
                                    <input type="date" className="form-control" value={StartDate} onChange={(e) => this.setState({StartDate: e.target.value})}/>
                                    {StartDate != '' ? <p>StartDate is not empty</p> : <></>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">EndDate:</label>
                                    <input type="date" className="form-control" value={EndDate} onChange={(e) =>  this.setState({EndDate: e.target.value})}/>
                                    {EndDate != '' ? <p>EndDate is not empty </p> : <></>}
                                </div> <br />
                                <button type="button" className="btn btn-info" onClick={() => this.createAssignTask()}>Add Assign</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}