import React, {useContext} from 'react';
import './Sidebar.css';
import {IconContext} from "../../context/IconContext";
import ico_planning from "../../assets/icons/planning.svg";
import ico_tasks from "../../assets/icons/tasks.svg";
import ico_customers from "../../assets/icons/customers.svg";
import ico_mechanic from "../../assets/icons/mechanic.svg";

function Sidebar(props) {
    const {ico_dashboard, ico_planning, ico_tasks, ico_customers, ico_mechanic} = useContext(IconContext);
    return (
        <nav className="sidebar">
            <ul>
                <li>
                    <img src={ico_dashboard} alt="icon dashboard" className="icon"/>
                    <p>Dashboard</p>
                </li>
                <li>
                    <img src={ico_planning} alt="icon dashboard" className="icon"/>
                    <p>Planning</p>
                </li>
                <li>
                    <img src={ico_tasks} alt="icon dashboard" className="icon"/>
                    <p>Taken</p>
                </li>
                <li>
                    <img src={ico_customers} alt="icon dashboard" className="icon"/>
                    <p>Klanten</p>
                </li>
                <li>
                    <img src={ico_mechanic} alt="icon dashboard" className="icon"/>
                    <p>Monteurs</p>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;