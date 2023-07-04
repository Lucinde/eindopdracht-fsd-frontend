import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";
import {useNavigate} from "react-router-dom";
import Button from "../buttons/Button";
import {IconContext} from "../../context/IconContext";
import FormInput from "./FormInput";
import authContext, {AuthContext} from "../../context/AuthContext";

function Register({closeModal}) {
    const {ico_warning} = useContext(IconContext);
    const {login} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    async function loginAfterRegister(data) {
        const response = await axios.post('http://localhost:8080/authenticate', data);
        console.log(response)
        login(response.data.jwt, "auth");
    }

    const handleFormSubmit = async (data) => {
        setLoading(true);

        const jsonData = {
            ...data,
            enabled: true
        }

        try {
            await axios.post(
                `${configData.SERVER_URL}/users`,
                jsonData
            );
            await loginAfterRegister(data, "/mechanic");
            // navigate("/mechanic");
        } catch (e) {
            setError(e.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>Registreer je als monteur</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="input-field">
                <FormInput inputType="text" name="username" register={register}
                           validationSchema={{required: "Vul een naam in"}}
                           errors={errors}>Gebruikersnaam: </FormInput>
                <FormInput inputType="password" name="password" register={register}
                           validationSchema={{required: "Vul een wachtwoord in"}}
                           errors={errors}>Wachtwoord: </FormInput>
                <FormInput inputType="text" name="email" register={register}
                           validationSchema={{required: "Vul een e-mailadres in"}}
                           errors={errors}>E-mail: </FormInput>
                <div className="button-wrapper right">
                    <Button variant="secondary" type="reset" handleClick={closeModal}>Annuleren</Button>
                    <Button variant="primary" type="submit">Registreren</Button>
                </div>
            </form>
            {error &&
                <p className="text-error"><img src={ico_warning} alt="icon details"
                                               className="icon warning"/> {error}</p>
            }
            {loading && <p>Loading...</p>}
        </>
    );
}

export default Register;