import React, {useState} from 'react';
import {Container, FormWrap, SocialContainer} from "./UserControlStyledElements";
import {NavLink} from "react-router-dom";
import {FaFacebook, FaGoogle, FaLinkedin} from "react-icons/fa";
import {dataHandler} from "../../services/Data_handler";
import Swal from "sweetalert2";

import CaptchaComponent from "./CaptchaComponent";


const Login = () => {
    const [form, setForm] = useState({
        login_email: "",
        login_password: "",
    })

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function validateLoginForm() {
        return (
            form.login_email.length > 0 &&
            form.login_password.length > 0
        );
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setForm(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    function formError() {
        Swal.fire({
            icon: "error",
            title: 'Form not completed',
        })
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        if (validateLoginForm()) {
            handleOpen();
            dataHandler._data = {
                username: form.login_email,
                password: form.login_password
            }
        } else {
            formError();
        }
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
                       value={form.email}
                       onChange={handleChange}
                />
                <input type="password"
                       id="login_password"
                       placeholder="Password"
                       value={form.password}
                       onChange={handleChange}
                />
                <NavLink to="/user" title="User">Forgot your password?</NavLink>
                <button type={"button"} onClick={handleLoginSubmit}>Sign In</button>
                <CaptchaComponent modalOpen={open} handleClose={handleClose} form={form}/>
            </FormWrap>
        </Container>
    );
};

export default Login;
