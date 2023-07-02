import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import configData from "../../config.json";
import FormInput from "./FormInput";
import Button from "../buttons/Button";

function ScheduleTask({taskId, closeModal, handleUpdate}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    }
        = useForm({
        defaultValues: {
            task: {
                id: taskId,
            },
            mechanic: {
                username: '',
            }
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mechanics, setMechanics] = useState([]);

    useEffect(() => {
        void fetchMechanics();
    },[])

    const fetchMechanics = async() => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.get(
                `${configData.SERVER_URL}/users/mechanics`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            console.log(response)
            setMechanics(response.data);

        } catch (e) {
            console.error("Hier gaat iets mis!" + e);
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }
    }

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);
        console.log(data)

        try {
            const response = await axios.post(
                `${configData.SERVER_URL}/schedule-tasks`,
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
        <article className="schedule-task">
            <h2>Taak plannen</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="schedule-details input-field">
                    <FormInput inputType="date" name="date" register={register}
                               errors={errors}>Datum: </FormInput>
                    <FormInput inputType="time" name="startTime" register={register}
                               errors={errors}>Van: </FormInput>
                    <FormInput inputType="time" name="endTime" register={register}
                               errors={errors}>Tot: </FormInput>
                    {mechanics && <label>
                        Monteur:
                        <select {...register('mechanic.username')}>
                            <option value="">Kies een monteur</option>
                            {mechanics.map((mechanic) => (
                                <option key={mechanic.username} value={mechanic.username}>
                                    {mechanic.username}
                                </option>
                            ))}
                        </select>
                    </label>
                    }
                </div>
                <div className="button-wrapper right">
                    <Button variant="secondary" type="reset" handleClick={closeModal}>Annuleren</Button>
                    <Button variant="primary" type="submit">Planning opslaan</Button>
                </div>
            </form>
        </article>
    );
}

export default ScheduleTask;