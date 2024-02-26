import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar2.css';

const Navbar2 = () => {
    return (
        <div className="navbar">
            <NavLink to="/dhome" exact activeClassName="active">
                Home
            </NavLink>
            <NavLink to="/myschedules" activeClassName="active">
                My Schedules
            </NavLink>
            <NavLink to="/login" activeClassName="active">
                Logout
            </NavLink>
        </div>
    );
};

export default Navbar2;
