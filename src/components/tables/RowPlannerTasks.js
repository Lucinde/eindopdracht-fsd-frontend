import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from 'react-modal';
import {useParams} from 'react-router-dom';
import ViewTask from "./ViewTask";
import './Tables.css';


function RowPlannerTasks({task}) {
    const {ico_details, ico_planning} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [modalIsOpenTask, setModalIsOpenTask] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';


    function closeModalTask() {
        // todo: hier nog functionaliteit toevoegen die moet gebeuren waneer de modal gesloten wordt (Post request?)
        setModalIsOpenTask(false);
    }

    return (
        <tr>
            <td>{task.customer.firstName} {task.customer.lastName}</td>
            <td>{task.customer.address} {task.customer.zip} {task.customer.city}</td>
            <td>{task.description}</td>
            <td>
                {/*todo: hier checken of er iets in tasklist staat, indien ja, checked box, indien nee, unchecked box*/}
                <a><img src={ico_details} alt="icon details" className="icon"/></a>
            </td>
            <td>
                {/*todo: voor de modal popup deze dependency toevoegen: https://www.npmjs.com/package/react-modal*/}
                {/*Deze span moet er omheen omdat de rij een andere hoogte krijgt wanneer je de hele rij op d:f zet*/}
                <span>
                    <a><img src={ico_planning} alt="icon planning" className="icon"/></a>
                    {/*De modal opent niet op een eigen link, dus hiervoor gewoon een 'a' toegevoegd ipv een Link*/}
                    <button onClick={() => setModalIsOpenTask(true)} className="table-button"><img src={ico_details} alt="icon details" className="icon"/></button>
                    <Modal
                        isOpen={modalIsOpenTask}
                        onRequestClose={closeModalTask}
                        className={"modal"}
                    >
                        <ViewTask task={task}/>
                    </Modal>
               </span>
            </td>
        </tr>
    );
}

export default RowPlannerTasks;