import React, {useContext} from 'react';
import {IconContext} from "../../context/IconContext";

function RowPlannerCustomerTasks(taskList) {
    const {ico_checkbox, ico_checkbox_blank} = useContext(IconContext);

    return (
        <tr>
            <td>{taskList.taskList.description}</td>
            <td>
                {taskList.taskList.jobDone ? <img src={ico_checkbox} alt="icon checkbox" className="icon"/>
                    : <img src={ico_checkbox_blank} alt="icon unchecked" className="icon"/> }
            </td>
            <td>{taskList.taskList.scheduleTaskList.length > 0 ? <img src={ico_checkbox} alt="icon checkbox" className="icon"/>
                : <img src={ico_checkbox_blank} alt="icon unchecked" className="icon"/> }</td>
            <td>details</td>
        </tr>
    );
}

export default RowPlannerCustomerTasks;