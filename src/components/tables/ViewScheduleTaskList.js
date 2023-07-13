import React, {useEffect, useState} from 'react';
import axios from "axios";
import configData from "../../config.json";

function ViewScheduleTaskList({scheduleId}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [scheduleData, setScheduleData] = useState(null);
    const [formattedDate, setFormattedDate] = useState(null);
    const [formattedStartTime, setFormattedStartTime] = useState(null);
    const [formattedEndTime, setFormattedEndTime] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(
                    `${configData.SERVER_URL}/schedule-tasks/${scheduleId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );
                setScheduleData(response.data);
            } catch (e) {
                if (e.response != null) {
                    setError(e.response.data);
                } else {
                    setError(e.message);
                }
            }
            setLoading(false);
        };

        if (scheduleId != null) {
            void fetchData();
        }

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
        return <p>Er is iets mis gegaan met het ophalen van de data. {error}</p>;
    }

    return (
        <>
            {scheduleData ? (
                <li key={scheduleData.id}>
                    {formattedDate} van {formattedStartTime} tot {formattedEndTime} uur
                    <br/>
                    Monteur: {scheduleData.mechanic}
                </li>
            ) : (
                <p>Loading...</p>
            )
            }
        </>
    );
}

export default ViewScheduleTaskList;