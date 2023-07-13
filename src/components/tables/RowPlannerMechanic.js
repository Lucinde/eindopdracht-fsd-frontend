import React from 'react';

function RowPlannerMechanic({mechanic}) {

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