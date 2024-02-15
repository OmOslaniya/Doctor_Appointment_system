import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let pemail;
const Login = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        userType: 'doctor',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                console.log(`${loginData.userType} login successful!`);
                // Redirect based on user type
                if (loginData.userType === 'patient') {
                    pemail = loginData.email;
                    navigate('/phome');
                } else if (loginData.userType === 'doctor') {
                    navigate('/dhome');
                }
            } else {
                console.error('Login failed.');
                // Handle error, e.g., display error message
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>User Login</h2>
            <form style={styles.form} onSubmit={handleLogin}>
                <label style={styles.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <br />
                <label style={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <br />
                <label style={styles.label}>
                    User Type:
                    <select
                        name="userType"
                        value={loginData.userType}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </label>
                <br />
                <button type="submit" style={styles.button}>
                    Login
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

export default Login;
export { pemail };
