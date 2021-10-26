import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {dataHandler} from "../../services/Data_handler";
import Swal from "sweetalert2";


const CaptchaComponent = (props) => {

    const captchaImageBaseUrl = "http://localhost:5000/get-captcha-image"
    const captchaImageColorUrl = "http://localhost:5000/get-captcha-color"
    const captchaResultUrl = "http://localhost:5000/get-captcha-result"

    const [captchaImage, setCaptchaImage] = useState();
    const [captchaImageColor, setCaptchaImageColor] = useState();
    const [textBoxValue, setTextBoxValue] = useState("");
    const [errorVisible, setErrorVisible] = useState('none');


    useEffect(() => {
        dataHandler._api_get(captchaImageBaseUrl, setCaptchaImage, undefined, undefined);
        dataHandler._api_get(captchaImageColorUrl, setCaptchaImageColor, undefined, undefined);
    }, [captchaImageBaseUrl]);


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

    function registerUser() {
        dataHandler._data = {
            username: props.form.userName,
            email: props.form.email,
            password: props.form.password
        }

    }

    function sendResults() {
        setErrorVisible("none");
        let jsonBody = {
            color: textBoxValue.split(" ")[0],
            image: textBoxValue.split(" ")[1]
        }
        dataHandler._api_post(captchaResultUrl, jsonBody).then(res => {
            if (res.response === "OK") {
                props.handleClose();
                registerUser();
                Swal.fire({
                    icon: "success",
                    title: 'Successful!',
                })
            } else {
                setErrorVisible('flex');
            }
        })
    }


    return (
        <Modal
            open={props.modalOpen}
            onClose={props.handleClose}
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
                               placeholder={"Describe the picture with a color and icon"}
                    />
                    <Button sx={{m: 1}} variant={"outlined"} onClick={sendResults}>Submit</Button>

                </Box>
                <Button sx={{m: 1}} variant={"outlined"} onClick={reFetch}>Give me another picture</Button>
                <Typography margin={1} display={errorVisible} id="modal-modal-title" variant="h5" component="h5">
                    Sorry no match, Try again!
                </Typography>
            </Box>
        </Modal>
    );
};

export default CaptchaComponent;
