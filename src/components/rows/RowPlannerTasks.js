import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {IconContext} from "../../context/IconContext";

function RowPlannerTasks({task}) {
    const {ico_tasks, ico_details, ico_planning, ico_prev, ico_next} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rowData, setRowData] = useState({});

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
                    <a><img src={ico_details} alt="icon details" className="icon"/></a>
               </span>
            </td>
        </tr>
    );
}

export default RowPlannerTasks;