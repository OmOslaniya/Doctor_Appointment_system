// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import DefaultPage from "./components/DefaultPage";
import PatientHome from "./components/patientHome";
import DoctorHome from "./components/doctorHome";
import MyAppointments from "./components/myAppointments";
import Myschedules from "./components/myschedules";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // You can implement a function here to check if the user is already logged in
    // and set the user state accordingly.
  }, []);

  const handleLogout = () => {
    // Implement a function to log out the user and update the user state
  };

  return (
      <Router>


          <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/signup" element={<Signup setUser={setUser} />} />
              <Route path="/phome" element={<PatientHome setUser={setUser} />} />
              <Route path="/dhome" element={<DoctorHome setUser={setUser} />} />
              <Route path="/" element={<Login  />} />
              <Route path="/myappointments" element={<MyAppointments setUser={setUser} />} />
              <Route path="/myschedules" element={<Myschedules setUser={setUser} />} />




          </Routes>

      </Router>
  );
};

export default App;
