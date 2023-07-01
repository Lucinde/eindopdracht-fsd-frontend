import React, {useState} from 'react';
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
            }
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

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
                    {/*<FormInput inputType="text" name="city" register={register}*/}
                    {/*           errors={errors}>Monteur </FormInput>*/}
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