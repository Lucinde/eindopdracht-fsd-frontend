import React, {useContext, useState} from 'react';
import Button from "../buttons/Button";
import axios from "axios";
import configData from "../../config.json";
import {IconContext} from "../../context/IconContext";

function DeleteWarning({closeModal, handleUpdate, customerId, taskId}) {
    const {ico_warning} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const deleteCustomer = async() => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            await axios.delete(
                `${configData.SERVER_URL}/customers/${customerId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            handleUpdate();
            closeModal();
        } catch (e) {
            setError(e.response.data)
        } finally {
            setLoading(false);
        }

    }

    const deleteTask = async() => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            await axios.delete(
                `${configData.SERVER_URL}/tasks/${taskId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            handleUpdate();
            closeModal();
        } catch (e) {
            setError(e.response.data)
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            {customerId && <h2>Weet je zeker dat je deze klant wilt verwijderen?</h2> }
            {taskId && <h2>Weet je zeker dat je deze taak wilt verwijderen?</h2> }
            <div className="button-wrapper">
                <Button variant="secondary" type="reset" handleClick={closeModal}>Nee</Button>
                <Button variant="primary" handleClick={customerId ? deleteCustomer : deleteTask}>Ja</Button>
            </div>
            {error &&
                <p className="text-error"><img src={ico_warning} alt="icon details" className="icon warning"/> {error}</p>
            }
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default DeleteWarning;