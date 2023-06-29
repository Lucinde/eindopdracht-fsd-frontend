import React, {useContext, useState} from 'react';
import Button from "../buttons/Button";
import axios from "axios";
import configData from "../../config.json";
import {IconContext} from "../../context/IconContext";

function DeleteWarning({closeModal, handleUpdate, id}) {
    const {ico_warning} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    //todo: voorwaarde inbouwen, als er een customerId binnenkomt kies deleteCustomer, als er een taskId binnenkomt kies deleteTask (deleteTask functie nog bouwen en props renamen)
    const deleteItem = async() => {
        const storedToken = localStorage.getItem('token');
        setLoading(true);

        try {
            const response = await axios.delete(
                `${configData.SERVER_URL}/customers/${id}`,
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
            console.error("Hier gaat iets mis!" + e.response.data);
            setError(e.response.data)
            // todo: error handling in UI weergeven!
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <h2>Weet je zeker dat je dit wilt verwijderen?</h2>
            <div className="button-wrapper">
                <Button variant="secondary" type="reset" handleClick={closeModal}>Nee</Button>
                <Button variant="primary" handleClick={deleteItem}>Ja</Button>
            </div>
            {error &&
                <p className="text-error"><img src={ico_warning} alt="icon details" className="icon warning"/> {error}</p>
            }
        </div>
    );
}

export default DeleteWarning;