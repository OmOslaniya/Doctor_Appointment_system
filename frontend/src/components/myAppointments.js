// MyAppointments.jsx
import React, { useEffect, useState } from 'react';
import { pemail } from "./Login";
import '../styles/myappointments.css';
import Navbar from "./NavBar";
import NavBar from "./NavBar";

const AppointmentItem = ({ appointment, onDeleteAppointment,setAppointments }) => {
    const { slot, schedule } = appointment;

    const handleDeleteAppointment = async () => {
        const isConfirmed = window.confirm("Are you sure you want to cancel the appointment?");
        if (isConfirmed) {
            try {
                console.log("afterrrr");
                // console.log(schedule);
                const response = await fetch(`http://localhost:8080/api/appointments/cancelappointment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        schedule: schedule,
                        slot: slot,
                        email:pemail,
                    }),
                });

                if (response.ok) {
                    const updatedAppointments = await response.json();
                    console.log("updated list");
                    console.log(updatedAppointments);
                    setAppointments(updatedAppointments);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                }


            } catch (error) {
                console.error('Error during deleteing the appointment:', error);
            }
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
                Cancel Appointment
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


    const handleDeleteAppointment = (deletedAppointmentId) => {
        setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== deletedAppointmentId)
        );
    };

    return (
        <div>
            <Navbar/>
        <div className="appointments-list">
            <h2>My Appointments</h2>
            {appointments.map((appointment) => (
                <AppointmentItem
                    key={appointment.id}
                    appointment={appointment}
                    onDeleteAppointment={handleDeleteAppointment}
                    setAppointments={setAppointments}
                />
            ))}
        </div>
        </div>
    );
};

export default MyAppointments;
