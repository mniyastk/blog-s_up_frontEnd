import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/user/userSlice";

function GoogleAuth({ width }) {
    const history = useNavigate();

    const dispatch = useDispatch();

    return (
        <div className=" w-full flex justify-center ">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    width={width}
                    onSuccess={(credentialResponse) => {
                        axios
                            .post("/user/googleauth", credentialResponse)
                            .then((res) => {
                                dispatch(addUser(res.data.user));
                                localStorage.setItem("isUser", true);
                                history("/home");
                            })
                            .catch((err) => {
                                console.log(err.response.data);
                            });
                    }}
                    onError={() => {}}
                />
            </GoogleOAuthProvider>
        </div>
    );
}

export default GoogleAuth;
