import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewCustomer from "./ViewCustomer";
import RowPlannerCustomerTasks from "./RowPlannerCustomerTasks";
import Button from "../buttons/Button";
import ViewTask from "./ViewTask";


function RowPlannerCustomer({customer, handleUpdate}) {
    const {ico_details, ico_tasks} = useContext(IconContext);

    const [rowVisible, setRowVisible] = useState(false);
    const [modalIsOpenCustomer, setModalIsOpenCustomer] = useState(false);
    const [modalIsOpenNewTask, setModalIsOpenNewTask] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body');

    //todo: closeModal in useContext zetten??
    function closeModalCustomer() {
        // todo: hier nog functionaliteit toevoegen die moet gebeuren waneer de modal gesloten wordt (Post request?)
        setModalIsOpenCustomer(false);
    }

    function closeModalNewTask() {
        // todo: hier nog functionaliteit toevoegen die moet gebeuren wanneer de modal gesloten wordt (Post request?)
        setModalIsOpenNewTask(false);
    }

    return (
        <>
            <tr key={customer.id}>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.address} <br/>{customer.zip} {customer.city}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.email}</td>
                <td>
                    <span>
                        <button onClick={() => setRowVisible(!rowVisible)} className="table-button">
                            <img src={ico_tasks} alt="icon taken" className="icon"/>
                        </button>
                        <button onClick={() => setModalIsOpenCustomer(true)} className="table-button">
                            <img src={ico_details} alt="icon details" className="icon"/>
                        </button>
                    </span>
                </td>
                <Modal
                    isOpen={modalIsOpenCustomer}
                    onRequestClose={closeModalCustomer}
                    className={"modal"}
                    appElement={document.getElementById('app')}
                >
                    <ViewCustomer customer={customer} handleUpdate={handleUpdate}/>
                </Modal>
            </tr>
            {rowVisible &&
                <tr className="row-tasks">
                    <td colSpan={5} className="inside-table">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="col-xl">Omschrijving</th>
                                <th className="col-xs">Taak gereed</th>
                                <th className="col-xs">Taak gepland</th>
                                <th className="col-xs">Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customer && customer.taskList.map((taskList) => {
                                return <RowPlannerCustomerTasks key={taskList.id} taskList={taskList} customer={customer}
                                                                handleUpdate={handleUpdate}/>
                            })}
                            </tbody>
                        </table>
                        <div className="button-wrapper">
                            <Button handleClick={() => (setModalIsOpenNewTask(true))} buttonType="button" variant="primary">Nieuwe taak toevoegen</Button>
                            <Modal
                                isOpen={modalIsOpenNewTask}
                                onRequestClose={closeModalNewTask}
                                className={"modal"}
                                appElement={document.getElementById('app')}
                            >
                                {/*todo: kan ik hier de losse task fetchen bij het openen van de modal? Ik wil graag dezelfde ViewTask gebruiken als bij het overzicht van de taken*/}
                                <ViewTask customer={customer} handleUpdate={handleUpdate} closeModal={closeModalNewTask}/>
                            </Modal>
                        </div>
                    </td>
                </tr>
            }
        </>
    );
}

export default RowPlannerCustomer;