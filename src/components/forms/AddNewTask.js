import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";

function AddNewTask(props) {
    const {register, handleSubmit, setValue} = useForm();
    const [customers, setCustomers] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchCustomers = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);

            try {
                setError(false);
                const response = await axios.get(`${configData.SERVER_URL}/customers`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setCustomers(response.data);
            } catch (e) {
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            void fetchCustomers();

            // todo: deze staat in de code van Elwyn uit de les maar als ik dit aanzet logt hij telkens 'the axios request was cancelled'?
            return function cleanup() {
                controller.abort();
            }
        }
    }, [])

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.post(
                `${configData.SERVER_URL}/tasks`,
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
                    {customers &&
                    <label>
                        Klant:
                        <select {...register('customer')}>
                            <option value="">Kies een klant</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.firstName} {customer.lastName}
                                </option>
                            ))}
                        </select>
                    </label>
                    }
                </form>
                </article>
                );
            }

export default AddNewTask;