package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Patient;
import com.example.fsdproject.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Patient savePatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }
    // Add other endpoints as needed
}
