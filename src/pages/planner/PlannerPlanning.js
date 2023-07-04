import React, {useContext, useEffect, useState} from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import {IconContext} from "../../context/IconContext";
import Button from "../../components/buttons/Button";
import RowMechanicTasks from "../../components/tables/RowMechanicTasks";
import PagingButtons from "../../components/buttons/PagingButtons";
import configData from "../../config.json";
import axios from "axios";

function PlannerPlanning(props) {
    const {ico_planning, ico_warning} = useContext(IconContext);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [includeOlderTasks, setIncludeOlderTasks] = useState(false);
    const [pageSize, setPageSize] = useState(`${configData.PAGE_SIZE}`)
    const [endpoint, setEndpoint] = useState(`${configData.SERVER_URL}/schedule-tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}&includeOlderTasks=${includeOlderTasks}`);

    function handleClickPrev() {
        setPageNo(prevPageNo => prevPageNo - 1);
    }

    function handleClickNext() {
        setPageNo(PageNo => PageNo + 1);
    }

    function handleUpdate() {
        setRefresh(!refresh);
    }

    function includeOlderTasksButton() {
        setIncludeOlderTasks(true);
        setPageNo(0);
        setPageSize(`${configData.PAGE_SIZE}`);
        setEndpoint(`${configData.SERVER_URL}/schedule-tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}&includeOlderTasks=${includeOlderTasks}`);
    }

    function removeOlderTasksButton() {
        setIncludeOlderTasks(false);
        setPageNo(0);
        setPageSize(`${configData.PAGE_SIZE}`);
        setEndpoint(`${configData.SERVER_URL}/schedule-tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}&includeOlderTasks=${includeOlderTasks}`);
    }

    useEffect(() => {
        if (data) {
            setEndpoint(`${configData.SERVER_URL}/schedule-tasks/pages?pageNo=${pageNo}&pageSize=${pageSize}&includeOlderTasks=${includeOlderTasks}`);
        }
    }, [pageNo, pageSize, includeOlderTasks]);

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
                console.log(data)
            } catch (e) {
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    setError(e.response.data)
                }
            }
            setLoading(false);
        }

        if (endpoint) {
            void fetchData();
        }

        return function cleanup() {
            if(error) {
                controller.abort();
            }
        };
    }, [endpoint, refresh, pageNo, pageSize])

    return (
        <main className="outer-container planner planner-planning">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_planning} alt="icon dashboard" className="icon"/>Planning</h1>
                    <div className="button-wrapper">
                        {!includeOlderTasks &&
                            <Button
                                buttonType="button"
                                variant="primary"
                                iconLeft={ico_planning}
                                handleClick={includeOlderTasksButton}
                            >
                                Alle taken
                            </Button>
                        }
                        {includeOlderTasks &&
                            <Button
                                buttonType="button"
                                variant="primary"
                                iconLeft={ico_planning}
                                handleClick={removeOlderTasksButton}
                            >
                                Alleen actuele taken
                            </Button>
                        }
                    </div>
                    {includeOlderTasks && <h2>Alle taken</h2>}
                    {!includeOlderTasks && <h2>Actuele taken</h2>}

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Tijd</th>
                            <th>Klant</th>
                            <th>Adres</th>
                            <th>Omschrijving</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && data.items.map((scheduleTask) => {
                            return <RowMechanicTasks key={scheduleTask.id} schedule={scheduleTask}
                                                     taskId={scheduleTask.task.id} handleUpdate={handleUpdate}/>
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
                {error &&
                    <p className="text-error"><img src={ico_warning} alt="icon details"
                                                   className="icon warning"/> {error}</p>
                }
            </div>
        </main>
    );
}

export default PlannerPlanning;