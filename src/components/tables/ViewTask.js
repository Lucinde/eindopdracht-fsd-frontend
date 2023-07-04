import React, {useContext, useEffect, useState} from 'react';
import FormInput from "../forms/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../buttons/Button";
import ViewScheduleTaskList from "./ViewScheduleTaskList";
import configData from "../../config.json";
import ImageComponent from "../imageComponent/ImageComponent";
import AddNewCustomer from "../forms/AddNewCustomer";
import {AuthContext} from "../../context/AuthContext";

function ViewTask({taskId, customer, handleUpdate, closeModal}) {
    const {authority} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [imageData, setImageData] = useState();

    const [task, setTask] = useState({
            id: 0,
            description: null,
            workPerformed: null,
            jobDone: false,
            scheduleTaskList: []
        });

    const {register, handleSubmit, formState: {errors}, setValue, watch, reset} = useForm();

    useEffect(() => {
        // reset form with task data
        if (task) {
            reset({
                customer: {
                    id: customer.id,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    address: customer.address,
                    zip: customer.zip,
                    city: customer.city,
                },
                description: task.description,
                workPerformed: task.workPerformed,
                jobDone: task.jobDone,
            });
        }
    }, [task, reset]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`${configData.SERVER_URL}/tasks/${taskId}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setTask(response.data);
            } catch (e) {
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading(false);
        }

        if(taskId != null) {
            void fetchData();
        }

        // todo: deze staat in de code van Elwyn uit de les maar als ik dit aanzet logt hij telkens 'the axios request was cancelled'?
        return function cleanup() {
            controller.abort();
        }
    }, [taskId])

    useEffect(() => {
        const controller = new AbortController();

        const fetchImage = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`${configData.SERVER_URL}/files/task/${taskId}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setImageData(response.data);
                console.log(imageData);
            } catch (e) {
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading(false);
        }
        void fetchImage();

        return function cleanup() {
            if(error) {
                controller.abort();
            }
        }
    }, [taskId])

    const handleFormSubmit = async (data) => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.put(
                `${configData.SERVER_URL}/tasks/${task.id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            handleUpdate();
            closeModal();
        } catch (e) {
            console.error("Hier gaat iets mis!" + e);
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmitNewTask = async (data) => {
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
            handleUpdate();
            closeModal();
        } catch (e) {
            console.error("Hier gaat iets mis!" + e);
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }

    };

    return (
        <article>
            {task ? (
                <>
                    <h2>Details Taak</h2>
                    <section className="task-intro">
                        <div className="customer-details">
                            <p>Klant: {customer.id}</p>
                            <p>{customer.firstName} {customer.lastName}</p>
                            <p>{customer.address}</p>
                            <p>{customer.zip} {customer.city}</p>
                            <p>Tel.: {customer.phoneNumber}</p>
                            <p>{customer.email}</p>
                        </div>
                        <div className="planning-details">
                            <p>Ingepland op:</p>
                            <ul className="task-list">
                                {task.scheduleTaskList && task.scheduleTaskList.length > 0 ? (
                                        task.scheduleTaskList.map((schedule) => (
                                            <ViewScheduleTaskList key={schedule.id} scheduleId={schedule.id} />
                                        )
                                        )) : <p className="attention">Taak is nog niet ingepland</p>
                                }
                            </ul>
                        </div>
                    </section>
                    <form onSubmit={taskId ? handleSubmit(handleFormSubmit) : handleSubmit(handleFormSubmitNewTask)} className="data-form">
                        <section className="task-body">
                            <label htmlFor="task.description-field">
                                Taakomschrijving:
                                <textarea id="task.description-field" name="description" rows="4"
                                          cols="50" {...register("description")}
                                          disabled={authority === "ROLE_MECHANIC"}>
                                </textarea>
                            </label>

                            <div className="checkbox">
                                Taak gereed:
                                <FormInput inputType="checkbox" name="jobDone" register={register} errors={errors}/>
                            </div>

                            <label htmlFor="task.workPerformed-field">
                                Verrichte werkzaamheden:
                                <textarea id="task.workPerformed-field" name="workPerformed" rows="4"
                                          cols="50" {...register("workPerformed")}></textarea>
                            </label>
                                <div className="task-images">
                                    <p>Afbeeldingen:</p>
                                    <div className="image-list">
                                        {imageData && imageData.length > 0
                                            ? imageData.map((image) => {
                                                return <ImageComponent key={image.id} base64String={image.data} imageDesc={image.description} />
                                            })
                                            : <p className="attention">Nog geen afbeeldingen</p>
                                        }
                                    </div>
                                </div>
                        </section>
                        <div className="button-wrapper view-task">
                            <Button variant="secondary" type="reset" handleClick={closeModal}>Annuleren</Button>
                            <Button variant="primary" type="submit">Taak opslaan</Button>
                        </div>
                    </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </article>
    );
}

export default ViewTask;