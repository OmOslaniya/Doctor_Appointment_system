// PatientHome.js

import React, { useEffect, useState } from 'react';
import '../styles/phome.css'; // Import the CSS file

const AvailabilitySlot = ({ slot, onBookSlot }) => {
    return (
        <div className="availability-slot">
            <p>{slot}</p>
            <button className="book-btn" onClick={() => onBookSlot(slot)}>
                Book
            </button>
        </div>
    );
};

const DoctorCard = ({ doctor }) => {
    const [showAvailability, setShowAvailability] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');

    const handleCheckAvailability = () => {
        setShowAvailability(true);
    };

    const handleBookSlot = (slot) => {
        // Add logic for booking the slot
        console.log(`Booking slot ${slot} for ${doctor.name}`);
        setSelectedSlot(slot);
        // You can add further logic for the booking process
    };

    const availabilitySlots = ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'];

    return (
        <div className="doctor-card">
            <h3>{doctor.name}</h3>
            <p className="specialization">{doctor.specialization}</p>
            <button className="availability-btn" onClick={handleCheckAvailability}>
                Check Availability
            </button>
            {showAvailability && (
                <div className="availability-container">
                    <h4>Select Availability</h4>
                    <div className="availability-slots">
                        {availabilitySlots.map((slot) => (
                            <AvailabilitySlot key={slot} slot={slot} onBookSlot={handleBookSlot} />
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
        // Fetch the list of doctors from the backend API
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
            <h2 className="page-title">List of Registered Doctors</h2>
            <div className="doctor-card-container">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default PatientHome;
