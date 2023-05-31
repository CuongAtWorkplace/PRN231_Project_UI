import React, {Component} from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export class Leader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TopicName: '',
            ErrorTopicName: null, 
            Description:'', 
            ErrorDescription: null,
            CategoryName: '', 
            CategoryId: 0, 
            
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

    onChangeCategorie = (e) => {

    }


    render() {
        const { TopicName, ErrorTopicName, Description, CategoryName } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <section className="panel tasks-widget">
                            <header className="panel-heading">
                                <h2>Add Topic</h2>
                            </header>
                        </section>
                        <div class="panel-body">
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

                                <div className="form-group">
                                    <label className="control-label">Topic Categories:</label> <br></br>
                                    <select class="form-select"
                                        onChange={this.onChangeCategorie()}
                                        value={CategoryName}>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Assign To Writer:</label>
                                    <select class="form-select">
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Assign To Reporter:</label>
                                    <select class="form-select">
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Create Date:</label>
                                    <input type="date" className="form-control"/>
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Deadline:</label>
                                    <input type="date" className="form-control"/>
                                    {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>}
                                </div> <br/>

                                <button type="submit" className="btn btn-info" onclick="alert(confirm('Bạn có muốn tạo mới assign?'))">Add Assign</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}