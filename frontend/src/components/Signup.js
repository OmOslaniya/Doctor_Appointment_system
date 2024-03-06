import React, { useState } from 'react';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';


const SignupForm = () => {

    const navigate = useNavigate();


    const linkStyle = {
        textDecoration: 'none', // Removes the underline
        color: 'inherit', // Keeps the default link color
    };
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
        if (userData.password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

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
                alert(`${userData.userType} registered successfully!`);
                navigate('/login');
            } else {
                console.error('Registration failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className='container'>
            <div className='center'>
                <h1>Register</h1>
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

                    <div className='txt_field'>
                        <input type="text" name="name" required value={userData.name} onChange={handleChange} />
                        <label>Name</label>
                    </div>
                    {userData.userType === 'doctor' && (
                        <div className='txt_field'>
                            <input type="text" name="specialization" required value={userData.specialization}
                                   onChange={handleChange} />
                            <label>Specialization</label>
                        </div>
                    )}

                    <div className='txt_field'>
                        <input type="email" name="email" required value={userData.email} onChange={handleChange} />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className='txt_field'>
                        <input type="text" name="contactDetails" required value={userData.contactDetails}
                               onChange={handleChange} />
                        <label>Contact Details</label>
                    </div>
                    <div className='txt_field'>
                        <input type="password" name="password" required value={userData.password}
                               onChange={handleChange} />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <Link to = "/login" style={linkStyle}>
                        <div class="signup_link">
                            Have an Account ? Login
                        </div>
                    </Link>
                    <center>

                        <button type="submit" className="btn">
                            Signup
                        </button>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;