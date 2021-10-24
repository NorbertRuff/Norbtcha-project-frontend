import React, {useContext, useState} from 'react';
import {Container, FormWrap, SocialContainer} from "./UserControlStyledElements";
import {NavLink, useHistory} from "react-router-dom";
import {FaFacebook, FaGoogle, FaLinkedin} from "react-icons/fa";
import {dataHandler} from "../../services/Data_handler";
import Swal from "sweetalert2";
import {ErrorMessage} from "../../styles/PageContainerStyledWrapper";
import {UserContext} from "../../context/UserContext";


const Login = () => {
    const [error, setError] = useState(false)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const {setUser} = useContext(UserContext);
    const baseUrl = "http://localhost:8080/share-n-drive/customer-details";

    function validateLoginForm() {
        return (
            userName.length > 0 &&
            password.length > 0
        );
    }

    function handleLoginSubmit() {
        if (validateLoginForm()) {
            dataHandler._data = {
                username: userName,
                password: password
            }
            dataHandler._api_post("http://localhost:8080/auth/signin", dataHandler._data, handleData, setError);
        }
    }

    const history = useHistory();

    function redirect() {
        const timer = setTimeout(() => {
            history.push("/");
        }, 1500);
        return () => {
            clearTimeout(timer)
        };

    }


    let handleData = result => {
        localStorage.setItem('token', result["token"]);
        localStorage.setItem('username', result["username"]);
        dataHandler._api_get(baseUrl, setUser, setError, undefined);
        Swal.fire({
            icon: 'success',
            title: 'Login success',
            footer: '<a href="/">Share & Drive!</a>'
        }).then(r => redirect())

    }


    if (error) {
        return <ErrorMessage>An error occurred while fetching information. Please try again later!</ErrorMessage>;
    }
    return (
        <Container>
            <FormWrap>
                <h1>Sign in</h1>
                <SocialContainer>
                    <NavLink to="/user" title="User"><FaFacebook/></NavLink>
                    <NavLink to="/user" title="User"><FaGoogle/></NavLink>
                    <NavLink to="/user" title="User"><FaLinkedin/></NavLink>
                </SocialContainer>
                <span>or use your account</span>
                <input type="text"
                       id="login_email"
                       aria-describedby="emailHelp"
                       placeholder="Enter email"
                       onChange={e => setUserName(e.target.value)}
                />
                <input type="password"
                       id="login_password"
                       placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <NavLink to="/user" title="User">Forgot your password?</NavLink>
                <button type={"button"} onClick={handleLoginSubmit}>Sign In</button>
            </FormWrap>
        </Container>
    );
};

export default Login;
