import React, {useEffect, useState} from 'react';
import {Container, FormWrap, SocialContainer} from "./UserControlStyledElements";
import {NavLink} from "react-router-dom";
import {FaFacebook, FaGoogle, FaLinkedin} from "react-icons/fa";
import {dataHandler} from "../../services/Data_handler";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import Swal from "sweetalert2";

const Register = () => {
    const captchaImageBaseUrl = "http://localhost:5000/get-captcha-image"
    const captchaImageColorUrl = "http://localhost:5000/get-captcha-color"
    const captchaResultUrl = "http://localhost:5000/get-captcha-result"

    const [captchaImage, setCaptchaImage] = useState();
    const [captchaImageColor, setCaptchaImageColor] = useState();
    const [textBoxValue, setTextBoxValue] = useState("");
    const [captchaResult, setCaptchaResult] = useState("");
    const [errorVisible, setErrorVisible] = useState('none');


    useEffect(() => {
        dataHandler._api_get(captchaImageBaseUrl, setCaptchaImage, undefined, undefined);
        dataHandler._api_get(captchaImageColorUrl, setCaptchaImageColor, undefined, undefined);
    }, [captchaImageBaseUrl]);


    const [state, setState] = useState({
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
            state.userName.length > 0 &&
            state.password.length > 0 &&
            state.password === state.confirmPassword
        );
    }

    function registerUser() {
        dataHandler._data = {
            username: state.userName,
            email: state.email,
            password: state.password,
            avatar: parseInt(state.avatar)
        }
    }

    function passwordError() {
        Swal.fire({
            icon: "error",
            title: 'Passwords not matched',
            footer: '<a href="/">Share & Drive!</a>'
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
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function reFetch() {
        dataHandler._api_get(captchaImageBaseUrl, setCaptchaImage, undefined, undefined);
        dataHandler._api_get(captchaImageColorUrl, setCaptchaImageColor, undefined, undefined);
    }

    function sendResults() {
        setErrorVisible("none");
        let jsonBody = {
            color: textBoxValue.split(" ")[0],
            image: textBoxValue.split(" ")[1]
        }

        dataHandler._api_post(captchaResultUrl, jsonBody, setCaptchaResult, console.error);
        if (captchaResult.response === "OK") {
            handleClose();
            registerUser();
            Swal.fire({
                icon: "success",
                title: 'Successfully registered!',
            })
        } else {
            setErrorVisible('flex');
        }
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
                    // onChange={e => setUserName(e.target.value)}

                />
                <input type="email"
                       id="email"
                       aria-describedby="emailHelp"
                       placeholder="example@example.com"
                       value={state.email}
                       onChange={handleChange}

                />
                <input type="password"
                       id="password"
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange}

                />
                <input type="password"
                       id="confirmPassword"
                       placeholder="Confirm Password"
                       value={state.confirmPassword}
                       onChange={handleChange}
                />
                <button type={"button"} onClick={handleRegisterSubmit}>Sign Up</button>
            </FormWrap>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Verify that you are a human!
                    </Typography>
                    <svg width="400" fill={captchaImageColor} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                        <path d={captchaImage}/>
                    </svg>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <TextField onChange={(event) => setTextBoxValue(event.target.value)}
                                   id={"captchaInput"}
                                   sx={{width: "400px"}}
                                   fullWidth variant={"outlined"}
                                   placeholder={"Describe the picture"}
                        />
                        <Button variant={"outlined"} onClick={sendResults}>Submit</Button>

                    </Box>


                    <Button variant={"outlined"} onClick={reFetch}>Give me another picture</Button>
                    <Typography display={errorVisible} id="modal-modal-title" variant="h5" component="h5">
                        Sorry no match, Try again!
                    </Typography>
                </Box>
            </Modal>
        </Container>

    )
        ;
};

export default Register;
