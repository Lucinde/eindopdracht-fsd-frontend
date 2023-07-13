import React, {useContext, useEffect, useState} from 'react';
import './Mechanic.css';
import {IconContext} from "../../context/IconContext";
import axios from "axios";
import configData from "../../config.json";
import {AuthContext} from "../../context/AuthContext";
import PagingButtons from "../../components/buttons/PagingButtons";
import RowMechanicTasks from "../../components/tables/RowMechanicTasks";
import Button from "../../components/buttons/Button";

function MechanicHome(props) {
    const {ico_planning, ico_warning} = useContext(IconContext);
    const {username} = useContext(AuthContext);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [includeOlderTasks, setIncludeOlderTasks] = useState(false);
    const [pageSize, setPageSize] = useState(`${configData.PAGE_SIZE}`)
    const [endpoint, setEndpoint] = useState('');

    function handleClickPrev() {
        setPageNo(prevPageNo => prevPageNo - 1);
        console.log(pageNo)
    }

    function handleClickNext() {
        setPageNo(PageNo => PageNo + 1);
        console.log(pageNo)
    }

    function handleUpdate() {
        setRefresh(!refresh);
    }

    useEffect(() => {
        if (username) {
            setEndpoint(`${configData.SERVER_URL}/schedule-tasks/pages/${username}?pageNo=${pageNo}&pageSize=${pageSize}&includeOlderTasks=${includeOlderTasks}`);
        }
    }, [pageNo, pageSize, includeOlderTasks, username]);

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(endpoint, {
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

        if (endpoint) {
            void fetchData();
        }
    }, [endpoint, refresh])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Er is iets mis gegaan met het ophalen van de data. {error}</p>;
    }

    return (
        <main className="outer-container mechanic-home">
            <div className="inner-container">
                <h1><img src={ico_planning} alt="icon dashboard" className="icon"/>Planning</h1>
                <div className="button-wrapper">
                    {!includeOlderTasks &&
                        <Button
                            buttonType="button"
                            variant="primary"
                            iconLeft={ico_planning}
                            handleClick={() => setIncludeOlderTasks(true)}
                        >
                            Al mijn taken
                        </Button>
                    }
                    {includeOlderTasks &&
                        <Button
                            buttonType="button"
                            variant="primary"
                            iconLeft={ico_planning}
                            handleClick={() => setIncludeOlderTasks(false)}
                        >
                            Alleen actuele taken
                        </Button>
                    }
                </div>
                {includeOlderTasks && <h2>Al mijn taken</h2>}
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
                    {data && data.count === 0 && (
                        <tr>
                            <td colSpan="6">
                                <p>Er zijn nog geen taken ingepland voor je!</p>
                            </td>
                        </tr>
                    )}
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
        </main>
    );
}

export default MechanicHome;