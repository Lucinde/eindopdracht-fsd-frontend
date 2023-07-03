import React, {useContext, useEffect, useState} from 'react';
import './Mechanic.css';
import {IconContext} from "../../context/IconContext";
import axios from "axios";
import ImageComponent from "../../components/imageComponent/ImageComponent";
import configData from "../../config.json";
import {AuthContext} from "../../context/AuthContext";
import RowPlannerTasks from "../../components/tables/RowPlannerTasks";
import PagingButtons from "../../components/buttons/PagingButtons";
import RowMechanicTasks from "../../components/tables/RowMechanicTasks";

function MechanicHome(props) {
    const {ico_planning, ico_details} = useContext(IconContext);
    const {username} = useContext(AuthContext);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [pageSize, setPageSize] = useState(`${configData.PAGE_SIZE}`)
    const [endpoint, setEndpoint] = useState('');

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
        if (username) {
            setEndpoint(`${configData.SERVER_URL}/schedule-tasks/pages/${username}?pageNo=${pageNo}&pageSize=${pageSize}`);
        }
    }, [pageNo, pageSize]);

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
                //todo: error handling in UI
                setError(true)

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading(false);
        }

        if (endpoint) {
            void fetchData();
        }

        // todo: deze staat in de code van Elwyn uit de les maar als ik dit aanzet logt hij telkens 'the axios request was cancelled'?
        return function cleanup() {
            controller.abort();
        }
    }, [endpoint, refresh, pageNo, pageSize])

    return (
        <main className="outer-container mechanic-home">
            <div className="inner-container">
                <h1><img src={ico_planning} alt="icon dashboard" className="icon"/>Planning</h1>
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
                    {/*todo: API ophalen en hier logica maken om de tabel te vullen*/}
                    {data && data.items.map((scheduleTask) => {
                        return <RowMechanicTasks key={scheduleTask.id} schedule={scheduleTask} taskId={scheduleTask.task.id} handleUpdate={handleUpdate}/>
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
        </main>
    );
}

export default MechanicHome;