import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewTask from "./ViewTask";
import DeleteWarning from "../warnings/DeleteWarning";
import UploadImage from "../forms/UploadImage";

function RowPlannerCustomerTasks({taskList, customer, handleUpdate}) {
    const {ico_checkbox, ico_checkbox_blank, ico_edit, ico_delete, ico_image_add, ico_planning} = useContext(IconContext);

    const [modalIsOpenTask, setModalIsOpenTask] = useState(false);
    const [modalIsOpenWarning, setModalIsOpenWarning] = useState(false);
    const [modalIsOpenAddImage, setModalIsOpenAddImage] = useState(false);


    function closeModalTask() {
        setModalIsOpenTask(false);
    }

    function closeModalWarning() {
        setModalIsOpenWarning(false);
    }

    function closeModalAddImage() {
        setModalIsOpenAddImage(false);
    }


    return (
        <tr>
            <td className="col-xl">{taskList.description}</td>
            <td className="col-xs">
                {taskList.jobDone ? <img src={ico_checkbox} alt="icon checkbox" className="icon"/>
                    : <img src={ico_checkbox_blank} alt="icon unchecked" className="icon"/>}
            </td>
            <td className="col-xs">
                <span>
                    <button onClick={() => setModalIsOpenTask(true)} className="table-button">
                        <img src={ico_edit} alt="icon details" className="icon"/>
                    </button>
                    <button className={`table-button ${taskList.length > 0 ? 'not-planned' : 'planned'}`}>
                        <img src={ico_planning} alt="icon planning" className="icon"/>
                    </button>
                    <button onClick={() => setModalIsOpenAddImage(true)} className="table-button">
                        <img src={ico_image_add} alt="icon details" className="icon"/>
                    </button>
                     <button onClick={() => setModalIsOpenWarning(true)} className="table-button">
                        <img src={ico_delete} alt="icon delete" className="icon"/>
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
                    isOpen={modalIsOpenAddImage}
                    onRequestClose={closeModalAddImage}
                    className={"modal-small modal-add-image"}
                    appElement={document.getElementById('app')}
                >
                    <UploadImage closeModal={closeModalAddImage} handleUpdate={handleUpdate} taskId={taskList.id}/>
                </Modal>
                <Modal
                    isOpen={modalIsOpenWarning}
                    onRequestClose={closeModalWarning}
                    className={"modal-small modal-warning"}
                    appElement={document.getElementById('app')}
                >
                    <DeleteWarning closeModal={closeModalWarning} handleUpdate={handleUpdate} taskId={taskList.id}/>
                </Modal>
            </td>
        </tr>
    );
}

export default RowPlannerCustomerTasks;