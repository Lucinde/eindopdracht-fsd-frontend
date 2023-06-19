import React, {useContext} from 'react';
import './Mechanic.css';
import {IconContext} from "../../context/IconContext";

function MechanicHome(props) {
    const {ico_planning, ico_details} = useContext(IconContext);
    return (
        <main className="outer-container mechanic-home">
            <div className="inner-container">
                <h1><img src={ico_planning} alt="icon dashboard" className="icon"/>Planning</h1>
                <table className="table">
                    <tr>
                        <th>Datum</th>
                        <th>Tijd</th>
                        <th>Adres</th>
                        <th>Klant</th>
                        <th>Omschrijving</th>
                        <th>Details</th>
                    </tr>
                    <tr>
                        <td>01-01-2023</td>
                        <td>14.00 - 16.00 uur</td>
                        <td>Torenstraat 23, 1234 AB Nijmegen</td>
                        <td>Klant naam</td>
                        <td>Eerst regels omschrijving taak</td>
                        <td><img src={ico_details} alt="icon details" className="icon"/></td>
                    </tr>
                </table>
            </div>
        </main>
    );
}

export default MechanicHome;