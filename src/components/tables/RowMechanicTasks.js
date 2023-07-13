import React, {useContext, useEffect, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewTask from "./ViewTask";
import UploadImage from "../forms/UploadImage";
import axios from "axios";
import configData from "../../config.json";

function RowMechanicTasks({schedule, taskId, handleUpdate}) {
    const {
        ico_edit,
        ico_image_add
    } = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                const response = await axios.get(`${configData.SERVER_URL}/tasks/${taskId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setTask(response.data);
            } catch (e) {
                if (e.response != null) {
                    setError(e.response.data);
                } else {
                    setError(e.message);
                }
            }
            setLoading(false);
        }

        if (taskId != null) {
            void fetchData();
        }

    }, [taskId])

    if (loading) {
        return <tr><td colSpan="6">Loading...</td></tr>;
    }

    if (error) {
        return <tr><td colSpan="6"><p>Er is iets mis gegaan met het ophalen van de data.</p><p>{error}</p></td></tr>;
    }

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
                                     <UploadImage closeModal={closeModalAddImage} handleUpdate={handleUpdate}
                                                  taskId={task.id}/>
                             </Modal>
                        </span>
                    </td>
                </tr>
            }
        </>
    );
}

export default RowMechanicTasks;