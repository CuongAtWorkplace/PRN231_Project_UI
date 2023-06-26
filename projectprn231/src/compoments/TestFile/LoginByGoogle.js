import React, { Component } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export class LoginByGoogle extends Component {
  render() {
    return (
      <div>
        <GoogleOAuthProvider clientId="186729364333-sfd6o0oe4ud91dllo9t4s2p834kjj53e.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>;

      </div>
    )
  }
}