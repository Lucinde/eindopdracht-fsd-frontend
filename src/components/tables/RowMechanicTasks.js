import React, {useContext, useEffect, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewTask from "./ViewTask";
import UploadImage from "../forms/UploadImage";
import DeleteWarning from "../warnings/DeleteWarning";
import axios from "axios";
import configData from "../../config.json";

function RowMechanicTasks({schedule, taskId, handleUpdate}) {
    const {
        ico_edit,
        ico_planning,
        ico_delete,
        ico_checkbox,
        ico_checkbox_blank,
        ico_image_add
    } = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [task, setTask] = useState({
        id: 0,
        description: null,
        workPerformed: null,
        jobDone: false,
        scheduleTaskList: [],
        customer: {
            id: 0,
            firstName: null
        }
    });

    const [formattedDate, setFormattedDate] = useState(null);
    const [formattedStartTime, setFormattedStartTime] = useState(null);
    const [formattedEndTime, setFormattedEndTime] = useState(null);

    const [modalIsOpenTask, setModalIsOpenTask] = useState(false);
    const [modalIsOpenAddImage, setModalIsOpenAddImage] = useState(false);


    function closeModalTask() {
        setModalIsOpenTask(false);
    }

    function closeModalAddImage() {
        setModalIsOpenAddImage(false);
    }

    useEffect(() => {
        if (schedule) {
            setFormattedDate(schedule.date.split('-').reverse().join('-'))
            setFormattedStartTime(schedule.startTime.slice(0, 5));
            setFormattedEndTime(schedule.endTime.slice(0, 5));
        }
    }, [schedule])

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
                console.log(task)
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

        if (taskId != null) {
            void fetchData();
        }

        // todo: deze staat in de code van Elwyn uit de les maar als ik dit aanzet logt hij telkens 'the axios request was cancelled'?
        return function cleanup() {
            controller.abort();
        }
    }, [taskId])

    return (
        <>
            {task &&
                <tr key={task.id}>
                    <td>{formattedDate}</td>
                    <td>{formattedStartTime} - {formattedEndTime}</td>
                    <td>{task.customer.firstName} {task.customer.lastName}</td>
                    <td>{task.customer.address} <br/>{task.customer.zip} {task.customer.city}</td>
                    <td>{task.description}</td>
                    <td>
                        {/*Deze span moet er omheen omdat de rij een andere hoogte krijgt wanneer je de hele rij op d:f zet*/}
                        <span>
                             <button onClick={() => setModalIsOpenTask(true)} className="table-button">
                                 <img src={ico_edit}
                                      alt="icon details"
                                      className="icon"/>
                             </button>
                            <button onClick={() => setModalIsOpenAddImage(true)} className="table-button">
                                <img src={ico_image_add}
                                     alt="icon details"
                                     className="icon"/>
                            </button>
                            {/*     <button onClick={() => setModalIsOpenWarning(true)} className="table-button">*/}
                            {/*         <img src={ico_delete} alt="icon delete" className="icon"/>*/}
                            {/*     </button>*/}
                            <Modal
                                isOpen={modalIsOpenTask}
                                onRequestClose={closeModalTask}
                                className={"modal"}
                                appElement={document.getElementById('app')}
                            >
                                     <ViewTask taskId={task.id} customer={task.customer} handleUpdate={handleUpdate}
                                               closeModal={closeModalTask}/>
                                 </Modal>
                             <Modal
                                     isOpen={modalIsOpenAddImage}
                                     onRequestClose={closeModalAddImage}
                                     className={"modal-small modal-add-image"}
                                     appElement={document.getElementById('app')}
                                 >
                                     <UploadImage closeModal={closeModalAddImage} handleUpdate={handleUpdate} taskId={task.id} />
                                 </Modal>
                            {/*     <Modal*/}
                            {/*         isOpen={modalIsOpenWarning}*/}
                            {/*         onRequestClose={closeModalWarning}*/}
                            {/*         className={"modal-small modal-warning"}*/}
                            {/*         appElement={document.getElementById('app')}*/}
                            {/*     >*/}
                            {/*         <DeleteWarning closeModal={closeModalWarning} handleUpdate={handleUpdate} taskId={task.id}/>*/}
                            {/*     </Modal>*/}
                        </span>
                    </td>
                </tr>
            }
        </>
    );
}

export default RowMechanicTasks;