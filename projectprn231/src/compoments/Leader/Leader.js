import React, { Component } from "react";
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
            GenreName: 'Kinh Doanh',
            WriterName: '',
            ReporterName: '',
            ErrorDeadline: '',
            LeaderId: 0,
            GenreId: 0,
            LeaderId: 0,
            WriterId: 0,
            ReporterId: 0,
            StartDate: '',
            EndDate: '',
            Genre: [],
            User: [],
        }
    }

    refreshList() {
        fetch("https://localhost:7248/api/Genre/GetAllGenre")
            .then(response => response.json())
            .then(data => {
                this.setState({ Genre: data });
            });

        fetch("https://localhost:7248/api/User/GetAllUser")
            .then(response => response.json())
            .then(data => {
                this.setState({ User: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }


    createAssignTask() {
        fetch("https://localhost:7248/api/AssignTask/AddAssignTask", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
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
                                    <label className="control-label">Topic Categories:</label> <br></br>
                                    <select className="form-select"
                                        onChange={(e) => this.setState({GenreId: e.target.value})
                                        } 
                                        value={GenreId}
                                    >
                                        {Genre.map(gen => <option value={gen.id} key={gen.id}>
                                            {gen.genreName}
                                        </option>)}
                                    </select>
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
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
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
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
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Create Date:</label>
                                    <input type="date" className="form-control" value={StartDate} onChange={(e) => this.setState({StartDate: e.target.value})}/>
                                    {console.log(StartDate)}
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">EndDate:</label>
                                    <input type="date" className="form-control" value={EndDate} onChange={(e) =>  this.setState({EndDate: e.target.value})}/>
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div> <br />
                                <button type="submit" className="btn btn-info" onClick={() => this.createAssignTask()}>Add Assign</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}