import React, {useContext} from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import {IconContext} from "../../context/IconContext";

function PlannerMechanics(props) {
    const {ico_mechanic} = useContext(IconContext);

    return (
        <main className="outer-container planner planner-mechanics">
            <div className="inner-container">
                <Sidebar/>
                <div className="content">
                    <h1><img src={ico_mechanic} alt="icon dashboard" className="icon"/>Monteurs</h1>
                </div>
            </div>
        </main>
    );
}

export default PlannerMechanics;