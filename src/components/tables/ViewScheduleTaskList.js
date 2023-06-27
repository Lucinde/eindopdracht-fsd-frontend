import React from 'react';

function ViewScheduleTaskList({schedule}) {
    const formattedDate = schedule.date.split('-').reverse().join('-');
    const formattedStartTime = schedule.startTime.slice(0, 5);
    const formattedEndTime = schedule.endTime.slice(0,5)
    return (
        <li key={schedule.id}>
            {formattedDate} van {formattedStartTime} tot {formattedEndTime} uur
        </li>
    );
}

export default ViewScheduleTaskList;