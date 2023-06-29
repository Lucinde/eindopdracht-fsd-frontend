import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";
import FormInput from "./FormInput";
import Button from "../buttons/Button";
import "./Forms.css";

function AddNewCustomer({closeModal, handleUpdate}) {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.post(
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
            console.error("Hier gaat iets mis!" + e);
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="add-customer">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="customer-details input-field">
                    <FormInput inputType="text" name="firstName" register={register}
                               errors={errors}>Voornaam: </FormInput>
                    <FormInput inputType="text" name="lastName" register={register}
                               errors={errors}>Achternaam: </FormInput>
                    <FormInput inputType="text" name="address" register={register}
                               errors={errors}>Adres: </FormInput>
                    <FormInput inputType="text" name="zip" register={register}
                               errors={errors}>Postcode: </FormInput>
                    <FormInput inputType="text" name="city" register={register}
                               errors={errors}>Woonplaats: </FormInput>
                    <FormInput inputType="text" name="phoneNumber" register={register}
                               errors={errors}>Telefoonnummer: </FormInput>
                    <FormInput inputType="text" name="email" register={register}
                               errors={errors}>E-mail: </FormInput>
                </div>
                <div className="button-wrapper right">
                    <Button variant="secondary" type="reset" handleClick={closeModal}>Annuleren</Button>
                    <Button variant="primary" type="submit">Klant opslaan</Button>
                </div>
            </form>
        </article>
    );
}

export default AddNewCustomer;