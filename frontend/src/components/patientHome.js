import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {pemail} from "./Login";
const AppointmentSlot = ({ slot, onBookSlot }) => {
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

    const handleCheckAvailability = async () => {
        if (selectedDate && doctor) {
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

                    const response2 = await fetch(`http://localhost:8080/api/patients/${pemail}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response2.ok) {
                        const patientData = await response2.json();
                        setpatientobj(patientData);
                        console.log("Patient set:", patientData);

                        // Set showSlots to true here
                        setShowSlots(true);
                    } else {
                        const errorData = await response2.json();
                        console.error('Error:', errorData.error);
                    }
                } else {
                    const errorData = await response.json();
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
            console.log("slot " + numericSlot);
            const response3 = await fetch('http://localhost:8080/api/schedules/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor: doctorobj,
                    date: selectedDate,
                    slot: numericSlot,

                }),
            });
            console.log("just before");
            if (response3.ok) {
                const scheduledata = await response3.json();
                console.log(scheduledata);
                setSelectedSlot(slot);
                setpatientobj(scheduledata);

            } else {
                console.error('Failed to book appointment.');
            }


            const response2 = await fetch('http://localhost:8080/api/appointments/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient: patientobj,
                    schedule:  scheduleobj,
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

    const availabilitySlots = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'];

    return (
        <div>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
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
            <h2>List of Registered Doctors</h2>
            <div>
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default PatientHome;
