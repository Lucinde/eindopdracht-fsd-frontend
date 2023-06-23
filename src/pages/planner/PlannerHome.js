import React, {useContext} from 'react';
import './Planner.css';
import Sidebar from "../../components/sidebar/Sidebar";
import {IconContext} from "../../context/IconContext";
import tilePlanning from "../../assets/tiles/planning.png";
import tileTasks from "../../assets/tiles/tasks.png";
import tileCustomers from "../../assets/tiles/customers.png";
import tileMechanics from "../../assets/tiles/mechanics.png";
import {Link} from "react-router-dom";

function PlannerHome() {
    const {ico_dashboard} = useContext(IconContext);
    return (
        <main className="outer-container planner-home">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_dashboard} alt="icon dashboard" className="icon"/>Dashboard</h1>
                    <div className="content-icons">
                        <article className="menu-tile">
                            <a>
                                <img src={tilePlanning} alt="tile planning"/>
                                <h2>Planning</h2>
                            </a>
                        </article>
                        <article className="menu-tile">
                            <Link to={"/planner/tasks"}>
                                <img src={tileTasks} alt="tile taken"/>
                                <h2>Taken</h2>
                            </Link>
                        </article>
                        <article className="menu-tile">
                            <a>
                                <img src={tileCustomers} alt="tile klanten"/>
                                <h2>Klanten</h2>
                            </a>
                        </article>
                        <article className="menu-tile">
                            <a>
                                <img src={tileMechanics} alt="tile monteurs"/>
                                <h2>Monteurs</h2>
                            </a>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PlannerHome;