import React, {useContext, useEffect, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import Sidebar from "../../components/sidebar/Sidebar";
import RowPlannerTasks from "../../components/tables/RowPlannerTasks";
import axios from "axios";
import PagingButtons from "../../components/buttons/PagingButtons";
import configData from "../../config.json";

function PlannerTasks(props) {
    const {ico_planning} = useContext(IconContext);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [pageSize, setPageSize] = useState(`${configData.PAGE_SIZE}`)
    const [endpoint, setEndpoint] = useState(`${configData.SERVER_URL}/tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}`);

    function handleClickPrev() {
        setPageNo(prevPageNo => prevPageNo - 1);
    }

    function handleClickNext() {
        setPageNo(PageNo => PageNo + 1);
    }

    function handleUpdate(){
            setRefresh(!refresh);
    }

    useEffect(() => {
        setEndpoint(`${configData.SERVER_URL}/tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}`);
    }, [pageNo, pageSize])

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
            } catch (e) {
                setError(e.response.data)
            }
            setLoading(false);
        }
        void fetchData();

        return function cleanup() {
            if(error) {
                controller.abort();
            }
        };
    }, [endpoint, refresh, error])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Er is iets mis gegaan met het ophalen van de data. {error}</p>;
    }

    return (
        <main className="outer-container planner planner-tasks">
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
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && data.items.map((task) => {
                            return <RowPlannerTasks key={task.id} task={task} handleUpdate={handleUpdate}/>
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