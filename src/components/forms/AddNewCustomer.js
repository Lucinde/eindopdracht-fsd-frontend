import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";

function AddNewCustomer(props) {
    const {register, handleSubmit, setValue} = useForm();
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
            // handleUpdate();
            // closeModal();
        } catch (e) {
            console.error("Hier gaat iets mis!" + e);
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }
    };

    return (
        <article>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

            </form>
        </article>
    );
}

export default AddNewCustomer;