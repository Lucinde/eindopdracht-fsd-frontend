import React from 'react';
import './Login.css';
import loginVideo from "../../assets/login/login-video.mp4";
import loginImage from "../../assets/login/planning-login.png";
import { useForm } from 'react-hook-form';
import Button from "../../components/button/Button";

function Login(props) {
    const { register, handleSubmit } = useForm();

    const handleFormSubmit = async (data) => {
        // try catch maken voor inlogformulier
    }

    return (
        <>
            <video autoPlay muted loop id="login-video">
                <source src={loginVideo} type="video/mp4"/>
            </video>
            <main className="login-page">
                <div className="login-form">
                    <h1>Planner<span className="logo-light"> Pro</span></h1>
                    <img src={loginImage} alt="planning"/>
                    {/*todo: functionaliteit aan formulier toevoegen*/}
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <input className="login-input" type="text" id="username-field" placeholder="gebruikersnaam" {...register("username")}/>
                        <input className="login-input" type="text" id="password-field" placeholder="wachtwoord" {...register("password")}/>
                        <Button variant="primary" transform="uppercase" type="submit">Inloggen</Button>
                    </form>
                    {/*todo: wachtwoord vergeten element toevoegen*/}
                </div>
            </main>
        </>
    );
}

export default Login;