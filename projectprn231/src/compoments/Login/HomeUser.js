import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";

class HomeUser extends Component{
    render(){
        return(
            <div>
                <h1> Hello User</h1>
            </div>
        )
    }
}

export default withRouter(HomeUser);