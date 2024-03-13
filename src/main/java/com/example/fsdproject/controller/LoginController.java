package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.LoginRequest;
import com.example.fsdproject.entity.Patient;
import com.example.fsdproject.service.DoctorService;
import com.example.fsdproject.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/login")

public class LoginController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if ("doctor".equals(loginRequest.getUserType())) {
            Doctor doctor = doctorService.authenticateDoctor(loginRequest.getEmail(), loginRequest.getPassword());
            if (doctor != null) {
                // Authentication successful
                return ResponseEntity.ok("Doctor login successful");
            }
        } else if ("patient".equals(loginRequest.getUserType())) {
            Patient patient = patientService.authenticatePatient(loginRequest.getEmail(), loginRequest.getPassword());
            if (patient != null) {
                // Authentication successful
                return ResponseEntity.ok("Patient login successful");
            }
        }

        // Authentication failed
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
