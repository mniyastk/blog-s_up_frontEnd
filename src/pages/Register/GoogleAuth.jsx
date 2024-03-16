import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleAuth() {
  const history = useNavigate();
  return (
    <div>
      <div>
        <GoogleOAuthProvider clientId="843361358325-a5irfh33b7nt663i647slfmnpf35l67v.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              
              history("/home");
            }}
            onError={() => {
               
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default GoogleAuth;
