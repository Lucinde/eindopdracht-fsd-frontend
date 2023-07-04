import React, {useContext, useState} from 'react';
import './Login.css';
import loginVideo from "../../assets/login/login-video.mp4";
import loginImage from "../../assets/login/planning-login.png";
import { useForm } from 'react-hook-form';
import Button from "../../components/buttons/Button";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import FormInput from "../../components/forms/FormInput";
import AddNewCustomer from "../../components/forms/AddNewCustomer";
import Modal from "react-modal";
import configData from "../../config.json";

function Login(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {login} = useContext(AuthContext);
    const adminEmail = `${configData.ADMIN_EMAIL}`;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [modalIsOpenForgotPassword, setModalIsOpenForgotPassword] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body'); // Set the appElement for react-modal. Hij zegt dat dit unresolved is, maar het is wel nodig om console-errors te voorkomen

    const handleFormSubmit = async (data) => {
        // console.log(username, password)
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
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <FormInput className="login-input" inputType="text" name="username" register={register} placeholderText="gebruikersnaam" noLabel={true} errors={errors}></FormInput>
                        <FormInput className="login-input" inputType="password" name="password" register={register} placeholderText="wachtwoord" noLabel={true} errors={errors}></FormInput>
                        <Button variant="primary" transform="uppercase" textAlign="text-center" type="submit">Inloggen</Button>
                    </form>
                    <div className="login-features">
                    <Button buttonType="button" variant="text-button" handleClick={() => setModalIsOpenForgotPassword(true)}>
                        Wachtwoord vergeten?
                    </Button>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpenForgotPassword}
                    onRequestClose={()=> setModalIsOpenForgotPassword(false)}
                    className={"modal-small text-center"}
                    appElement={document.getElementById('app')}
                >
                    <p>
                        Neem contact op met de beheerder via
                        <a href={`mailto:${adminEmail}`}>{adminEmail}</a> om je wachtwoord te resetten.
                    </p>
                </Modal>
            </main>
        </>
    );
}

export default Login;