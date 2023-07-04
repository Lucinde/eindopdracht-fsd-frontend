import React, {useContext, useEffect, useState} from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import {IconContext} from "../../context/IconContext";
import axios from "axios";
import configData from "../../config.json";

import RowPlannerCustomer from "../../components/tables/RowPlannerCustomer";
import RowPlannerMechanic from "../../components/tables/RowPlannerMechanic";

function PlannerMechanics(props) {
    const {ico_mechanic} = useContext(IconContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`${configData.SERVER_URL}/users/mechanics`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setData(response.data);
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
        void fetchData();

        // todo: deze staat in de code van Elwyn uit de les maar als ik dit aanzet logt hij telkens 'the axios request was cancelled'?
        return function cleanup() {
            controller.abort();
        }
    }, [])

    return (
        <main className="outer-container planner planner-mechanics">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_mechanic} alt="icon dashboard" className="icon"/>Monteurs</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Gebruikersnaam</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && data.map((mechanic) => {
                            return <RowPlannerMechanic key={mechanic.username} mechanic={mechanic}/>
                        })}

                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default PlannerMechanics;