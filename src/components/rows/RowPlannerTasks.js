import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {IconContext} from "../../context/IconContext";

function RowPlannerTasks({url}) {
    const {ico_tasks, ico_details, ico_planning, ico_prev, ico_next} = useContext(IconContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rowData, setRowData] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        const fetchRows = async () => {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(url, {
                    signal: controller.signal,
                });
                setRowData(response.data);
            } catch (e) {
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading(false);
        }
        void fetchRows();

        // deze staat in de code van Elwyn uit de les maar als ik dit aanzet logt hij telkens 'the axios request was cancelled'
        // return function cleanup() {
        //     controller.abort();
        // }
    }, [url])


    return (
        <tr>
            <td>Klant naam</td>
            <td>Torenstraat 23, 1234 AB Nijmegen</td>
            <td>Eerst regels omschrijving taak</td>
            <td>
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