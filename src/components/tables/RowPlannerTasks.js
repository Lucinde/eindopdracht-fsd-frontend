import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from 'react-modal';
import ViewTask from "./ViewTask";
import './Tables.css';
import DeleteWarning from "../warnings/DeleteWarning";
import UploadImage from "../forms/UploadImage";
import ScheduleTask from "../forms/ScheduleTask";


function RowPlannerTasks({task, handleUpdate}) {
    const {
        ico_edit,
        ico_planning,
        ico_delete,
        ico_image_add
    } = useContext(IconContext);

    const [modalIsOpenTask, setModalIsOpenTask] = useState(false);
    const [modalIsOpenWarning, setModalIsOpenWarning] = useState(false);
    const [modalIsOpenAddImage, setModalIsOpenAddImage] = useState(false);
    const [modalIsOpenScheduleTask, setModalIsOpenScheduleTask] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body'); // Set the appElement for react-modal. Hij zegt dat dit unresolved is, maar het is wel nodig om console-errors te voorkomen

    function closeModalTask() {
        setModalIsOpenTask(false);
    }

    function closeModalWarning() {
        setModalIsOpenWarning(false);
    }

    function closeModalAddImage() {
        setModalIsOpenAddImage(false);
    }

    function closeModalScheduleTask() {
        setModalIsOpenScheduleTask(false);
    }

    return (
        <tr key={task.id}>
            <td>{task.customer.firstName} {task.customer.lastName}</td>
            <td>{task.customer.address} <br/>{task.customer.zip} {task.customer.city}</td>
            <td>{task.description}</td>
            <td>
                <span>
                    <button onClick={() => setModalIsOpenTask(true)} className="table-button"><img src={ico_edit}
                                                                                                   alt="icon details"
                                                                                                   className="icon"/></button>
                    <button onClick={() => setModalIsOpenScheduleTask(true)} className={`table-button ${task.scheduleTaskList.length > 0 ? 'not-planned' : 'planned'}`}>
                        <img src={ico_planning} alt="icon planning" className="icon"/>
                    </button>
                    <button onClick={() => setModalIsOpenAddImage(true)} className="table-button">
                        <img src={ico_image_add} alt="icon details" className="icon"/>
                    </button>
                    <button onClick={() => setModalIsOpenWarning(true)} className="table-button">
                        <img src={ico_delete} alt="icon delete" className="icon"/>
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
                        isOpen={modalIsOpenScheduleTask}
                        onRequestClose={closeModalScheduleTask}
                        className={"modal-small"}
                        appElement={document.getElementById('app')}
                    >
                        <ScheduleTask taskId={task.id} closeModal={closeModalScheduleTask} handleUpdate={handleUpdate} />
                    </Modal>
                    <Modal
                        isOpen={modalIsOpenAddImage}
                        onRequestClose={closeModalAddImage}
                        className={"modal-small modal-add-image"}
                        appElement={document.getElementById('app')}
                    >
                        <UploadImage closeModal={closeModalAddImage} handleUpdate={handleUpdate} taskId={task.id}/>
                    </Modal>
                    <Modal
                        isOpen={modalIsOpenWarning}
                        onRequestClose={closeModalWarning}
                        className={"modal-small modal-warning"}
                        appElement={document.getElementById('app')}
                    >
                        <DeleteWarning closeModal={closeModalWarning} handleUpdate={handleUpdate} taskId={task.id}/>
                    </Modal>
               </span>
            </td>
        </tr>
    );
}

export default RowPlannerTasks;