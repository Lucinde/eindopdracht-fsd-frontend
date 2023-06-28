import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewTask from "./ViewTask";

function RowPlannerCustomerTasks({taskList, handleUpdate}) {
    const {ico_checkbox, ico_checkbox_blank, ico_details} = useContext(IconContext);

    const [modalIsOpenTask, setModalIsOpenTask] = useState(false);

    function closeModalTask() {
        // todo: hier nog functionaliteit toevoegen die moet gebeuren wanneer de modal gesloten wordt (Post request?)
        setModalIsOpenTask(false);
    }


    return (
        <tr>
            <td>{taskList.description}</td>
            <td>
                {taskList.jobDone ? <img src={ico_checkbox} alt="icon checkbox" className="icon"/>
                    : <img src={ico_checkbox_blank} alt="icon unchecked" className="icon"/>}
            </td>
            <td>{taskList.scheduleTaskList.length > 0 ?
                <img src={ico_checkbox} alt="icon checkbox" className="icon"/>
                : <img src={ico_checkbox_blank} alt="icon unchecked" className="icon"/>}</td>
            <td>
                <span>
                <button onClick={() => setModalIsOpenTask(true)} className="table-button">
                    <img src={ico_details}
                         alt="icon details"
                         className="icon"/>
                </button>
                <Modal
                    isOpen={modalIsOpenTask}
                    onRequestClose={closeModalTask}
                    className={"modal"}
                    appElement={document.getElementById('app')}
                >
                    {/*todo: kan ik hier de losse task fetchen bij het openen van de modal? Ik wil graag dezelfde ViewTask gebruiken als bij het overzicht van de taken*/}
                    <ViewTask task={taskList} handleUpdate={handleUpdate}/>
                </Modal>
                    </span>
                </td>
        </tr>
    );
}

export default RowPlannerCustomerTasks;