import React, { useState } from 'react';
import '../styles/Signup.css';

const SignupForm = () => {
    const [userData, setUserData] = useState({
        userType: 'doctor',
        name: '',
        specialization: '',
        contactDetails: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/' + userData.userType + 's', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log(userData.userType + ' registered successfully!');
                // Handle success, e.g., redirect to login page
            } else {
                console.error('Registration failed.');
                // Handle error, e.g., display error message
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <h2>User Signup</h2>
            <form onSubmit={handleSignup}>
                <label>
                    User Type:
                    <select
                        name="userType"
                        value={userData.userType}
                        onChange={handleChange}
                    >
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </label>
                <br />
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                {userData.userType === 'doctor' && (
                    <>
                        <label>
                            Specialization:
                            <input
                                type="text"
                                name="specialization"
                                value={userData.specialization}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                    </>
                )}
                <label>
                    Contact Details:
                    <input
                        type="text"
                        name="contactDetails"
                        value={userData.contactDetails}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;
