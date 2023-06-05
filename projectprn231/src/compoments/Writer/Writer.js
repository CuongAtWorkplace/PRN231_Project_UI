import React, {Component} from "react";

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
            Comment: ''
        }
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

    // onChangeNewsDetail = (event, editor) => {
    //     if (event.target.value == '') {
    //         this.setState({ ErrorNewsDetail: 'Topic Name is not empty' });
    //     } else if (event.target.value.length < 5 || event.target.value.length > 5000) {
    //         this.setState({ ErrorNewsDetail: 'Topic Name is between 5 to 50' });
    //     } else {
    //         this.setState({ ErrorNewsDetail: null });
    //     }
    //     this.setState({ NewsDetail: event.target.value, data: editor.getData() });
    // }

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
        const { TopicName, ErrorTopicName, NewsDetail, Comment, Description, ErrorDescription } = this.state;
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
                                <div style={{ border: '1px solid black', backgroundColor: 'white', height:30 }}>

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
                                        // onBlur={(event, editor) => {
                                        //     //console.log('Blur.', editor);
                                        // }}
                                        // onFocus={(event, editor) => {
                                        //     console.log('Focus.', editor);
                                        // }}
                                        //onChange={(event, editor) => this.onChangeNewsDetail(event, editor)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="control-label">Comment:</label>
                                    <input name="ProductPrice" value={Comment} class="form-control" onChange={(e) => this.onChangeCommnet(e)} />
                                </div> <br />

                                <button type="submit" className="btn btn-info" onclick="alert(confirm('Do you want to submit to leader?'))">Add Assign</button>
                                {/* <div className="form-group">
                                    <label className="control-label">Result</label>
                                    <div>{parse(NewsDetail)}</div>
                                </div> */}
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