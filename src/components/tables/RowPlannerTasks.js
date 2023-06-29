import React, {useContext, useEffect, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from 'react-modal';
import {useParams} from 'react-router-dom';
import ViewTask from "./ViewTask";
import './Tables.css';


function RowPlannerTasks({task, handleUpdate}) {
    const {ico_details, ico_planning} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [modalIsOpenTask, setModalIsOpenTask] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body'); // Set the appElement for react-modal. Hij zegt dat dit unresolved is, maar het is wel nodig om console-errors te voorkomen

    function closeModalTask() {
        setModalIsOpenTask(false);
    }

    return (
        <tr key={task.id}>
            <td>{task.customer.firstName} {task.customer.lastName}</td>
            <td>{task.customer.address} <br/>{task.customer.zip} {task.customer.city}</td>
            <td>{task.description}</td>
            <td>
                {/*todo: hier checken of er iets in tasklist staat, indien ja, checked box, indien nee, unchecked box*/}
                <a><img src={ico_details} alt="icon details" className="icon"/></a>
            </td>
            <td>
                {/*Deze span moet er omheen omdat de rij een andere hoogte krijgt wanneer je de hele rij op d:f zet*/}
                <span>
                    {/*todo: add planning options*/}
                    <a><img src={ico_planning} alt="icon planning" className="icon"/></a>
                    <button onClick={() => setModalIsOpenTask(true)} className="table-button"><img src={ico_details} alt="icon details" className="icon"/></button>
                    <Modal
                        isOpen={modalIsOpenTask}
                        onRequestClose={closeModalTask}
                        className={"modal"}
                        appElement={document.getElementById('app')}
                    >
                        <ViewTask taskId={task.id} handleUpdate={handleUpdate} closeModal={closeModalTask}/>
                    </Modal>
               </span>
            </td>
        </tr>
    );
}

export default RowPlannerTasks;