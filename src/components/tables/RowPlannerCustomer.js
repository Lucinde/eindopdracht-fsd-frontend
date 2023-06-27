import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Modal from "react-modal";
import ViewTask from "./ViewTask";
import ViewCustomer from "./ViewCustomer";


function RowPlannerCustomer({customer, handleUpdate}) {
    const {ico_details} = useContext(IconContext);

    const [modalIsOpenCustomer, setModalIsOpenCustomer] = useState(false);
    Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    Modal.setAppElement('body');

    function closeModalCustomer() {
        // todo: hier nog functionaliteit toevoegen die moet gebeuren waneer de modal gesloten wordt (Post request?)
        setModalIsOpenCustomer(false);
    }

    return (
        <tr>
            <td>{customer.firstName} {customer.lastName}</td>
            <td>{customer.address} <br/>{customer.zip} {customer.city}</td>
            <td>{customer.phoneNumber}</td>
            <td>{customer.email}</td>
            <td><button onClick={() => setModalIsOpenCustomer(true)} className="table-button"><img src={ico_details} alt="icon details" className="icon"/></button></td>
            <Modal
                isOpen={modalIsOpenCustomer}
                onRequestClose={closeModalCustomer}
                className={"modal"}
                appElement={document.getElementById('app')}
            >
                <ViewCustomer customer={customer} handleUpdate={handleUpdate}/>
            </Modal>
        </tr>
    );
}

export default RowPlannerCustomer;