package com.example.fsdproject.service;

import com.example.fsdproject.entity.Patient;
import com.example.fsdproject.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long patientId) {
        Optional<Patient> optionalPatient = patientRepository.findById(patientId);
        return optionalPatient.orElse(null);
    }

    public Patient getPatientByName(String name) {
        return patientRepository.findByName(name);
    }

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(Long patientId) {
        patientRepository.deleteById(patientId);
    }

    public Optional<Patient> findPatientByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    public Patient authenticatePatient(String email, String password) {
        Optional<Patient> optionalPatient = findPatientByEmail(email);
        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();
            if (password.equals(patient.getPassword())) {
                return patient;
            }
        }
        return null; // Authentication failed
    }
}
