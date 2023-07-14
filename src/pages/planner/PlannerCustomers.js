import React, {useContext, useEffect, useState} from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import PagingButtons from "../../components/buttons/PagingButtons";
import {IconContext} from "../../context/IconContext";
import configData from "../../config.json";
import axios from "axios";
import RowPlannerCustomer from "../../components/tables/RowPlannerCustomer";
import Button from "../../components/buttons/Button";
import AddNewCustomer from "../../components/forms/AddNewCustomer";
import Modal from "react-modal";
import FormInput from "../../components/forms/FormInput";
import {useForm} from "react-hook-form";

function PlannerCustomers(props) {
    const {ico_customers, ico_customers_add, ico_warning} = useContext(IconContext);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageNo, setPageNo] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [pageSize, setPageSize] = useState(`${configData.PAGE_SIZE}`);
    const [search, setSearch] = useState("");
    const [endpoint, setEndpoint] = useState(`${configData.SERVER_URL}/customers/pages?pageNo=${pageNo}&pageSize=${pageSize}`);
    const [modalIsOpenAddCustomer, setModalIsOpenCustomer] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors}
    }
        = useForm();


    function handleClickPrev() {
        setPageNo(prevPageNo => prevPageNo - 1);
    }

    function handleClickNext() {
        setPageNo(PageNo => PageNo + 1);
    }

    function handleUpdate() {
        setRefresh(!refresh);
    }

    function closeModalAddCustomer() {
        setModalIsOpenCustomer(false);
    }

    function searchSubmit(data) {
        setSearch(data.search);
    }

    useEffect(() => {
        setEndpoint(encodeURI(`${configData.SERVER_URL}/customers/pages?pageNo=${pageNo}&pageSize=${pageSize}&searchValue=${search}`));
    }, [pageNo, pageSize, search])

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(null);
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
        void fetchData();

    }, [endpoint, refresh])

    return (
        <main className="outer-container planner planner-customers">
            <div className="inner-container">
                <Sidebar/>
                {data &&
                    <div className="content">
                    <h1><img src={ico_customers} alt="icon dashboard" className="icon"/>Klanten</h1>
                    {error &&
                        <p className="text-error"><img src={ico_warning} alt="icon details"
                                                       className="icon warning"/> {error}</p>
                    }
                    {loading && <p>Loading...</p>}
                    <div className="button-wrapper full-width">
                        <form className="searchfield" onSubmit={handleSubmit(searchSubmit)}>
                            <FormInput
                                inputType="text"
                                name="search"
                                placeholderText="Zoek op klantnaam"
                                register={register}
                                errors={errors}
                            />
                            <Button
                                variant="primary"
                                buttonType="submit"
                            >Zoeken</Button>
                        </form>

                        <Button buttonType="button" variant="primary" iconLeft={ico_customers_add} handleClick={() => {
                            setModalIsOpenCustomer(true)
                        }}>Nieuwe klant toevoegen</Button>
                        <Modal
                            isOpen={modalIsOpenAddCustomer}
                            onRequestClose={closeModalAddCustomer}
                            className={"modal-small"}
                            appElement={document.getElementById('app')}
                        >
                            <AddNewCustomer closeModal={closeModalAddCustomer} handleUpdate={handleUpdate}/>
                        </Modal>
                    </div>
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
                            return <RowPlannerCustomer key={customer.id} customer={customer}
                                                       handleUpdate={handleUpdate}/>
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
                }
            </div>
        </main>
    );
}

export default PlannerCustomers;