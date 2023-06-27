import React, {useState} from 'react';
import FormInput from "../forms/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../buttons/Button";
import ViewScheduleTaskList from "./ViewScheduleTaskList";
import configData from "../../config.json";

function ViewTask({task, handleUpdate}) {
    const {register, handleSubmit, formState: {errors}, setValue, watch, reset} = useForm({
        defaultValues: {
            customer: {
                id: task.customer.id,
                firstName: task.customer.firstName,
                lastName: task.customer.lastName,
                address: task.customer.address,
                zip: task.customer.zip,
                city: task.customer.city,
            },
            description: task.description,
            workPerformed: task.workPerformed,
            jobDone: task.jobDone,
        }
    });
    const [loading, setLoading] = useState(false);
    const jobDone = watch("jobDone");

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
            handleUpdate(response.data);
            console.log(response.data);
        } catch (e) {
            console.error("Hier gaat iets mis!" + e);
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }
    };

    return (
        <article>
            <h2>Details Taak</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="data-form">
                <section className="task-intro">
                    <div className="customer-details">
                        <div className="input-field">
                            {/*TODO: uitzoeken hoe dit met hook form kan - moet een object doorkrijgen!*/}
                            <FormInput inputType="text" name="customer.id" register={register} disabled={true}
                                       errors={errors}>Klantnummer: </FormInput>
                            <FormInput inputType="text" name="customer.firstName" register={register}
                                       errors={errors}>Voornaam: </FormInput>
                            <FormInput inputType="text" name="customer.lastName" register={register}
                                       errors={errors}>Achternaam: </FormInput>
                            <FormInput inputType="text" name="customer.address" register={register}
                                       errors={errors}>Adres: </FormInput>
                            <FormInput inputType="text" name="customer.zip" register={register}
                                       errors={errors}>Postcode: </FormInput>
                            <FormInput inputType="text" name="customer.city" register={register}
                                       errors={errors}>Woonplaats: </FormInput>
                        </div>
                    </div>
                    <div className="planning-details">
                        <p>Ingepland op:</p>
                        <ul className="task-list">
                            {task.scheduleTaskList.length === 0 ? (
                                <p className="attention">Taak is nog niet ingepland</p>
                            ) : (
                                task.scheduleTaskList.map((schedule) => (
                                    <ViewScheduleTaskList key={schedule.id} schedule={schedule}/>
                                ))
                            )}
                        </ul>
                    </div>
                </section>
                <section className="task-body">
                    <label htmlFor="task.description-field">
                        Taakomschrijving:
                        <textarea id="task.description-field" name="description" rows="4"
                                  cols="50" {...register("description")}></textarea>
                    </label>

                    <div className="checkbox">
                        Taak gereed:
                        <FormInput inputType="checkbox" name="jobDone" register={register} errors={errors} />
                    </div>

                    <label htmlFor="task.workPerformed-field">
                        Verrichte werkzaamheden:
                        <textarea id="task.workPerformed-field" name="workPerformed" rows="4"
                                  cols="50" {...register("workPerformed")}></textarea>
                    </label>
                    {/*<FormInput inputType="text" name="description" register={register} errors={errors}>Taakomschrijving: </FormInput>*/}
                </section>
                <div className="button-wrapper view-task">
                    <Button variant="secondary" type="reset" handleClick={() => reset()}>Annuleren</Button>
                    <Button variant="primary" type="submit">Taak opslaan</Button>
                </div>
            </form>
        </article>
    );
}

export default ViewTask;