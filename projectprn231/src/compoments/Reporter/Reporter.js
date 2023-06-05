import React, { Component } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export class Reporter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Title: '',
            ErrorTitle: '',
            Description: '',
            ErrorDescription: '', 
            Content: '',
            ErrorContent: '',
            CreateBy: '',
            OrderBy: '',
            CreateDate: '',
            IsChecked: 0
        }
    }

    // getCurrentDate = () => {
    //     var today = new Date();
    //     var currentDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+" "+today.getHours() + ":" + today.getMinutes() +' AM';
    // }

    // componentDidMount() {
    //     this.getCurrentDate();
    // }

    onChangeTitleName = (e) => {

    }

    render() {
        const { Title, Description, Content, CreateDate, IsChecked } = this.state;

        console.log(CreateDate);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <section className="panel tasks-widget">
                            <header className="panel-heading">
                                <h2>Add ReportTask</h2>
                            </header>
                        </section>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="control-label">Title:</label>
                                <input name="Title" className="form-control" value={Title} onChange={(e) => this.onChangeTitleName(e)} />
                                {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                            </div>
                            <div className="form-group">
                                <label className="control-label">Topic Description:</label>
                                <div className="App">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={Content}
                                        onReady={editor => {
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ Content: data })
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Content:</label>
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
                                <label className="control-label">CreateBy:</label>
                                <input name="Title" className="form-control" value={Title} onChange={(e) => this.onChangeTitleName(e)} />
                                {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                            </div>
                            <div className="form-group">
                                 <label className="control-label">CreateDate:</label>
                                 <input type="datetime-local" className="form-control" value={CreateDate} onChange={(e) => this.setState({CreateDate: e.target.value})}/>
                            </div>
                            <div>
                                <label className="control-lable">Import File: </label>
                                <input className="form-control" type="file"></input>
                            </div><br/>
                            <div className="form-group">
                                <label className="control-label">IsChecked:</label>
                                {console.log(IsChecked)}
                                {IsChecked == 1 ? < ><input type="radio" checked/>Pass <input type="radio"/>Not Pass</> : < ><input type="radio"/>Pass <input type="radio" checked/>Not Pass</> }
                            </div> <br/>
                            <button type="submit" className="btn btn-info" onClick={() => this.createAssignTask()}>Add Assign</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}