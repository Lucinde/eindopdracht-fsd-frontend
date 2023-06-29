import React, {useContext, useEffect, useState} from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import PagingButtons from "../../components/buttons/PagingButtons";
import {IconContext} from "../../context/IconContext";
import configData from "../../config.json";
import axios from "axios";
import RowPlannerCustomer from "../../components/tables/RowPlannerCustomer";

function PlannerCustomers(props) {
    const {ico_customers} = useContext(IconContext);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [pageSize, setPageSize] = useState(`${configData.PAGE_SIZE}`);
    const [endpoint, setEndpoint] = useState(`${configData.SERVER_URL}/customers/pages?pageNo=${pageNo}&pageSize=${pageSize}`);

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
        setEndpoint(`${configData.SERVER_URL}/customers/pages?pageNo=${pageNo}&pageSize=${pageSize}`);
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
                console.log(response)
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
    }, [endpoint, refresh])

    return (
        <main className="outer-container planner planner-customers">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_customers} alt="icon dashboard" className="icon"/>Klanten</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Klant</th>
                            <th>Adres</th>
                            <th>Telefoonnummer</th>
                            <th>E-mail</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && data.items.map((customer) => {
                            return <RowPlannerCustomer key={customer.id} customer={customer} handleUpdate={handleUpdate}/>
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

export default PlannerCustomers;