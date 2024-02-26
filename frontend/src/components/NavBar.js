import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/phome" exact activeClassName="active">
                Home
            </NavLink>
            <NavLink to="/myappointments" activeClassName="active">
                My Appointments
            </NavLink>
            <NavLink to="/login" activeClassName="active">
                Logout
            </NavLink>
        </div>
    );
};

export default Navbar;
