import React, {useState} from 'react';
import {Container, FormWrap, SocialContainer} from "./UserControlStyledElements";
import {NavLink} from "react-router-dom";
import {FaFacebook, FaGoogle, FaLinkedin} from "react-icons/fa";

import Swal from "sweetalert2";
import CaptchaComponent from "./CaptchaComponent";

const Register = () => {
    const [form, setForm] = useState({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        avatar: ""
    })

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function validateRegisterForm() {
        return (
            form.userName.length > 0 &&
            form.password.length > 0 &&
            form.password === form.confirmPassword
        );
    }


    function passwordError() {
        Swal.fire({
            icon: "error",
            title: 'Passwords not matched',
        })
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (validateRegisterForm()) {
            handleOpen();
        } else {
            passwordError();
        }
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setForm(prevState => ({
            ...prevState,
            [id]: value
        }))
    }


    return (
        <Container>
            <FormWrap>
                <h1>Create account</h1>
                <SocialContainer>
                    <NavLink to="/user" title="User"><FaFacebook/></NavLink>
                    <NavLink to="/user" title="User"><FaGoogle/></NavLink>
                    <NavLink to="/user" title="User"><FaLinkedin/></NavLink>
                </SocialContainer>
                <span>or use Email</span>
                <input type="text"
                       id="userName"
                       aria-describedby="usernameHelp"
                       placeholder="Username"
                       onChange={handleChange}

                />
                <input type="email"
                       id="email"
                       aria-describedby="emailHelp"
                       placeholder="example@example.com"
                       value={form.email}
                       onChange={handleChange}

                />
                <input type="password"
                       id="password"
                       placeholder="Password"
                       value={form.password}
                       onChange={handleChange}

                />
                <input type="password"
                       id="confirmPassword"
                       placeholder="Confirm Password"
                       value={form.confirmPassword}
                       onChange={handleChange}
                />
                <button type={"button"} onClick={handleRegisterSubmit}>Sign Up</button>
            </FormWrap>
            <CaptchaComponent modalOpen={open} handleClose={handleClose} form={form}/>
        </Container>

    )
        ;
};

export default Register;
