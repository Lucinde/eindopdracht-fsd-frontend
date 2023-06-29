import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewTask from "./ViewTask";
import DeleteWarning from "../warnings/DeleteWarning";

function RowPlannerCustomerTasks({taskList, customer, handleUpdate}) {
    const {ico_checkbox, ico_checkbox_blank, ico_details, ico_delete} = useContext(IconContext);

    const [modalIsOpenTask, setModalIsOpenTask] = useState(false);
    const [modalIsOpenWarning, setModalIsOpenWarning] = useState(false);


    function closeModalTask() {
        setModalIsOpenTask(false);
    }

    function closeModalWarning() {
        setModalIsOpenWarning(false);
    }


    return (
        <tr>
            <td className="col-xl">{taskList.description}</td>
            <td className="col-xs">
                {taskList.jobDone ? <img src={ico_checkbox} alt="icon checkbox" className="icon"/>
                    : <img src={ico_checkbox_blank} alt="icon unchecked" className="icon"/>}
            </td>
            <td className="col-xs">{taskList.scheduleTaskList.length > 0 ?
                <img src={ico_checkbox} alt="icon checkbox" className="icon"/>
                : <img src={ico_checkbox_blank} alt="icon unchecked" className="icon"/>}</td>
            <td className="col-xs">
                <span>
                    <button onClick={() => setModalIsOpenWarning(true)} className="table-button">
                        <img src={ico_delete} alt="icon details" className="icon"/>
                    </button>
                    <button onClick={() => setModalIsOpenTask(true)} className="table-button">
                        <img src={ico_details} alt="icon details" className="icon"/>
                    </button>
                </span>
                <Modal
                    isOpen={modalIsOpenTask}
                    onRequestClose={closeModalTask}
                    className={"modal"}
                    appElement={document.getElementById('app')}
                >
                    <ViewTask taskId={taskList.id} customer={customer} handleUpdate={handleUpdate}
                              closeModal={closeModalTask}/>
                </Modal>
                <Modal
                    isOpen={modalIsOpenWarning}
                    onRequestClose={closeModalWarning}
                    className={"modal-small modal-warning"}
                    appElement={document.getElementById('app')}
                >
                    <DeleteWarning closeModal={closeModalWarning} handleUpdate={handleUpdate} id={taskList.id}/>
                </Modal>
            </td>
        </tr>
    );
}

export default RowPlannerCustomerTasks;