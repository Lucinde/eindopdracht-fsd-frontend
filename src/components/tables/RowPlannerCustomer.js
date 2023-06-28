import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewTask from "./ViewTask";
import ViewCustomer from "./ViewCustomer";
import {useForm} from "react-hook-form";
import RowPlannerCustomerTasks from "./RowPlannerCustomerTasks";


function RowPlannerCustomer({customer, handleUpdate}) {
    const {ico_details, ico_tasks} = useContext(IconContext);

    const [rowVisible, setRowVisible] = useState(false);
    const [modalIsOpenCustomer, setModalIsOpenCustomer] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body');

    //todo: closeModal in useContext zetten??
    function closeModalCustomer() {
        // todo: hier nog functionaliteit toevoegen die moet gebeuren waneer de modal gesloten wordt (Post request?)
        setModalIsOpenCustomer(false);
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
                {/*todo: make modal close on save*/}
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
                                <th>Omschrijving</th>
                                <th>Taak gereed</th>
                                <th>Taak gepland</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customer && customer.taskList.map((taskList) => {
                                return <RowPlannerCustomerTasks key={taskList.id} taskList={taskList}
                                                                handleUpdate={handleUpdate}/>
                            })}
                            </tbody>
                        </table>
                    </td>
                </tr>
            }
        </>
    );
}

export default RowPlannerCustomer;