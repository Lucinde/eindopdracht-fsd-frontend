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
    const [pageSize, setPageSize] = useState(5)
    const [endpoint, setEndpoint] = useState(`http://localhost:8080/tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}`);

    function handleClickPrev() {
        setPageNo(prevPageNo => prevPageNo - 1);
    }
    function handleClickNext() {
        setPageNo(PageNo => PageNo + 1);
    }

    useEffect(() => {
        setEndpoint(`http://localhost:8080/tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}`);
    }, [pageNo])

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
        return function cleanup() {
            controller.abort();
        }
    }, [endpoint])

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
                        {data && data.tasks.map((task) => {
                            return <RowPlannerTasks key={task.id} task={task} />
                        })}
                        </tbody>
                    </table>
                    {data && (
                        <PagingButtons
                            next={data.hasNext}
                            previous={data.hasPrevious}
                            getPageNo={pageNo}
                            getPageSize={pageSize}
                            onClickPrev={handleClickPrev}
                            onClickNext={handleClickNext}
                            setEndpoint={setEndpoint}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

export default PlannerTasks;