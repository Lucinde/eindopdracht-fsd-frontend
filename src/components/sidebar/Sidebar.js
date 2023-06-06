import React, {useContext} from 'react';
import './Sidebar.css';
import {IconContext} from "../../context/IconContext";

function Sidebar(props) {
    const { ico_dashboard } = useContext(IconContext);
    return (
        <nav className="sidebar">
            <ul>
                <li><img src={ico_dashboard} alt="icon dashboard" className="icon" />Dashboard</li>
                <li><img src={ico_dashboard} alt="icon dashboard" className="icon" />Planning</li>
                <li><img src={ico_dashboard} alt="icon dashboard" className="icon" />Taken</li>
                <li><img src={ico_dashboard} alt="icon dashboard" className="icon" />Klanten</li>
                <li><img src={ico_dashboard} alt="icon dashboard" className="icon" />Monteurs</li>
            </ul>
        </nav>
    );
}

export default Sidebar;