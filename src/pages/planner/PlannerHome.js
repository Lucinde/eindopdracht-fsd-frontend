import React, {useContext} from 'react';
import './Planner.css';
import Sidebar from "../../components/sidebar/Sidebar";
import {IconContext} from "../../context/IconContext";
import ico_dashboard from "../../assets/icons/dashboard.svg";

function PlannerHome() {
    const { ico_dashboard } = useContext(IconContext);
    return (
        <main className="outer-container planner-home">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_dashboard} alt="icon dashboard" className="icon" />Dashboard</h1>
                    <div className="content-icons"> Hier komen de icons </div>
                </div>
            </div>
        </main>
    );
}

export default PlannerHome;