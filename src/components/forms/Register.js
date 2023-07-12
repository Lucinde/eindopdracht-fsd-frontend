import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";
import Button from "../buttons/Button";
import {IconContext} from "../../context/IconContext";
import FormInput from "./FormInput";
import {AuthContext} from "../../context/AuthContext";

function Register({closeModal}) {
    const {ico_warning} = useContext(IconContext);
    const {login} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors}
    } = useForm();

    async function loginAfterRegister(data) {
        const response = await axios.post('http://localhost:8080/authenticate', data);
        login(response.data.jwt, "auth");
    }

    const handleFormSubmit = async (data) => {
        setLoading(true);

        const jsonData = {
            ...data,
            enabled: true
        }

        delete jsonData.passwordConfirmation; //herhalingswachtwoord niet meesturen

        try {
            await axios.post(
                `${configData.SERVER_URL}/users`,
                jsonData
            );
            await loginAfterRegister(data, "/mechanic");
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
                           validationSchema={{
                               required: "Vul een wachtwoord in",
                               minLength: {
                                   value: 6,
                                   message: 'Het wachtwoord moet minimaal 6 karakters lang zijn',
                               },
                               maxLength: {
                                   value: 25,
                                   message: 'Het wachtwoord mag maximaal 25 karakters lang zijn',
                               },
                           }}
                           errors={errors}>Wachtwoord: </FormInput>
                <FormInput inputType="password" name="passwordConfirmation" register={register}
                    validationSchema={{
                        required: 'Vul ter bevestiging nogmaals uw wachtwoord in',
                        validate: (value) =>
                            value === getValues('password') || 'Wachtwoorden komen niet overeen',
                    }}
                    errors={errors}
                >
                    Bevestig wachtwoord:{' '}
                </FormInput>
                <FormInput inputType="email" name="email" register={register}
                           validationSchema={{required: "Vul een e-mailadres in", pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "Ongeldig e-mailadres"
                               }}}
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