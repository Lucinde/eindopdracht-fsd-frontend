import React, {useContext, useEffect, useState} from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import {IconContext} from "../../context/IconContext";
import axios from "axios";
import configData from "../../config.json";
import RowPlannerMechanic from "../../components/tables/RowPlannerMechanic";

function PlannerMechanics(props) {
    const {ico_mechanic, ico_warning} = useContext(IconContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                const response = await axios.get(`${configData.SERVER_URL}/users/mechanics`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setData(response.data);
            } catch (e) {
                if (e.response != null) {
                    setError(e.response.data);
                } else {
                    setError(e.message);
                }
            }
            setLoading(false);
        }
        void fetchData();

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
            {error &&
                <p className="text-error"><img src={ico_warning} alt="icon details"
                                               className="icon warning"/> {error}</p>
            }
            {loading && <p>Loading...</p>}
        </main>
    );
}

export default PlannerMechanics;