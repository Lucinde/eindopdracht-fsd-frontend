import React, {useContext, useState} from 'react';
import './Login.css';
import loginVideo from "../../assets/login/login-video.mp4";
import loginImage from "../../assets/login/planning-login.png";
import { useForm } from 'react-hook-form';
import Button from "../../components/buttons/Button";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import FormInput from "../../components/forms/FormInput";

function Login(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {login} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (data) => {
        console.log(username, password)
        try {
            const response = await axios.post('http://localhost:8080/authenticate', data);
            console.log(response)
            login(response.data.jwt, "auth");
        } catch (e) {
            console.error("Onjuist email en wachtwoord combinatie ⛔", e)
            console.log(username, password)
            // todo: error handling in UI weergeven!
        }
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
                        <FormInput className="login-input" inputType="text" name="username" register={register} placeholderText="gebruikersnaam" noLabel={true} errors={errors}></FormInput>
                        <FormInput className="login-input" inputType="password" name="password" register={register} placeholderText="wachtwoord" noLabel={true} errors={errors}></FormInput>
                        {/*<input className="login-input" type="text" id="username-field" placeholder="gebruikersnaam" {...register("username")}/>*/}
                        {/*<input className="login-input" type="password" id="password-field" placeholder="wachtwoord" {...register("password")}/>*/}
                        <Button variant="primary" transform="uppercase" textAlign="text-center" type="submit">Inloggen</Button>
                    </form>
                    {/*todo: wachtwoord vergeten element toevoegen*/}
                </div>
            </main>
        </>
    );
}

export default Login;