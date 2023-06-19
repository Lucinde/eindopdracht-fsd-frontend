import React from 'react';
import './Login.css';
import loginVideo from "../../assets/login/login-video.mp4";
import loginImage from "../../assets/login/planning-login.png";

function Login(props) {
    return (
        <>
            <video autoPlay muted loop id="login-video">
                <source src={loginVideo} type="video/mp4"/>
            </video>
            <main className="login-page">
                <div className="login-form">
                    <h1>Planner<span className="logo-light"> Pro</span></h1>
                    <img src={loginImage} alt="planning"/>
                    <form>

                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;