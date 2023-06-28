import React, {useState} from 'react';
import FormInput from "../forms/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../buttons/Button";
import ViewScheduleTaskList from "./ViewScheduleTaskList";
import configData from "../../config.json";

// todo: Fetch nav id aanmaken voor de task
function ViewTask({task, handleUpdate, closeModal}) {
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
            <h2>Details Taak</h2>
            <section className="task-intro">
                <div className="customer-details">
                    <p>Klantnummer: {task.customer.id}</p>
                    <p>Naam: {task.customer.firstName} {task.customer.lastName}</p>
                    <p>Adres: {task.customer.address}, {task.customer.zip} {task.customer.city}</p>
                    <p>Telefoonnummer: {task.customer.phoneNumber}</p>
                    <p>E-mail: {task.customer.email}</p>
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
            <form onSubmit={handleSubmit(handleFormSubmit)} className="data-form">
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
                    {/*todo: De reset roept ook de close op?*/}
                    <Button variant="secondary" type="reset" handleClick={() => reset()}>Annuleren</Button>
                    <Button variant="primary" type="submit">Taak opslaan</Button>
                </div>
            </form>
        </article>
    );
}

export default ViewTask;