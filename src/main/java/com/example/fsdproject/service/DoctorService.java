package com.example.fsdproject.service;

import java.util.Date;
import java.util.List;

import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long doctorId) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
        return optionalDoctor.orElse(null);
    }

    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long doctorId) {
        doctorRepository.deleteById(doctorId);
    }

    public Optional<Doctor> findDoctorByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    public Doctor authenticateDoctor(String email, String password) {
        Optional<Doctor> optionalDoctor = findDoctorByEmail(email);
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            if (password.equals(doctor.getPassword())) {
                return doctor;
            }
        }
        return null; // Authentication failed
    }

}
