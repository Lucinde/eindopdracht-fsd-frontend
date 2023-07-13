import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";
import FormInput from "../forms/FormInput";
import Button from "../buttons/Button";
import {IconContext} from "../../context/IconContext";

function ViewCustomer({customer, handleUpdate, closeModal}) {
    const {ico_warning} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            address: customer.address,
            zip: customer.zip,
            city: customer.city,
            phoneNumber: customer.phoneNumber,
            email: customer.email
        }
    });

    const handleFormSubmit = async (data) => {
        console.log(data)
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.put(
                `${configData.SERVER_URL}/customers/${customer.id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            handleUpdate(response.data);
            closeModal();
        } catch (e) {
            setError(e.response.data);
        } finally {
            setLoading(false);
        }
    };


    return (
        <article>
            <h2>Details Klant</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="data-form">
                <section className="task-intro">
                    <div className="input-field">
                        <FormInput inputType="text" name="id" register={register} disabled={true}
                                   errors={errors}>Klantnummer: </FormInput>
                        <FormInput inputType="text" name="firstName" register={register}
                                   errors={errors}>Voornaam: </FormInput>
                        <FormInput inputType="text" name="lastName" register={register}
                                   validationSchema={{required: "Vul een achternaam in"}}
                                   errors={errors}>Achternaam: </FormInput>
                        <FormInput inputType="text" name="phoneNumber" register={register}
                                   validationSchema={{required: "Vul een telefoonnummer in"}}
                                   errors={errors}>Telefoonnummer: </FormInput>
                    </div>
                    <div className="input-field">
                        <FormInput inputType="text" name="address" register={register}
                                   errors={errors}>Adres: </FormInput>
                        <FormInput inputType="text" name="zip" register={register}
                                   errors={errors}>Postcode: </FormInput>
                        <FormInput inputType="text" name="city" register={register}
                                   validationSchema={{required: "Vul een woonplaats in"}}
                                   errors={errors}>Woonplaats: </FormInput>
                        <FormInput inputType="text" name="email" register={register}
                                   validationSchema={{required: "Vul een e-mailadres in", pattern: {
                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                           message: "Ongeldig e-mailadres"
                                       }}}
                                   errors={errors}>E-mail: </FormInput>
                    </div>
                </section>
                <section className="button-wrapper view-task">
                    <Button variant="secondary" type="reset" handleClick={closeModal}>Annuleren</Button>
                    <Button variant="primary" type="submit">Klant opslaan</Button>
                </section>
                {error &&
                    <p className="text-error"><img src={ico_warning} alt="icon details"
                                                   className="icon warning"/> {error}</p>
                }
                {loading && <p>Loading...</p>}
            </form>

        </article>
    );
}

export default ViewCustomer;