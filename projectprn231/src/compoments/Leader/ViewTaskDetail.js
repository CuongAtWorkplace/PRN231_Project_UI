import React, { Component } from "react";

export class ViewTaskDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        }
    }

    

    render() {
        return (
            <div className="container">
                <section className="panel tasks-widget">
                    <header className="panel-heading">
                        <h2>Task Detail</h2>
                    </header>
                </section>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Writing Task</h3>


                    </div>
                    <div className="col-md-6">
                        <h3>Report Task</h3>
                    </div>
                </div>

            </div>
        )
    }
}