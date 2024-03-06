import React from 'react';
// import { NavLink } from 'react-router-dom';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar2.css';

const Navbar2 = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Ask for confirmation before logging out
        const confirmLogout = window.confirm('Are you sure you want to logout?');

        if (confirmLogout) {
            navigate('/login');
        }

    };

    return (
        <div className="navbar">
            <NavLink to="/dhome" exact activeClassName="active">
                Home
            </NavLink>
            <button style={{ marginLeft: '80vw' }} onClick={handleLogout}>
                Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </div>
    );
};

export default Navbar2;
