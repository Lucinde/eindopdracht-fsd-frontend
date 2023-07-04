import React, {useContext, useState} from 'react';
import {IconContext} from "../../context/IconContext";
import RowPlannerCustomerTasks from "./RowPlannerCustomerTasks";
import Button from "../buttons/Button";
import Modal from "react-modal";
import ViewTask from "./ViewTask";
import RowMechanicTasks from "./RowMechanicTasks";

function RowPlannerMechanic({mechanic}) {
    const {ico_planning, ico_checkbox, ico_checkbox_blank} = useContext(IconContext);


    return (
        <>
            <tr>
                <td>{mechanic.username}</td>
                <td>{mechanic.email} </td>
            </tr>
        </>
    );
}

export default RowPlannerMechanic;