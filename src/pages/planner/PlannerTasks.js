import React, {useContext, useEffect, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Button from "../../components/buttons/Button";
import Sidebar from "../../components/sidebar/Sidebar";
import RowPlannerTasks from "../../components/rows/RowPlannerTasks";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import PagingButtons from "../../components/buttons/PagingButtons";

function PlannerTasks(props) {
    const {ico_tasks, ico_details, ico_planning, ico_prev, ico_next} = useContext(IconContext);
    const {authData, login} = useContext(AuthContext);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(3)
    const [endpoint, setEndpoint] = useState(`http://localhost:8080/tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}`);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(endpoint, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setData(response.data);
                console.log(response)
                console.log(data);
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

        // deze staat in de code van Elwyn uit de les maar als ik dit aanzet logt hij telkens 'the axios request was cancelled'
        // return function cleanup() {
        //     controller.abort();
        // }
    }, [])


    return (
        <main className="outer-container planner-tasks">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_planning} alt="icon dashboard" className="icon"/>Taken</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Klant</th>
                            <th>Adres</th>
                            <th>Omschrijving</th>
                            <th>Gepland</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*todo: API ophalen en hier logica maken om de tabel te vullen*/}
                        {data && data.tasks.map((tasks) => {
                            return <RowPlannerTasks key={data.tasks.id} url={endpoint} />
                        })}


                        {/*<tr>*/}
                        {/*    <td>Klant naam</td>*/}
                        {/*    <td>Torenstraat 23, 1234 AB Nijmegen</td>*/}
                        {/*    <td>Eerst regels omschrijving taak</td>*/}
                        {/*    <td>*/}
                        {/*        <a><img src={ico_details} alt="icon details" className="icon"/></a>*/}
                        {/*    </td>*/}
                        {/*    <td>*/}
                        {/*        /!*todo: voor de modal popup deze dependency toevoegen: https://www.npmjs.com/package/react-modal*!/*/}
                        {/*        /!*Deze span moet er omheen omdat de rij een andere hoogte krijgt wanneer je de hele rij op d:f zet*!/*/}
                        {/*        <span>*/}
                        {/*        <a><img src={ico_planning} alt="icon planning" className="icon"/></a>*/}
                        {/*        <a><img src={ico_details} alt="icon details" className="icon"/></a>*/}
                        {/*    </span>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Klant naam</td>*/}
                        {/*    <td>Torenstraat 23, 1234 AB Nijmegen</td>*/}
                        {/*    <td>Eerst regels omschrijving taak</td>*/}
                        {/*    <td>*/}
                        {/*        <a><img src={ico_details} alt="icon details" className="icon"/></a>*/}
                        {/*    </td>*/}
                        {/*    <td>*/}
                        {/*        /!*todo: voor de modal popup deze dependency toevoegen: https://www.npmjs.com/package/react-modal*!/*/}
                        {/*        <span>*/}
                        {/*        <a><img src={ico_planning} alt="icon planning" className="icon"/></a>*/}
                        {/*        <a><img src={ico_details} alt="icon details" className="icon"/></a>*/}
                        {/*    </span>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                    {data && (
                        <PagingButtons
                            next={data.hasNext}
                            previous={data.hasPrevious}
                            getPageNo={pageNo}
                            getPageSize={pageSize}
                            setEndpoint={setEndpoint}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

export default PlannerTasks;