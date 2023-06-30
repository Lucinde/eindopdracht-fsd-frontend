import React, {useEffect, useState} from 'react';
import axios from "axios";
import configData from "../../config.json";
import {useForm} from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../buttons/Button";

function UploadImage({taskId, closeModal, handleUpdate}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        const formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('description', data.description);
        formData.append('task_id', taskId);

        try {
            const response = await axios.post(
                `${configData.SERVER_URL}/files`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            handleUpdate();
            closeModal();
        } catch (e) {
            console.error("Hier gaat iets mis!" + e.data);
            console.log(data);
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="image-upload">
            <FormInput inputType="file" name="file" register={register}
                       errors={errors}>Kies bestand: </FormInput>
            <FormInput inputType="text" name="description" register={register}
                       errors={errors}>Omschrijving: </FormInput>
            <div className="button-wrapper">
                <Button variant="secondary" handleClick={closeModal}>Annuleren</Button>
                <Button variant="primary" type="submit">Afbeelding uploaden</Button>
            </div>
        </form>
    );
}

export default UploadImage;