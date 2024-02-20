import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" exact activeClassName="active">
                Home
            </NavLink>
            <NavLink to="/my-appointments" activeClassName="active">
                My Appointments
            </NavLink>
            <NavLink to="/logout" activeClassName="active">
                Logout
            </NavLink>
        </div>
    );
};

export default Navbar;
