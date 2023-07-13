import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";
import FormInput from "./FormInput";
import Button from "../buttons/Button";
import "./Forms.css";
import {IconContext} from "../../context/IconContext";

function AddNewCustomer({closeModal, handleUpdate}) {
    const {ico_warning} = useContext(IconContext);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            await axios.post(
                `${configData.SERVER_URL}/customers`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            {
                handleUpdate && handleUpdate();
            }
            closeModal();
        } catch (e) {
            setError(e.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="add-customer">
            <h2>Nieuwe klant toevoegen</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="customer-details input-field">
                    <FormInput inputType="text" name="firstName" register={register}
                               errors={errors}>Voornaam: </FormInput>
                    <FormInput inputType="text" name="lastName" register={register}
                               validationSchema={{required: "Vul een achternaam in"}}
                               errors={errors}>Achternaam: </FormInput>
                    <FormInput inputType="text" name="address" register={register}
                               errors={errors}>Adres: </FormInput>
                    <FormInput inputType="text" name="zip" register={register}
                               errors={errors}>Postcode: </FormInput>
                    <FormInput inputType="text" name="city" register={register}
                               validationSchema={{required: "Vul een woonplaats in"}}
                               errors={errors}>Woonplaats: </FormInput>
                    <FormInput inputType="text" name="phoneNumber" register={register}
                               validationSchema={{required: "Vul een telefoonnummer in"}}
                               errors={errors}>Telefoonnummer: </FormInput>
                    <FormInput inputType="text" name="email" register={register}
                               validationSchema={{
                                   required: "Vul een e-mailadres in", pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                       message: "Ongeldig e-mailadres"
                                   }
                               }}
                               errors={errors}>E-mail: </FormInput>
                </div>
                <div className="button-wrapper right">
                    <Button variant="secondary" type="reset" handleClick={closeModal}>Annuleren</Button>
                    <Button variant="primary" type="submit">Klant opslaan</Button>
                </div>
                {error &&
                    <p className="text-error"><img src={ico_warning} alt="icon details"
                                                   className="icon warning"/> {error}</p>
                }
                {loading && <p>Loading...</p>}
            </form>
        </article>
    );
}

export default AddNewCustomer;