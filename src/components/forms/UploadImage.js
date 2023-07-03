import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import configData from "../../config.json";
import {useForm} from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../buttons/Button";
import {IconContext} from "../../context/IconContext";

function UploadImage({taskId, closeModal, handleUpdate}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {ico_warning} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);
        console.log("hij start")

        const f = new File([""], "");

        const formData = new FormData();
        if (data.file[0]) {
            formData.append('file', data.file[0]);
        } else {
            formData.append('file', f);
        }
        if (data.description) {
            formData.append('description', data.description);
        } else {
            formData.append('description', '');
        }
        formData.append('task_id', taskId);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
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
            setError(e.response.data)
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <h2>Afbeelding toevoegen</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="image-upload">
                <FormInput inputType="file" name="file" register={register}
                           validationSchema={{required: "voeg een afbeelding toe",
                               validate: {
                               lessThan10MB: files => files[0]?.size < 10000000 || 'Max 10MB',
                               acceptedFormats: files =>
                               ['image/jpeg', 'image/png'].includes(
                               files[0]?.type
                               ) || 'Je kunt alleen PNG of JPG bestanden uploaden',
                           }
                           }}
                           errors={errors}/>
                <FormInput inputType="text" name="description" register={register}
                           validationSchema={{required: "voeg een beschrijving toe"}}
                           errors={errors}>Beschrijving: </FormInput>
                <div className="button-wrapper">
                    <Button variant="secondary" handleClick={closeModal}>Annuleren</Button>
                    <Button variant="primary" type="submit">Afbeelding uploaden</Button>
                </div>
                {error &&
                    <p className="text-error"><img src={ico_warning} alt="icon details"
                                                   className="icon warning"/> {error}</p>
                }
            </form>
        </>
    );
}

export default UploadImage;