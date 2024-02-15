import React, { useState } from 'react';

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
        <div style={styles.container}>
            <h2 style={styles.title}>User Signup</h2>
            <form style={styles.form} onSubmit={handleSignup}>
                <label style={styles.label}>
                    User Type:
                    <select
                        name="userType"
                        value={userData.userType}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </label>
                <label style={styles.label}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                {userData.userType === 'doctor' && (
                    <label style={styles.label}>
                        Specialization:
                        <input
                            type="text"
                            name="specialization"
                            value={userData.specialization}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </label>
                )}
                <label style={styles.label}>
                    Contact Details:
                    <input
                        type="text"
                        name="contactDetails"
                        value={userData.contactDetails}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>
                    Signup
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
    },
    label: {
        marginBottom: '10px',
        display: 'block',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '4px',
        marginBottom: '12px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
};

export default SignupForm;
