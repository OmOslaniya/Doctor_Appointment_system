// MyAppointments.jsx
import React, { useEffect, useState } from 'react';
import { pemail } from "./Login";
import '../styles/myappointments.css';

const AppointmentItem = ({ appointment }) => {
    const { slot, schedule } = appointment;

    const handleDeleteAppointment = async () => {
        try {
            console.log("afterrrr");
            // console.log(schedule);
            const response = await fetch(`http://localhost:8080/api/appointments/cancelappointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    schedule:schedule,
                    slot:slot,
                }),
            });


        } catch (error) {
            console.error('Error during deleteing the appointment:', error);
        }

        console.log("before cancle schedule");


}


        return (
        <div className="appointment-item">
            <div>
                <strong>Slot:</strong> {slot}
            </div>
            <div>
                <strong>Doctor:</strong> {schedule.doctor.name}
            </div>
            <div>
                <strong>Specialization:</strong> {schedule.doctor.specialization}
            </div>
            <div>
                <strong>Date:</strong> {new Date(schedule.date).toLocaleDateString()}
            </div>
            <button className="delete-button" onClick={handleDeleteAppointment}>
                Delete Appointment
            </button>
        </div>
    );
};

const MyAppointments = () => {
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

export default MyAppointments;
