import React, { Component } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

export class LoginByFaceBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Profile: null
        }
    }

    render() {
        return (
            <div>
                <LoginSocialFacebook
                    appId="233542922769686"
                    onResolve={(response) => {
                        console.log(response)
                        this.setState({Profile: response.data})
                    }}
                    onReject={(error) => {
                        console.log(error)
                    }}
                >
                    <FacebookLoginButton />
                </LoginSocialFacebook>
            </div>
        )
    }
}