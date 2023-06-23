import React, {useContext} from 'react';
import {IconContext} from "../../context/IconContext";
import Button from "../../components/button/Button";
import Sidebar from "../../components/sidebar/Sidebar";

function PlannerTasks(props) {
    const {ico_tasks, ico_details, ico_planning, ico_prev, ico_next} = useContext(IconContext);

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
                        <tr>
                            <td>Klant naam</td>
                            <td>Torenstraat 23, 1234 AB Nijmegen</td>
                            <td>Eerst regels omschrijving taak</td>
                            <td>
                                <a><img src={ico_details} alt="icon details" className="icon"/></a>
                            </td>
                            <td>
                                {/*todo: voor de modal popup deze dependency toevoegen: https://www.npmjs.com/package/react-modal*/}
                                {/*Deze span moet er omheen omdat de rij een andere hoogte krijgt wanneer je de hele rij op d:f zet*/}
                                <span>
                                <a><img src={ico_planning} alt="icon planning" className="icon"/></a>
                                <a><img src={ico_details} alt="icon details" className="icon"/></a>
                            </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Klant naam</td>
                            <td>Torenstraat 23, 1234 AB Nijmegen</td>
                            <td>Eerst regels omschrijving taak</td>
                            <td>
                                <a><img src={ico_details} alt="icon details" className="icon"/></a>
                            </td>
                            <td>
                                {/*todo: voor de modal popup deze dependency toevoegen: https://www.npmjs.com/package/react-modal*/}
                                <span>
                                <a><img src={ico_planning} alt="icon planning" className="icon"/></a>
                                <a><img src={ico_details} alt="icon details" className="icon"/></a>
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="button-wrapper paging">
                        <Button variant="primary" iconLeft={ico_prev}>Vorige</Button>
                        <Button variant="primary" iconRight={ico_next}>Volgende</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PlannerTasks;