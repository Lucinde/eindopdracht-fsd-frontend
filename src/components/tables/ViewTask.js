import React, {useState} from 'react';
import FormInput from "../forms/FormInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../buttons/Button";
import ViewScheduleTaskList from "./ViewScheduleTaskList";

function ViewTask({task}) {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(task)
    const {register, handleSubmit, formState: {errors}, setValue, watch} = useForm({
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
        console.log(data)
        console.log(storedToken)

        try {
            const response = await axios.put(
                `http://localhost:8080/tasks/${task.id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            console.log(response);
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
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="task-intro">
                    <div className="customer-details">
                        <div className="input-field">
                            {/*TODO: uitzoeken hoe dit met hook form kan - moet een object doorkrijgen!*/}
                            <FormInput inputType="text" name="customer.id" register={register}
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
                        {task.scheduleTaskList.map((schedule) => {
                            return <ViewScheduleTaskList key={schedule.id} schedule={schedule} />
                        })}
                        </ul>
                    </div>
                </div>
                <div className="task-body">
                    <label htmlFor="task.description-field">
                        Taakomschrijving:
                        <textarea id="task.description-field" name="description" rows="4"
                                  cols="50" {...register("description")}></textarea>
                    </label>
                    <div className="radio-button">
                        <p>Taak gereed:</p>
                        <label htmlFor="false">
                            <input type="radio" id="false" value="false" checked={task.jobDone === false}
                                   onChange={() => setValue("jobDone", "true")}
                                   {...register("jobDone")}/>
                            Nee
                        </label>
                        <label htmlFor="true">
                            <input type="radio" id="true" value="false" checked={task.jobDone === true}
                                   onChange={() => setValue("jobDone", "true")}
                                   {...register("jobDone")}/>
                            Ja
                        </label>
                    </div>
                    <label htmlFor="task.workPerformed-field">
                        Verrichte werkzaamheden:
                        <textarea id="task.workPerformed-field" name="workPerformed" rows="4"
                                  cols="50" {...register("workPerformed")}></textarea>
                    </label>
                    {/*<FormInput inputType="text" name="description" register={register} errors={errors}>Taakomschrijving: </FormInput>*/}
                </div>
                <Button variant="primary" type="submit">Opslaan</Button>
            </form>
        </article>
    );
}

export default ViewTask;