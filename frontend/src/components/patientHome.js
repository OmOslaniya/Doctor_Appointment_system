import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {pemail} from "./Login";
import '../styles/patienthome.css'
import '../styles/navbar.css';
import Navbar from "./NavBar";
let s;
const AppointmentSlot = ({ slot, onBookSlot }) => {
    const navigate = useNavigate();

    return (
        <div>
            <p>{slot}</p>
            <button onClick={() => onBookSlot(slot)}>Book</button>
        </div>
    );
};
const DoctorCard = ({ doctor }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showSlots, setShowSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [doctorobj, setdoctorobj] = useState(null);
    const [patientobj, setpatientobj] = useState(null);
    const [scheduleobj, setscheduleobj] = useState(null);
    const [scheduleobj2, setscheduleobj2] = useState(null);
    const [availabilitySlots,setavailabilitySlots]= useState([])


    // useEffect(()=>{
    //     handleCheckAvailability();
    // })
    const handleCheckAvailability = async () => {
        if (selectedDate && doctor) {
            console.log(selectedDate);
            try {
                const doctorId = doctor.doctorId;
                const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const doctorData = await response.json();
                    setdoctorobj(doctorData);
                    console.log("Doctor set:", doctorData);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                }

            const response3 = await fetch(`http://localhost:8080/api/patients/${pemail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response3.ok) {
                const patientData = await response3.json();
                setpatientobj(patientData);
                console.log("Patient set:", patientData);

                // Set showSlots to true here
                setShowSlots(true);
            } else {
                const errorData = await response3.json();
                console.error('Error:', errorData.error);
            }
                const formattedDate = selectedDate.toISOString().split('T')[0];

            const response2 = await fetch(`http://localhost:8080/api/schedules/giveschedules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: doctorobj,
                    date: selectedDate,

                }),

            });

            if (response2.ok) {
                const scheduleData = await response2.json();
                setscheduleobj2(scheduleData);
                console.log("Schedule set:", scheduleData);

                const newAvailabilitySlots = [];

                if (!scheduleData.slot1) {
                    newAvailabilitySlots.push('9:00 AM - 10:00 AM');
                }
                if (!scheduleData.slot2) {
                    newAvailabilitySlots.push('10:00 AM - 11:00 AM');
                }
                if (!scheduleData.slot3) {
                    newAvailabilitySlots.push('11:00 AM - 12:00 PM');
                }

                setavailabilitySlots(newAvailabilitySlots);
                console.log(newAvailabilitySlots);
            }
            else {
                const errorData = await response2.json();
                console.error('Error:', errorData.error);
            }

            } catch (error) {
                console.error('Error:', error.message);
            }
        } else {
            alert('Please select a date and doctor.');
        }
    };

    const convertSlotToNumber = (slot) => {
        switch (slot) {
            case '9:00 AM - 10:00 AM':
                return'1';
            case '10:00 AM - 11:00 AM':
                return'2';
            case '11:00 AM - 12:00 PM':
                return '3';
            default:
                return '0';
        }
    };
    const handleBookSlot = async (slot) => {
        try {
            console.log("hello");

            const numericSlot = convertSlotToNumber(slot);
            const isConfirmed = window.confirm(`Do you want to book the appointment for ${slot}?`);
            if (isConfirmed){
            console.log("slot " + numericSlot);
            console.log(selectedDate);
            const response3 = await fetch('http://localhost:8080/api/schedules/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor:doctorobj,
                    date:selectedDate,
                    slot:numericSlot,
                }),
            });

            console.log("just before");
            if (response3.ok) {
                const scheduledata = await response3.json();
                console.log("schedule obj");
                // console.log(scheduledata);
                s = scheduledata;
                console.log("s is");
                console.log(s);
                setscheduleobj(scheduledata);
                setSelectedSlot(slot);

                setavailabilitySlots((prevSlots) => prevSlots.filter((s) => s !== slot));

            }

            } else {
                console.error('Failed to book appointment.');
            }

            console.log("before appointment booked");
            const response2 = await fetch('http://localhost:8080/api/appointments/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient: patientobj,
                    schedule:  s,
                    slot: numericSlot,

                }),
            });

            if (response2.ok) {
                console.log('Appointment booked successfully!');
                setSelectedSlot(slot);

            } else {
                console.error('Failed to book appointment.');
            }

        } catch (error) {
            console.error('Error during appointment booking:', error);
        }
    };

    // const availabilitySlots = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'];

    return (
        <div className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>

            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                shouldCloseOnSelect={true}
                showWeekNumbers={true}
            />

            <button onClick={handleCheckAvailability}>Check Availability</button>
            {showSlots && (
                <div>
                    <h4>Select Availability</h4>
                    <div>
                        {availabilitySlots.map((slot) => (
                            <AppointmentSlot key={slot} slot={slot} onBookSlot={handleBookSlot} />
                        ))}
                    </div>
                    {selectedSlot && <p>Selected Slot: {selectedSlot}</p>}
                </div>
            )}
        </div>
    );
};
const PatientHome = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/doctors');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Doctors data:', data);
                    setDoctors(data);
                } else {
                    console.error('Failed to fetch doctors.');
                }
            } catch (error) {
                console.error('Error during doctor list fetch:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div>
            <Navbar/>

                        <div className="patient-home">
                            <h2>List of Registered Doctors</h2>
                            <div className="doctors-list">
                                {doctors.map((doctor) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} />
                                ))}
                            </div>
                        </div>
        </div>
    );
};
export default PatientHome;
