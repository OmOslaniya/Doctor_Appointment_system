import React, { useEffect, useState } from 'react';

const PatientHome = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Fetch the list of doctors from the backend API
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/doctors');
                if (response.ok) {
                    const data = await response.json();
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
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientHome;
