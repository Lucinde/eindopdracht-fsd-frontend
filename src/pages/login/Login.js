import React, {useContext, useState} from 'react';
import './Login.css';
import loginVideo from "../../assets/login/login-video.mp4";
import loginImage from "../../assets/login/planning-login.png";
import {useForm} from 'react-hook-form';
import Button from "../../components/buttons/Button";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import FormInput from "../../components/forms/FormInput";
import Modal from "react-modal";
import configData from "../../config.json";
import Register from "../../components/forms/Register";
import {IconContext} from "../../context/IconContext";

function Login(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useContext(AuthContext);
    const {ico_warning} = useContext(IconContext);
    const adminEmail = `${configData.ADMIN_EMAIL}`;

    const [error, setError] = useState(null);

    const [modalIsOpenForgotPassword, setModalIsOpenForgotPassword] = useState(false);
    const [modalIsOpenRegister, setModalIsOpenRegister] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body'); // Set the appElement for react-modal. Hij zegt dat dit unresolved is, maar het is wel nodig om console-errors te voorkomen

    function closeModalRegister() {
        setModalIsOpenRegister(false);
    }

    const handleFormSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', data);
            login(response.data.jwt, "auth");
        } catch (e) {
            if (e.response != null) {
                // catch application errors
                setError(e.response.data);
            } else {
                // catch Axios messages
                setError(e.message);
            }
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
                    <img className="intro-image" src={loginImage} alt="planning"/>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <FormInput className="login-input" inputType="text" name="username" register={register}
                                   placeholderText="gebruikersnaam" noLabel={true} errors={errors}></FormInput>
                        <FormInput className="login-input" inputType="password" name="password" register={register}
                                   placeholderText="wachtwoord" noLabel={true} errors={errors}></FormInput>
                        <Button variant="primary" transform="uppercase" textAlign="text-center"
                                type="submit">Inloggen</Button>
                        {error &&
                            <p className="text-error"><img src={ico_warning} alt="icon details"
                                                           className="icon warning"/> {error}</p>
                        }
                    </form>
                    <div className="login-features">
                        <Button buttonType="button" variant="text-button"
                                handleClick={() => setModalIsOpenRegister(true)}>
                            Registreren
                        </Button>
                        <Button buttonType="button" variant="text-button"
                                handleClick={() => setModalIsOpenForgotPassword(true)}>
                            Wachtwoord vergeten?
                        </Button>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpenRegister}
                    onRequestClose={closeModalRegister}
                    className={"modal-small"}
                    appElement={document.getElementById('app')}
                >
                    <Register closeModal={closeModalRegister} />
                </Modal>
                <Modal
                    isOpen={modalIsOpenForgotPassword}
                    onRequestClose={() => setModalIsOpenForgotPassword(false)}
                    className={"modal-small text-center"}
                    appElement={document.getElementById('app')}
                >
                    <p>
                        Neem contact op met de beheerder via{' '}
                        <a href={`mailto:${adminEmail}`}>{adminEmail}</a> om je wachtwoord te resetten.
                    </p>
                </Modal>
            </main>
        </>
    );
}

export default Login;