import React, {useState} from 'react';
import FormInput from "../forms/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../buttons/Button";

function ViewTask({task}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    //HookForms kan niet gebruikt worden om een object te retourneren, daarom moet hier het object gegenereerd worden
    const [customerDetails, setCustomerDetails] = useState(task.customer);
    const [firstName, setFirstName] = useState(customerDetails.firstName);
    const [lastName, setLastName] = useState(customerDetails.lastName);
    const [address, setAddress] = useState(customerDetails.address);
    const [zip, setZip] = useState(customerDetails.address);
    const [city, setCity] = useState(customerDetails.city);
    const [description, setDescription] = useState(task.description);

    const handleFormSubmit = async (data) => {
        const controller = new AbortController()
        const storedToken = localStorage.getItem('token');
        setLoading(true);
        console.log(data)
        try {
            const response = await axios.put(`http://localhost:8080/tasks/${task.id}`, {customer: data , signal: controller.signal, headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }});
            console.log(response)
        } catch (e) {
            console.error("Hier gaat iets mis!" + e)
            // todo: error handling in UI weergeven!
        }
    }

    return (
        <article>
            <h2>Details Taak</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="task-intro">
                    <div className="customer-details">
                        <div className="input-field">
                            {/*TODO: uitzoeken hoe dit met hook form kan - moet een object doorkrijgen!*/}
                            <FormInput inputType="text" name="firstName" register={register} placeholderText={task.customer.firstName} errors={errors}>Voornaam: </FormInput>
                            <FormInput inputType="text" name="lastName" register={register} placeholderText={task.customer.lastName} errors={errors}>Achternaam: </FormInput>
                            <FormInput inputType="text" name="address" register={register} placeholderText={task.customer.address} errors={errors}>Adres: </FormInput>
                            <FormInput inputType="text" name="zip" register={register} placeholderText={task.customer.zip} errors={errors}>Postcode: </FormInput>
                            <FormInput inputType="text" name="city" register={register} placeholderText={task.customer.city} errors={errors}>Woonplaats: </FormInput>
                        </div>
                    </div>
                    <div className="planning-details">
                        <p>Ingepland op:</p>
                        <p>Datum en tijd{/*todo: map hier de tasklist van de klant*/}</p>
                    </div>
                </div>
                <div className="task-body">
                    <FormInput inputType="text" name="description" register={register} placeholderText={task.description} errors={errors}>Taakomschrijving: </FormInput>
                </div>
                <p>Taakomschrijving:</p>
                <p>{task.description}</p>
                <Button variant="primary" type="submit">Opslaan</Button>
            </form>
        </article>
    );
}

export default ViewTask;