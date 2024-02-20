import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/myappointments.css';
import Navbar2 from "./navbar2";
import { demail, pemail } from "./Login";
let svar;

const MySchedules = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showSchedules, setShowSchedules] = useState(false);
    const [doctor, setdoctor] = useState(null);
    const [schedule, setschedule] = useState(null);
    const [appointments, setappointments] = useState([]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/schedules/${demail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const d = await response.json();
                    console.log(d);
                    setdoctor(d);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                }
            } catch (error) {
                console.error('Error during doctor fetch:', error);
            }
        };

        fetchDoctor();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowSchedules(false); // Reset showSchedules when the date changes
    };

    const handleCheckSchedules = async () => {
        if (selectedDate) {
            try {
                const response = await fetch(`http://localhost:8080/api/schedules/getallschedules`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        doctor: doctor,
                        date: selectedDate,

                    }),
                });

                if (response.ok) {
                    const s = await response.json();
                    console.log(s);
                    svar=s;
                    setschedule(s);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                }

                const response2 = await fetch(`http://localhost:8080/api/appointments/getallappointments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        schedule: svar,
                    }),
                });

                if (response2.ok) {
                    const apps = await response2.json();
                    console.log(apps);
                    setappointments(apps);
                } else {
                    const errorData = await response2.json();
                    console.error('Error:', errorData.error);
                }
            } catch (error) {
                console.error('Error during appointment list fetch:', error);
            }

            setShowSchedules(true);
        } else {
            alert('Please select a date first.');
        }
    };

    return (
        <div>
            <Navbar2 />
            <div>
                <h2>Select Date</h2>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select a date"
                />
                <button onClick={handleCheckSchedules}>Check Schedules</button>
            </div>

            {showSchedules && (
                <div>
                    <h3>Schedules for {selectedDate.toLocaleDateString()}:</h3>
                    <ul>
                        {schedule.slot1 && (
                            <li>
                                Slot 1: {findAppointmentDetails('1')}
                            </li>
                        )}
                        {schedule.slot2 && (
                            <li>
                                Slot 2: {findAppointmentDetails('2')}
                            </li>
                        )}
                        {schedule.slot3 && (
                            <li>
                                Slot 3: {findAppointmentDetails('3')}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );

    function findAppointmentDetails(slot) {
        const appointment = appointments.find(app => app.slot === slot);
        if (appointment) {
            return `Patient Name: ${appointment.patient.name}, Patient Email: ${appointment.patient.email}`;
        } else {
            return 'No appointment for this slot';
        }
    }
};

export default MySchedules;
