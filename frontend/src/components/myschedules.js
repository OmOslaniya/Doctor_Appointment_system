// MyAppointments.jsx
import React, { useEffect, useState } from 'react';
import { pemail } from "./Login";
import '../styles/myappointments.css';

const MySchedules = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/appointments/${pemail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const apps = await response.json();
                    setAppointments(apps);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                }
            } catch (error) {
                console.error('Error during appointment list fetch:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="appointments-list">
            <h2>My Appointments</h2>
            {appointments.map((appointment) => (
                <AppointmentItem key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
};

export default MySchedules;
