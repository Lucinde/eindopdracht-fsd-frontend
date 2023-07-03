import React, {useEffect, useState} from 'react';
import axios from "axios";
import configData from "../../config.json";
import {set} from "react-hook-form";

function ViewScheduleTaskList({scheduleId}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [scheduleData, setScheduleData] = useState(null);
    const [formattedDate, setFormattedDate] = useState(null);
    const [formattedStartTime, setFormattedStartTime] = useState(null);
    const [formattedEndTime, setFormattedEndTime] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(
                    `${configData.SERVER_URL}/schedule-tasks/${scheduleId}`,
                    {
                        signal: controller.signal,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );
                setScheduleData(response.data);
                console.log(scheduleData);
                console.log(response.data);
            } catch (e) {
                setError(true);
            }
            setLoading(false);
        };
        console.log("in try: " + scheduleId)

        if (scheduleId != null) {
            void fetchData();
        }

        return function cleanup() {
            if(error) {
                controller.abort();
            }
        };
    }, [scheduleId]);

    useEffect(() => {
        if(scheduleData) {
            setFormattedDate(scheduleData.date.split('-').reverse().join('-'))
            setFormattedStartTime(scheduleData.startTime.slice(0, 5));
            setFormattedEndTime(scheduleData.endTime.slice(0, 5));
        }
    },  [scheduleData])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Er is iets mis gegaan met het ophalen van de data.</p>;
    }

    return (
        <>
            {scheduleData ? (
                <li key={scheduleData.id}>
                    {formattedDate} van {formattedStartTime} tot {formattedEndTime} uur
                    <br/>
                    Monteur: {scheduleData.mechanic.username}
                </li>
            ) : (
                <p>Loading...</p>
            )
            }
        </>
    );
}

export default ViewScheduleTaskList;