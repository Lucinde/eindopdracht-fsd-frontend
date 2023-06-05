import React from 'react';
import './Planner.css';
import Sidebar from "../../components/sidebar/Sidebar";

function PlannerHome({ico_title}) {
    return (
        <main className="outer-container planner-home">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_title} alt="icon dashboard" className="icon" />Dashboard</h1>
                    <div className="content-icons"> Hier komen de icons </div>
                </div>
            </div>
        </main>
    );
}

export default PlannerHome;