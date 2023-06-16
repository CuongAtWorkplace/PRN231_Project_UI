import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";


class Test extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        alert(id);
    }
    
    render() {
      
        return (
            <div >
                <h1>Hello World</h1>
            </div>
        )
    }
}

export default withRouter(Test)