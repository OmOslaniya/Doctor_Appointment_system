import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'
import { Link } from 'react-router-dom';

let pemail, demail;

const Login = () => {
    const linkStyle = {
        textDecoration: 'none', // Removes the underline
        color: 'inherit', // Keeps the default link color
    };

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
                // Display alert on successful login
                if (loginData.userType === 'patient') {
                    pemail = loginData.email;
                    navigate('/phome');
                } else if (loginData.userType === 'doctor') {
                    demail = loginData.email;
                    navigate('/myschedules');
                }
            } else {
                console.error('Login failed.');

                // Handle error, e.g., display error message
                alert('Username or password is incorrect. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='conatiner'>
            <div className='center'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='txt_field'>
                        <input type="email" name="email" required value={loginData.email} onChange={handleChange}/>
                        <span></span>
                        <label>Email</label>
                    </div>

                    <div className='txt_field'>
                        <input type="password" name="password" required value={loginData.password}
                               onChange={handleChange}/>
                        <span></span>
                        <label>Password</label>
                    </div>

                    <label>
                        User Type:
                        <select
                            name="userType"
                            value={loginData.userType}
                            onChange={handleChange}

                        >
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </select>
                    </label>

                    <Link to = "/signup" style={linkStyle}>
                        <div class="signup_link">
                            Not Registered ? Signup
                        </div>
                    </Link>
                    <center>
                        <button type="submit" className="btn">
                            Login
                        </button>
                    </center>
                </form>
            </div>
        </div>
    );
};



export default Login;
export { pemail, demail };