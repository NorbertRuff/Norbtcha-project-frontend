import React, {useState} from 'react';
import {Ghost, LoginWrapper, OverlayPanel} from "../UserControl/UserControlStyledElements";
import Login from "../UserControl/Login";
import Register from "../UserControl/Register";
import {MainContentWrapper} from "../../styles/PageContainerStyledWrapper";

const MainPage = () => {

    const [leftPanelActive, setLeftPanelActive] = useState(false)
    const [rightPanelActive, setRightPanelActive] = useState(true)


    function handleClick() {
        leftPanelActive ? setLeftPanelActive(false) : setLeftPanelActive(true)
        rightPanelActive ? setRightPanelActive(false) : setRightPanelActive(true)
    }

    return (
        <MainContentWrapper>
            <LoginWrapper>
                <Login/>
                <Register/>
                <OverlayPanel pos={leftPanelActive ? 0 : 100}
                              color={leftPanelActive ? "var(--clr-primary-300)" : "var(--clr-primary-400)"}
                              fontColor={leftPanelActive ? "var(--clr-primary-200)" : "var(--clr-primary-200)"}>
                    <h1>{leftPanelActive ? "Hello!" : "Hello!"}</h1>
                    <h2>{leftPanelActive ? "Welcome Back!" : "New here?"}</h2>
                    <p>{leftPanelActive ? "Login!" : "Register!"}</p>
                    <Ghost id="signIn" onClick={handleClick}>{leftPanelActive ? "Sign in" : "Sign up"}</Ghost>
                </OverlayPanel>
            </LoginWrapper>
        </MainContentWrapper>)
};

export default MainPage;